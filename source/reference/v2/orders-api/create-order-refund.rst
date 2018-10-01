Create order refund
===================
.. api-name:: Orders API
   :version: 2

.. warning::
   This API is currently in private beta. If you are interested in participating, please contact your account manager at
   Mollie.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/orders/*orderId*/refunds

.. authentication::
   :api_keys: true
   :oauth: true


When using the Orders API, refunds should be made against the order. When using *pay after delivery* payment methods
such as *Klarna Pay later* and *Klarna Slice it*, this ensures that your customer will receive credit invoices with the
correct product information on them.

If an order line is still in the ``authorized`` status, it cannot be refunded. You should
:doc:`cancel it instead </reference/v2/orders-api/cancel-order-lines>`. Order lines that are ``paid``, ``shipping`` or
``completed`` can be refunded.

For more details on how refunds work, see :doc:`Create Payment Refund API </reference/v2/refunds-api/create-refund>`.

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

            - The API resource token of the order line, for example: ``odl_jp31jz``.

          * - ``quantity``

              .. type:: int
                 :required: false

            - The number of items that should be refunded for this order line. When this parameter is omitted, the
              whole order line will be refunded.

              Must be less than the number of items already refunded for this order line.

              .. note:: At the moment, it is not possible to partially refund an order line if it has a discount.


   * - ``description``

       .. type:: string
          :required: false

     - The description of the refund you are creating. This will be shown to the consumer on their card or
       bank statement when possible. Max. 140 characters.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

An refund object is returned, as described in :doc:`Get payment refund </reference/v2/refunds-api/get-refund>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/orders/ord_stTC2WHAuS/refunds \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d '{
            "lines": [
                {
                    "id": "odl_dgtxyl",
                    "quantity": 1
                }
            ],
            "description": "Required quantity not in stock, refunding one photo book."
       }'

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

     <?php
     $mollie = new \Mollie\Api\MollieApiClient();
     $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

     $order = $mollie->orders->get("ord_stTC2WHAuS");
     $order->refund([
        'lines' => [
            'id' => 'odl_dgtxyl',
            'quantity' => 1,
        ],
        "description" => "Required quantity not in stock, refunding one photo book.",
    ]);

    // Alternative shorthand for refunding all eligible order lines
    $order->refundAll([
      "description" => "Required quantity not in stock, refunding one photo book.",
    ]);

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

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
       "paymentId": "tr_WDqYK6vllg",
       "orderId": "ord_stTC2WHAuS",
       "lines": [
           {
               "resource": "orderline",
               "id": "odl_dgtxyl",
               "orderId": "ord_stTC2WHAuS",
               "name": "LEGO 42083 Bugatti Chiron",
               "productUrl": "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
               "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$",
               "sku": "5702016116977",
               "type": "physical",
               "status": "refunded",
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
