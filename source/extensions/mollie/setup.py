from . import ApiNameDirective, ApiEndpointDirective, AuthenticationDirective, DataTypeDirective
from .code_block_selector_directive import CodeBlockSelectorDirective


def setup(app):
    """
    :type app: sphinx.application.Sphinx
    :rtype: dict
    """
    # Add the directives.
    app.add_directive('api-name', ApiNameDirective)
    app.add_directive('endpoint', ApiEndpointDirective)
    app.add_directive('authentication', AuthenticationDirective)
    app.add_directive('code-block-selector', CodeBlockSelectorDirective)
    app.add_directive('type', DataTypeDirective)

    # When debugging, it is best to disable parallel reading and writing.
    return {
        "version": "0.1",
        "parallel_read_safe": True,
        "parallel_write_safe": True
    }
