Get Organization API
====================
.. api-name:: Organizations API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving organizations in the new v2 API can be found
             :doc:`here </reference/v2/organizations-api/get-organization>`. For more information on the v2 API, refer
             to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/organizations/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Organizations reflect the legal entities associated with the Mollie account. Payments, Refunds, Profiles, Settlements,
all belong to an Organization, therefore it's often referred to as *Resource Owner*. The Organizations resource contains
basic information about the legal entity, as well as insight into the activation statuses of payment methods for
example. Mollie performs identity verification and business intent validation before accepting organizations and
transferring payments to them, in order to protect buyers.

Parameters
----------
Replace ``id`` in the endpoint URL by a full organization ID like ``org_1234567`` or use the ``me`` alias.

If you're an official Mollie Reseller, you can retrieve the organizations that you have signed up.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains an organization object. Will always contain ``organization`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this organization, for example ``org_1234567``.

   * - ``name``

       .. type:: string

     - The organization's official name.

   * - ``email``

       .. type:: string

     - The email address of the organization.

   * - ``address``

       .. type:: string

     - The address where the organizations is established.

   * - ``postalCode``

       .. type:: string

     - The postal code of where the organization is established.

   * - ``city``

       .. type:: string

     - The name of the city where the organization is established.

   * - ``country``

       .. type:: string

     - The name of the country where the organization is established.

   * - ``countryCode``

       .. type:: string

     - The two-letter code of the country where the organization is established.

   * - ``registrationType``

       .. type:: string

     - National or international registration type of the organization's legal entity.

   * - ``registrationNumber``

       .. type:: string

     - Registration number of the organization's legal entity.

   * - ``registrationDatetime``

       .. type:: datetime

     - Registration date of the organization's legal entity.

   * - ``vatNumber``

       .. type:: string

     - The VAT number of the organization, if based in the European Union. The VAT number has been checked with the
       `VIES <http://ec.europa.eu/taxation_customs/vies/>`_ service by Mollie.

   * - ``vatRegulation``

       .. type:: string

     - The organization's VAT regulation, if based in the European Union. Either ``shifted`` (VAT is shifted) or ``dutch`` (Dutch VAT rate).

   * - ``verifiedDatetime``

       .. type:: datetime

     - Date on which Mollie's verification of this organization completed successfully.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/organizations/org_1234567 \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "organization",
       "id": "org_1234567",
       "name": "Mollie B.V.",
       "email": "info@mollie.com",
       "address": "Keizersgracht 313",
       "postalCode": "1016EE",
       "city": "Amsterdam",
       "country": "Netherlands",
       "countryCode": "NL",
       "registrationType": "bv",
       "registrationNumber": "30204462",
       "registrationDatetime": "2004-04-01T09:41:00.0Z",
       "vatNumber": "NL123456789B01",
       "verifiedDatetime": "2007-06-29T09:41:00.0Z"
   }
