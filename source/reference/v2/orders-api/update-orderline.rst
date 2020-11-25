Update order line
=================
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/orders/*orderId*/lines/*orderlineId*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

This endpoint can be used to update an order line. Only the lines that belong to an order with status ``created``,
``pending`` or ``authorized`` can be updated.

Use cases for this endpoint could be updating the ``name``, ``productUrl``, ``imageUrl``, and ``metadata`` for a
certain order line because your customer wants to swap the item for a different variant, for example exchanging
a blue skirt for the same skirt in red.

Or update the ``quantity``, ``unitPrice``, ``discountAmount``, ``totalAmount``, ``vatAmount`` and ``vatRate`` if you
want to substitute a product for an entirely different one.

Alternatively, you can also (partially) :doc:`cancel order lines </reference/v2/orders-api/cancel-order-lines>` instead
of updating the quantity.

When updating an order line that uses a *pay after delivery* method such as *Klarna Pay later*,
Klarna may decline the requested changes, resulting in an error response from the Mollie API.
The order remains intact, though the requested changes are not persisted.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_pbjz8x``. And replace the
``orderlineId`` in the URL by the order line ID, for example ``odl_dgtxyl``

Please note that even though all parameters are optional, at least one of them needs to be provided
in the request.

.. list-table::
   :widths: auto

   * - ``name``

       .. type:: string
          :required: false

     - A description of the order line, for example *LEGO 4440 Forest Police Station*.

   * - ``imageUrl``

       .. type:: string
          :required: false

     - A link pointing to an image of the product sold.

   * - ``productUrl``

       .. type:: string
          :required: false

     - A link pointing to the product page in your web shop of the product sold.

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, for example a string or a JSON object. We will save the data
       alongside the order line. Whenever you fetch the order with our API, we’ll also include
       the metadata. You can use up to approximately 1kB.

   * - ``quantity``

       .. type:: int
          :required: false

     - The number of items in the order line.

       .. note::
          This field is required when ``unitPrice``, ``discountAmount``, ``totalAmount``, ``vatAmount`` or ``vatRate``
          is also provided in the request.

   * - ``unitPrice``

       .. type:: amount object
          :required: false

     - The price of a single item including VAT in the order line.

       For example: ``{"currency":"EUR", "value":"89.00"}`` if the box of LEGO costs €89.00 each.

       Can be negative in case of discounts, or zero in case of a free item.

       .. note::
          This field is required when ``quantity``, ``discountAmount``, ``totalAmount``, ``vatAmount`` or ``vatRate``
          is also provided in the request.

   * - ``discountAmount``

       .. type:: amount object
          :required: false

     - Any :doc:`discounts applied </orders/handling-discounts>` to the order line. For example, if you have a
       two-for-one sale, you should pass the amount discounted as a positive amount.

       For example: ``{"currency":"EUR", "value":"10.00"}`` if you want to give a €10.00 discount on this order line.

   * - ``totalAmount``

       .. type:: amount object
          :required: false

     - The total amount of the line, including VAT and discounts. Adding all ``totalAmount`` values together should
       result in the same amount as the ``amount`` top level property.

       For example: ``{"currency":"EUR", "value":"168.00"}`` if the total amount of this order line is €168.00.

       The total amount should match the following formula: ``(unitPrice × quantity) - discountAmount``

       .. note::
          This field is required when ``quantity``, ``unitPrice``, ``discountAmount``, ``vatAmount`` or ``vatRate``
          is also provided in the request.

   * - ``vatAmount``

       .. type:: amount object
          :required: false

     - The amount of value-added tax on the line. The ``totalAmount`` field includes VAT, so the ``vatAmount`` can be
       calculated with the formula ``totalAmount × (vatRate / (100 + vatRate))``.

       Any deviations from this will result in an error.

       For example, for a ``totalAmount`` of SEK100.00 with a 25.00% VAT rate you would get a VAT amount of ``100.00 ×
       (25 / 125)`` = SEK20.00. The amount should be passed as an amount object, so:
       ``{"currency":"SEK", "value":"20.00"}``.

       .. note::
          This field is required when ``quantity``, ``unitPrice``, ``discountAmount``, ``totalAmount`` or ``vatRate``
          is also provided in the request.

   * - ``vatRate``

       .. type:: string
          :required: false

     - The VAT rate applied to the order line, for example ``"21.00"`` for 21%. The ``vatRate`` should be passed as a
       string and not as a float to ensure the correct number of decimals are passed.

       .. note::
          This field is required when ``quantity``, ``unitPrice``, ``discountAmount``, ``totalAmount`` or ``vatAmount``
          is also provided in the request.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a test mode order line.

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

      curl -X PATCH https://api.mollie.com/v2/orders/ord_pbjz8x/lines/odl_dgtxyl \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d '{
               "name": "LEGO 71043 Hogwarts™ Castle",
               "productUrl": "https://shop.lego.com/en-GB/product/Hogwarts-Castle-71043",
               "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/71043_alt1?$main$",
               "quantity": 2,
               "vatRate": "21.00",
               "unitPrice": {
                  "currency": "EUR",
                  "value": "349.00"
               },
               "totalAmount": {
                  "currency": "EUR",
                  "value": "598.00"
               },
               "discountAmount": {
                  "currency": "EUR",
                  "value": "100.00"
               },
               "vatAmount": {
                  "currency": "EUR",
                  "value": "103.79"
               }
         }'

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const order = await mollieClient.orders_lines.update('odl_dgtxyl', {
          orderId: 'ord_pbjz8x',
          name: 'LEGO 71043 Hogwarts™ Castle',
          productUrl: 'https://shop.lego.com/en-GB/product/Hogwarts-Castle-71043',
          imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/71043_alt1?$main$',
        });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
      "resource":"order",
      "id":"ord_pbjz8x",
      "profileId":"pfl_URR55HPMGx",
      "method":"ideal",
      "amount":{
         "value":"927.99",
         "currency":"EUR"
      },
      "status":"created",
      "isCancelable":true,
      "metadata":null,
      "createdAt":"2018-08-02T09:29:56+00:00",
      "expiresAt":"2018-08-30T09:29:56+00:00",
      "mode":"live",
      "locale":"nl_NL",
      "billingAddress":{
         "organizationName":"Mollie B.V.",
         "streetAndNumber":"Keizersgracht 313",
         "city":"Amsterdam",
         "region":"Noord-Holland",
         "postalCode":"1234AB",
         "country":"NL",
         "title":"Dhr",
         "givenName":"Piet",
         "familyName":"Mondriaan",
         "email":"piet@mondriaan.com",
         "phone":"+31208202070"
      },
      "orderNumber":"18475",
      "shippingAddress":{
         "organizationName":"Mollie B.V.",
         "streetAndNumber":"Keizersgracht 313",
         "postalCode":"1016 EE",
         "city":"Amsterdam",
         "country":"nl",
         "givenName":"Luke",
         "familyName":"Skywalker",
         "email":"luke@skywalker.com"
      },
      "redirectUrl":"https://example.org/redirect",
      "lines":[
         {
            "resource":"orderline",
            "id":"odl_dgtxyl",
            "orderId":"ord_pbjz8x",
            "name":"LEGO 71043 Hogwarts™ Castle",
            "sku":"5702016116977",
            "type":"physical",
            "status":"created",
            "metadata":null,
            "isCancelable":false,
            "quantity":2,
            "quantityShipped":0,
            "amountShipped":{
               "value":"0.00",
               "currency":"EUR"
            },
            "quantityRefunded":0,
            "amountRefunded":{
               "value":"0.00",
               "currency":"EUR"
            },
            "quantityCanceled":0,
            "amountCanceled":{
               "value":"0.00",
               "currency":"EUR"
            },
            "shippableQuantity":0,
            "refundableQuantity":0,
            "cancelableQuantity":0,
            "unitPrice":{
               "currency":"EUR",
               "value":"349.00"
            },
            "totalAmount":{
               "currency":"EUR",
               "value":"598.00"
            },
            "discountAmount":{
               "currency":"EUR",
               "value":"100.00"
            },
            "vatAmount":{
               "currency":"EUR",
               "value":"103.79"
            },
            "createdAt":"2018-08-02T09:29:56+00:00",
            "_links":{
               "productUrl":{
                  "href":"https://shop.lego.com/en-GB/product/Hogwarts-Castle-71043",
                  "type":"text/html"
               },
               "imageUrl":{
                  "href":"https://sh-s7-live-s.legocdn.com/is/image//LEGO/71043_alt1?$main$",
                  "type":"text/html"
               }
            }
         },
         {
            "resource":"orderline",
            "id":"odl_jp31jz",
            "orderId":"ord_pbjz8x",
            "name":"LEGO 42056 Porsche 911 GT3 RS",
            "sku":"5702015594028",
            "type":"physical",
            "status":"created",
            "metadata":null,
            "isCancelable":false,
            "quantity":1,
            "quantityShipped":0,
            "amountShipped":{
               "value":"0.00",
               "currency":"EUR"
            },
            "quantityRefunded":0,
            "amountRefunded":{
               "value":"0.00",
               "currency":"EUR"
            },
            "quantityCanceled":0,
            "amountCanceled":{
               "value":"0.00",
               "currency":"EUR"
            },
            "shippableQuantity":0,
            "refundableQuantity":0,
            "cancelableQuantity":0,
            "unitPrice":{
               "value":"329.99",
               "currency":"EUR"
            },
            "vatRate":"21.00",
            "vatAmount":{
               "value":"57.27",
               "currency":"EUR"
            },
            "totalAmount":{
               "value":"329.99",
               "currency":"EUR"
            },
            "createdAt":"2018-08-02T09:29:56+00:00",
            "_links":{
               "productUrl":{
                  "href":"https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056",
                  "type":"text/html"
               },
               "imageUrl":{
                  "href":"https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$",
                  "type":"text/html"
               }
            }
         }
      ],
      "_links":{
         "self":{
            "href":"https://api.mollie.com/v2/orders/ord_pbjz8x",
            "type":"application/hal+json"
         },
         "checkout":{
            "href":"https://www.mollie.com/payscreen/order/checkout/pbjz8x",
            "type":"text/html"
         },
         "dashboard": {
             "href": "https://www.mollie.com/dashboard/org_123456789/orders/ord_pbjz8x",
             "type": "text/html"
         },
         "documentation":{
            "href":"https://docs.mollie.com/reference/v2/orders-api/get-order",
            "type":"text/html"
         }
      }
   }
