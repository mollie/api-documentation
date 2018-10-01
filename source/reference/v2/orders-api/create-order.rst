Create order
============
.. api-name:: Orders API
   :version: 2

.. warning::
   This API is currently in private beta. If you are interested in participating, please contact your account manager at
   Mollie.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/orders

.. authentication::
   :api_keys: true
   :oauth: true

Using the Orders API is the preferred approach when integrating the Mollie API into e-commerce applications such as
webshops. If you want to use *pay after delivery* methods such as *Klarna Pay later*, using the Orders API is mandatory.

Creating an order will automatically create the required payment to allow your customer to pay for the order.

Once you have created an order, you should redirect your customer to the URL in the ``_links.checkout`` property from
the response.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``amount``

       .. type:: amount object
          :required: true

     - The total amount of the order, including VAT and discounts. This is the amount that will be charged to your
       customer.

       For example: ``{"currency":"EUR", "value":"100.00"}`` if the total order amount is €100.00.

       .. note::
          This has to match the sum of the ``lines.totalAmount`` amounts.

   * - ``orderNumber``

       .. type:: string
          :required: true

     - The order number. For example, ``16738``.

       We recommend that each order should have a unique order number.

   * - ``lines``

       .. type:: array
          :required: true

     - The lines in the order. Each line contains details such as a description of the item ordered, its price et
       cetera. See :ref:`order-lines-details` for the exact details on the lines.

   * - ``billingAddress``

       .. type:: address object
          :required: true

     - The billing person and address for the order. See :ref:`order-address-details` for the exact
       fields needed.

   * - ``shippingAddress``

       .. type:: address object
          :required: false

     - The shipping address for the order. See :ref:`order-address-details` for the exact fields
       needed. If omitted, it is assumed to be identical to the ``billingAddress``.

   * - ``consumerDateOfBirth``

       .. type:: date
          :required: false

     - The date of birth of your customer. Some payment methods need this value and if you have it, you should send it
       so that your customer does not have to enter it again later in the checkout process.

   * - ``redirectUrl``

       .. type:: string
          :required: true

     - The URL your customer will be redirected to after the payment process.

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - Set the webhook URL, where we will send :doc:`order status changes </orders/status-changes>` to.

       .. note:: The ``webhookUrl`` is optional, but without a webhook you will miss out on important
          :doc:`status changes </orders/status-changes>` to your order.

          The ``webhookUrl`` must be reachable from Mollie's point of view, so you cannot use ``localhost``. If
          you want to use webhook during development on ``localhost``, you must use a tool like
          `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks
          delivered to your local machine.

   * - ``locale``

       .. type:: string
          :required: true

     - Allows you to preset the language to be used in the hosted payment pages shown to the consumer. You can provide
       any ISO 15897 locale, but our hosted payment pages currently only support the following languages:

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

       .. note::
          For orders, the ``locale`` is a **required** parameter.

   * - ``method``

       .. type:: string
          :required: false

     - Normally, a payment method selection screen is shown. However, when using this parameter, your
       customer will skip the selection screen and will be sent directly to the chosen payment method. The parameter
       enables you to fully integrate the payment method selection into your website.

       Possible values: ``bancontact`` ``banktransfer`` ``belfius`` ``bitcoin`` ``creditcard`` ``directdebit`` ``eps``
       ``giftcard`` ``giropay`` ``ideal`` ``inghomepay`` ``kbc``  ``klarnapaylater`` ``klarnasliceit`` ``paypal``
       ``paysafecard`` ``sofort``

   * - ``payment``

       .. type:: object
          :required: false

     - Any payment specific properties can be passed here. See :ref:`payment-parameters` for the
       possible fields.

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, for example a string or a JSON object. We will save the data alongside the
       order. Whenever you fetch the order with our API, we'll also include the metadata. You can use up to
       approximately 1kB.

.. note::
   For orders, there is no ``description`` field. The description for any payments will be automatically created by
   Mollie and will contain the order number, your profile's name and your profile's website.

.. _order-lines-details:

Order line details
^^^^^^^^^^^^^^^^^^

The order lines contain the actual things that your customer bought.

.. list-table::
   :widths: auto

   * - ``type``

       .. type:: string
          :required: false

     - The type of product bought, for example, a physical or a digital product. Must be one of the following values:

       * ``physical`` (default)
       * ``discount``
       * ``digital``
       * ``shipping_fee``
       * ``store_credit``
       * ``gift_card``
       * ``surcharge``

       For information on the ``discount``, ``store_credit`` and ``gift_card`` types, see our guide on
       :doc:`handling discounts </orders/handling-discounts>`.

   * - ``name``

       .. type:: string
          :required: true

     - A description of the order line, for example *LEGO 4440 Forest Police Station*.

   * - ``quantity``

       .. type:: int
          :required: true

     - The number of items in the order line.

   * - ``unitPrice``

       .. type:: amount object
          :required: true

     - The price of a single item in the order line.

       For example: ``{"currency":"EUR", "value":"89.00"}`` if the box of LEGO costs €89.00 each.

   * - ``discountAmount``

       .. type:: amount object
          :required: false

     - Any :doc:`discounts applied </orders/handling-discounts>` to the order line. For example, if you have a
       two-for-one sale, you should pass the amount discounted as a positive amount.

       For example: ``{"currency":"EUR", "value":"10.00"}`` if you want to give a €10.00 discount on this order line.

   * - ``totalAmount``

       .. type:: amount object
          :required: true

     - The total amount of the line, including VAT and discounts. Adding all ``totalAmount`` values together should
       result in the same amount as the ``amount`` top level property.

       For example: ``{"currency":"EUR", "value":"168.00"}`` if the total amount of this order line is €168.00.

       The total amount should match the following formula: ``(unitPrice × quantity) - discountAmount``

   * - ``vatRate``

       .. type:: string
          :required: true

     - The VAT rate applied to the order line, for example ``"21.00"`` for 21%. The ``vatRate`` should be passed as a
       string and not as a float to ensure the correct number of decimals are passed.

   * - ``vatAmount``

       .. type:: amount object
          :required: true

     - The amount of value-added tax on the line. The ``totalAmount`` field includes VAT, so the ``vatAmount`` can be
       calculated with the formula ``totalAmount × (vatRate / (100 + vatRate))``.

       Any deviations from this will result in an error.

       For example, for a ``totalAmount`` of SEK100.00 with a 25.00% VAT rate you would get a VAT amount of ``100.00 ×
       (25 / 125)`` = SEK20.00. The amount should be passed as an amount object, so:
       ``{"currency":"SEK", "value":"20.00"}``.

   * - ``sku``

       .. type:: string
          :required: false

     - The SKU, EAN, ISBN or UPC of the product sold. The maximum character length is 64.

   * - ``imageUrl``

       .. type:: string
          :required: false

     - A link pointing to an image of the product sold.

   * - ``productUrl``

       .. type:: string
          :required: false

     - A link pointing to the product page in your web shop of the product sold.

.. note::
   All order lines must have the same currency as the order. You cannot mix currencies within a single order.

.. _order-address-details:

Order address details
^^^^^^^^^^^^^^^^^^^^^

In the Orders API, the address objects identify both the address and the person the order is billed or shipped to. At
least a valid address must be passed as well as fields identifying the person.

.. list-table::
   :widths: auto

   * - ``title``

       .. type:: string
          :required: false

     - The title of the person, for example *Mr.* or *Mrs.*.

   * - ``givenName``

       .. type:: string
          :required: true

     - The given name (first name) of the person.

   * - ``familyName``

       .. type:: string
          :required: true

     - The family name (surname) of the person.

   * - ``email``

       .. type:: string
          :required: true

     - The email address of the person.

   * - ``phone``

       .. type:: phone number
          :required: false

     - The phone number of the person. Some payment methods require this information. If you have it, you should pass it
       so that your customer does not have to enter it again in the checkout. Must be in the
       `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example ``+31208202070``.

   * - ``streetAndNumber`` ``streetAdditional`` ``postalCode`` ``city`` ``region`` ``country``

     - The other address fields. Please refer to the documentation of the :ref:`address object <address-object>` for
       more information on which inputs are accepted inputs.

