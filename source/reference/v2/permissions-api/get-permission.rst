Get permission
==============
.. api-name:: Permissions API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/permissions/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

All API actions through OAuth are by default protected for privacy and/or money related reasons and therefore require
specific permissions. These permissions can be requested by apps during the OAuth authorization flow. The Permissions
resource allows the app to check whether an API action is (still) allowed by the authorization.

Parameters
----------
Replace ``id`` in the endpoint URL by the permission's ID, for example ``payments.read``. See
:doc:`Permissions </oauth/permissions>` for details about the available permissions.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a permission object. Will always contain ``permission`` for this endpoint.

   * - ``id``

       .. type:: string

     - The permission's unique identifier, for example ``payments.read``

   * - ``description``

       .. type:: string

     - A short description of what the permission allows.

   * - ``granted``

       .. type:: boolean

     - Whether this permission is granted to the app by the organization or not.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the permission. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the permission itself.

          * - ``documentation``

              .. type:: URL object

            - The URL to the permission retrieval endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/permissions/payments.read \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $permission = $mollie->permissions->get("payments.read");

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      permission = Mollie::Permission.get('payments.read')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "permission",
       "id": "payments.read",
       "description": "View your payments",
       "granted": true,
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/permissions/payments.read",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/permissions-api/get-permission",
               "type": "text/html"
           }
       }
   }
