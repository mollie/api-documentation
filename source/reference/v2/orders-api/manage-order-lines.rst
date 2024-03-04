Manage order lines
==================
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/orders/*orderId*/lines

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Use this endpoint to update, cancel, or add one or more order lines. This endpoint sends a single authorisation
request that contains the final order lines and amount to the supplier.

.. note::
   You can only update order lines that are ``created``, ``pending``, or ``authorized``.

Example use case
----------------

Your customer placed an order that contains two order lines:

* Order line A contains two items and amounts to €100.00.
* Order line B contains a discount of 10% applicable to the items in order line A, which amounts to -€10.00.

This means the order amounts to €90.00.

You only have one item A left, and therefore contact your customer to find another solution. The customer opts
to replace one of order line A's items with item C. Item C costs €40.00, however, discount B doesn't apply to item C.

Using this endpoint, you can create a request to update the order lines.

* Update order line A's quantity to 1.
* Update order line B's total amount to -€5.00.
* Add order line C, with a total amount of €40.00.

The updated order amounts to €85.00.

.. note::
   When updating order lines for orders that used a pay after delivery method such as Klarna Pay Later, the supplier
   (Klarna) may decline the requested changes. This results in an error response from the Mollie API. The order initial remains intact without applying the requested changes.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example, ``ord_pbjz8x``.

Create a request with an array of ``operations``. Each operation must contain an ``operation`` field that indicates
its type and a ``data`` field that contains the operation's payload.

