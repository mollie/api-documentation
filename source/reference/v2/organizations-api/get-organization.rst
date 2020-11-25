Get Organization API
====================
.. api-name:: Organizations API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/organizations/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve an organization by its ID.

If you do not know the organization's ID, you can use the organizations list endpoint to retrieve all organizations that
are accessible.

.. note:: You can only retrieve organizations that the authenticated organization is connected to.

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

     - Indicates the response contains a method object. Will always contain ``organization`` for this endpoint.

   * - ``id``

       .. type:: string

     - The unique identifier of the organization method.

   * - ``name``

       .. type:: string

     - The name of the organization.

   * - ``locale``

       .. type:: string

     - The preferred locale of the merchant which has been set in Mollie Dashboard.

   * - ``address``

       .. type:: address object

     - The address of the organization.

   * - ``registrationNumber``

       .. type:: string

     - The registration number of the organization at the (local) chamber of commerce.

   * - ``vatNumber``

       .. type:: string

     - The VAT number of the organization, if based in the European Union. The VAT number has been checked with the
       `VIES <http://ec.europa.eu/taxation_customs/vies/>`_ service by Mollie.

   * - ``vatRegulation``

       .. type:: string

     - The organization's VAT regulation, if based in the European Union. Either ``shifted`` (VAT is shifted) or ``dutch`` (Dutch VAT rate).

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the organization. Every URL object will contain an ``href`` and
       a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the organization itself.

          * - ``dashboard``

              .. type:: URL object

            - Direct link to the organization's Mollie Dashboard.

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment method retrieval endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/organizations/org_12345678 \
      -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $organization = $mollie->organizations->get("org_12345678");

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      organization = Mollie::Organization.get('org_12345678')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "organization",
       "id": "org_12345678",
       "name": "Mollie B.V.",
       "email": "info@mollie.com",
       "address": {
           "streetAndNumber": "Keizersgracht 313",
           "postalCode": "1016 EE",
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
           "dashboard": {
               "href": "https://mollie.com/dashboard/org_12345678",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/organizations-api/get-organization",
               "type": "text/html"
           }
       }
   }
