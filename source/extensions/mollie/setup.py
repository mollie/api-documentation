from .api_name_directive import ApiNameDirective
from .api_endpoint_directive import ApiEndpointDirective
from .authentication_directive import AuthenticationDirective
from .code_block_selector_directive import CodeBlockSelectorDirective
from .data_type_directive import DataTypeDirective
from .param_name_directive import ParamNameDirective


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
    app.add_directive('param-name', ParamNameDirective)

    # When debugging, it is best to disable parallel reading and writing.
    return {
        "version": "0.1",
        "parallel_read_safe": True,
        "parallel_write_safe": True
    }
