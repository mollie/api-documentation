Subscriptions API
=================
The Subscriptions API provides an easy way to schedule recurring payments at regular intervals. When using this API, we
automatically create recurring payments for you at the interval you specified.

The Subscriptions API is not required to implement recurring payments. You can just as easily charge the recurring
payments yourself on the customer using the Payments API.

For a step-by-step guide on charging your customers recurrently, refer to
:doc:`Recurring payments </payments/recurring>`.

Endpoints
---------
.. endpoint-card::
   :name: Create subscription
   :method: POST
   :url: /v2/customers/*customerId*/subscriptions
   :ref: /reference/v2/subscriptions-api/create-subscription

   Create a subscription for a specific customer.

.. endpoint-card::
   :name: Get subscription
   :method: GET
   :url: /v2/customers/*customerId*/subscriptions/*id*
   :ref: /reference/v2/subscriptions-api/get-subscription

   Retrieve details of a specific subscription.

.. endpoint-card::
   :name: Update subscription
   :method: PATCH
   :url: /v2/customers/*customerId*/subscriptions/*id*
   :ref: /reference/v2/subscriptions-api/update-subscription

   Update a specific subscription.

.. endpoint-card::
   :name: Cancel subscription
   :method: DELETE
   :url: /v2/customers/*customerId*/subscriptions/*id*
   :ref: /reference/v2/subscriptions-api/cancel-subscription

   Cancel a specific subscription.

.. endpoint-card::
   :name: List subscriptions
   :method: GET
   :url: /v2/customers/*customerId*/subscriptions
   :ref: /reference/v2/subscriptions-api/list-subscriptions

   Retrieve a list of all subscriptions created for a specific customer.

.. endpoint-card::
   :name: List all subscriptions
   :method: GET
   :url: /v2/subscriptions
   :ref: /reference/v2/subscriptions-api/list-all-subscriptions

   Retrieve a list of all subscriptions.

.. endpoint-card::
   :name: List subscriptions payments
   :method: GET
   :url: /v2/customers/*customerId*/subscriptions/*id*/payments
   :ref: /reference/v2/subscriptions-api/list-subscription-payments

   Retrieve a list of all payments created for a specific subscription.
