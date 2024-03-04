import docutils.nodes
from docutils import nodes
from docutils.parsers.rst import Directive
from source.extensions import utilities

"""
This directive makes it possible to customize the title of a ReStructuredText document.
The reason why this directive was added is because the title is part of the document
structure, and adding customizations through creating the title as part of a directive
will not make it part of the document structure.

In practice, your title not being part of the document structure results in any other
heading / section that is part of your document to be promoted to a heading / section
one level up. If your H1 is not part of your document structure, the H2 that you
define becomes the H1.

This is still not great, I suppose, but hey, it's something. You should add this
directive directly under the title of your document.
"""
class CustomizeDocumentTitleDirective(Directive):
    has_content = False
    required_arguments = 0

    # If you add a new customization to this directive, please double-check that the
    # HTML page titles are being generated correctly. Any content added to the title
    # node is reflected in the 'title' variable in 'source/theme/layout.html', which
    # influences how the HTML page title is generated.
    option_spec = {
        "beta": utilities.validate_bool
    }

    def run(self):
        title_node = self.get_title_node()

        if "beta" in self.options and self.options["beta"] is True:
            api_beta_line = nodes.inline(text="BETA")
            api_beta_line["classes"].append("api-name__beta")
            title_node.children.append(api_beta_line)

        # We don't want to add any new elements, only edit an existing one.
        return []

    def get_title_node(self):
        parent = self.state.parent
        if not isinstance(parent, docutils.nodes.section):
            raise RuntimeError("The directive needs to be placed under a document title, which is a section node.")

        if len(self.state.parent.children) != 1:
            raise RuntimeError("The section node should only have one child, which is the document title.")

        title = self.state.parent.children[0]
        if not isinstance(title, docutils.nodes.title):
            raise RuntimeError("The child of the section node should be a title node.")

        if len(title.children) != 1:
            raise RuntimeError("The title node should only have one child, which is the title text.")

        return title
