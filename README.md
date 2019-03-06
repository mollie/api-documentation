# Mollie public API documentation

[![Greenkeeper badge](https://badges.greenkeeper.io/mollie/api-documentation.svg)](https://greenkeeper.io/)


This project contains the source of all of Mollie's public API documentation. The full documentation (in an easy to use
format) may be found at https://docs.mollie.com.

## Contribute

- [Issue Tracker](https://github.com/mollie/api-documentation/issues)
- [Source Code](https://github.com/mollie/api-documentation)

We take pull requests on our documentation as well, if you think that something can be improved please open a PR.

The documentation is formatted using [reStructuredText](http://www.sphinx-doc.org/en/master/rest.html). All
documentation should be written in US English.

Note that PhpStorm comes with a reStructuredText plugin. You can enable it from the Plugins preferences pane. It enables
some syntax highlighting.

### Prerequisites

- Python > 2.7.9
- Node > 9.x

### Running locally

Download a copy of this repository:

```
git clone git@github.com:mollie/api-documentation.git
```

Then visit the downloaded repository and install dependencies:

```
cd api-documentation
make install
```

### Generate docs

Finally, build the documentation, its CSS and JS files by running:

```
make html
```

You can now preview the docs by opening `build/html/index.html`:

```
open build/html/index.html
```

### Styling docs

You can make changes to the styling by starting a web server locally:

```
make start
```

Visit http://localhost:8000 to preview your changes. CSS & JS changes will appear without the need to refresh your 
browser.

## Support

If you are having issues, please let us know. We accept pull requests on our public documentation.

You can get support via info@mollie.com.

## Working at Mollie

Mollie is always looking for new talent to join our teams. We’re looking for inquisitive minds with good ideas and
strong opinions, and, most importantly, who know how to ship great products. Want to join the future of payments? 
[Check out our vacancies](https://jobs.mollie.com).

## License

The documentation is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/?) license.
