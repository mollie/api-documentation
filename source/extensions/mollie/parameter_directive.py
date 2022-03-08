from docutils import nodes, statemachine
from docutils.parsers.rst import Directive, directives
from source.extensions import utilities


class ParameterDirective(Directive):
    has_content = True
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = False
    option_spec = {
        "type": directives.unchanged_required,
        "condition": directives.unchanged,
        "collapse": utilities.validate_bool,
        "collapse-children": utilities.validate_bool
    }

    def run(self):
        container = nodes.container()

        container["classes"] = ["parameter"]

        name_container = self.add_name_node(container, self.arguments[0])

        self.add_type_node(name_container, self.options["type"])

        if "condition" in self.options:
            self.add_condition_node(name_container, self.options["condition"])

        collapse = "collapse" in self.options and self.options["collapse"] is True

        if "collapse-children" in self.options:
            collapse_children = self.options["collapse-children"]
        else:
            collapse_children = True

        if collapse:
            self.add_collapse_toggle_node(name_container)

        self.add_description_node(container, self.content, collapse, collapse_children)

        return [container]

    def add_name_node(self, container, name):
        name_container = nodes.line()
        name_container["classes"] = ["parameter__name"]

        name_node = nodes.raw(name, '<code class="docutils">' + name + '</code>', format="html")
        name_container += [name_node]

        container += [name_container]

        return name_container

    def add_type_node(self, container, type):
        data_type_node = nodes.inline(text=type)
        data_type_node["classes"] = ["parameter__type"]

        container += [data_type_node]

    def add_condition_node(self, container, condition):
        condition_node = nodes.inline(text=condition)
        condition_node["classes"] = ["parameter__condition"]

        if condition.startswith("required"):
            condition_node["classes"] += ["parameter__condition--required"]
        elif condition.startswith("optional"):
            condition_node["classes"] += ["parameter__condition--optional"]
        elif condition.startswith("conditional"):
            condition_node["classes"] += ["parameter__condition--conditional"]

        container += [condition_node]

    def add_collapse_toggle_node(self, container):
        collapse_button_node = nodes.raw(
            "Show details",
            '<a href="javascript:void(0)" data-hide-label="Hide details" data-show-label="Show details"' +
            ' class="parameter__collapse-button collapsed" data-handler="collapsed-parameter">Show details</a>',
            format="html"
        )

        container += [collapse_button_node]

    def add_description_node(self, container, description, collapse, collapse_children):
        description_node = nodes.line_block()
        description_node["classes"] = ["parameter__description"]

        if collapse:
            description_node["classes"] += ["collapsed"]

        self.state.nested_parse(description, 0, description_node)

        # Traverse the parsed description to see if we have sub-parameters.
        sub_parameters = description_node.traverse(nodes.container, include_self=False)

        if len(sub_parameters):
            sub_parameter_container = nodes.container()
            sub_parameter_container["classes"] = ["parameter__children"]

            if not collapse_children:
                sub_parameter_container["classes"] += ["active"]

            # Move all sub-parameters into the new container.
            for sub_parameter in sub_parameters:
                # Skip sub-sub-parameters.
                if sub_parameter.parent is not description_node:
                    continue

                description_node.remove(sub_parameter)
                sub_parameter_container.append(sub_parameter)

            # Add the 'Show child parameters' button.
            if collapse_children:
                button_label = "Show child parameters"
                button_classes = "parameter__children-button"
            else:
                button_label = "Hide child parameters"
                button_classes = "parameter__children-button active"

            sub_parameter_button = nodes.raw(
                button_label,
                '<p class="' + button_classes + '">' +
                '<a href="javascript:void(0)" data-handler="child-parameters"' +
                ' data-hide-label="Hide child parameters" data-show-label="Show child parameters">' +
                button_label +
                '</a>' +
                '</p>',
                format="html"
            )

            description_node.append(sub_parameter_button)

            # Add the new container to the description.
            description_node.append(sub_parameter_container)

        container += [description_node]
