Get order
=========
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/orders/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single order by its ID.

Parameters
----------
Replace ``id`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the ``testmode`` query string parameter is also available.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to retrieve a test mode order.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint also allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payments`` Include all :doc:`payments </reference/v2/payments-api/overview>` created for the order.
* ``refunds`` Include all :doc:`refunds </reference/v2/refunds-api/overview>` created for the order.
* ``shipments`` Include all :doc:`shipments </reference/v2/shipments-api/overview>` created for the order.

You can combine multiple embeds and add the includes of the embeds as well, for example:
``embed=payments.details.remainderDetails``

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains an order object. Will always contain ``order`` for this endpoint.

.. parameter:: id
   :type: string

   The order's unique identifier, for example ``ord_vsKJpSsabw``.

.. parameter:: profileId
   :type: string

   The profile the order was created on, for example ``pfl_v9hTwCvYqw``.

.. parameter:: lines
   :type: array

   An array of order line objects. Each object will have the properties listed below.

   .. parameter:: resource
      :type: string

      Always ``orderline``.

   .. parameter:: id
      :type: string

      The order line's unique identifier, for example ``odl_dgtxyl``.

   .. parameter:: orderId
      :type: string

      The ID of the order the line belongs too, for example ``ord_kEn1PlbGa``.

   .. parameter:: type
      :type: string

      The type of product bought, for example, a physical or a digital product.

      Possible values: ``physical`` ``discount`` ``digital`` ``shipping_fee`` ``store_credit`` ``gift_card``
      ``surcharge``

   .. parameter:: name
      :type: string

      A description of the order line, for example *LEGO 4440 Forest Police Station*.

   .. parameter:: status
      :type: string

      Status of the order line.

      Possible values: ``created`` ``authorized`` ``paid`` ``shipping`` ``canceled`` ``completed``

   .. parameter:: isCancelable
      :type: boolean

      Whether or not the order line can be (partially) canceled.

   .. parameter:: quantity
      :type: int

      The number of items in the order line.

   .. parameter:: quantityShipped
      :type: int

      The number of items that are shipped for this order line.

   .. parameter:: amountShipped
      :type: amount object

      The total amount that is shipped for this order line.

   .. parameter:: quantityRefunded
      :type: int

      The number of items that are refunded for this order line.

   .. parameter:: amountRefunded
      :type: amount object

      The total amount that is refunded for this order line.

   .. parameter:: quantityCanceled
      :type: int

      The number of items that are canceled in this order line.

   .. parameter:: amountCanceled
      :type: amount object

      The total amount that is canceled in this order line.

   .. parameter:: shippableQuantity
      :type: int

      The number of items that can still be shipped for this order line.

   .. parameter:: refundableQuantity
      :type: int

      The number of items that can still be refunded for this order line.

   .. parameter:: cancelableQuantity
      :type: int

      The number of items that can still be canceled for this order line.

   .. parameter:: unitPrice
      :type: amount object

      The price of a single item including VAT in the order line.

   .. parameter:: discountAmount
      :type: amount object
      :condition: optional

      Any discounts applied to the order line.

   .. parameter:: totalAmount
      :type: amount object

      The total amount of the line, including VAT and discounts.

   .. parameter:: vatRate
      :type: string

      The VAT rate applied to the order line, for example ``"21.00"`` for 21%. The ``vatRate`` is passed as a string and
      not as a float to ensure the correct number of decimals are passed.

   .. parameter:: vatAmount
      :type: amount object

      The amount of value-added tax on the line.

   .. parameter:: sku
      :type: string
      :condition: optional

      The SKU, EAN, ISBN or UPC of the product sold.

   .. parameter:: createdAt
      :type: datetime

      The order line's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   .. parameter:: _links
      :type: object

      An object with several URL objects relevant to the order line. Every URL object will contain an ``href`` and a
      ``type`` field.

      .. parameter:: productUrl
         :type: string
         :condition: optional

         A link pointing to the product page in your web shop of the product sold.

      .. parameter:: imageUrl
         :type: string
         :condition: optional

         A link pointing to an image of the product sold.

.. parameter:: method
   :type: string

   The payment method last used when paying for the order.

.. parameter:: mode
   :type: string

   The mode used to create this order.

   Possible values: ``live`` ``test``

.. parameter:: amount
   :type: amount object

   The total amount of the order, including VAT and discounts.

.. parameter:: amountCaptured
   :type: amount object
   :condition: optional

   The amount captured, thus far. The captured amount will be settled to your account.

   For orders that have the status ``authorized``, you must
   :doc:`ship the order </reference/v2/shipments-api/create-shipment>` to ensure the order amount gets captured.

.. parameter:: amountRefunded
   :type: amount object
   :condition: optional

   The total amount refunded, thus far.

.. parameter:: status
   :type: string

   The status of the order.

   Possible values: ``created`` ``paid`` ``authorized`` ``canceled`` ``shipping`` ``completed`` ``expired``

   See :doc:`Order status changes </orders/status-changes>` for details on the orders' statuses.

.. parameter:: isCancelable
   :type: boolean

   Whether or not the order can be (partially) canceled.

.. parameter:: billingAddress
   :type: address object

   The person and the address the order is billed to.

   Please refer to the documentation of the :ref:`address object <address-object>` for more information on which formats
   are accepted.

   .. parameter:: organizationName
      :type: string

   .. parameter:: title
      :type: string

   .. parameter:: givenName
      :type: string

   .. parameter:: familyName
      :type: string

   .. parameter:: email
      :type: string

   .. parameter:: phone
      :type: phone number

   .. parameter:: streetAndNumber
      :type: string

   .. parameter:: streetAdditional
      :type: string

   .. parameter:: postalCode
      :type: string

   .. parameter:: city
      :type: string

   .. parameter:: region
      :type: string

   .. parameter:: country
      :type: string

.. parameter:: shopperCountryMustMatchBillingCountry
   :type: boolean

   If set to true during order creation, we restrict the payment methods available to your customer to methods from the
   billing country only.

.. parameter:: consumerDateOfBirth
   :type: date
   :condition: optional

   The date of birth of your customer, if available.

.. parameter:: orderNumber
   :type: string

   Your order number that was used when creating the order.

.. parameter:: shippingAddress
   :type: address object

   The person and the address the order is billed to.

   Please refer to the documentation of the :ref:`address object <address-object>` for more information on which formats
   are accepted.

   .. parameter:: organizationName
      :type: string

   .. parameter:: title
      :type: string

   .. parameter:: givenName
      :type: string

   .. parameter:: familyName
      :type: string

   .. parameter:: email
      :type: string

   .. parameter:: phone
      :type: phone number

   .. parameter:: streetAndNumber
      :type: string

   .. parameter:: streetAdditional
      :type: string

   .. parameter:: postalCode
      :type: string

   .. parameter:: city
      :type: string

   .. parameter:: region
      :type: string

   .. parameter:: country
      :type: string

.. parameter:: locale
   :type: string

   The locale used during checkout. Note that the locale may have been changed by your customer during checkout.

   Can be any ``xx_XX`` format ISO 15897 locale. Example values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE``
   ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES`` ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK``
   ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

.. parameter:: metadata
   :type: mixed

   Data provided during the order creation.

.. parameter:: redirectUrl
   :type: string

   The URL your customer will be redirected to after completing or canceling the payment process.

   .. note:: The URL will be ``null`` for recurring orders.

.. parameter:: webhookUrl
   :type: string
   :condition: optional

   The URL Mollie will call as soon an important status change on the order takes place.

.. parameter:: createdAt
   :type: datetime

   The order's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: expiresAt
   :type: datetime
   :condition: optional

   The date and time the order will expire, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This should
   be the final date for you to fully ship the order.

   For some payment methods, such as *Klarna Pay later* this means that you will lose the authorization and not be
   settled for the amounts of the unshipped order lines.

   The expiry period for orders is 28 days.

.. parameter:: expiredAt
   :type: datetime
   :condition: optional

   If the order is expired, the time of expiration will be present in
   `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: paidAt
   :type: datetime
   :condition: optional

   If the order has been paid, the time of payment will be present in
   `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: authorizedAt
   :type: datetime
   :condition: optional

   If the order has been authorized, the time of authorization will be present in
   `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: canceledAt
   :type: datetime
   :condition: optional

   If the order has been canceled, the time of cancellation will be present in
   `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: completedAt
   :type: datetime
   :condition: optional

   If the order is completed, the time of completion will be present in
   `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: _embedded
   :type: object
   :condition: optional
   :collapse-children: false

   An object with the requested embedded resources, such as payments, that belong to this order.

   .. parameter:: payments
      :type: Payment object
      :condition: optional

      An array of embedded payments.

   .. parameter:: refunds
      :type: Refund object
      :condition: optional

      An array of embedded refunds.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the order. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the order itself.

   .. parameter:: checkout
      :type: URL object
      :condition: optional

      The URL your customer should visit to make the payment for the order. This is where you should redirect the
      customer to after creating the order.

      As long as order is still in the ``created`` state, this link can be used by your customer to pay for this order.
      You can safely share this URL with your customer.

      The URL can also be retrieved and copied from the Mollie Dashboard.

      .. note:: You should use HTTP ``GET`` for the redirect to the checkout URL. Using HTTP ``POST`` for redirection
         will cause issues with some payment methods or iDEAL issuers. Use HTTP status code ``303 See Other`` to force
         an HTTP ``GET`` redirect.

         Recurring, authorized, paid and finalized orders do not have a checkout URL.

   .. parameter:: dashboard
      :type: URL object

      Direct link to the order in the Mollie Dashboard.

   .. parameter:: documentation
      :type: URL object

      The URL to the order retrieval endpoint documentation.