.. _payment-parameters:

Payment specific parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating an order will automatically create a payment that your customer can use to pay for the order. Creation of the
payment can be controlled using the ``method`` and ``payment`` parameters.

The optional ``method`` parameter ensures that order can be paid for using a specific payment method. If the parameter
is omitted, your customer will be presented with a method selection screen and can check out using any of the available
payment methods on your website profile.

Optional parameters may be available for that payment method. If no method is specified, you can still send the optional
parameters and we will apply them when your customer selects the relevant payment method.

All payment specific parameters must be passed in the ``payment`` object. The following payment specific parameters can
be passed during order creation:

* ``payment.consumerAccount``
* ``payment.customerId``
* ``payment.customerReference``
* ``payment.dueDate``
* ``payment.issuer``
* ``payment.mandateId``
* ``payment.routing``
* ``payment.sequenceType``
* ``payment.voucherNumber``
* ``payment.voucherPin``

See the :ref:`payment-method-specific-parameters` for more information on these
parameters.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the only mandatory extra parameter is the
``profileId`` parameter. With it, you can specify which profile the payment belongs to. Organizations can have multiple
profiles for each of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more
information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The payment profile's unique identifier, for example ``pfl_3RkSN1zuPE``. This field is mandatory.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to make this order a test order.

   * - ``payment.applicationFee``

       .. type:: object
          :required: false

     - Adding an :doc:`application fee </oauth/application-fees>` allows you to charge the merchant a small sum for the
       payment and transfer this to your own account.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

