Get payment link
================
.. api-name:: Payment links API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payment-links/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single payment link object by its token.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment link's ID, for example ``pl_4Y0eZitmBnQ6IDoMqZQKh``.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a payment link object. Will always contain ``payment-link`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this payment link. Mollie assigns this identifier at creation time. For
       example ``pl_4Y0eZitmBnQ6IDoMqZQKh``. Its ID will always be used by Mollie to refer to a certain payment link.

   * - ``description``

       .. type:: string

     - A short description of the payment link. The description is visible in the Dashboard and will be shown on the
       customer's bank or card statement when possible. This description will eventual been used as payment description.

   * - ``mode``

       .. type:: string

     - The mode used to create this payment link. Mode determines whether a payment link is *real* (live mode) or a
       *test* payment link.

       Possible values: ``live`` ``test``

   * - ``profileId``

       .. type:: string

     - The identifier referring to the profile this payment link was created on. For example, ``pfl_QkEhN94Ba``.

   * - ``amount``

       .. type:: amount object

     - The amount of the payment link, e.g. ``{"currency":"EUR", "value":"100.00"}`` for a €100.00 payment link.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact amount of the payment link in the given currency.

   * - ``redirectUrl``

       .. type:: string|null

     - The URL your customer will be redirected to after completing the payment process.

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - The URL Mollie will call as soon an important status change takes place.

   * - ``createdAt``

       .. type:: datetime

     - The payment link's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``paidAt``

       .. type:: datetime
          :required: false

     - The date and time the payment link became paid, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       format.

   * - ``updatedAt``

       .. type:: datetime
          :required: false

     - The date and time the payment link last status change, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       format.

   * - ``expiresAt``

       .. type:: datetime
          :required: false

     - The expiry date and time of the payment link, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       format.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the payment link. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the payment link itself.

          * - ``paymentLink``

              .. type:: URL object

            - Direct link to the payment link.

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment link retrieval endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payment-links/pl_4Y0eZitmBnQ6IDoMqZQKh \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $paymentLink = $mollie->paymentLinks->get("pl_4Y0eZitmBnQ6IDoMqZQKh");

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

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
   }
