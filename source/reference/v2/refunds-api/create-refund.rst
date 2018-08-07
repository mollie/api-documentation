Create refund
=============
.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payments/*id*/refunds

.. authentication::
   :api_keys: true
   :oauth: true

Most payment methods support refunds. This means you can request your payment to be refunded to your customer.
The refunded amount will be withheld from your next settlement.

Refunds are not available at all for Bitcoin, paysafecard and gift cards. If you need to refund direct debit payments,
please contact our support department.

Refunds support descriptions, which we will show in the Dashboard, your exports and pass to your customer if possible.

If you have insufficient balance with Mollie to perform the refund, the refund will be ``queued``. We will automatically
process the refund once your balance increases.

Any payments created for Orders can also be refunded using the Payment Refunds API. However, we recommend using the Order
Refund API in those cases so you can pass the order lines you are refunding too.

Possible errors
---------------
Sometimes a situation can occur in which it is not possible to perform the refund. In such cases an HTTP ``4xx`` error
will be returned. Some of these situations are illustrated here:

* There might not be enough balance on your account with the payment provider (e.g. PayPal).
* You may have forgotten to grant the appropriate rights to Mollie for the payment provider (PayPal only).
* It is possible that the payment has already been (partially) refunded.
* It is not always possible to do a partial refund.

If you perform many refunds in parallel, you may get an HTTP ``503 Service unavailable`` error. In this case, you can be
certain the refund was not performed and you can safely retry the refund.

If there is a connection issue during the creation of a refund (e.g. a client-side time out is triggered) you should
**not retry automatically** as you cannot be sure the refund has been performed or not. In this case we suggest logging
into the Mollie Dashboard, or retrieving the payment's refunds via the API to validate if the refund has been created.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``v2/payments/tr_7UhSN1zuXS/refunds``.

.. list-table::
   :widths: auto

   * - ``amount``

       .. type:: amount object
          :required: true

     - The amount to refund. For some payments, it can be up to €25.00 more than the original transaction amount.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string
                 :required: true

            - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The currency must be the same as
              the corresponding payment.

          * - ``value``

              .. type:: string
                 :required: true

            - A string containing the exact amount you want to refund in the given currency. Make sure to send the right
              amount of decimals. Non-string values are not accepted.

   * - ``description``

       .. type:: string
          :required: false

     - The description of the refund you are creating. This will be shown to the consumer on their card or
       bank statement when possible. Max. 140 characters.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to refund a test mode payment.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A refund object is returned, as described in :doc:`Get refund </reference/v2/refunds-api/get-refund>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=5.95"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

    $payment = $mollie->payments->get("tr_WDqYK6vllg");
    $refund = $payment->refund([
      "amount" => [
        "currency" => "EUR",
        "value" => "5.95" // You must send the correct number of decimals, thus we enforce the use of strings
      ]
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
           "value": "5.95"
       },
       "status": "pending",
       "createdAt": "2018-03-14T17:09:02.0Z",
       "description": "Order #33",
       "paymentId": "tr_WDqYK6vllg",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT",
               "type": "application/hal+json"
           },
           "payment": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/refunds-api/create-refund",
               "type": "text/html"
           }
       }
   }
