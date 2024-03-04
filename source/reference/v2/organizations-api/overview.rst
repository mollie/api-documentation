Organizations API
=================
When you sign up with Mollie, you normally create both a *user account* and an *organization*. The user account is tied
to your person, while the organization represents the business entity that will process payments via Mollie.

In some cases, you may want to retrieve organization details via the API. This is specifically useful if you have an
:doc:`OAuth app </connect/getting-started>` and you wish to retrieve details of the organizations using your app.

To create new organizations, refer to the :doc:`Onboarding guide </connect/onboarding>`.

Endpoints
---------
.. endpoint-card::
   :name: Get current organization
   :method: GET
   :url: /v2/organizations/me
   :ref: /reference/v2/organizations-api/current-organization

   Retrieve the currently authenticated organization.

.. endpoint-card::
   :name: Get organization
   :method: GET
   :url: /v2/organizations/*id*
   :ref: /reference/v2/organizations-api/get-organization

   Retrieve a specific organization.

.. endpoint-card::
   :name: Get partner
   :method: GET
   :url: /v2/organizations/me/partner
   :ref: /reference/v2/organizations-api/get-partner

   Retrieve the partner status of the currently authenticated organization.
