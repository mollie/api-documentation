Update order
============
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/orders/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

This endpoint can be used to update the billing and/or shipping address of an order.

When updating an order that uses a Klarna payment method, Klarna may decline the requested changes, resulting in an
error response from the Mollie API. The order remains intact, though the requested changes are not persisted.

Parameters
----------
Replace ``id`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.

Even though all parameters are optional, at least one of them needs to be provided in the request.

.. parameter:: billingAddress
   :type: address object
   :condition: optional

   The billing person and address for the order.

   Please note that we'll update the billing address that you see in the Mollie API, but the change might not be
   propagated to the supplier. Unfortunately, not all suppliers support updating the address.

   Refer to the documentation of the :ref:`address object <address-object>` for more information on which formats are
   accepted.

   .. parameter:: organizationName
      :type: string
      :condition: optional

      The person's organization, if applicable.

   .. parameter:: title
      :type: string
      :condition: optional

      The title of the person, for example *Mr.* or *Mrs.*.

   .. parameter:: givenName
      :type: string
      :condition: required

      The given name (first name) of the person.

   .. parameter:: familyName
      :type: string
      :condition: required

      The family name (surname) of the person.

   .. parameter:: email
      :type: string
      :condition: required

      The email address of the person.

   .. parameter:: phone
      :type: phone number
      :condition: optional

      The phone number of the person. Some payment methods require this information. If you have it, you should pass it
      so that your customer does not have to enter it again in the checkout. Must be in the
      `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example ``+31208202070``.

   .. parameter:: streetAndNumber
      :type: string
      :condition: required

   .. parameter:: streetAdditional
      :type: string
      :condition: optional

   .. parameter:: postalCode
      :type: string
      :condition: conditional

      This field is required if the provided ``country`` has a postal code system.

   .. parameter:: city
      :type: string
      :condition: required

   .. parameter:: region
      :type: string
      :condition: optional

   .. parameter:: country
      :type: string
      :condition: required

      The country of the address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

.. parameter:: shippingAddress
   :type: address object
   :condition: optional

   The shipping address for the order.

   This field is optional, but if it is provided, then the full name and address have to be in a valid format. Refer to
   the documentation of the :ref:`address object <address-object>` for more information on which formats are
   accepted.

   .. parameter:: organizationName
      :type: string
      :condition: optional

      The person's organization, if applicable.

   .. parameter:: title
      :type: string
      :condition: optional

      The title of the person, for example *Mr.* or *Mrs.*.

   .. parameter:: givenName
      :type: string
      :condition: required

      The given name (first name) of the person.

   .. parameter:: familyName
      :type: string
      :condition: required

      The family name (surname) of the person.

   .. parameter:: email
      :type: string
      :condition: required

      The email address of the person.

   .. parameter:: phone
      :type: phone number
      :condition: optional

      The phone number of the person. Some payment methods require this information. If you have it, you should pass it
      so that your customer does not have to enter it again in the checkout. Must be in the
      `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example ``+31208202070``.

   .. parameter:: streetAndNumber
      :type: string
      :condition: required

   .. parameter:: streetAdditional
      :type: string
      :condition: optional

   .. parameter:: postalCode
      :type: string
      :condition: conditional

      This field is required if the provided ``country`` has a postal code system.

   .. parameter:: city
      :type: string
      :condition: required

   .. parameter:: region
      :type: string
      :condition: optional

   .. parameter:: country
      :type: string
      :condition: required

      The country of the address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

.. parameter:: orderNumber
   :type: string
   :condition: optional

   The order number. For example, ``16738``.

   We recommend that each order should have a unique order number.

.. parameter:: redirectUrl
   :type: string
   :condition: optional

   The URL your customer will be redirected to after the payment process.

   Updating this field is only possible when the payment is not yet finalized.

.. parameter:: cancelUrl
   :type: string
   :condition: optional

   The URL your consumer will be redirected to when the consumer explicitly cancels the order. If this URL is not
   provided, the consumer will be redirected to the ``redirectUrl`` instead — see above.

   Updating this field is only possible when the payment is not yet finalized.

.. parameter:: webhookUrl
   :type: string
   :condition: optional

   Set the webhook URL, where we will send :doc:`order status changes </orders/status-changes>` to.

   The ``webhookUrl`` must be reachable from Mollie's point of view, so you cannot use ``localhost``. If you want to use
   webhook during development on ``localhost``, you should use a tool like
   `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks delivered
   to your local machine.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to update a test mode order.

