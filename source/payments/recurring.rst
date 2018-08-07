Recurring payments
==================
Recurring payments can be used to charge customers on a regular basis or to offer automatic top-ups with credits-based
services. Since the amount for a recurring payment is variable, other innovative use-cases are possible as well. Like
doing a partial prepayment and later a final recurring payment, for more expensive products. Or charging a customer in
your Dashboard manually, for orders by phone.

Recurring payments happen in the background. The customer goes through the payment steps only once, for the **first**
payment.

Reducing the risk of chargebacks
--------------------------------
To reduce the risk of chargebacks, it's recommended to communicate how often and how much the customer will be charged
as clearly as possible. We suggest notifying the customer a couple of days in advance of the next payment, for example
by sending them an email.

How to get started
------------------
In the following sections we explain the following topics.

* :ref:`Setting up the first payment <payments/recurring/first-payment>`
* :ref:`Charging immediately on-demand <payments/recurring/charging-on-demand>`
* :ref:`Charging periodically with subscriptions <payments/recurring/charging-periodically>`
* :ref:`How do webhooks for subscriptions work? <payments/recurring/subscription-webhooks>`

.. _payments/recurring/first-payment:

Setting up the first payment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In order to get started with recurring payments you need to require the customer's consent through a first payment. It's
similar to a regular payment, but the customer is shown information about your organization, and the customer needs to
complete the payment with the account or card that will be used for recurring charges in the future. After the first
payment is completed succesfully, the customer's account or card will immediately be chargeable *on-demand*, or
periodically through *subscriptions*.

#. Create a unique customer using the :doc:`Customers API </reference/v2/customers-api/create-customer>`.

   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/customers \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
          -H "Content-Type: application/json" \
          -d "{\"name\":\"Customer A\",\"email\":\"customer@example.org\"}"

#. Save the customer's ``id`` in your database. You need it when performing
   :doc:`Payments API </reference/v2/payments-api/create-payment>` calls.

#. Create a payment for the customer by specifying the ``customerId`` and setting the ``sequenceType`` parameter to
   ``first``.

   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/payments \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
          -H "Content-Type: application/json" \
          -d \
          "{
              \"amount\": {\"currency\":\"EUR\", \"value\":\"0.01\"},
              \"customerId\": \"cst_Ok2DlrJe5\",
              \"sequenceType\": \"first\",
              \"description\": \"First payment\",
              \"redirectUrl\": \"https://webshop.example.org/order/12345/\",
              \"webhookUrl\": \"https://webshop.example.org/payments/webhook/\"
          }"

#. Redirect the customer to the ``_links.checkout.url`` to complete the first payment. Make sure to use an HTTP ``GET``
   redirect.

#. Once completed there will be a customer mandate that you can access via the
   :doc:`Mandates API </reference/v2/mandates-api/get-mandate>`.

.. note:: Not all payment methods support a first payment. When the ``method`` parameter is not provided in the API, we
          take care of this automatically in our :doc:`Checkout </guides/checkout>`. The following payment methods
          support a first payment and are thus allowed as a value for the ``method`` parameter of a first payment:
          ``bancontact`` ``belfius`` ``creditcard`` ``eps`` ``giropay`` ``ideal`` ``inghomepay`` ``kbc`` ``sofort``

.. _payments/recurring/charging-on-demand:

Charging immediately on-demand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Now that the customer has given their consent, it's possible to perform a recurring payment on-demand. Instead of the
regular payment with a ``redirectUrl``, a recurring payment happens in the background without a browser session, i.e.
without the customer going through payments steps. You can create a recurring payment with the ``sequenceType`` set to
``recurring`` when creating a payment with the :doc:`Payments API </reference/v2/payments-api/create-payment>`.

Please note that in order to do recurring payments, direct debit or credit card has to be activated on your profile.

#. Make sure the customer has valid mandates. Find out using the
   :doc:`Mandates API </reference/v2/mandates-api/list-mandates>`.

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_4qqhO89gsT/mandates \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

#. If there's at least one mandate with a ``status`` set to ``valid`` then continue.

#. Set the ``sequenceType`` parameter to ``recurring`` to charge the customer on-demand.

   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/payments \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
          -H "Content-Type: application/json" \
          -d \
          "{
              \"amount\": {\"currency\": \"EUR\", \"value\": \"10.00\"},
              \"customerId\": \"cst_Ok2DlrJe5\",
              \"sequenceType\": \"recurring\",
              \"description\": \"Background payment\",
              \"webhookUrl\": \"https://webshop.example.org/payments/webhook/\"
          }"

#. Like regular payments your :doc:`webhook </payments/webhooks>` is called for retrieving status updates.

.. _payments/recurring/charging-periodically:

Charging periodically with subscriptions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
For simple regular recurring payments with constant amounts, you can create *subscriptions* with the
:doc:`Subscriptions API </reference/v2/subscriptions-api/create-subscription>`. Subscription payments will be spawned
automatically at the specified frequency, and will show up in your Dashboard.

#. Make sure the customer has a pending or valid mandate using the
   :doc:`Mandates API </reference/v2/mandates-api/list-mandates>`.

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_4qqhO89gsT/mandates \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

#. Continue if there's a mandate with its ``status`` being either ``pending`` or ``valid``, otherwise set up a *first*
   payment for the customer first.

#. Create the subscription using the :doc:`Subscriptions API </reference/v2/subscriptions-api/create-subscription>`.

   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/customers/cst_Ok2DlrJe5/subscriptions \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
          -H "Content-Type: application/json" \
          -d \
          "{
              \"amount\": {\"currency\":\"EUR\", \"value\":\"25.00\"},
              \"times\": 4,
              \"interval\": \"3 months\",
              \"description\": \"Quarterly payment\",
              \"webhookUrl\": \"https://webshop.example.org/subscriptions/webhook/\"
          }"


#. In the above example the customer is charged €25.00 for 4 times every 3 months, starting today.

#. The webhook URL will be triggered for every payment to communicate any status updates.

Refer to the documentation of the API client you are using for more examples.

.. _payments/recurring/subscription-webhooks:

How do webhooks for subscriptions work?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
When using our Subscriptions API to charge a customer periodically, new payments are created by Mollie every time the
customer is charged. We will call your webhook as usual for these payments. The only difference is, the payment ID will
not be known by your system yet when we call the webhook to report the payment's status.

The payment object will, however, contain a ``subscriptionId`` field that contains the subscription ID you received when
the subscription was created. This allows you to recognize where the payment belongs to.

We do not provide webhooks specifically for status changes of a Subscription itself.
