Get partner
===========
.. api-name:: Organizations API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/organizations/me/partner

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve details about the partner status of the currently authenticated organization.

Parameters
----------
No parameters applicable for this endpoint.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a partner object. Will always contain ``partner`` for this endpoint.

.. parameter:: partnerType
   :type: string

   Indicates the type of partner. Will be ``null`` if the currently authenticated organization is not enrolled as a
   partner.

   Possible values: ``oauth`` ``signuplink`` ``useragent``

.. parameter:: isCommissionPartner
   :type: boolean
   :condition: optional

   Will be true if partner is receiving commissions. Will be omitted otherwise.

.. parameter:: userAgentTokens
   :type: array
   :condition: optional

   Array of user agent token objects. Present if the partner is of type ``useragent`` or if the partner has had user
   agent tokens in the past. Will be omitted otherwise.

   .. parameter:: token
      :type: string

      The unique user agent token.

   .. parameter:: startsAt
      :type: date

      The date and time from which the token is active, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   .. parameter:: endsAt
      :type: date

      The date and time after which the token is no longer active, in
      `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. Will be ``null`` if no end date has been set.

.. parameter:: partnerContractSignedAt
   :type: date
   :condition: optional

   The date and time the contract was signed, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. Will be
   omitted if the contract has not yet been signed, or if ``partnerType`` is ``null``.

.. parameter:: partnerContractUpdateAvailable
   :type: boolean
   :condition: optional

   Will be ``true`` if an updated contract is available, requiring the partner's agreement. Will be omitted otherwise.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the partner resource. Every URL object will contain an ``href`` and a
   ``type`` field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the partner itself.

   .. parameter:: documentation
      :type: URL object

      The URL to the documentation of this endpoint.

   .. parameter:: signuplink
      :type: URL object
      :condition: optional

      The URL that can be used to have new organizations sign up and be automatically linked to this partner. Will be
      omitted if the partner is not of type ``signuplink``.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/organizations/me/partner \
         -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
         config.api_key = 'access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      partner = Mollie::Partner.current

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "partner",
       "partnerType": "signuplink",
       "partnerContractSignedAt": "2018-03-20T13:13:37+00:00",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/organizations/me/partner",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/organizations-api/get-partner",
               "type": "text/html"
           },
           "signuplink": {
               "href": "https://www.mollie.com/dashboard/signup/myCode?lang=en",
               "type": "text/html"
           }
       }
   }
