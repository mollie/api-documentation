# Mollie public API documentation


This project contains the source of all of Mollie's public API documentation. The full documentation (in an easy to use
format) in the future may be found at https://docs.mollie.com.

**Before we go live:**
You can find the docs on https://d12nhbpjotbqmy.cloudfront.net/, automatically deployed by Travis to S3, and cached by Cloudfront.
During the development phase it is secured with basic auth using an AWS Lambda function:
```
Username: polder
Password: approved
```

## Contribute

- [Issue Tracker](https://github.com/mollie/api-documentation/issues)
- [Source Code](https://github.com/mollie/api-documentation)

We take pull requests on our documentation as well, if you think that something can be improved please open a PR.

The documentation is formatted using [reStructuredText](http://www.sphinx-doc.org/en/master/rest.html). All documentation
should be written in US English.

Note that PhpStorm comes with a reStructuredText plugin. You can enable it from the Plugins preferences pane. It enables
some syntax highlighting.

### Previewing local changes

If you made any changes, and want to check out if it can be successfully built and how it will look, perform the
following steps:

1. Install Sphinx, if you don't have it yet: `pip install -U -r requirements.txt`
2. Run `make` to create the HTML files that make up the documentation.

## Support

If you are having issues, please let us know. We accept pull requests on our public documentation.

You can get support via info@mollie.com.

## License

The project is licensed under the MIT license.
