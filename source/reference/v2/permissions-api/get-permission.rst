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

Retrieve the details on a specific permission, and see if the permission is granted to the current app access token.

Parameters
----------
Replace ``id`` in the endpoint URL by the permission's ID, for example ``payments.read``. See
:doc:`Permissions </connect/permissions>` for details about the available permissions.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a permission object. Will always contain ``permission`` for this endpoint.

.. parameter:: id
   :type: string

   The permission's unique identifier, for example ``payments.read``

.. parameter:: description
   :type: string

   A short description of what the permission allows.

.. parameter:: granted
   :type: boolean

   Whether this permission is granted to the app by the organization or not.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the permission. Every URL object will contain an ``href`` and a
   ``type`` field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the permission itself.

   .. parameter:: documentation
      :type: URL object

      The URL to the permission retrieval endpoint documentation.

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

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_access_token('access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ')

      permissions = mollie_client.permissions.get('payments.read')

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
