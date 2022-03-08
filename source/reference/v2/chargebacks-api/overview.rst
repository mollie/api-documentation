Chargebacks API
===============
With payment methods such as credit card and SEPA Direct Debit, consumers are able to file a dispute and initiate a
chargeback if for example the purchased items never arrived and the seller does not respond to inquiries.

If the card issuer or bank accepts the chargeback, the money will be reclaimed and deducted from your Mollie balance.
The Chargebacks API then allows you to retrieve details of the chargebacks that took place on your account.

As soon as we receive notification of a chargeback, we will notify you. Depending on the nature of the chargeback, there
will be an opportunity to respond to this notification.

For more information on dealing with chargebacks, please refer to our
`knowledge base <https://help.mollie.com/hc/en-us/articles/115001470869-What-are-chargebacks->`_.

Endpoints
---------
.. endpoint-card::
   :name: Get payment chargeback
   :method: GET
   :url: /v2/payments/*paymentId*/chargebacks/*id*
   :ref: /reference/v2/chargebacks-api/get-payment-chargeback

   Retrieve a specific payment chargeback.

.. endpoint-card::
   :name: List payment chargebacks
   :method: GET
   :url: /v2/payments/*paymentId*/chargebacks
   :ref: /reference/v2/chargebacks-api/list-payment-chargebacks

   Retrieve a list of all chargebacks filed for a specific payment.

.. endpoint-card::
   :name: List chargebacks
   :method: GET
   :url: /v2/chargebacks
   :ref: /reference/v2/chargebacks-api/list-chargebacks

   Retrieve a list of all chargebacks.
