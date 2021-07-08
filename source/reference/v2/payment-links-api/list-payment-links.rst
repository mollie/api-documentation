List payment links
==================
.. api-name:: Payment links API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payment-links

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all payments links created with the current website profile, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the payment link with this ID. The
       payment link with this ID is included in the result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of payment links to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you can specify which profile you want to look at when listing payment links. If you omit the ``profileId``
parameter, you will get all payment links on the organization. Organizations can have multiple profiles for each of
their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: false

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve payment links made in test mode. By default, only live payment links are
       returned.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of payment links found in ``_embedded``, which is either the requested number (with a maximum of 250)
       or the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``payment_links``

              .. type:: array

            - An array of payment link objects as described in
              :doc:`Get payment link </reference/v2/payment-links-api/get-payment-link>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of payment links. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of payment links.

          * - ``previous``

              .. type:: URL object

            - The previous set of payment links, if available.

          * - ``next``

              .. type:: URL object

            - The next set of payment links, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment links list endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payment-links?limit=5 \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $paymentLinks = $mollie->paymentLinks->page(null, 5);

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 5,
       "_embedded": {
           "payment_links": [
                 {
                     "resource": "payment-link",
                     "id": "pl_4Y0eZitmBnQ6IDoMqZQKh",
                     "mode": "test",
                     "profileId": "pfl_QkEhN94Ba",
                     "createdAt": "2021-03-20T09:13:37+00:00",
                     "paidAt": "2021-03-21T09:13:37+00:00",
                     "updatedAt": "2021-03-21T09:13:37+00:00",
                     "expiresAt": null,
                     "amount": {
                         "value": "24.95",
                         "currency": "EUR"
                     },
                     "description": "Bicycle tires",
                     "redirectUrl": "https://webshop.example.org/thanks",
                     "webhookUrl": "https://webshop.example.org/payment-links/webhook/",
                     "_links": {
                         "self": {
                             "href": "https://api.mollie.com/v2/payment-links/pl_4Y0eZitmBnQ6IDoMqZQKh",
                             "type": "application/json"
                         },
                         "paymentLink": {
                             "href": "https://paymentlink.mollie.com/payment/4Y0eZitmBnQ6IDoMqZQKh/",
                             "type": "text/html"
                         },
                         "documentation": {
                             "href": "https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link",
                             "type": "text/html"
                         }
                     }
                 },
               { },
               { },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payment-links?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/payment-links?from=pl_ER6aqfpXg6nZrJvcsxNsm&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payment-links-api/list-payment-links",
               "type": "text/html"
           }
       }
   }
