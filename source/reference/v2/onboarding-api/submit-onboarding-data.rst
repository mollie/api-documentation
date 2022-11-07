Submit onboarding data
======================
.. api-name:: Onboarding API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/onboarding/me

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Submit data that will be prefilled in the merchant's onboarding. Please note that the data you submit will only be
processed when the :doc:`onboarding status </reference/v2/onboarding-api/get-onboarding-status>` is ``needs-data``.

.. note:: Information that the merchant has entered in their dashboard will not be overwritten.

Parameters
----------
Please note that even though all parameters are optional, at least one of them needs to be provided in the request.

.. parameter:: organization
   :type: object
   :condition: optional

   Data of the organization you want to provide.

   .. parameter:: name
      :type: string
      :condition: optional

      Name of the organization.

   .. parameter:: address
      :type: address object
      :condition: optional

      Address of the organization.

      .. parameter:: streetAndNumber
         :type: string
         :condition: required

         The street name and house number of the organization. If an address is provided, this field is required.

      .. parameter:: postalCode
         :type: string
         :condition: conditional

         The postal code of the organization. If an address is provided, this field is required for countries with a
         postal code system.

      .. parameter:: city
         :type: string
         :condition: required

         The city of the organization. If an address is provided, this field is required.

      .. parameter:: country
         :type: string
         :condition: required

         The country of the address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.
         If an address is provided, this field is required.

   .. parameter:: registrationNumber
      :type: string
      :condition: optional

      The Chamber of Commerce registration number of the company.

   .. parameter:: vatNumber
      :type: string
      :condition: optional

      The VAT number of the company, if based in the European Union. The VAT number will be checked with the
      `VIES <http://ec.europa.eu/taxation_customs/vies/>`_ service by Mollie.

   .. parameter:: vatRegulation
      :type: string
      :condition: optional

      The organization's VAT regulation, if based in the European Union. Either ``shifted`` (VAT is shifted) or
      ``dutch`` (Dutch VAT rate) is accepted.

.. parameter:: profile
   :type: object
   :condition: optional

   Data of the payment profile you want to provide.

   .. parameter:: name
      :type: string
      :condition: optional

      The profile name should reflect the trade name or brand name of the profile's website or application.

   .. parameter:: url
      :type: string
      :condition: optional

      The URL to the profile's website or application. The URL must be compliant to
      `RFC3986 <https://tools.ietf.org/html/rfc3986>`_ with the exception that we only accept URLs with ``http://`` or
      ``https://`` schemes and domains that contain a TLD. URLs containing an ``@`` are not allowed.

   .. parameter:: email
      :type: string
      :condition: optional

      The email address associated with the profile's trade name or brand.

   .. parameter:: description
      :type: string
      :condition: optional

      A description of what kind of goods and/or products will be offered via the payment profile.

   .. parameter:: phone
      :type: string
      :condition: optional

      The phone number associated with the profile's trade name or brand. Must be in the
      `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example ``+31208202070``.

   .. parameter:: businessCategory
      :type: string
      :condition: optional

      The industry associated with the profile's trade name or brand.

      Please refer to the documentation of the :ref:`business category <business-category>` for more information on which
      values are accepted.

   .. parameter:: categoryCode
      :type: integer
      :condition: optional

      .. warning:: This parameter is deprecated and will be removed in 2022. Please use the ``businessCategory`` parameter
                   instead.

      The industry associated with the profile's trade name or brand.

      Possible values:

      * ``5192`` Books, magazines and newspapers
      * ``5262`` Marketplaces, crowdfunding, donation platforms
      * ``5399`` General merchandise
      * ``5499`` Food and drinks
      * ``5533`` Automotive Products
      * ``5641`` Children Products
      * ``5651`` Clothing & Shoes
      * ``5712`` Home furnishing
      * ``5732`` Electronics, computers and software
      * ``5734`` Hosting/VPN services
      * ``5735`` Entertainment
      * ``5815`` Credits/vouchers/giftcards
      * ``5921`` Alcohol
      * ``5944`` Jewelry & Accessories
      * ``5945`` Hobby, Toy, and Game Shops
      * ``5977`` Health & Beauty products
      * ``6012`` Financial services
      * ``6051`` Crypto currency
      * ``7299`` Consultancy
      * ``7922`` Events, conferences, concerts, tickets
      * ``7997`` Gyms, membership fee based sports
      * ``7999`` Travel, rental and transportation
      * ``8111`` Lawyers and legal advice
      * ``8299`` Advising/coaching/training
      * ``8398`` Charity and donations
      * ``8699`` Political parties
      * ``9399`` Government services
      * ``0`` Other

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/onboarding/me \
           -H "Content-Type: application/json" \
           -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
           -d '{
                   "organization": {
                      "name": "Mollie B.V.",
                      "address": {
                         "streetAndNumber": "Keizersgracht 126",
                         "postalCode": "1015 CW",
                         "city": "Amsterdam",
                         "country": "NL"
                      },
                      "registrationNumber": "30204462",
                      "vatNumber": "NL815839091B01"
                   },
                   "profile": {
                      "name": "Mollie",
                      "url": "https://www.mollie.com",
                      "email": "info@mollie.com",
                      "phone": "+31208202070",
                      "businessCategory": "MONEY_SERVICES"
                   }
               }'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $mollie->onboarding->submit([
          "organization" => [
              "name" => "Mollie B.V.",
              "address" => [
                 "streetAndNumber" => "Keizersgracht 126",
                 "postalCode" => "1015 CW",
                 "city" => "Amsterdam",
                 "country" => "NL",
              ],
              "registrationNumber" => "30204462",
              "vatNumber" => "NL815839091B01",
          ],
          "profile" => [
              "name" => "Mollie",
              "url" => "https://www.mollie.com",
              "email" => "info@mollie.com",
              "phone" => "+31208202070",
              "businessCategory": "MONEY_SERVICES",
          ],
      ]);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_access_token("access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      onboarding = mollie_client.onboarding.create({
          "organization": {
              "name": "Mollie B.V.",
              "address": {
                  "streetAndNumber": "Keizersgracht 126",
                  "postalCode": "1015 CW",
                  "city": "Amsterdam",
                  "country": "NL",
              },
              "registrationNumber": "30204462",
              "vatNumber": "NL815839091B01",
          },
          "profile": {
              "name": "Mollie",
              "url": "https://www.mollie.com",
              "email": "info@mollie.com",
              "phone": "+31208202070",
              "categoryCode": 6012,
          },
      })

   .. code-block:: ruby
      :linenos:

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      Mollie::Onboarding.submit(
        organization: {
          name: "Mollie B.V.",
          address: {
             streetAndNumber: "Keizersgracht 126",
             postalCode: "1015 CW",
             city: "Amsterdam",
             country: "NL"
          },
          registrationNumber: "30204462",
          vatNumber: "NL815839091B01"
        },
        profile: {
          name: "Mollie",
          url: "https://www.mollie.com",
          email: "info@mollie.com",
          phone: "+31208202070",
          businessCategory: "MONEY_SERVICES"
        }
      )

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
