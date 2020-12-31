Create order refund
===================
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/orders/*orderId*/refunds

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

When using the Orders API, :doc:`refunds </payments/refunds>` should be made against the Order. When using *pay after
delivery* payment methods such as *Klarna Pay later* and *Klarna Slice it*, this ensures that your customer will receive
credit invoices with the correct product information on them and generally have a great experience.

However, if you want to refund arbitrary amounts you can use the :doc:`/reference/v2/refunds-api/create-refund` for Pay
later and Slice it.

If an order line is still in the ``authorized`` status, it cannot be refunded. You should
:doc:`cancel it instead </reference/v2/orders-api/cancel-order-lines>`. Order lines that are ``paid``, ``shipping`` or
``completed`` can be refunded.

For more details on how refunds work, see :doc:`/payments/refunds`.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.

.. list-table::
   :widths: auto

   * - ``lines``

       .. type:: array
          :required: true

     - An array of objects containing the order line details you want to create a refund for. If you send an empty
       array, the entire order will be refunded.

       .. list-table::
          :widths: auto

          * - ``id``

              .. type:: string
                 :required: true

            - The API resource token of the order line, for example: ``odl_jp31jz``.

          * - ``quantity``

              .. type:: int
                 :required: false

            - The number of items that should be refunded for this order line. When this parameter is omitted, the
              whole order line will be refunded.

              Must be less than the number of items already refunded for this order line.

          * - ``amount``

              .. type:: amount object
                 :required: false

            - The amount that you want to refund. In almost all cases, Mollie can determine the amount automatically.

              The amount is required only if you are *partially* refunding an order line which has a non-zero
              ``discountAmount``.

              The amount you can refund depends on various properties of the order line and the create order refund
              request. The maximum that can be refunded is ``unit price x quantity to ship``.

              The minimum amount depends on the discount applied to the line, the quantity already refunded or shipped,
              the amounts already refunded or shipped and the quantity you want to refund.

              If you do not send an amount, Mollie will determine the amount automatically or respond with an error
              if the amount cannot be determined automatically. The error will contain the ``extra.minimumAmount`` and
              ``extra.maximumAmount`` properties that allow you pick the right amount.

   * - ``description``

       .. type:: string
          :required: false

     - The description of the refund you are creating. This will be shown to the consumer on their card or
       bank statement when possible. Max. 140 characters.

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, for example a string or a JSON object. We will save the data alongside the
       refund. Whenever you fetch the refund with our API, we will also include the metadata. You can use up to
       approximately 1kB.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you are creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode order refund.

Response
--------
``201`` ``application/hal+json``

An refund object is returned, as described in :doc:`Get payment refund </reference/v2/refunds-api/get-refund>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/orders/ord_stTC2WHAuS/refunds \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d '{
                  "lines": [
                     {
                        "id": "odl_dgtxyl",
                        "quantity": 1
                     }
                  ],
                  "description": "Required quantity not in stock, refunding one photo book.",
                  "metadata": {
                     "bookkeeping_id": 12345
                  }
         }'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $order = $mollie->orders->get("ord_stTC2WHAuS");
      $order->refund([
            'lines' => [
               [
                  'id' => 'odl_dgtxyl',
                  'quantity' => 1,
               ],
            ],
            "description" => "Required quantity not in stock, refunding one photo book.",
      ]);

      // Alternative shorthand for refunding all eligible order lines
      $order->refundAll([
            "description" => "Required quantity not in stock, refunding one photo book.",
      ]);

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_stTC2WHAuS')
      order.create_refund({
        'lines': [
          'id': 'odl_dgtxyl',
          'quantity': 1,
        ],
        'description': 'Required quantity not in stock, refunding one photo book.'
      })

      # Alternative shorthand for refunding all eligible order lines
      order.create_refund()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      order  = Mollie::Order.get('ord_stTC2WHAuS')
      refund = order.refund!(
        lines: [
          {
            id: 'odl_dgtxyl',
            quantity: 1
          }
        ],
        description: 'Required quantity not in stock, refunding one photo book.'
      )

      # Alternative shorthand for refunding all eligible order lines
      order.refund!

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const refund = await mollieClient.orders_refunds.create({
          orderId: 'ord_stTC2WHAuS',
          lines: {
            id: 'odl_dgtxyl',
            quantity: 1,
          },
          description: 'Required quantity not in stock, refunding one photo book.',
        });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

   {
       "resource": "refund",
       "id": "re_4qqhO89gsT",
       "amount": {
           "currency": "EUR",
           "value": "698.00"
       },
       "status": "pending",
       "createdAt": "2018-03-14T17:09:02.0Z",
       "description": "Required quantity not in stock, refunding one photo book.",
       "metadata": {
            "bookkeeping_id": 12345
       },
       "paymentId": "tr_WDqYK6vllg",
       "orderId": "ord_stTC2WHAuS",
       "lines": [
           {
               "resource": "orderline",
               "id": "odl_dgtxyl",
               "orderId": "ord_stTC2WHAuS",
               "name": "LEGO 42083 Bugatti Chiron",
               "sku": "5702016116977",
               "type": "physical",
               "status": "paid",
               "metadata": null,
               "quantity": 1,
               "unitPrice": {
                   "value": "399.00",
                   "currency": "EUR"
               },
               "vatRate": "21.00",
               "vatAmount": {
                   "value": "51.89",
                   "currency": "EUR"
               },
               "discountAmount": {
                   "value": "100.00",
                   "currency": "EUR"
               },
               "totalAmount": {
                   "value": "299.00",
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
           }
       ],
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT",
               "type": "application/hal+json"
           },
           "payment": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "order": {
               "href": "https://api.mollie.com/v2/orders/ord_stTC2WHAuS",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/orders-api/create-order-refund",
               "type": "text/html"
           }
       }
   }

Response (amount required)
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: none
   :linenos:

   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/hal+json

   {
        "status": 422,
        "title": "Unprocessable Entity",
        "detail": "Line 0 contains invalid data. An amount is required for this API call. The amount must be between €0.00 and €50.00.",
        "field": "lines.0.amount",
        "extra": {
            "minimumAmount": {
                "value": "0.00",
                "currency": "EUR"
            },
            "maximumAmount": {
                "value": "50.00",
                "currency": "EUR"
            }
        },
        "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/orders-api/create-order-refund",
                "type": "text/html"
            }
        }
    }