An order object is returned, as described in :doc:`Get order </reference/v2/orders-api/get-order>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/orders \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d '{
            "amount": {
                "value": "1027.99",
                "currency": "EUR"
            },
            "billingAddress": {
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
            "shippingAddress": {
                "streetAndNumber": "Prinsengracht 313",
                "streetAdditional": "4th floor",
                "city": "Haarlem",
                "region": "Noord-Holland",
                "postalCode": "5678AB",
                "country": "NL",
                "title": "Mr",
                "givenName": "Chuck",
                "familyName": "Norris",
                "email": "norris@chucknorrisfacts.net"
            },
            "metadata": {
                "order_id": "1337",
                "description": "Lego cars"
            },
            "consumerDateOfBirth": "1958-01-31",
            "locale": "nl_NL",
            "orderNumber": "1337",
            "redirectUrl": "https://example.org/redirect",
            "webhookUrl": "https://example.org/webhook",
            "method": "klarnapaylater",
            "lines": [
                {
                    "type": "physical",
                    "sku": "5702016116977",
                    "name": "LEGO 42083 Bugatti Chiron",
                    "productUrl": "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
                    "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$",
                    "quantity": 2,
                    "vatRate": "21.00",
                    "unitPrice": {
                        "currency": "EUR",
                        "value": "399.00"
                    },
                    "totalAmount": {
                        "currency": "EUR",
                        "value": "698.00"
                    },
                    "discountAmount": {
                        "currency": "EUR",
                        "value": "100.00"
                    },
                    "vatAmount": {
                        "currency": "EUR",
                        "value": "121.14"
                    }
                },
                {
                    "type": "physical",
                    "sku": "5702015594028",
                    "name": "LEGO 42056 Porsche 911 GT3 RS",
                    "productUrl": "https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056",
                    "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$",
                    "quantity": 1,
                    "vatRate": "21.00",
                    "unitPrice": {
                        "currency": "EUR",
                        "value": "329.99"
                    },
                    "totalAmount": {
                        "currency": "EUR",
                        "value": "329.99"
                    },
                    "vatAmount": {
                        "currency": "EUR",
                        "value": "57.27"
                    }
                }
            ]
        }'

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

     <?php
     $mollie = new \Mollie\Api\MollieApiClient();
     $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

     $order = $mollie->orders->create([
       "amount" => [
         "value" => "1027.99",
         "currency" => "EUR"
       ],
       "billingAddress" => [
         "streetAndNumber" => "Keizersgracht 313",
         "city" => "Amsterdam",
         "region" => "Noord-Holland",
         "postalCode" => "1234AB",
         "country" => "NL",
         "title" => "Dhr.",
         "givenName" => "Piet",
         "familyName" => "Mondriaan",
         "email" => "piet@mondriaan.com",
         "phone" => "+31309202070",
       ],
       "shippingAddress" => [
         "streetAndNumber" => "Keizersgracht 313",
         "streetAdditional" => "4th floor",
         "city" => "Haarlem",
         "region" => "Noord-Holland",
         "postalCode" => "5678AB",
         "country" => "NL",
         "title" => "Mr.",
         "givenName" => "Chuck",
         "familyName" => "Norris",
         "email" => "norris@chucknorrisfacts.net",
       ],
       "metadata" => [
         "order_id" => "1337",
         "description" => "Lego cars"
       ],
       "consumerDateOfBirth" => "1958-01-31",
       "locale" => "nl_NL",
       "orderNumber" => "1337",
       "redirectUrl" => "https://example.org/redirect",
       "webhookUrl" => "https://example.org/webhook",
       "method" => "klarnapaylater",
       "lines" => [
         [
           "type" => "physical",
           "sku" => "5702016116977",
           "name" => "LEGO 42083 Bugatti Chiron",
           "productUrl" => "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
           "imageUrl" => 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
           "quantity" => 2,
           "vatRate" => "21.00",
           "unitPrice" => [
             "currency" => "EUR",
             "value" => "399.00"
           ],
           "totalAmount" => [
             "currency" => "EUR",
             "value" => "698.00"
           ],
           "discountAmount" => [
             "currency" => "EUR",
             "value" => "100.00"
           ],
           "vatAmount" => [
             "currency" => "EUR",
             "value" => "121.14"
           ]
         ],
         [
           "type" => "physical",
           "sku" => "5702015594028",
           "name" => "LEGO 42056 Porsche 911 GT3 RS",
           "productUrl" => "https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056",
           "imageUrl" => 'https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$',
           "quantity" => 1,
           "vatRate" => "21.00",
           "unitPrice" => [
             "currency" => "EUR",
             "value" => "329.99"
           ],
           "totalAmount" => [
             "currency" => "EUR",
             "value" => "329.99"
           ],
           "vatAmount" => [
             "currency" => "EUR",
             "value" => "57.27"
           ]
         ]
       ]
   ]);

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "order",
       "id": "ord_pbjz8x",
       "profileId": "pfl_URR55HPMGx",
       "method": "klarnapaylater",
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
       "status": "created",
       "isCancelable": true,
       "metadata": {
           "order_id": "1337",
           "description": "Lego cars"
       },
       "createdAt": "2018-08-02T09:29:56+00:00",
       "expiresAt": "2018-08-30T09:29:56+00:00",
       "mode": "test",
       "locale": "nl_NL",
       "orderNumber": "1337",
       "billingAddress": {
           "streetAndNumber": "Keizersgracht 313",
           "city": "Amsterdam",
           "region": "Noord-Holland",
           "postalCode": "1234AB",
           "country": "NL",
           "title": "Dhr.",
           "givenName": "Piet",
           "familyName": "Mondriaan",
           "email": "piet@mondriaan.com",
           "phone": "+31309202070"
       },
       "shippingAddress": {
           "streetAndNumber": "Keizersgracht 313",
           "streetAdditional": "4th floor",
           "city": "Haarlem",
           "region": "Noord-Holland",
           "postalCode": "5678AB",
           "country": "NL",
           "title": "Mr.",
           "givenName": "Chuck",
           "familyName": "Norris",
           "email": "norris@chucknorrisfacts.net",
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
               "status": "created",
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
               "createdAt": "2018-08-02T09:29:56+00:00"
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
               "status": "created",
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
               "quantityCanceled": 0,
               "amountCanceled": {
                   "value": "0.00",
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
               "createdAt": "2018-08-02T09:29:56+00:00"
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
