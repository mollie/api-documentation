List clients
============
.. api-name:: Clients API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/clients

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all clients linked to your partner account.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the client with this
   ID. The client with this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of clients to return (with a maximum of 250).

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint also allows for embedding additional information by appending the following values via
the ``embed`` query string parameter.

* ``organization`` Include the :doc:`organization </reference/v2/organizations-api/get-organization>` of the client.
  Available when partner type is ``signuplink`` or when partner type is ``oauth`` and the scopes (of the app that causes
  the link on the organization) include ``organizations.read``.
* ``onboarding`` Include the :doc:`onboarding status </reference/v2/onboarding-api/get-onboarding-status>` of the
  client. Available when partner type is ``signuplink`` or when partner type is ``oauth`` and the scopes (of the app
  that causes the link on the organization) include ``onboarding.read``.

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of clients found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: clients
      :type: array

      An array of client objects as described in :doc:`Get client </reference/v2/clients-api/get-client>`.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the client resource. Every URL object will contain an ``href`` and a
   ``type`` field.

   .. parameter:: self
      :type: URL object

      The URL to the current set of clients.

   .. parameter:: previous
      :type: URL object

      The previous set of clients, if available.

   .. parameter:: next
      :type: URL object

      The next set of clients, if available.

   .. parameter:: documentation
      :type: URL object

      The URL to the documentation of this endpoint.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/clients?limit=3 \
         -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_access_token("access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      client = mollie_client.clients.list()

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
                           "href": "https://docs.mollie.com/reference/v2/clients-api/get-client",
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
               "href": "https://docs.mollie.com/reference/v2/clients-api/list-clients",
               "type": "text/html"
           }
       }
   }