.. parameter:: operations
   :type: array object
   :condition: required

   List of operations to be processed.

   .. parameter:: operation
      :type: string
      :condition: required

      Operation type. Either ``add``, ``update``, or ``cancel``.

   .. parameter:: data
      :type: object
      :condition: required

      The data object that contains the order line's details for an ``update`` operation. The object should contain
      all fields that require changes and it must contain at least one parameter, even if all applicable fields are optional.

      .. parameter:: name
         :type: string
         :condition: optional

         A description of the order line, for example, *LEGO 4440 Forest Police Station*.

      .. parameter:: sku
         :type: string
         :condition: optional

         The SKU, EAN, ISBN, or UPC of the product sold. The maximum character length is 64.

      .. parameter:: imageUrl
         :type: string
         :condition: optional

         A link that points to an image of the product sold.

      .. parameter:: productUrl
         :type: string
         :condition: optional

         A link that points to the sold product's page in your webshop.

      .. parameter:: quantity
         :type: int
         :condition: conditional

         The number of items in the order line.

         This field is required when the request includes any of the following parameters: ``unitPrice``,
         ``discountAmount``, ``totalAmount``, ``vatAmount``, or ``vatRate``.

      .. parameter:: unitPrice
         :type: amount object
         :condition: conditional

         The price of a single item including VAT in the order line.

         For example, ``{"currency":"EUR", "value":"89.00"}`` if each box of LEGO costs €89.00.

         This can be a negative value if discounts apply, or zero for free items.

         This field is required when the request includes any of the following parameters: ``quantity``,
         ``discountAmount``, ``totalAmount``, ``vatAmount``, or ``vatRate``.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: discountAmount
         :type: amount object
         :condition: optional

         Any discount that applies to the order line. For example, if you want to apply a €10.00 discount:
         ``{"currency":"EUR", "value":"10.00"}``.

         The ``discountAmount`` must be a positive value, and is deducted from the
         ``(unitPrice × quantity)`` to calculate the ``totalAmount`` of an order line.

         See :doc:`Handling discounts </orders/handling-discounts>` for more information.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: vatRate
         :type: string
         :condition: conditional

         The value-added tax (VAT) percentage rate that applies to the order line. You must pass this value as a
         string instead of a float to ensure that the correct number of decimals are passed. For example, for 21%
         VAT: ``"21.00"``.

         This field is required when the request includes any of the following parameters: ``quantity``, ``unitPrice``,
         ``discountAmount``, ``totalAmount``, or ``vatAmount``.

      .. parameter:: vatAmount
         :type: amount object
         :condition: conditional

         The amount of value-added tax (VAT) that applies to the order line. The ``totalAmount`` field includes VAT,
         so you can calculate the ``vatAmount`` using the following formula: ``totalAmount × (vatRate / (100 + vatRate))``.

         For example, a ``totalAmount`` of SEK 100.00 with a 25.00% VAT rate results in SEK 20.00 VAT
         ``(100.00 × (25 / 125))``. You must pass the ``vatAmount`` as an amount object:
         ``{"currency":"SEK", "value":"20.00"}``.

         Deviations from this calculation result in an error.

         This field is required when the request includes any of the following parameters: ``quantity``, ``unitPrice``,
         ``discountAmount``, ``totalAmount``, or ``vatRate``.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: totalAmount
         :type: amount object
         :condition: conditional

         The total amount of the order line, including VAT and discounts. For example, if the total amount of an order
         line is €168.00: ``{"currency":"EUR", "value":"168.00"}``.

         The ``totalAmount`` should be the result of the following formula: ``(unitPrice × quantity) - discountAmount``.

         In addition, the ``amount`` top level property should be the sum of all ``totalAmount`` values.

         This field is required when the request includes any of the following parameters: ``quantity``, ``unitPrice``,
         ``discountAmount``, ``vatAmount``, or ``vatRate``.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: metadata
         :type: mixed
         :condition: optional

         An open field that you can use to provide any other data, for example, a string or a JSON object. The data you
         provide is saved with the order line. When you fetch it using the API, its metadata is included. You can attach up to approximately 1kB.

   .. parameter:: data
      :type: object
      :condition: required

      The data object that contains the order line's details for an ``add`` operation. The object should contain all
      fields that are required to create a new order line, which is the same as when you
      :doc:`create an order </reference/v2/orders-api/create-order>`.

      .. parameter:: type
         :type: string
         :condition: optional

         The type of product that was purchased.

         Possible values: ``physical``, ``discount``, ``digital``, ``shipping_fee``, ``store_credit``, ``gift_card``,
         or ``surcharge``.

         For more information about ``discount``, ``store_credit``, and ``gift_card types``, see
         :doc:`Handling discounts </orders/handling-discounts>`.

         To sell digitally delivered goods through PayPal, request PayPal to
         `enable this on your account <https://developer.paypal.com/docs/classic/express-checkout/digital-goods/IntroducingExpressCheckoutDG/>`_.

      .. parameter:: category
         :type: string
         :condition: optional

         The product category.

         Possible values: ``meal``, ``eco``, or ``gift``.

         If you want to accept voucher payments, at least one of your order lines must contain this field.

      .. parameter:: name
         :type: string
         :condition: required

         A description of the order line, for example, *LEGO 4440 Forest Police Station*.

      .. parameter:: sku
         :type: string
         :condition: optional

         The SKU, EAN, ISBN, or UPC of the product sold. The maximum character length is 64.

      .. parameter:: imageUrl
         :type: string
         :condition: optional

         A link that points to an image of the product sold.

      .. parameter:: productUrl
         :type: string
         :condition: optional

         A link that points to the sold product's page in your webshop.

      .. parameter:: quantity
         :type: int
         :condition: required

         The number of items in the order line.

      .. parameter:: unitPrice
         :type: amount object
         :condition: required

         The price of a single item including VAT in the order line.

         For example, ``{"currency":"EUR", "value":"89.00"}`` if each box of LEGO costs €89.00.

         This can be a negative value if discounts apply, or zero for free items.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: discountAmount
         :type: amount object
         :condition: optional

         Any discount that applies to the order line. For example, if you want to apply a €10.00 discount:
         ``{"currency":"EUR", "value":"10.00"}``.

         The ``discountAmount`` must be a positive value, and is deducted from the ``(unitPrice × quantity)``
         to calculate the ``totalAmount`` of an order line.

         See :doc:`Handling discounts </orders/handling-discounts>` for more information.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: vatRate
         :type: string
         :condition: required

         The value-added tax (VAT) percentage rate that applies to the order line. You must pass this value as a
         string instead of a float to ensure that the correct number of decimals are passed. For example, for 21% VAT: ``"21.00"``

      .. parameter:: vatAmount
         :type: amount object
         :condition: required

         The amount of value-added tax (VAT) that applies to the order line. The ``totalAmount`` field includes VAT,
         so you can calculate the ``vatAmount`` using the following formula: ``totalAmount × (vatRate / (100 + vatRate))``.

         For example, a ``totalAmount`` of SEK 100.00 with a 25.00% VAT rate results in SEK 20.00 VAT
         ``(100.00 × (25 / 125))``. You must pass the ``vatAmount`` as an amount object:
         ``{"currency":"SEK", "value":"20.00"}``.

         Deviations from this calculation result in an error.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: totalAmount
         :type: amount object
         :condition: required

         The total amount of the order line, including VAT and discounts. For example, if the total amount of an order
          line is €168.00: ``{"currency":"EUR", "value":"168.00"}``.

         The ``totalAmount`` should be the result of the following formula: ``(unitPrice × quantity) - discountAmount``.

         In addition, the ``amount`` top level property should be the sum of all ``totalAmount`` values.

         .. parameter:: currency
            :type: string

            The applicable `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string that contains the exact amount in the given currency.

      .. parameter:: metadata
         :type: mixed
         :condition: optional

         An open field that you can use to provide any other data, for example, a string or a JSON object. The data you
         provide is saved with the order line. When you fetch it using the API, its metadata is included. You can attach up to approximately 1kB.

   .. parameter:: data
      :type: object
      :condition: required

      The data object that contains the order line's details for a ``cancel`` operation. The object should specify the
      order line and the number of items or the amount that you want to cancel.

      .. parameter:: id
         :type: string
         :condition: required

         The API resource token of the order line, for example: ``odl_jp31jz``.

      .. parameter:: quantity
         :type: int
         :condition: optional

         The number of items in the order line that you want to cancel. This should be lower than or equal to the
         number of remaining items in a (partially shipped) order line.

         If the ``quantity`` is not specified in the request, the entire order line is canceled. For partially shipped
         order lines, all remaining items are canceled.

      .. parameter:: amount
         :type: amount object
         :condition: optional

         The amount that you want to cancel. In almost all cases, Mollie calculates the amount automatically.

         This field is only required when partially canceling an order line that has a ``discountAmount`` greater than 0.

         The maximum amount you can cancel is ``unit price x quantity to cancel``.

         The minimum amount depends on the discount applied to the order line, the quantity of items already shipped
         or canceled, the amounts already shipped or canceled, and the quantity that you want to cancel.

         If the ``amount`` is not specified in the request, Mollie automatically calculates the amount. In case it
         can't calculate the amount automatically, Mollie returns an error that contains the ``extra.minimumAmount`` and
         ``extra.maximumAmount`` properties, enabling you to choose the applicable amount.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
To use :doc:`organization access tokens </overview/authentication>` or to create an
:doc:`OAuth app </connect/overview>`, enable test mode using the testmode parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set ``testmode`` to ``true`` to update an order line that was created in test mode.

Response
--------
``200`` ``application/hal+json``

Returns an :doc:`order object </reference/v2/orders-api/get-order>`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X PATCH https://api.mollie.com/v2/orders/ord_pbjz8x/lines \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d '{
                "operations": [
                    {
                        "operation": "update",
                        "data": {
                            "id": "odl_1.1l9vx0",
                            "name": "New order line name"
                        }
                    },
                    {
                        "operation": "cancel",
                        "data": {
                            "id": "odl_1.4hqjw6"
                        }
                    },
                    {
                        "operation": "add",
                        "data": {
                            "name": "Adding new orderline",
                            "quantity": 2,
                            "sku": "12345679",
                            "totalAmount": {
                                "currency": "EUR",
                                "value": "30.00"
                            },
                            "type": "digital",
                            "unitPrice": {
                                "currency": "EUR",
                                "value": "15.00"
                            },
                            "vatAmount": {
                                "currency": "EUR",
                                "value": "0.00"
                            },
                            "vatRate": "0.00"
                        }
                    }
                ]
            }'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient;
      $mollie->setApiKey('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM');

      $addOrderLine = [
          "operation" => \Mollie\Api\Types\OrderLineUpdateOperationType::ADD,
          "data" => [
              "type" => \Mollie\Api\Types\OrderLineType::TYPE_DIGITAL,
              "name" => "Adding new orderline",
              "quantity" => 2,
              "sku" => "12345679",
              "totalAmount" => [
                  "currency" => "EUR",
                  "value" => "30.00",
              ],
              "unitPrice" => [
                  "currency" => "EUR",
                  "value" => "15.00",
              ],
              "vatAmount" => [
                  "currency" => "EUR",
                  "value" => "0.00",
              ],
              "vatRate" => "0.00",
          ],
      ];
      $updateOrderLine = [
          "operation" => \Mollie\Api\Types\OrderLineUpdateOperationType::UPDATE,
          "data" => [
              "id" => "odl_1.1l9vx0",
              "name" => "New order line name",
          ],
      ];
      $cancelOrderLine = [
          "operation" => \Mollie\Api\Types\OrderLineUpdateOperationType::CANCEL,
          "data" => [
              "id" => "odl_1.4hqjw6",
          ],
      ];

      $operations = [
          $addOrderLine,
          $updateOrderLine,
          $cancelOrderLine,
      ];

      $order = $mollie->orderLines->updateMultiple('ord_pbjz8x', $operations);

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
    "resource": "order",
    "id": "ord_pbjz8x",
    "profileId": "pfl_h7UgNeDGTA",
    "method": "klarnapaylater",
    "amount": {
        "value": "50.00",
        "currency": "EUR"
    },
    "status": "created",
    "isCancelable": true,
    "metadata": null,
    "createdAt": "2022-06-09T13:49:10+00:00",
    "expiresAt": "2022-07-07T13:49:10+00:00",
    "mode": "live",
    "locale": "en_US",
    "billingAddress": {
        "streetAndNumber": "Herengracht 1",
        "postalCode": "1052CB",
        "city": "Amsterdam",
        "country": "NL",
        "givenName": "mollie",
        "familyName": "test",
        "email": "test@test.com"
    },
    "shopperCountryMustMatchBillingCountry": false,
    "orderNumber": "1",
    "redirectUrl": "https://api.platform.mollielabs.net",
    "webhookUrl": "https://api.platform.mollielabs.net",
    "lines": [
        {
            "resource": "orderline",
            "id": "odl_1.1l9vx0",
            "orderId": "ord_pbjz8x",
            "name": "New orderline name",
            "sku": "123456",
            "type": "digital",
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
                "value": "10.00",
                "currency": "EUR"
            },
            "vatRate": "0.00",
            "vatAmount": {
                "value": "0.00",
                "currency": "EUR"
            },
            "totalAmount": {
                "value": "20.00",
                "currency": "EUR"
            },
            "createdAt": "2022-06-09T13:49:10+00:00"
        },
        {
            "resource": "orderline",
            "id": "odl_1.4hqjw6",
            "orderId": "ord_pbjz8x",
            "name": "A cancelled orderline",
            "sku": "1234444",
            "type": "digital",
            "status": "canceled",
            "metadata": null,
            "isCancelable": true,
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
                "value": "5.00",
                "currency": "EUR"
            },
            "shippableQuantity": 0,
            "refundableQuantity": 0,
            "cancelableQuantity": 0,
            "unitPrice": {
                "value": "5.00",
                "currency": "EUR"
            },
            "vatRate": "0.00",
            "vatAmount": {
                "value": "0.00",
                "currency": "EUR"
            },
            "totalAmount": {
                "value": "5.00",
                "currency": "EUR"
            },
            "createdAt": "2022-06-10T11:05:21+00:00"
        },
        {
            "resource": "orderline",
            "id": "odl_1.3ccpk8",
            "orderId": "ord_pbjz8x",
            "name": "Adding new orderline",
            "sku": "12345679",
            "type": "digital",
            "status": "created",
            "metadata": null,
            "isCancelable": true,
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
                "value": "15.00",
                "currency": "EUR"
            },
            "vatRate": "0.00",
            "vatAmount": {
                "value": "0.00",
                "currency": "EUR"
            },
            "totalAmount": {
                "value": "30.00",
                "currency": "EUR"
            },
            "createdAt": "2022-06-10T11:16:49+00:00"
        }
    ],
    "_links": {
        "self": {
            "href": "https://api.mollie.com/v2/orders/ord_xvb27g",
            "type": "application/hal+json"
        },
        "dashboard": {
            "href": "https://www.mollie.com/dashboard/org_2816091/orders/ord_xvb27g",
            "type": "text/html"
        },
        "checkout": {
            "href": "https://www.mollie.com/checkout/order/xvb27g",
            "type": "text/html"
        },
        "documentation": {
            "href": "https://docs.mollie.com/reference/v2/orders-api/get-order",
            "type": "text/html"
        }
    }
   }
