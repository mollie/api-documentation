Get refund
==========
.. api-name:: Refunds API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving refunds in the new v2 API can be found
             :doc:`here </reference/v2/refunds-api/get-refund>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/payments/*paymentId*/refunds/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a single refund by its ID. Note the original payment's ID is needed as well.

If you do not know the original payment's ID, you can use the
:doc:`refunds list endpoint </reference/v1/refunds-api/list-refunds>`.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the refund's ID. For example:
``/v1/payments/tr_7UhSN1zuXS/refunds/re_4qqhO89gsT``.

Response
--------
``200`` ``application/json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``id``

       .. type:: string

     - The refund's unique identifier, for example ``re_4qqhO89gsT``.

   * - ``payment``

       .. type:: object

     - The original payment, as described in :doc:`Get payment </reference/v1/payments-api/get-payment>`. In the payment
       object, note the following refund related fields.

       .. list-table::
          :widths: auto

          * - ``amountRefunded``

              .. type:: decimal

            - The total amount in EUR that is already refunded. For some payment methods, this amount may be higher than
              the payment amount, for example to allow reimbursement of the costs for a return shipment to your
              customer.

          * - ``amountRemaining``

              .. type:: decimal

            - The remaining amount in EUR that can be refunded.

   * - ``amount``

       .. type:: decimal

     - The amount refunded to the consumer with this refund.

   * - ``description``

       .. type:: string

     - The description of the refund that may be shown to the consumer, depending on the payment method used.

   * - ``status``

       .. type:: string

     - Since refunds may be delayed for certain payment methods, the refund carries a status field.

       Possible values:

       * ``queued`` The refund will be processed once you have enough balance. You can still cancel this refund.
       * ``pending`` The refund will be processed soon (usually the next business day). You can still cancel this
         refund.
       * ``processing`` The refund is being processed. Cancellation is no longer possible.
       * ``refunded`` The refund has been paid out to the consumer.
       * ``failed`` The refund has failed during processing.

   * - ``refundedDatetime``

       .. type:: datetime

     - The date and time the refund was issued, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json; charset=utf-8

   {
       "id": "re_4qqhO89gsT",
       "payment": {
           "resource": "payment",
           "id": "tr_WDqYK6vllg",
           "mode": "test",
           "createdDatetime": "2018-03-14T07:58:33.0Z",
           "status": "refunded",
           "amount": "35.07",
           "amountRefunded": "5.95",
           "amountRemaining": "54.12",
           "description": "Order #33",
           "method": "ideal",
           "metadata": {
               "order_id": "33"
           },
           "details": {
               "consumerName": "Hr E G H K\u00fcppers en\/of MW M.J. K\u00fcppers-Veeneman",
               "consumerAccount": "NL53INGB0654422370",
               "consumerBic": "INGBNL2A"
           },
           "locale": "nl_NL",
           "links": {
               "webhookUrl": "https://webshop.example.org/payments/webhook",
               "redirectUrl": "https://webshop.example.org/order/33/",
               "refunds": "https://api.mollie.com/v1/payments/tr_WDqYK6vllg/refunds"
           }
       },
       "amount": "5.95",
       "status": "pending",
       "refundedDatetime": "2018-03-14T17:00:50.0Z",
       "description": "Refund of order",
       "links": {
           "self": "https://api.mollie.com/v1/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT"
       }
   }
