Mandates API
============
The Mandates API allows you to create and track *mandates* for recurring payments. A mandate essentially symbolizes the
authorization a customer gave you to recurrently charge their card or bank account.

Implementing the Mandates API is not strictly required to process recurring payments. In basic implementations it
suffices to :doc:`create a customer </reference/v2/customers-api/create-customer>`, do a *first payment* with the
customer, and then charge recurring payments on the customer. A mandate is created automatically for the
*first payment*, and that mandate is automatically used for any consecutive recurring payments.

For a step-by-step guide on charging your customers recurrently, refer to
:doc:`Recurring payments </payments/recurring>`.

Endpoints
---------
.. endpoint-card::
   :name: Create mandate
   :method: POST
   :url: /v2/customers/*id*/mandates
   :ref: /reference/v2/mandates-api/create-mandate

   Create a mandate.

.. endpoint-card::
   :name: Get mandate
   :method: GET
   :url: /v2/customers/*customersId*/mandates/*id*
   :ref: /reference/v2/mandates-api/get-mandate

   Retrieve details of a specific mandate.

.. endpoint-card::
   :name: Revoke mandate
   :method: DELETE
   :url: /v2/customers/*customersId*/mandates/*id*
   :ref: /reference/v2/mandates-api/revoke-mandate

   Revoke a specific mandate.

.. endpoint-card::
   :name: List mandates
   :method: GET
   :url: /v2/customers/*id*/mandates
   :ref: /reference/v2/mandates-api/list-mandates

   Retrieve a list of all your mandates.
