Permissions API
===============
The Permissions API is an optional part of the Mollie OAuth implementation.

OAuth is an open standard that our API supports, which allows your app to access data from a connected account with
their consent. This prevents having to manually exchange API keys.

As per the OAuth standard, you need to request specific *permissions* (or *scopes*) during the authorization flow to
gain access to specific resources on the user's Mollie account. For example, to gain read access to the user's invoices,
your user will need to grant you the ``invoices.read`` permission.

Refer to :doc:`Getting started with Mollie Connect </connect/getting-started>` for a step-by-step guide on
implementing OAuth.

Endpoints
---------
.. endpoint-card::
   :name: Get permission
   :method: GET
   :url: /v2/permissions/*id*
   :ref: /reference/v2/permissions-api/get-permission

   Retrieve a specific permission, along with its grant status.

.. endpoint-card::
   :name: List permissions
   :method: GET
   :url: /v2/permissions
   :ref: /reference/v2/permissions-api/list-permissions

   List all permissions available to the current app access token.
