import { enhance } from './utils';
import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

const searchClient = algoliasearch('YIM0JABEYY', 'c0c20693e89884beb5e1dc1958e8ed06');

export default enhance('algolia-search', (element) => {
  autocomplete({
    container: element,
    renderNoResults({ state, render }, root) {
      render(`No results for "${state.query}".`, root);
    },
    getSources() {
      return [
        {
          sourceId: 'docs',
          openOnFocus: false,
          getItemInputValue: ({ item }) => item.query,
          getItemUrl({ item }) {
            return item.permalink;
          },
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'docs',
                  query,
                  params: {
                    hitsPerPage: 10,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, html, components }) {
              let title;
              let content = components.Snippet({ hit: item, attribute: 'content' });

              if (item.type === 'parameter') {
                let parameter = components.Highlight({ hit: item, attribute: 'parameter' });

                title = html`<code>${parameter}</code>`;
              } else {
                title = components.Highlight({ hit: item, attribute: 'title' });
              }

              return html`
                <a href="${item.permalink}">
                  <div class="aa-Item__Title">${title}</div>
                  <div class="aa-Item__Content">${content}</div>
                  <div class="aa-Item__Breadcrumbs">${item.breadcrumbs}</div>
                </a>
              `;
            },
          },
        },
      ];
    },
  });
});
