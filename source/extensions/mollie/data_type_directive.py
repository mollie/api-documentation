from docutils import nodes
from docutils.parsers.rst import Directive
from source.extensions import utilities


class DataTypeDirective(Directive):
    has_content = False
    required_arguments = 1
    optional_arguments = 0
    option_spec = {
        "required": utilities.validate_bool
    }

    primitive_types = ["integer", "boolean", "float"]

    def run(self):
        data_type = self.arguments[0]
        condition = "optional"
        if self.options["required"]:
            condition = "required"

        container = nodes.container()
        container["classes"].extend([self.name, condition])

        data_type_line = nodes.line(text=data_type)
        if self.is_primitive_type(data_type):
            data_type_line["classes"].extend([self.name, "datatype", "primitive"])
        else:
            data_type_line["classes"].extend([self.name, "datatype"])

        condition_line = nodes.line(text=condition)
        condition_line["classes"].extend([self.name, "condition"])

        container += [data_type_line, condition_line]

        return [container]

    def is_primitive_type(self, type_string):
        return type_string in self.primitive_types
