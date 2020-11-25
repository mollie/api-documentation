Cancel order
==============
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/orders/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

The order can only be canceled while:

* the order doesn't have any open payments except for the methods ``banktransfer``, ``directdebit``, ``klarnapaylater``,
  and ``klarnasliceit``.
* the order's ``status`` field is either ``created``, ``authorized`` or ``shipping`` [#f1]_.

#. In case of ``created``, all order lines will be canceled and the new order status will be ``canceled``.
#. In case of ``authorized``, the authorization will be released, all order lines will be canceled and the new order
   status will be ``canceled``.
#. In case of ``shipping``, any order lines that are still ``authorized`` will be canceled and order lines that are
   ``shipping`` will be completed. The new order status will be ``completed``.

For more information about the status transitions please check our
:doc:`order status changes guide </orders/status-changes>`.

.. [#f1] If the order status is ``shipping``, some order lines can have the status ``paid`` if the order was paid using
         a payment method that does not support authorizations (such as iDEAL) and the order lines are not shipped yet.
         In this case, the order cannot be canceled. You should create refunds for these order lines instead.

Parameters
----------
Replace ``id`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to cancel a test mode order.

Response
--------
``200`` ``application/hal+json``

An order object is returned, as described in :doc:`Get order </reference/v2/orders-api/get-order>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X DELETE https://api.mollie.com/v2/orders/ord_8wmqcHMN4U \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $order = $mollie->orders->cancel("ord_8wmqcHMN4U");

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.delete('ord_8wmqcHMN4U')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      Mollie::Order.cancel('ord_8wmqcHMN4U')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const canceledOrder = await mollieClient.orders.cancel('ord_8wmqcHMN4U');
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
        "resource": "order",
        "id": "ord_8wmqcHMN4U",
        "profileId": "pfl_URR55HPMGx",
        "amount": {
            "value": "1027.99",
            "currency": "EUR"
        },
        "status": "canceled",
        "isCancelable": false,
        "metadata": null,
        "createdAt": "2018-08-02T09:29:56+00:00",
        "mode": "live",
        "locale": "nl_NL",
        "billingAddress": {
            "organizationName": "Mollie B.V.",
            "streetAndNumber": "Keizersgracht 313",
            "postalCode": "1016 EE",
            "city": "Amsterdam",
            "country": "nl",
            "givenName": "Luke",
            "familyName": "Skywalker",
            "email": "luke@skywalker.com"
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
        "canceledAt": "2018-08-03T09:29:56+00:00",
        "redirectUrl": "https://example.org/redirect",
        "lines": [
            {
                "resource": "orderline",
                "id": "odl_dgtxyl",
                "orderId": "ord_pbjz8x",
                "name": "LEGO 42083 Bugatti Chiron",
                "sku": "5702016116977",
                "type": "physical",
                "status": "canceled",
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
                "quantityCanceled": 2,
                "amountCanceled": {
                    "value": "698.00",
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
                "status": "canceled",
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
                "quantityCanceled": 1,
                "amountCanceled": {
                    "value": "329.99",
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
