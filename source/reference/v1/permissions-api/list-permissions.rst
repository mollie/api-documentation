List permissions
================
.. api-name:: Permissions API
   :version: 1

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/permissions

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

List all permissions available with the current app access token.

Parameters
----------
.. parameter:: offset
   :type: integer
   :condition: optional

   The number of permissions to skip.

.. parameter:: count
   :type: integer
   :condition: optional

   The number of permissions to return (with a maximum of 250).

Response
--------
``200`` ``application/json``

.. parameter:: totalCount
   :type: integer

   The total number of permissions available.

.. parameter:: offset
   :type: integer

   The number of skipped permissions as requested.

.. parameter:: count
   :type: integer

   The number of permissions found in ``data``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: data
   :type: array

   An array of permission objects as described in
   :doc:`Get permission </reference/v1/permissions-api/get-permission>`.

.. parameter:: links
   :type: object

   Links to help navigate through the lists of permissions, based on the given offset.

   .. parameter:: previous
      :type: string

      The previous set of permissions, if available.

   .. parameter:: next
      :type: string

      The next set of permissions, if available.

   .. parameter:: first
      :type: string

      The first set of permissions, if available.

   .. parameter:: last
      :type: string

      The last set of permissions, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/permissions \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 9,
       "offset": 0,
       "count": 9,
       "data": [
           {
               "resource": "permission",
               "id": "payments.read",
               "description": "View your payments",
               "warning": null,
               "granted": true
           },
           { },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/permissions?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/permissions?count=10&offset=10",
           "last": "https://api.mollie.com/v1/permissions?count=10&offset=20"
       }
   }
