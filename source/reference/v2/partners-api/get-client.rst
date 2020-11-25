Get Client API
==============
.. api-name::Partners API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/clients/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve a single client by its ID.

Parameters
----------
Replace ``id`` in the endpoint URL by the client’s ID, for example ``org_1337``.

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

   * - ``resource``

       .. type:: string

     - Indicates the response contains a client object. Will always contain ``client`` for this
       endpoint.

   * - ``id``

       .. type:: string

     - The unique identifier of the client, which corresponds to the ID of the organization, for
       example ``org_1337``.

   * - ``organizationCreatedAt``

       .. type:: date
          :required: false

     - |
       | The date and time the organization was created, in
         `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.
       | Only returned when one of the embeds is available.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the client resource. Every URL object will
       contain an ``href`` and a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the client itself.

          * - ``organization``

              .. type:: URL object
                 :required: false

            - The API resource URL of the client's organization. Only available when the include
              could have been used.

          * - ``onboarding``

              .. type:: URL object
                 :required: false

            - The API resource URL of the client's onboarding status. Only available when the
              include could have been used.

          * - ``documentation``

              .. type:: URL object

            - The URL to the documentation of this endpoint.

Example
-------

.. code-block:: bash
  :linenos:

  curl -X GET https://api.mollie.com/v2/clients/org_1337 \
     -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

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
   }
