.DEFAULT_GOAL := html
.PHONY: help start install clean css-reload html html-only html-production html-reload js-reload lint-js verify Makefile

# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line. When editing extensions, it is
# recommended to use the "-E" flag to force a rebuild every time you run 'Make', as
# it is not guaranteed it will rebuild when no '.rst' files have changed.
PYTHON         = python3
SPHINXOPTS     = -W
SPHINXPRODOPTS = -n -D html_file_suffix=''
SPHINXBUILD    = ${PYTHON} -msphinx
SPHINXPROJ     = api-documentation
SOURCEDIR      = source
BUILDDIR       = build

clean:
	rm -rf build/

node_modules/.bin/parcel: package-lock.json
	npm install --no-optional --no-audit

source/_static/style.css: $(wildcard source/theme/styles/**/*) node_modules/.bin/parcel
	node_modules/.bin/parcel build source/theme/styles/main.scss --out-dir source/_static --out-file style --no-source-maps --detailed-report

source/_static/index.js: source/theme/js/index.js node_modules/.bin/parcel
	node_modules/.bin/parcel build source/theme/js/index.js --out-dir source/_static --out-file index --no-source-maps --detailed-report

source/_static/gtm.js: source/theme/js/gtm.js
	cp source/theme/js/gtm.js $@

css-reload:
	@./node_modules/.bin/parcel source/theme/styles/main.scss --out-dir build/_static --out-file style --no-hmr --port 8001

js-reload:
	@./node_modules/.bin/parcel source/theme/js/index.js --out-dir build/_static --out-file index --no-hmr --port 8002

html-reload:
	${PYTHON} -msphinx-autobuild -b html "${SOURCEDIR}" "${BUILDDIR}" ${SPHINXOPTS} ${O}

start:
	make html-reload & make css-reload & make js-reload

install:
	${PYTHON} -mpip install --user -r requirements.txt --no-warn-script-location

lint-js:
	npm run lint:js

# This checks for links that are missing the trailing underscore. They are valid reStructured text but probably not your
# intention.
verify:
	! find source -name '*.rst' | xargs grep --color -E '<http.*>`([^_]|$$)' ;
	! egrep -B3 -A3 -n --color 'mollie\.(test|dev)' -r  source ;

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option. ${O} is meant as a shortcut for ${SPHINXOPTS}.
html: Makefile source/_static/style.css source/_static/index.js source/_static/gtm.js verify
	$(MAKE) html-only

.PHONY: html-only
html-only: verify
	${SPHINXBUILD} -M html "${SOURCEDIR}" "${BUILDDIR}" ${SPHINXOPTS} ${O}

html-production: Makefile source/_static/style.css source/_static/index.js source/_static/gtm.js verify
	${SPHINXBUILD} -M html "${SOURCEDIR}" "${BUILDDIR}" ${SPHINXOPTS} ${SPHINXPRODOPTS} ${O}
	# Go thru all the files, and replace the snippet with the google tag manager code
	@LC_CTYPE=C LANG=C find build/ -type f -name '*' -exec sed -i.bak 's/<!-- GOOGLE_TAG_MANAGER -->/<script type=\"text\/javascript\" src=\"\/_static\/gtm.js\" async><\/script>/g' {} \;
	# Go thru all the files, and replace the paths from relative to an absolute CDN path
	@LC_CTYPE=C LANG=C find build/ -type f -name '*' -exec sed -i.bak 's/\"[\.\/]*_images/\"https:\/\/assets.docs.mollie.com\/_images/g' {} \;
	@LC_CTYPE=C LANG=C find build/ -type f -name '*' -exec sed -i.bak 's/\"[\.\/]*_static/\"https:\/\/assets.docs.mollie.com\/_static/g' {} \;
	# Cleanup .bak files
	@find build/ -type f -name '*.bak' -exec rm {} \;
