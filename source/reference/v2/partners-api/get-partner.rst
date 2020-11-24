Get Partner API
===============
.. api-name::Partners API
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

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a partner object. Will always contain ``partner`` for this
       endpoint.

   * - ``partnerType``

       .. type:: string

     - Indicates the type of partner. Will be ``null`` if the currently authenticated
       organization is not enrolled as a partner.

       Possible values: ``oauth``, ``signuplink``, ``useragent``.

   * - ``isCommissionPartner``

       .. type:: boolean
          :required: false

     - Will be true if partner is receiving commissions. Will be omitted otherwise.

   * - ``userAgentTokens``

       .. type:: array
          :required: false

     - Array of user agent token objects. Present if the partner is of type ``useragent`` or if the
       partner has had user agent tokens in the past. Will be omitted otherwise.

       User agent token object:

       .. list-table::
          :widths: auto

          * - ``token``

              .. type:: string

            - The unique user agent token.

          * - ``startsAt``

              .. type:: date

            - The date and time from which the token is active, in
              `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

          * - ``endsAt``

              .. type:: date

            - | The date and time after which the token is no longer active, in
                `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. Will be ``null`` if no
                end date has been set.

   * - ``partnerContractSignedAt``

       .. type:: date
          :required: false

     - |
       | The date and time the contract was signed, in
         `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. Will be omitted if the
         contract has not yet been signed, or if ``partnerType`` is ``null``.

   * - ``partnerContractUpdateAvailable``

       .. type:: boolean
          :required: false

     - |
       | Will be ``true`` if an updated contract is available, requiring the partner’s agreement. 
         Will be omitted otherwise.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the partner resource. Every URL object will
       contain an ``href`` and a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the partner itself.

          * - ``documentation``

              .. type:: URL object

            - The URL to the documentation of this endpoint.

          * - ``signuplink``

              .. type:: URL object
                 :required: false

            - The URL that can be used to have new organizations sign up and be automatically linked
              to this partner. Will be omitted if the partner is not of type ``signuplink``.

Example
-------

.. code-block:: bash
  :linenos:

  curl -X GET https://api.mollie.com/v2/organizations/me/partner \
     -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

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
               "href": "https://docs.mollie.com/reference/v2/partners-api/get-partner",
               "type": "text/html"
           },
           "signuplink": {
               "href": "https://www.mollie.com/dashboard/signup/myCode?lang=en",
               "type": "text/html"
           }
       }
   }
