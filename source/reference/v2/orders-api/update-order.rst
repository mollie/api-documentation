Update order
===================
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

When updating an order that uses a *pay after delivery* method such as *Klarna Pay later*,
Klarna may decline the requested changes, resulting in an error response from the Mollie API.
The order remains intact, though the requested changes are not persisted.

Parameters
----------
Replace ``id`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.

Please note that even though all parameters are optional, at least one of them needs to be provided
in the request.

.. list-table::
   :widths: auto

   * - ``billingAddress``

       .. type:: address object
          :required: false

     - The billing person and address for the order. See :ref:`order-address-details` for the exact
       fields needed.

   * - ``shippingAddress``

       .. type:: address object
          :required: false

     - The shipping address for the order. See :ref:`order-address-details` for the exact fields
       needed.

   * - ``orderNumber``

       .. type:: string
          :required: false

     - The order number. For example, ``16738``.

       We recommend that each order should have a unique order number.

   * - ``redirectUrl``

       .. type:: string
          :required: false

     - The URL your customer will be redirected to after the payment process.

       .. note::
          Updating this field is only possible when the payment is not yet finalized.

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - Set the webhook URL, where we will send :doc:`order status changes </orders/status-changes>` to.

       .. note:: The ``webhookUrl`` must be reachable from Mollie's point of view, so you cannot use ``localhost``. If
          you want to use webhook during development on ``localhost``, you must use a tool like
          `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks
          delivered to your local machine.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a test mode order.

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
                  "streetAndNumber": "Keizersgracht 313",
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

      $order = $mollie->orders->get("ord_kEn1PlbGa");
      $order->billingAddress->organizationName = "Mollie B.V.";
      $order->billingAddress->streetAndNumber = "Keizersgracht 313";
      $order->billingAddress->city = "Amsterdam";
      $order->billingAddress->region = "Noord-Holland";
      $order->billingAddress->postalCode = "1234AB";
      $order->billingAddress->country = "NL";
      $order->billingAddress->title = "Dhr";
      $order->billingAddress->givenName = "Piet";
      $order->billingAddress->familyName = "Mondriaan";
      $order->billingAddress->email = "piet@mondriaan.com";
      $order->billingAddress->phone = "+31208202070";
      $order->update();

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      mollie_client.order.update('ord_kEn1PlbGa', {
        'billingAddress': {
            'organizationName': 'Mollie B.V.',
            'streetAndNumber': 'Keizersgracht 313',
            'city': 'Amsterdam',
            'region': 'Noord-Holland',
            'postalCode': '1234AB',
            'country': 'NL',
            'title': 'Dhr',
            'givenName': 'Piet',
            'familyName': 'Mondriaan',
            'email': 'piet@mondriaan.com',
            'phone': '+31208202070'
        }
      }

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
          streetAndNumber: 'Keizersgracht 313',
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

      (async () => {
        const order = await mollieClient.orders.update('ord_kEn1PlbGa', {
           billingAddress: {
             organizationName: 'Mollie B.V.',
             streetAndNumber: 'Keizersgracht 313',
             city: 'Amsterdam',
             region: 'Noord-Holland',
             postalCode: '1234AB',
             country: 'NL',
             title: 'Dhr',
             givenName: 'Piet',
             familyName: 'Mondriaan',
             email: 'piet@mondriaan.com',
             phone: '+31208202070',
          },
        });
      })();

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
            "streetAndNumber": "Keizersgracht 313",
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
            "streetAndNumber": "Keizersgracht 313",
            "postalCode": "1016 EE",
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
