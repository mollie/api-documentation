# Contributing

## Prerequisites

- Python > 2.7.9
- Node > 8.x

## Running locally

Download a copy of this repostory:

```
git clone git@github.com:mollie/api-documentation.git
```

Then visit the downloaded repository and install dependencies:

```
cd api-documentation
npm install # or `yarn install` if that's your thing
pip install -U -r requirements.txt
```

## Generate docs

Finally, build the documentation, its CSS and JS files by running:

```
make html
```

You can now preview the docs by opening `build/html/index.html`:

```
open build/html/index.html
```

## Styling docs

You can make changes to the styling by starting several hot-module reload processes:

```
make html-reload
make css-reload
make js-reload
```

Visit http://localhost:8000 to preview your changes. CSS & JS changes will appear without the need to refresh your browser.
