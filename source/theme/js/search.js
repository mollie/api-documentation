import { enhance } from './utils';
import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

const searchClient = algoliasearch('YRKIIH6LPA', '468c23035b867bacfdc2f454d7a912a9');

export default enhance('algolia-search', (element) => {
  autocomplete({
    container: element,
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