Response
--------
``200`` ``application/hal+json``

An order object is returned, as described in
:doc:`Get order </reference/v2/orders-api/get-order>`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X PATCH https://api.mollie.com/v2/orders/ord_kEn1PlbGa \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d '{
               "billingAddress": {
                  "organizationName": "Mollie B.V.",
                  "streetAndNumber": "Keizersgracht 126",
                  "city": "Amsterdam",
                  "region": "Noord-Holland",
                  "postalCode": "1234AB",
                  "country": "NL",
                  "title": "Dhr",
                  "givenName": "Piet",
                  "familyName": "Mondriaan",
                  "email": "piet@mondriaan.com",
                  "phone": "+31208202070"
               }
         }'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $orderId = "ord_kEn1PlbGa";
      $order = $mollie->orders->update($orderId, [
        "billingAddress" => [
          "organizationName" => "Mollie B.V.",
          "streetAndNumber" => "Keizersgracht 126",
          "city" => "Amsterdam",
          "region" => "Noord-Holland",
          "postalCode" => "1234AB",
          "country" => "NL",
          "title" => "Dhr",
          "givenName" => "Piet",
          "familyName" => "Mondriaan",
          "email" => "piet@mondriaan.com",
          "phone" => "+31208202070",
        ],
      ]);

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      mollie_client.order.update("ord_kEn1PlbGa", {
          "billingAddress": {
              "organizationName": "Mollie B.V.",
              "streetAndNumber": "Keizersgracht 126",
              "city": "Amsterdam",
              "region": "Noord-Holland",
              "postalCode": "1234AB",
              "country": "NL",
              "title": "Dhr",
              "givenName": "Piet",
              "familyName": "Mondriaan",
              "email": "piet@mondriaan.com",
              "phone": "+31208202070",
          }
      })

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      order = Mollie::Order.update(
        'ord_kEn1PlbGa',
        billing_address: {
          organizationName: 'Mollie B.V.',
          streetAndNumber: 'Keizersgracht 126',
          city: 'Amsterdam',
          region: 'Noord-Holland',
          postalCode: '1234AB',
          country: 'NL',
          title: 'Dhr',
          givenName: 'Piet',
          familyName: 'Mondriaan',
          email: 'piet@mondriaan.com',
          phone: '+31208202070'
        }
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const order = await mollieClient.orders.update('ord_kEn1PlbGa', {
         billingAddress: {
           organizationName: 'Mollie B.V.',
           streetAndNumber: 'Keizersgracht 126',
           city: 'Amsterdam',
           region: 'Noord-Holland',
           postalCode: '1234AB',
           country: 'NL',
           title: 'Dhr',
           givenName: 'Piet',
           familyName: 'Mondriaan',
           email: 'piet@mondriaan.com',
           phone: '+31208202070'
        }
      });

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
        "resource": "order",
        "id": "ord_kEn1PlbGa",
        "profileId": "pfl_URR55HPMGx",
        "method": "ideal",
        "amount": {
            "value": "1027.99",
            "currency": "EUR"
        },
        "status": "created",
        "isCancelable": true,
        "metadata": null,
        "createdAt": "2018-08-02T09:29:56+00:00",
        "expiresAt": "2018-08-30T09:29:56+00:00",
        "mode": "live",
        "locale": "nl_NL",
        "billingAddress": {
            "organizationName": "Mollie B.V.",
            "streetAndNumber": "Keizersgracht 126",
            "city": "Amsterdam",
            "region": "Noord-Holland",
            "postalCode": "1234AB",
            "country": "NL",
            "title": "Dhr",
            "givenName": "Piet",
            "familyName": "Mondriaan",
            "email": "piet@mondriaan.com",
            "phone": "+31208202070"
        },
        "orderNumber": "18475",
        "shippingAddress": {
            "organizationName": "Mollie B.V.",
            "streetAndNumber": "Keizersgracht 126",
            "postalCode": "1015 CW",
            "city": "Amsterdam",
            "country": "nl",
            "givenName": "Luke",
            "familyName": "Skywalker",
            "email": "luke@skywalker.com"
        },
       "redirectUrl": "https://example.org/redirect",
        "lines": [
            {
                "resource": "orderline",
                "id": "odl_dgtxyl",
                "orderId": "ord_pbjz8x",
                "name": "LEGO 42083 Bugatti Chiron",
                "sku": "5702016116977",
                "type": "physical",
                "status": "created",
                "metadata": null,
                "isCancelable": false,
                "quantity": 2,
                "quantityShipped": 0,
                "amountShipped": {
                    "value": "0.00",
                    "currency": "EUR"
                },
                "quantityRefunded": 0,
                "amountRefunded": {
                    "value": "0.00",
                    "currency": "EUR"
                },
                "quantityCanceled": 0,
                "amountCanceled": {
                    "value": "0.00",
                    "currency": "EUR"
                },
               "shippableQuantity": 0,
               "refundableQuantity": 0,
               "cancelableQuantity": 0,
                "unitPrice": {
                    "value": "399.00",
                    "currency": "EUR"
                },
                "vatRate": "21.00",
                "vatAmount": {
                    "value": "121.14",
                    "currency": "EUR"
                },
                "discountAmount": {
                    "value": "100.00",
                    "currency": "EUR"
                },
                "totalAmount": {
                    "value": "698.00",
                    "currency": "EUR"
                },
                "createdAt": "2018-08-02T09:29:56+00:00",
                "_links": {
                    "productUrl": {
                        "href": "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
                        "type": "text/html"
                    },
                    "imageUrl": {
                        "href": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$",
                        "type": "text/html"
                    }
                }
            },
            {
                "resource": "orderline",
                "id": "odl_jp31jz",
                "orderId": "ord_pbjz8x",
                "name": "LEGO 42056 Porsche 911 GT3 RS",
                "sku": "5702015594028",
                "type": "physical",
                "status": "created",
                "metadata": null,
                "isCancelable": false,
                "quantity": 1,
                "quantityShipped": 0,
                "amountShipped": {
                    "value": "0.00",
                    "currency": "EUR"
                },
                "quantityRefunded": 0,
                "amountRefunded": {
                    "value": "0.00",
                    "currency": "EUR"
                },
                "quantityCanceled": 0,
                "amountCanceled": {
                    "value": "0.00",
                    "currency": "EUR"
                },
               "shippableQuantity": 0,
               "refundableQuantity": 0,
               "cancelableQuantity": 0,
                "unitPrice": {
                    "value": "329.99",
                    "currency": "EUR"
                },
                "vatRate": "21.00",
                "vatAmount": {
                    "value": "57.27",
                    "currency": "EUR"
                },
                "totalAmount": {
                    "value": "329.99",
                    "currency": "EUR"
                },
                "createdAt": "2018-08-02T09:29:56+00:00",
                "_links": {
                    "productUrl": {
                        "href": "https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056",
                        "type": "text/html"
                    },
                    "imageUrl": {
                        "href": "https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$",
                        "type": "text/html"
                    }
                }
            }
        ],
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/orders/ord_pbjz8x",
                "type": "application/hal+json"
            },
            "checkout": {
                "href": "https://www.mollie.com/payscreen/order/checkout/pbjz8x",
                "type": "text/html"
            },
            "dashboard": {
                "href": "https://www.mollie.com/dashboard/org_123456789/orders/ord_pbjz8x",
                "type": "text/html"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/orders-api/get-order",
                "type": "text/html"
            }
        }
   }
