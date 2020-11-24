from docutils import nodes
from docutils.parsers.rst import Directive, directives


class ParamNameDirective(Directive):
    has_content = False
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {
        "prefix": directives.unchanged_required
    }

    def run(self):
        param_name = self.arguments[0]
        param_anchor_text = self.get_param_anchor_text(param_name)

        container = nodes.container()
        container["ids"].append(param_anchor_text)

        param_name_node = nodes.literal(text=param_name)
        container.append(param_name_node)

        return [container]

    def get_param_anchor_text(self, param_name):
        prefix = self.options.get("prefix", None)
        if prefix is None:
            anchor_text = "parameter-{}".format(param_name)
        else:
            anchor_text = "parameter-{}-{}".format(prefix, param_name)

        return anchor_text\
            .replace(" ", "-")\
            .replace("_", "-")
