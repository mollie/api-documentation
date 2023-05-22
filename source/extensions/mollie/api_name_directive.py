from docutils import nodes
from docutils.parsers.rst import Directive, directives
from source.extensions import utilities


class ApiNameDirective(Directive):
    has_content = False
    required_arguments = 1
    final_argument_whitespace = True
    option_spec = {
        "version": directives.positive_int,
        "beta": utilities.validate_bool,
        "coming-soon": utilities.validate_bool
    }

    def run(self):
        api_name_line = nodes.line(text=self.arguments[0] + " ")

        api_name_line["classes"].extend(["api-name", "h2"])

        if "version" in self.options:
            api_version_line = nodes.inline(text="v" + str(self.options["version"]))

            api_version_line["classes"].append("api-name__version")

            api_name_line += [api_version_line]

        if "beta" in self.options and self.options["beta"] is True:
            api_beta_line = nodes.inline(text="BETA")

            api_beta_line["classes"].append("api-name__beta")

            api_name_line += [api_beta_line]

        if "coming-soon" in self.options and self.options["coming-soon"] is True:
            coming_soon_line = nodes.inline(text="COMING SOON")

            coming_soon_line["classes"].append("api-name__beta")

            api_name_line += [coming_soon_line]

        return [api_name_line]
