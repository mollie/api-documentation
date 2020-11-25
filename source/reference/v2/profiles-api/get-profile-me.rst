Get current profile
===================
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/profiles/me

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: false

Use this API if you are creating a plugin or SaaS application that allows users to enter a Mollie API key, and you want
to give a confirmation of the website profile that will be used in your plugin or application.

This is similar to the :doc:`Get current organization </reference/v2/organizations-api/get-organization>` endpoint for
OAuth.

Parameters
----------
No parameters applicable for this endpoint.

Response
--------
The profile object is returned, as described in :doc:`Get profile </reference/v2/profiles-api/get-profile>`.

Example
-------

Request
^^^^^^^

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/profiles/me \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $profile = $mollie->profiles->getCurrent();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "profile",
       "id": "pfl_v9hTwCvYqw",
       "mode": "live",
       "name": "My website name",
       "website": "https://www.mywebsite.com",
       "email": "info@mywebsite.com",
       "phone": "+31208202070",
       "categoryCode": 5399,
       "status": "verified",
       "review": {
           "status": "pending"
       },
       "createdAt": "2018-03-20T09:28:37+00:00",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw",
               "type": "application/hal+json"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_123456789/settings/profiles/pfl_v9hTwCvYqw",
               "type": "text/html"
           },
           "chargebacks": {
               "href": "https://api.mollie.com/v2/chargebacks",
               "type": "application/hal+json"
           },
           "methods": {
               "href": "https://api.mollie.com/v2/methods",
               "type": "application/hal+json"
           },
           "payments": {
               "href": "https://api.mollie.com/v2/payments",
               "type": "application/hal+json"
           },
           "refunds": {
               "href": "https://api.mollie.com/v2/refunds",
               "type": "application/hal+json"
           },
           "checkoutPreviewUrl": {
               "href": "https://www.mollie.com/payscreen/preview/pfl_v9hTwCvYqw",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/profiles-api/get-profile-me",
               "type": "text/html"
           }
       }
   }
