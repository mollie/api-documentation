Create refund
=============
.. api-name:: Refunds API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for creating refunds in the new v2 API can be found
             :doc:`here </reference/v2/refunds-api/create-refund>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v1/payments/*id*/refunds

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Most payment methods support :doc:`refunds </payments/refunds>`. This means you can request the payment to be refunded
to your customer. The amount of the refund will be withheld from your next settlement.

By supplying the optional ``amount`` parameter, you can issue a partial refund where your customer is only refunded part
of the total payment. It is also possible to refund up to €25.00 more than the original transaction amount, for example
to credit costs for return shipping.

Refunds support descriptions, which we will show in the Dashboard, your exports and pass to your customer if possible.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``tr_7UhSN1zuXS``.

.. list-table::
   :widths: auto

   * - ``amount``

       .. type:: decimal
          :required: false

     - The amount to refund. When ommitted, the full amount is refunded. Can be up to €25.00 more than the
       original transaction amount.

   * - ``description``

       .. type:: string
          :required: false

     - The description of the refund you are creating. This will be shown to the consumer on their card or
       bank statement when possible. Max. 140 characters.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to refund a test mode payment.

Response
--------
``201`` ``application/json``

A refund object is returned, as described in :doc:`Get refund </reference/v1/refunds-api/get-refund>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v1/payments/tr_WDqYK6vllg/refunds \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount=5.95" # Optional amount, if no amount is provided the total payment amount will be refunded

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json

   {
       "id": "re_4qqhO89gsT",
       "payment": {
           "id": "tr_WDqYK6vllg",
           "mode": "test",
           "createdDatetime": "2018-03-14T12:10:57.0Z",
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
       "description": "Order",
       "refundedDatetime": "2018-03-14T17:09:02.0Z"
   }
