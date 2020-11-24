List Clients API
================
.. api-name::Partners API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/clients

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all clients.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the client with this
       ID. The client with this ID is included in the result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of clients to return (with a maximum of 250).

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint also allows for embedding additional information by appending the following values via
the ``embed`` query string parameter.

* ``organization`` Include the :doc:`organization </reference/v2/organizations-api/get-organization>`
  of the client. Available when partner type is ``signuplink`` or when partner type is ``oauth`` and
  the scopes (of the app that causes the link on the organization) include ``organizations.read``.
* ``onboarding`` Include the :doc:`onboarding status </reference/v2/onboarding-api/get-onboarding-status>`
  of the client. Available when partner type is ``signuplink`` or when partner type is ``oauth`` and
  the scopes (of the app that causes the link on the organization) include ``onboarding.read``.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of clients found in ``_embedded``, which is either the requested number (with a
       maximum of 250) or the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``clients``

              .. type:: array

            - An array of client objects as described in
              :doc:`Get client </reference/v2/partners-api/get-client>`.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the client resource. Every URL object will
       contain an ``href`` and a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of clients.

          * - ``previous``

              .. type:: URL object

            - The previous set of clients, if available.

          * - ``next``

              .. type:: URL object

            - The next set of clients, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the documentation of this endpoint.

Example
-------

.. code-block:: bash
  :linenos:

  curl -X GET https://api.mollie.com/v2/clients?limit=3 \
     -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 3,
       "_embedded": {
           "clients": [
               {
                   "resource": "client",
                   "id": "org_1337",
                   "organizationCreatedAt": "2018-03-21T13:13:37+00:00",
                   "commission": {
                       "count": 200,
                       "totalAmount": {
                           "currency": "EUR",
                           "value": "10.00"
                       }
                   },
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/clients/org_1337",
                           "type": "application/hal+json"
                       },
                       "organization": {
                           "href": "https://api.mollie.com/v2/organizations/org_1337",
                           "type": "application/hal+json"
                       },
                       "onboarding": {
                           "href": "https://api.mollie.com/v2/onboarding/org_1337",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/partners-api/get-client",
                           "type": "text/html"
                       }
                   }
               },
               { },
               { }
           ],
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/clients?limit=3",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/clients?from=org_1379&limit=3",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/partners-api/list-clients",
               "type": "text/html"
           }
       }
   }
