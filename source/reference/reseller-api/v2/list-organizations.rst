List organizations
==================
.. api-name:: Reseller API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/reseller/organizations

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all organizations that are connected to your partner-account.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the organization with this ID. The
       organization with this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of organizations to return (with a maximum of 250).

Response
--------
``200`` ``application/hal+json``

.. parameter:: _embedded
   :type: object

   The object containing the queried data.

   .. parameter:: organizations
      :type: array

            - An array of organization objects as described in
              :doc:`Get organization </reference/v2/organizations-api/get-organization>`.

.. parameter:: count
   :type: integer

   The number of organizations found in ``_embedded``, which is either the requested number (with a maximum of 250)
       or the default number.

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of organizations. Every URL object will contain an ``href`` and a
       ``type`` field.

   .. parameter:: self
      :type: URL object

            - The URL to the current set of organizations.

   .. parameter:: previous
      :type: URL object

            - The previous set of organizations, if available.

   .. parameter:: next
      :type: URL object

            - The next set of organizations, if available.

   .. parameter:: documentation
      :type: URL object

            - The URL to the organizations list endpoint documentation.

Example
-------
.. code-block:: bash
  :linenos:

  curl -X GET https://api.mollie.com/v2/reseller/organizations?limit=5 \
     -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "_embedded": {
           "organizations": [
               {
                   "resource": "organization",
                   "id": "org_12345678",
                   "name": "Mollie B.V.",
                   "email": "info@mollie.com",
                   "address": {
                       "streetAndNumber": "Keizersgracht 126",
                       "postalCode": "1015 CW",
                       "city": "Amsterdam",
                       "country": "NL"
                   },
                   "registrationNumber": "30204462",
                   "vatNumber": "NL815839091B01",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/organizations/org_12345678",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/organizations-api/get-organization",
                           "type": "text/html"
                       }
                   }
               },
               { },
               { },
               { },
               { }
           ]
       },
       "count": 5,
       "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/organizations-api/list-organizations",
                "type": "text/html"
            },
            "self": {
                "href": "https://api.mollie.com/v2/organizations?limit=5",
                "type": "application/hal+json"
            },
            "previous": null,
            "next": null
        }
   }
