.DEFAULT_GOAL := html

# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line. When editing extensions, it is
# recommended to use the "-E" flag to force a rebuild every time you run 'Make', as
# it is not guaranteed it will rebuild when no '.rst' files have changed.
SPHINXOPTS    = -W -j auto
SPHINXBUILD   = python -msphinx
SPHINXPROJ    = api-documentation
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

css:
	@./node_modules/.bin/parcel build source/theme/styles/main.scss --out-dir source/_static --out-file style --detailed-report

js:
	@./node_modules/.bin/parcel build source/theme/js/index.js --out-dir source/_static --out-file index --detailed-report

css-reload:
	@./node_modules/.bin/parcel source/theme/styles/main.scss --out-dir build/_static --out-file style --no-hmr --port 8001

js-reload:
	@./node_modules/.bin/parcel source/theme/js/index.js --out-dir build/_static --out-file index --no-hmr --port 8002

html-reload:
	sphinx-autobuild -b html "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	make css
	make js
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
