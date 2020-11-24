List order refunds
====================

.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/order/*orderId*/refunds

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all order refunds.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_pbjz8x``.

.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the refund with this ID. The refund with this ID is included in the result
       set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of refunds to return (with a maximum of 250).

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` query string parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to list test mode order refunds.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` the refunds were created for.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of refunds found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``refunds``

              .. type:: array

            - An array of refund objects as described in
              :doc:`Get payment refund </reference/v2/refunds-api/get-refund>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of refunds. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of refunds.

          * - ``previous``

              .. type:: object

            - The previous set of refunds, if available.

          * - ``next``

              .. type:: object

            - The next set of refunds, if available.

          * - ``documentation``

              .. type:: object

            - The URL to the List order refunds endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/orders/ord_pbjz8x/refunds \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $order = $mollie->orders->get("ord_stTC2WHAuS");
      $refunds = $order->refunds();

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_stTC2WHAuS')
      refunds = order.refunds()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      refunds = Order::Refund.all(order_id: 'ord_stTC2WHAuS')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const refunds = await mollieClient.orders_refunds.all({ orderId: 'ord_stTC2WHAuS' });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 1,
       "_embedded": {
           "refunds": [
               {
                   "resource": "refund",
                   "id": "re_4qqhO89gsT",
                   "amount": {
                       "currency": "EUR",
                       "value": "698.00"
                   },
                   "status": "processing",
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
                           "href": "https://docs.mollie.com/reference/v2/refunds-api/get-refund",
                           "type": "text/html"
                       }
                   }
               }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?from=re_APBiGPH2vV&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/orders-api/list-order-refunds",
               "type": "text/html"
           }
       }
   }
