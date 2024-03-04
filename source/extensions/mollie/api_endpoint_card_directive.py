import os
from docutils import nodes
from docutils.parsers.rst import Directive, directives
from source.extensions import utilities


def validate_http_method(argument):
    """
    :type argument: string
    :type: string
    """
    http_methods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
    return utilities.exists_in_list(argument, http_methods)


class ApiEndpointCardDirective(Directive):
    has_content = True
    required_arguments = 0
    option_spec = {
        "name": directives.unchanged_required,
        "method": validate_http_method,
        "url": directives.unchanged_required,
        "ref": directives.unchanged_required
    }

    def run(self):
        container = nodes.line()
        container["classes"] = ["endpoint-card"]

        anchor = self.create_anchor_node(self.options["ref"])

        self.add_name_node(anchor, self.options["name"])

        self.add_endpoint_node(anchor, self.options["method"], self.options["url"])

        self.add_description_node(anchor, self.content)

        container += [anchor]

        return [container]

    def create_anchor_node(self, ref):
        # TODO: if we can get Sphinx to parse the ref for us like a regular document reference (:ref: or :doc:), then we
        # can get rid of the root URL and file suffix concatenation.

        root_url = os.environ['MOLLIE_DOCS_URL']

        file_suffix = os.environ['MOLLIE_FILE_SUFFIX']

        anchor = nodes.reference(refuri=root_url + ref + file_suffix)

        return anchor

    def add_name_node(self, anchor, name):
        name_node = nodes.line(text=name)
        name_node["classes"] = ["endpoint-card__name"]

        anchor += [name_node]

    def add_endpoint_node(self, anchor, method, url):
        endpoint_node = nodes.container()
        endpoint_node["classes"] = ["endpoint-card__endpoint"]

        endpoint_method_node = nodes.literal(text=method)
        endpoint_url_node = nodes.literal(text=url)

        endpoint_node += [endpoint_method_node, endpoint_url_node]

        anchor += [endpoint_node]

    def add_description_node(self, anchor, description):
        description_node = nodes.line_block()
        description_node["classes"] = ["endpoint-card__description"]

        self.state.nested_parse(description, 0, description_node)

        anchor += [description_node]
