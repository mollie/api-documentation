from pathlib import Path
from algoliasearch.search_client import SearchClient
from bs4 import BeautifulSoup
import copy
import os
import re

# pip install awscli algoliasearch beautifulsoup4

def parse_file(file):
    if not file.is_file():
        return []

    file_handle = open(file, encoding="utf-8", errors="ignore")

    # Look for HTML files
    if file_handle.readline().strip() != "<!DOCTYPE html>":
        return []

    # Parse the HTML file
    soup = BeautifulSoup(file_handle.read(), "html.parser")

    content = soup.find("div", class_="content")

    if content is None:
        return []

    # Find the page title
    h1 = content.find("h1")

    if h1 is None:
        return []

    url = get_url_from_build_file_path(file_handle.name)
    area_name = get_area_name_from_url(url)
    h1_text = get_text(h1)
    current_h2_text = None
    page_records = []

    # Walk through the sections
    for section in content.find_all("div", class_="section"):
        h2 = section.find("h2", recursive=False)

        if h2 is not None:
            current_h2_text = get_text(h2)

        text = get_text(section)
        breadcrumbs = get_breadcrumbs(area_name, h1_text, current_h2_text)

        if len(text) > 0:
            page_records.append({
                "title": h1_text,
                "permalink": url,
                "section": current_h2_text,
                "content": text,
                "breadcrumbs": breadcrumbs,
                "type": "text",
                "depth": get_depth(current_h2_text, None)
            })

        for parameter in get_parameters(section):
            page_records.append({
                "title": "Parameter `" + parameter["name"] + "`",
                "permalink": url,
                "section": current_h2_text,
                "content": parameter["text"],
                "breadcrumbs": breadcrumbs,
                "type": "parameter",
                "parameter": parameter["name"],
                "depth": get_depth(current_h2_text, parameter["name"])
            })

    return page_records


def get_url_from_build_file_path(file_path):
    return (
        "https://docs.mollie.com/" +
        re.sub("^index$", "", re.sub(r"^build/(html/)?(.*?)(\.html)?$", r"\2", file_path))
    )


def get_breadcrumbs(area_name, title, section):
    breadcrumbs = [title]

    if area_name is not None:
        breadcrumbs.insert(0, area_name)

    if section is not None:
        breadcrumbs.append(section)

    return " › ".join(breadcrumbs)


def get_depth(section, parameter_name):
    depth = 0

    if section is not None:
        depth = depth + 1

    if parameter_name is not None:
        depth = depth + 1 + parameter_name.count(".")

    return depth


def get_area_name_from_url(url):
    if "/payments/" in url:
        return "Payments"

    if "/orders/" in url:
        return "Orders"

    if "/wallets/" in url:
        return "Wallets"

    if "/components/" in url:
        return "Mollie Components"

    if "/connect/" in url:
        return "Mollie Connect"

    if "/reference/" in url:
        return "API reference"

    return None


def get_text(el):
    if el is None:
        return ""

    el_copy = copy.copy(el)

    # Remove headers
    for header in el_copy.find_all(re.compile("^h[0-9]$"), recursive=False):
        header.extract()

    # Remove header links (since the current element may be a header itself)
    for link in el_copy.find_all("a", class_="headerlink"):
        link.extract()

    # Remove BETA labels
    for beta_labels in el_copy.find_all("span", class_="api-name__beta"):
        beta_labels.extract()

    for admonition in el_copy.find_all("div", class_="admonition", recursive=False):
        title = admonition.find("p", class_="admonition-title")

        # Replace e.g. 'Warning' by 'Warning:' so it connects nicely with the admonition body
        title.string.replace_with(title.string + ":")

        # Remove the wrapper div so we can interpret it like regular content
        admonition.unwrap()

    # Remove 'show child parameters' buttons
    for show_children_button in el_copy.find_all("p", class_="parameter__children-button", recursive=False):
        show_children_button.extract()

    # Remove any remaining div elements
    for div in el_copy.find_all("div", recursive=False):
        div.extract()

    # Now extract all remaining text from the element
    el_text = el_copy.get_text().replace("\n", " ").strip()

    return el_text


def get_parameters(section):
    for parameter in section.find_all("div", class_="parameter", recursive=False):
        name = get_text(parameter.find("div", class_="parameter__name").find("code"))
        text = get_text(parameter.find("div", class_="parameter__description"))

        yield {
            "name": name,
            "text": text
        }

        sub_parameters = parameter.find("div", class_="parameter__children")

        if sub_parameters is None:
            continue

        for sub_parameter in get_parameters(sub_parameters):
            yield {
                "name": name + "." + sub_parameter["name"],
                "text": sub_parameter["text"]
            }


class Algolia:
    def __init__(self):
        client = SearchClient.create("YIM0JABEYY", "<API key>")
        self.index = client.init_index("docs")

    def clear_index(self):
        print("Clearing the existing index... ", end="", flush=True)
        self.index.clear_objects()
        print("done")

    def upload_records(self, records, dir):
        print(
            "Sending " + str(len(records)) + " records to Algolia for directory '" + dir + "'... ",
            end="",
            flush=True
        )
        self.index.save_objects(records, {"autoGenerateObjectIDIfNotExist": True}).wait()
        print("done")


algolia = Algolia()

algolia.clear_index()

current_path = str(Path().resolve())

for directory in Path("build").glob("**"):
    absolute_path = str(directory.resolve())
    relative_path = absolute_path[len(current_path):] if absolute_path.startswith(current_path) else absolute_path

    print("Scanning directory '" + relative_path + "'...", flush=True)

    # Don't index v1, at least until we figure out how to rank these results at the bottom
    if "/reference/v1/" in relative_path:
        continue

    # Definitely don't index the Reseller API
    if "/reference/reseller-api/" in relative_path:
        continue

    records = []

    for file in Path(directory).glob("*"):
        records = records + parse_file(file)

    if len(records) > 0:
        algolia.upload_records(records, relative_path)
