Customers API
=============
With the Customers API you can create simple minimal representations of your customers in the Mollie API.

For **recurring payment processing**, the Customers API is required. Tracking mandates, charging recurring payments, and
creating subscriptions are all done on a per-customer basis.

For **regular payment processing** you can optionally 'attach' payments to a customer as well. This improves the
:doc:`hosted checkout </payments/hosted-checkout>` experience for the customer, and improves the insights provided by
the Mollie Dashboard.

The Customers API allows you to provide customer information. Although not required, we recommend at least providing a
recognizable name for each customer. This makes it easier to manage your customers and their payments in the Mollie
Dashboard.

For a step-by-step guide on charging your customers recurrently, refer to
:doc:`Recurring payments </payments/recurring>`.

Endpoints
---------
.. endpoint-card::
   :name: Create customer
   :method: POST
   :url: /v2/customers
   :ref: /reference/v2/customers-api/create-customer

   Create a customer.

.. endpoint-card::
   :name: Get customer
   :method: GET
   :url: /v2/customers/*id*
   :ref: /reference/v2/customers-api/get-customer

   Retrieve details of a specific customer.

.. endpoint-card::
   :name: Update customer
   :method: PATCH
   :url: /v2/customers/*id*
   :ref: /reference/v2/customers-api/update-customer

   Update the details of a specific customer.

.. endpoint-card::
   :name: Delete customer
   :method: DELETE
   :url: /v2/customers/*id*
   :ref: /reference/v2/customers-api/delete-customer

   Delete a specific customer.

.. endpoint-card::
   :name: List customers
   :method: GET
   :url: /v2/customers
   :ref: /reference/v2/customers-api/list-customers

   Retrieve a list of all your customers.

.. endpoint-card::
   :name: Create customer payment
   :method: POST
   :url: /v2/customers/*id*/payments
   :ref: /reference/v2/customers-api/create-customer-payment

   Create a payment attached to a specific customer.

.. endpoint-card::
   :name: List customer payments
   :method: GET
   :url: /v2/customers/*id*/payments
   :ref: /reference/v2/customers-api/list-customer-payments

   Retrieve a list of all payments attached to a specific customer.
