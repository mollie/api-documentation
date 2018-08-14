Get order
=========
.. api-name:: Orders API
   :version: 2

.. warning::
   This API is currently in private beta. If you are interested in participating, please contact your account manager at
   Mollie.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/orders/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a single order by its ID.

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

     - Set this to ``true`` to retrieve a test mode order.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains an order object. Will always contain ``order`` for this endpoint.

   * - ``id``

       .. type:: string

     - The order's unique identifier, for example ``ord_vsKJpSsabw``.

   * - ``profileId``

       .. type:: string

     - The profile the order was created on, for example ``pfl_v9hTwCvYqw``.

   * - ``mode``

       .. type:: string

     - The mode used to create this order.

       Possible values: ``live`` ``test``

   * - ``amount``

       .. type:: amount object

     - The total amount of the order, including VAT and discounts.

   * - ``amountCaptured``

       .. type:: amount object

     - The amount captured, thus far. The captured amount will be settled to your account.

       For orders that have the status ``authorized``, you must
       :doc:`ship the order </reference/v2/shipments-api/create-shipment>` to ensure the order amount gets captured.

   * - ``amountRefunded``

       .. type:: amount object

     - The total amount refunded, thus far.

   * - ``status``

       .. type:: string

     - The status of the order. One of the following values:

       * ``created``
       * ``paid``
       * ``authorized``
       * ``canceled``
       * ``refunded``
       * ``shipping``
       * ``completed``
       * ``void``

       See Order status changes for details on the orders' statuses.

   * - ``billingAddress``

       .. type:: object

     - The person and the address the order is billed to. See below.

   * - ``consumerDateOfBirth``

       .. type:: date
          :required: false

     - The date of birth of your customer, if available.

   * - ``orderNumber``

       .. type:: string

     - Your order number that was used when creating the order.

   * - ``shippingAddress``

       .. type:: object

     - The person and the address the order is billed to. See below.

   * - ``locale``

       .. type:: string

     - The locale used during checkout. Note that the locale may have been changed by your customer during checkout.

       Can be any ISO 15897 locale. Example values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT``
       ``de_CH`` ``es_ES`` ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU``
       ``pl_PL`` ``lv_LV`` ``lt_LT``.

   * - ``metadata``

       .. type:: mixed

     - Data provided during the order creation.

   * - ``createdAt``

       .. type:: datetime

     - The order's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the customer. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the customer itself.

          * - ``checkout``

              .. type:: URL object

            - The URL your customer should visit to make the payment for the order. This is where you should redirect
              the customer to after creating the order.

              .. note :: You should use HTTP ``GET`` for the redirect to the checkout URL. Using HTTP ``POST`` for
                         redirection will cause issues with some payment methods or iDEAL issuers. Use HTTP status code
                         ``303 See Other`` to force an HTTP ``GET`` redirect.

              Orders with recurring payments don't have a checkout URL.

          * - ``documentation``

              .. type:: URL object

            - The URL to the order retrieval endpoint documentation.

Order line details
^^^^^^^^^^^^^^^^^^

The order lines contain the actual things the your customer bought.

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Always ``orderline``.

   * - ``orderId``

       .. type:: string

     - The ID of the order the line belongs too, for example ``ord_kEn1PlbGa``.

   * - ``type``

       .. type:: string

     - The type of product bought, for example, a physical or a digital product. Will be one of the following values:

       * ``physical``
       * ``discount``
       * ``digital``
       * ``shipping_fee``
       * ``store_credit``
       * ``gift_card``
       * ``surcharge``

   * - ``name``

       .. type:: string

     - A description of the order line, for example *LEGO 4440 Forest Police Station*.

   * - ``status``

       .. type:: string

     - Status of the order line. One of the following values:

       * ``created``
       * ``authorized``
       * ``paid``
       * ``canceled``
       * ``refunded``
       * ``shipped``
       * ``void``

   * - ``quantity``

       .. type:: int

     - The number of items in the order line.

   * - ``unitPrice``

       .. type:: amount object

     - The price of a single item in the order line.

   * - ``discountAmount``

       .. type:: amount object
          :required: false

     - Any discounts applied to the order line.

   * - ``totalAmount``

       .. type:: amount object

     - The total amount of the line, including VAT and discounts.

   * - ``vatRate``

       .. type:: string

     - The VAT rate applied to the order line, for example ``"21.00"`` for 21%. The ``vatRate`` is passed as a string
       and not as a float to ensure the correct number of decimals are passed.

   * - ``vatAmount``

       .. type:: amount object

     - The amount of value-added tax on the line.

   * - ``sku``

       .. type:: string
          :required: false

     - The SKU, EAN, ISBN or UPC of the product sold.

   * - ``imageUrl``

       .. type:: string
          :required: false

     - A link pointing to an image of the product sold.

   * - ``productUrl``

       .. type:: string
          :required: false

     - A link pointing to the product page in your web shop of the product sold.

   * - ``createdAt``

       .. type:: datetime

     - The order line's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

Addresses
^^^^^^^^^

In the Orders API, the address objects identify both the address and the person the order is billed or shipped to.

These properties can be found in the ``billingAddress`` and ``shippingAddress`` address objects.

.. list-table::
   :widths: auto

   * - ``title``

       .. type:: string
          :required: false

     - The title of the person.

   * - ``givenName``

       .. type:: string

     - The given name (first name) of the person.

   * - ``familyName``

       .. type:: string

     - The family name (surname) of the person.

   * - ``email``

       .. type:: string

     - The email address of the person.

   * - ``phone``

       .. type:: phone number
          :required: false

     - The phone number of the person. Will be in the `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example
       ``+31208202070``.

   * - ``streetAndNumber`` ``streetAdditional`` ``postalCode`` ``city`` ``region`` ``country``

       .. type:: string

     - See :ref:`address-object` for details on these fields.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/orders/ord_kEn1PlbGa \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

.. _get-order-response:

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
        "resource": "order",
        "id": "ord_pbjz8x",
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
        "status": "created",
        "metadata": null,
        "createdAt": "2018-08-02T09:29:56+00:00",
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
                "status": "created",
                "quantity": 2,
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
                "createdAt": "2018-08-02T09:29:56+00:00"
            }
        ],
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/orders/ord_pbjz8x",
                "type": "application/hal+json"
            },
            "checkout": {
                "href": "https://www.mollie.com/payscreen/select-method/7UhSN1zuXS",
                "type": "text/html"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/orders-api/get-order",
                "type": "text/html"
            }
        }
    }

