# Mollie public API documentation

[![Greenkeeper badge](https://badges.greenkeeper.io/mollie/api-documentation.svg)](https://greenkeeper.io/)

This project contains the source of all of Mollie's public API documentation. The full documentation (in an easy to use
format) may be found at https://docs.mollie.com.

The documentation is formatted using [reStructuredText](http://www.sphinx-doc.org/en/master/rest.html). Additionally, we
use a [Sphinx extension](https://cloud-sptheme.readthedocs.io/en/latest/lib/cloud_sptheme.ext.table_styling.html) to
help format tables.

## Contribute

- [Issue Tracker](https://github.com/mollie/api-documentation/issues)
- [Source Code](https://github.com/mollie/api-documentation)

We take [pull requests](https://github.com/mollie/api-documentation/pulls) from anyone on our documentation, if you
think that something can be improved please open a PR.

All documentation should be written in US English.

If you are a Mollie employee, please [don't include](https://en.wikipedia.org/wiki/Operations_security) any links to internal issue trackers or other internal applications
in your PR or issue description, API examples or commit messages.

Note that PhpStorm comes with a reStructuredText plugin. You can enable it from the Plugins preferences pane. It enables
some syntax highlighting.

### Prerequisites

- `python3` (must be in your `$PATH`, use `brew install python3`)
- [pip](https://pypi.org/project/pip/), Python's package manager.
  [Installation instructions](https://pip.pypa.io/en/stable/installing/).
- Node > 12.x. Installation using the [Node Version Manager](https://github.com/nvm-sh/nvm) is recommended.

### Running locally

Create a fork, or clone this repository if you have write access:

```shell
git clone git@github.com:mollie/api-documentation.git
```

Then visit the downloaded repository and install dependencies:

```shell
cd api-documentation
make install
```

### Generate HTML and supporting files

Finally, build the documentation, its CSS and JS files by running:

```shell
make html
```

You can now preview the generated documentation by opening `build/html/index.html`:

```shell
open build/html/index.html
```

### Making changes to copy

After running `make html` at least once, you can use `make html-only` to quickly update the HTML files if you changed
some copy. This way, you can have a quick [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop).

```shell
$ make html-only
Running Sphinx v1.7.1
...
updating environment: 0 added, 2 changed, 0 removed
...
build succeeded.

The HTML pages are in build/html.
$ open build/html/index.html
```

Sphinx will only update files for which the source files have changed.

### Styling docs

You can make changes to the styling by starting a web server locally:

```shell
make start
```

Visit `http://localhost:8000` to preview your changes. CSS & JS changes will appear without the need to refresh your
browser.

Most of the graphics used throughout the docs can be found in our (employees only) [Figma account](https://www.figma.com/).

### Releasing new versions of the documentation

Deployment is handled using continuous deployment via [Travis CI](https://docs.travis-ci.com/user/deployment/).
Successful builds on the `master` branch will be automatically deployed.

## Support

If you are having issues, please let us know. We accept pull requests on our public documentation.

You can get support via info@mollie.com.

## Working at Mollie

Mollie is always looking for new talent to join our teams. We are looking for inquisitive minds with good ideas and
strong opinions, and, most importantly, who know how to ship great products. Want to join the future of payments?
[Check out our vacancies](https://jobs.mollie.com).

## License

The documentation is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/?) license.
