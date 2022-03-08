Payments API
============
The Payments API is at the heart of the Mollie API. It allows you to create and manage *payment intents*. This is where
most payment implementations start off.

In its simplest form, processing a payment requires only three steps: setting up the payment with the
:doc:`Create payment endpoint </reference/v2/payments-api/create-payment>`, sending the customer to our
:doc:`hosted checkout </payments/hosted-checkout>`, and processing the :doc:`webhook </overview/webhooks>` we send once
the payment is completed.

Please refer to :doc:`Accepting payments </payments/accepting-payments>` for a step-by-step guide on implementing the
Payments API.

Endpoints
---------
.. endpoint-card::
   :name: Create payment
   :method: POST
   :url: /v2/payments
   :ref: /reference/v2/payments-api/create-payment

   Create a payment intent. This is where most implementations start.

.. endpoint-card::
   :name: Get payment
   :method: GET
   :url: /v2/payments/*id*
   :ref: /reference/v2/payments-api/get-payment

   Retrieve a specific payment intent.

.. endpoint-card::
   :name: Update payment
   :method: PATCH
   :url: /v2/payments/*id*
   :ref: /reference/v2/payments-api/update-payment

   Update the details of a specific payment intent.

.. endpoint-card::
   :name: Cancel payment
   :method: DELETE
   :url: /v2/payments/*id*
   :ref: /reference/v2/payments-api/cancel-payment

   Cancel a specific payment intent.

.. endpoint-card::
   :name: List payments
   :method: GET
   :url: /v2/payments
   :ref: /reference/v2/payments-api/list-payments

   Retrieve a list of all your payment intents.
