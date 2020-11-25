Create Order Payment API
========================
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/orders/*orderId*/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

An order has an automatically created payment that your customer can use to pay for the order.
When the payment expires you can create a new payment for the order using this endpoint.

A new payment can only be created while the status of the order is ``created``, and when the status
of the existing payment is either ``expired``, ``canceled`` or ``failed``.

Note that order details (for example ``amount`` or ``webhookUrl``) can not be changed using this endpoint.

Parameters
----------

Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.

.. list-table::
   :widths: auto

   * - ``method``

       .. type:: string|array
          :required: false

     - Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment
       method and your customer will skip the selection screen and is sent directly to the chosen payment method.
       The parameter enables you to fully integrate the payment method selection into your website.

       You can also specify the methods in an array. By doing so we will still show the payment method selection
       screen but will only show the methods specified in the array. For example, you can use this functionality to only
       show payment methods from a specific country to your customer ``["bancontact", "belfius", "inghomepay"]``.

       Possible values: ``applepay`` ``bancontact`` ``banktransfer`` ``belfius`` ``creditcard`` ``directdebit`` ``eps``
       ``giftcard`` ``giropay`` ``ideal`` ``inghomepay`` ``kbc``  ``klarnapaylater`` ``klarnasliceit`` ``paypal``
       ``paysafecard`` ``przelewy24`` ``sofort``

   * - ``customerId``

       .. type:: string
          :required: false

     - The ID of the :doc:`Customer </reference/v2/customers-api/get-customer>` for whom the payment is being created.
       This is used for :doc:`recurring payments </payments/recurring>` and
       :doc:`single click payments </guides/checkout>`.

   * - ``mandateId``

       .. type:: string
          :required: false

     - When creating recurring payments, the ID of a specific :doc:`Mandate </reference/v2/mandates-api/get-mandate>`
       may be supplied to indicate which of the consumer's accounts should be credited.

You can specify the same :ref:`payment parameters <payment-parameters>` as in the
:doc:`/reference/v2/orders-api/create-order`. Note that the parameters
should **not** be specified in a ``payment`` object, but at the same level as the ``method`` parameter.
For example:

.. code-block:: json
   :linenos:

   {
       "method": "ideal",
       "issuer": "ideal_INGBNL2A"
   }

.. note:: When the payment ``webhook`` parameter is not specified it is copied from the previous order
          payment (if it was set).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the only mandatory extra parameter is the ``testmode`` parameter.
This is only the case for test orders. For live orders the ``testmode`` parameter can be omitted.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - If the new payment is for a test order this parameter is required and you have to set this to ``true``.

   * - ``applicationFee``

       .. type:: object
          :required: false

     - Adding an :doc:`application fee </oauth/application-fees>` allows you to charge the merchant for the
       payment and transfer this to your own account.

Response
--------
``201`` ``application/hal+json``

An payment object is returned, as described in :doc:`Get payment </reference/v2/payments-api/get-payment>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/orders/ord_stTC2WHAuS/payments \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d '{
                 "method": "banktransfer"
         }'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $order = $mollie->orders->get("ord_stTC2WHAuS");
      $payment = $order->createPayment([
          "method" => "banktransfer",
      ]);

      $checkoutUrl = $payment->getCheckoutUrl();
      if(! is_null($checkoutUrl)) {
          // ... redirect the customer to the checkout url
      }

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "mode": "test",
       "amount": {
           "currency": "EUR",
           "value": "698.00"
       },
       "status": "open",
       "description": "Order #1337 (Lego cars)",
       "createdAt": "2018-12-01T17:09:02+00:00",
       "method": "banktransfer",
       "metadata": null,
       "orderId": "ord_stTC2WHAuS",
       "isCancelable": true,
       "locale": "nl_NL",
       "profileId": "pfl_URR55HPMGx",
       "sequenceType": "oneoff",
       "settlementAmount": {
           "value": "698.00",
           "currency": "EUR"
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "order": {
               "href": "https://api.mollie.com/v2/orders/ord_stTC2WHAuS",
               "type": "application/hal+json"
           },
           "checkout": {
               "href": "https://www.mollie.com/paymentscreen/testmode/?method=banktransfer&token=fgnwdh",
               "type": "text/html"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_123456789/payments/tr_WDqYK6vllg",
               "type": "text/html"
           },
           "status": {
               "href": "https://www.mollie.com/paymentscreen/banktransfer/status/fgnwdh",
               "type": "text/html"
           },
           "payOnline": {
               "href": "https://www.mollie.com/paymentscreen/banktransfer/pay-online/fgnwdh",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/orders-api/create-order-payment",
               "type": "text/html"
           }
       }
   }

Response (order is already completed)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: none
   :linenos:

   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/hal+json

   {
        "status": 422,
        "title": "Unprocessable Entity",
        "detail": "Cannot create a new payment for order ord_stTC2WHAuS when the order status is \"completed\".",
        "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/orders-api/create-order-payment",
                "type": "text/html"
            }
        }
    }
