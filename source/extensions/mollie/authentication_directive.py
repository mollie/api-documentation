import sphinx.addnodes

from docutils import nodes
from docutils.parsers.rst import Directive
from source.extensions import utilities


class AuthenticationDirective(Directive):
    has_content = False
    required_arguments = 0
    optional_arguments = 0
    option_spec = {
        "api_keys": utilities.validate_bool,
        "organization_access_tokens": utilities.validate_bool,
        "oauth": utilities.validate_bool
    }

    def run(self):
        container = nodes.container()
        container["classes"].append(self.name)

        inline = nodes.inline(text="Authentication:")

        # References need to be contained within something like an inline text
        # element; they cannot directly be added to the container.
        if self.options["api_keys"]:
            api_ref = self.create_reference("/guides/authentication", "API keys")
            inline += api_ref
        if self.options["organization_access_tokens"]:
            pat_ref = self.create_reference("/guides/authentication", "Organization access tokens")
            inline += pat_ref
        if self.options["oauth"]:
            oauth_ref = self.create_reference("/oauth/overview", "App access tokens")
            inline += oauth_ref

        container += inline

        return [container]

    @staticmethod
    def create_reference(label, title=""):
        """
        :type label: string
        :type title: string
        :rtype: sphinx.addnodes.pending_xref
        """
        # Create the reference to 'label'. The 'refexplicit' parameter indicates
        # whether to use a custom link text, or to use the text that the label
        # itself provides (e.g. the title of the section you're referring to).
        ref = sphinx.addnodes.pending_xref(
            reftype="doc",
            refdomain="std",
            reftarget=label,
            refexplicit=(title != "")
        )

        # Add the custom link text, regardless of whether it's necessary or not.
        # Without adding it, Sphinx will throw a very vague error message.
        ref += nodes.literal(text=title)

        return ref
