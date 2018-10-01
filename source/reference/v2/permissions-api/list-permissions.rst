List permissions
================
.. api-name:: Permissions API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/permissions

.. authentication::
   :api_keys: false
   :oauth: true

List all permissions available with the current OAuth access token. The list is not paginated.

Parameters
----------
None.

Response
--------
``200`` ``application/json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of permissions found in ``_embedded``.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``permissions``

              .. type:: array

            - An array of permission objects as described in
              :doc:`Get permission </reference/v2/permissions-api/get-permission>`.

   * - ``_links``

       .. type:: object

     - Links related to the lists of permissions. Every URL object will contain an ``href`` and a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of permissions.

          * - ``documentation``

              .. type:: object

            - The URL to the permissions list endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/permissions \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
    $permissions = $mollie->permissions->all();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "_embedded": {
           "permissions": [
               {
                   "resource": "permission",
                   "id": "payments.write",
                   "description": "Create new payments",
                   "granted": false,
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/permissions/payments.write",
                           "type": "application/hal+json"
                       }
                   }
               },
               {
                   "resource": "permission",
                   "id": "payments.read",
                   "description": "View your payments",
                   "granted": true,
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/permissions/payments.read",
                           "type": "application/hal+json"
                       }
                   }
               },
               { },
               { },
               { }
          ]
       },
       "count": 15,
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/permissions-api/list-permissions",
               "type": "text/html"
           },
           "self": {
               "href": "https://api.mollie.com/v2/permissions",
               "type": "application/hal+json"
           }
       }
   }