Example
^^^^^^^
.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/orders/ord_kEn1PlbGa?embed=payments,refunds \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $order = $mollie->orders->get("ord_kEn1PlbGa", ["embed" => "payments,refunds"]);

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_stTC2WHAuS')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      order = Mollie::Order.get('ord_stTC2WHAuS')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const order = await mollieClient.orders.get('ord_stTC2WHAuS');

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
            "postalCode": "1015 CW",
            "city": "Amsterdam",
            "country": "nl",
            "givenName": "Luke",
            "familyName": "Skywalker",
            "email": "luke@skywalker.com"
        },
        "shopperCountryMustMatchBillingCountry": false,
        "consumerDateOfBirth": "1993-10-21",
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
        "_embedded": {
            "payments": [
                {
                    "resource": "payment",
                    "id": "tr_ncaPcAhuUV",
                    "mode": "live",
                    "createdAt": "2018-09-07T12:00:05+00:00",
                    "amount": {
                        "value": "1027.99",
                        "currency": "EUR"
                    },
                    "description": "Order #1337 (Lego cars)",
                    "method": null,
                    "metadata": null,
                    "status": "open",
                    "isCancelable": false,
                    "locale": "nl_NL",
                    "profileId": "pfl_URR55HPMGx",
                    "orderId": "ord_kEn1PlbGa",
                    "sequenceType": "oneoff",
                    "redirectUrl": "https://example.org/redirect",
                    "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/payments/tr_ncaPcAhuUV",
                            "type": "application/hal+json"
                        },
                        "checkout": {
                            "href": "https://www.mollie.com/payscreen/select-method/ncaPcAhuUV",
                            "type": "text/html"
                        },
                        "dashboard": {
                            "href": "https://www.mollie.com/dashboard/org_123456789/payments/tr_ncaPcAhuUV",
                            "type": "text/html"
                        },
                        "order": {
                            "href": "https://api.mollie.com/v2/orders/ord_kEn1PlbGa",
                            "type": "application/hal+json"
                        }
                    }
                }
            ],
            "refunds": [
                {
                    "resource": "refund",
                    "id": "re_vD3Jm32wQt",
                    "amount": {
                        "value": "329.99",
                        "currency": "EUR"
                    },
                    "status": "pending",
                    "createdAt": "2019-01-15T15:41:21+00:00",
                    "description": "Required quantity not in stock, refunding one photo book.",
                    "orderId": "ord_kEn1PlbGa",
                    "paymentId": "tr_mjvPwykz3x",
                    "settlementAmount": {
                        "value": "-329.99",
                        "currency": "EUR"
                    },
                    "lines": [
                        {
                            "resource": "orderline",
                            "id": "odl_dgtxyl",
                            "orderId": "ord_kEn1PlbGa",
                            "name": "LEGO 42056 Porsche 911 GT3 RS",
                            "sku": "5702015594028",
                            "type": "physical",
                            "status": "completed",
                            "isCancelable": false,
                            "quantity": 1,
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
                            "createdAt": "2019-01-15T15:22:45+00:00",
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
                            "href": "https://api.mollie.com/v2/payments/tr_mjvPwykz3x/refunds/re_vD3Jm32wQt",
                            "type": "application/hal+json"
                        },
                        "payment": {
                            "href": "https://api.mollie.com/v2/payments/tr_mjvPwykz3x",
                            "type": "application/hal+json"
                        },
                        "order": {
                            "href": "https://api.mollie.com/v2/orders/ord_kEn1PlbGa",
                            "type": "application/hal+json"
                        }
                    }
                }
            ]
        },
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

