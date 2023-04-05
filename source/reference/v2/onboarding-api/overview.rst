Onboarding API
==============
The Onboarding API is designed for platforms who wish to automatically onboard their customers to Mollie. The API works
with OAuth, allowing you to submit onboarding details of your customers on behalf of them, and to check up on their
onboarding status.

For a step-by-step tutorial, refer to the :doc:`Onboarding guide </connect/onboarding>`.

Endpoints
---------
.. endpoint-card::
   :name: Submit onboarding data
   :method: POST
   :url: /v2/onboarding/me
   :ref: /reference/v2/onboarding-api/submit-onboarding-data

   Submit onboarding details for the currently authenticated organization.

.. endpoint-card::
   :name: Get onboarding status
   :method: GET
   :url: /v2/onboarding/me
   :ref: /reference/v2/onboarding-api/get-onboarding-status

   Retrieve the onboarding status of the currently authenticated organization.
