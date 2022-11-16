Create payment link
===================
.. api-name:: Payment links API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payment-links

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

With the Payment links API you can generate payment links that by default, unlike regular payments, do not expire. The
payment link can be shared with your customers and will redirect them to them the payment page where they can complete
the payment. A :doc:`/reference/v2/payments-api/get-payment` will only be created once the customer initiates the
payment.

Parameters
----------
.. parameter:: description
   :type: string
   :condition: required

   This description will also be used as the payment description and will be shown to your customer on their card or
   bank statement when possible.

.. parameter:: amount
   :type: amount object
   :condition: required

   The amount that you want to charge, e.g. ``{"currency":"EUR", "value":"1000.00"}`` if you would want to charge
   €1000.00.

   .. parameter:: currency
      :type: string
      :condition: required

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The
      :doc:`currencies supported </payments/multicurrency>` depend on the payment methods that are enabled on your
      account.

   .. parameter:: value
      :type: string
      :condition: required

      A string containing the exact amount you want to charge in the given currency. Make sure to send the right amount
      of decimals. Non-string values are not accepted.

.. parameter:: redirectUrl
   :type: string
   :condition: optional

   The URL your customer will be redirected to after completing the payment process.

.. parameter:: webhookUrl
   :type: string
   :condition: optional

   Set the webhook URL, where we will send payment link status updates to.

   The ``webhookUrl`` is optional, but without a webhook you will miss out on important status changes about your
   payment link.

   The ``webhookUrl`` must be reachable from Mollie's point of view, so you cannot use ``localhost``. If you want to use
   webhook during development on ``localhost``, you should use a tool like
   `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks delivered
   to your local machine.

   See :doc:`webhook </overview/webhooks>` documentation for more details.

.. parameter:: expiresAt
   :type: datetime
   :condition: optional

   The expiry date of the payment link in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. For example:
   ``2021-12-24T12:00:16+01:00``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the only mandatory extra parameter is the ``profileId`` parameter. With it, you
can specify which profile the payment belongs to. Organizations can have multiple profiles for each of their websites.
See :doc:`Profiles API </reference/v2/profiles-api/overview>` for more information.

.. parameter:: profileId
   :type: string
   :condition: required for access tokens
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to true to only retrieve payment links made in test mode. By default, only live payment links are returned.

Response
--------
``201`` ``application/hal+json``

A payment link object is returned, as described in :doc:`/reference/v2/payment-links-api/get-payment-link`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/payment-links \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         --data-urlencode "amount[currency]=EUR" \
         --data-urlencode "amount[value]=24.95" \
         --data-urlencode "description=Bicycle tires" \
         --data-urlencode "expiresAt=2023-06-06T11:00:00+00:00" \
         --data-urlencode "redirectUrl=https://webshop.example.org/thanks" \
         --data-urlencode "webhookUrl=https://webshop.example.org/payment-links/webhook/"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $paymentLink = $mollie->paymentLinks->create([
        "amount" => [
          "currency" => "EUR",
          "value" => "24.95",
        ],
        "description" => "Bicycle tires",
        "expiresAt" => "2023-06-06T11:00:00+00:00",
        "redirectUrl" => "https://webshop.example.org/thanks",
        "webhookUrl" => "https://webshop.example.org/payment-links/webhook/",
      ]);
      $paymentLink->getCheckoutUrl();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")
      payment_link = mollie_client.payment_links.create({
         "amount": {
               "currency": "EUR",
               "value": "24.95"
         },
         "description": "Bicycle tires",
         "expiresAt": "2023-06-06T11:00:00+00:00",
         "webhookUrl": "https://webshop.example.org/payment-links/webhook/",
         "redirectUrl": "https://webshop.example.org/thanks",
      })

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

   {
       "resource": "payment-link",
       "id": "pl_4Y0eZitmBnQ6IDoMqZQKh",
       "mode": "test",
       "profileId": "pfl_QkEhN94Ba",
       "createdAt": "2021-03-20T09:13:37+00:00",
       "paidAt": null,
       "updatedAt": null,
       "expiresAt": "2023-06-06T11:00:00+00:00",
       "amount": {
           "value": "24.95",
           "currency": "EUR"
       },
       "archived": false,
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
               "href": "https://docs.mollie.com/reference/v2/payment-links-api/create-payment-link",
               "type": "text/html"
           }
       }
   }
