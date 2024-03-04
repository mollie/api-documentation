OAuth API
=========
OAuth is an open standard that our API supports, which allows your app to access data from a connected account with
their consent. This prevents having to manually exchange API keys. For example, with your user's consent, using OAuth
you can call the Invoices API on behalf of your user to retrieve **their** Mollie invoice.

Following the OAuth standard, the Mollie OAuth API consists of three endpoints.

Firstly, the *Authorize* endpoint is where your *app* users are sent to grant your app access to their Mollie account.

Secondly, the *Tokens* endpoint is where your app can retrieve access tokens based on the given authorization. With
those access tokens, you can talk to the Mollie API on behalf of your users.

Lastly, we offer the *Revoke token* endpoint where your app can proactively revoke authorizations (as per the standard
OAuth revoke flow).

Refer to :doc:`Getting started with Mollie Connect </connect/getting-started>` for a step-by-step guide on implementing
OAuth.

Endpoints
---------
.. endpoint-card::
   :name: Authorize
   :method: GET
   :url: /oauth2/authorize
   :ref: /reference/oauth2/authorize

   Send your user to this endpoint to get their authorization.

.. endpoint-card::
   :name: Generate tokens
   :method: POST
   :url: /oauth2/tokens
   :ref: /reference/oauth2/tokens

   Create access tokens and refresh tokens.

.. endpoint-card::
   :name: Revoke token
   :method: DELETE
   :url: /oauth2/tokens
   :ref: /reference/oauth2/revoke-token

   Revoke a specific token.
