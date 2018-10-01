Cancel order
==============
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/orders/*id*

.. authentication::
   :api_keys: true
   :oauth: true

The order can only be canceled while the order's ``status`` field is either ``created``, ``authorized`` or ``shipping``
[#f1]_.

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

Response
--------
``200`` ``application/hal+json; charset=utf-8``

An order object is returned, as described in :doc:`Get order </reference/v2/orders-api/get-order>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/orders/ord_8wmqcHMN4U \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

     <?php
     $mollie = new \Mollie\Api\MollieApiClient();
     $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
     $order = $mollie->orders->cancel("ord_8wmqcHMN4U");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
        "resource": "order",
        "id": "ord_8wmqcHMN4U",
        "profileId": "pfl_URR55HPMGx",
        "amount": {
            "value": "1027.99",
            "currency": "EUR"
        },
        "amountCaptured": {
            "value": "0.00",
            "currency": "EUR"
        },
        "amountRefunded": {
            "value": "0.00",
            "currency": "EUR"
        },
        "status": "canceled",
        "isCancelable": false,
        "metadata": null,
        "createdAt": "2018-08-02T09:29:56+00:00",
        "expiresAt": "2018-08-30T09:29:56+00:00",
        "mode": "live",
        "locale": "nl_NL",
        "orderNumber": "18475",
        "billingAddress": {
            "streetAndNumber": "Keizersgracht 313",
            "postalCode": "1016 EE",
            "city": "Amsterdam",
            "country": "nl",
            "givenName": "Luke",
            "familyName": "Skywalker",
            "email": "luke@skywalker.com"
        },
        "shippingAddress": {
            "streetAndNumber": "Keizersgracht 313",
            "postalCode": "1016 EE",
            "city": "Amsterdam",
            "country": "nl",
            "givenName": "Luke",
            "familyName": "Skywalker",
            "email": "luke@skywalker.com"
        },
        "lines": [
            {
                "resource": "orderline",
                "id": "odl_dgtxyl",
                "orderId": "ord_pbjz8x",
                "name": "LEGO 42083 Bugatti Chiron",
                "productUrl": "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
                "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$",
                "sku": "5702016116977",
                "type": "physical",
                "status": "canceled",
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
                    "self": {
                        "href": "https://api.mollie.com/v2/orders/ord_pbjz8x/orderlines/odl_dgtxyl",
                        "type": "application/hal+json"
                    }
                }
            },
            {
                "resource": "orderline",
                "id": "odl_jp31jz",
                "orderId": "ord_pbjz8x",
                "name": "LEGO 42056 Porsche 911 GT3 RS",
                "productUrl": "https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056",
                "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$",
                "sku": "5702015594028",
                "type": "physical",
                "status": "canceled",
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
                    "self": {
                        "href": "https://api.mollie.com/v2/orders/ord_pbjz8x/orderlines/odl_jp31jz",
                        "type": "application/hal+json"
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
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/orders-api/get-order",
                "type": "text/html"
            }
        }
    }
