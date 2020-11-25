#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import pygments

# The parent directory has to be included for 'sphinx-autobuild' to work.
sys.path.insert(0, os.path.abspath("../"))
sys.path.insert(0, os.path.abspath("extensions"))

# -- General configuration ------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
# needs_sphinx = '1.0'

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ["mollie.setup"]

# Add any paths that contain templates here, relative to this directory.
templates_path = []

# The suffix(es) of source filenames.
source_suffix = '.rst'

# The master toctree document.
master_doc = 'contents'

# General information about the project.
project = 'Mollie API'
copyright = '2020, Mollie B.V. <info@mollie.com>'
author = 'Mollie B.V. <info@mollie.com>'

# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#
# The short X.Y version.
version = '1.0'
# The full version, including alpha/beta/rc tags.
release = '1.0'

# Hide .txt extension for source links
html_sourcelink_suffix = ''

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = None

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This patterns also effect to html_static_path and html_extra_path
exclude_patterns = []

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = False

# -- Options for HTML output ----------------------------------------------

# The theme to use for HTML and HTML Help pages. See the documentation for
# a list of builtin themes.
#
html_theme_path = ["./"]
html_theme = 'theme'

html_context = {
    'display_github': True,
    'github_user': 'mollie',
    'github_repo': 'api-documentation',
    'github_version': 'master/source/'
}

html_logo = '_static/img/mollie-logo.png'

html_favicon = '_static/img/favicon.ico'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# Add custom CSS overrides of the theme.
def setup(app):
    # enable Pygments json lexer
    try:
        if pygments.__version__ >= '1.5':
            # use JSON lexer included in recent versions of Pygments
            from pygments.lexers import JsonLexer
        else:
            # use JSON lexer from pygments-json if installed
            from pygson.json_lexer import JSONLexer as JsonLexer
    except ImportError:
        pass  # not fatal if we have old (or no) Pygments and no pygments-json
    else:
        app.add_lexer('json', JsonLexer())
