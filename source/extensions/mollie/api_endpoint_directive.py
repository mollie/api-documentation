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


class ApiEndpointDirective(Directive):
    has_content = False
    required_arguments = 0
    option_spec = {
        "method": validate_http_method,
        "url": directives.unchanged_required
    }

    def run(self):
        container = nodes.container()
        container["classes"].append(self.name)

        method_node = nodes.literal(text=self.options["method"])
        method_node["classes"].extend([self.name, "method"])

        url_node = nodes.literal(text=self.options["url"])
        url_node["classes"].extend([self.name, "url"])

        container += [method_node, url_node]

        return [container]
