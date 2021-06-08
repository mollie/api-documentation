Create profile
==============
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

In order to process payments, you need to create a website profile. A website profile can easily be created via the
Dashboard manually. However, the Mollie API also allows automatic profile creation via the Profiles API.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``name``

       .. type:: string
          :required: true

     - The profile's name should reflect the trade name or brand name of the profile's website or application.

   * - ``website``

       .. type:: string
          :required: true

     - The URL to the profile's website or application. The URL must be compliant to
       `RFC3986 <https://tools.ietf.org/html/rfc3986>`_ with the exception that we only accept URLs with ``http://`` or
       ``https://`` schemes and domains that contain a TLD. URLs containing an ``@`` are not allowed.

   * - ``email``

       .. type:: string
          :required: true

     - The email address associated with the profile's trade name or brand.

   * - ``phone``

       .. type:: phone number
          :required: true

     - The phone number associated with the profile's trade name or brand. Must be in the
       `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example ``+31208202070``.

   * - ``categoryCode``

       .. type:: integer
          :required: false

     - The industry associated with the profile's trade name or brand.

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

   * - ``mode``

       .. type:: string
          :required: false

     - Creating a test profile by setting this parameter to ``test``, enables you to start using the API
       without having to provide all your business info just yet. Defaults to ``live``.

       Possible values: ``live`` ``test``

Response
--------
``201`` ``application/json``

A profile object is returned, as described in :doc:`Get profile </reference/v2/profiles-api/get-profile>`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/profiles \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ" \
         -d "name=My website name" \
         -d "website=https://www.mywebsite.com" \
         -d "email=info@mywebsite.com" \
         -d "phone=+31208202070" \
         -d "categoryCode=5399" \
         -d "mode=live"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $profile = $mollie->profiles->create([
            "name" => "My website name",
            "website" => "https://www.mywebsite.com",
            "email" => "info@mywebsite.com",
            "phone" => "+31208202070",
            "categoryCode" => "5399",
            "mode" => "live",
      ]);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_access_token('access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ')

      profile = mollie_client.profiles.create(
          data={
              'name': 'My website name',
              'website': 'https://www.mywebsite.com',
              'email': 'info@mywebsite.com',
              'phone': '+31208202070',
              'categoryCode': '5399',
              'mode': 'live',
          }
      )

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      profile = Mollie::Profile.create(
        name:         'My website name',
        website:      'https://www.mywebsite.com',
        email:        'info@mywebsite.com',
        phone:        '+31208202070',
        categoryCode: '5399',
        mode:         'live'
      )

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

   {
       "resource": "profile",
       "id": "pfl_v9hTwCvYqw",
       "mode": "live",
       "name": "My website name",
       "website": "https://www.mywebsite.com",
       "email": "info@mywebsite.com",
       "phone": "+31208202070",
       "categoryCode": 5399,
       "status": "unverified",
       "createdAt": "2018-03-20T09:28:37+00:00",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw",
               "type": "application/hal+json"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_123456789/settings/profiles/pfl_v9hTwCvYqw",
               "type": "text/html"
           },
           "chargebacks": {
               "href": "https://api.mollie.com/v2/chargebacks?profileId=pfl_v9hTwCvYqw",
               "type": "application/hal+json"
           },
           "methods": {
               "href": "https://api.mollie.com/v2/methods?profileId=pfl_v9hTwCvYqw",
               "type": "application/hal+json"
           },
           "payments": {
               "href": "https://api.mollie.com/v2/payments?profileId=pfl_v9hTwCvYqw",
               "type": "application/hal+json"
           },
           "refunds": {
               "href": "https://api.mollie.com/v2/refunds?profileId=pfl_v9hTwCvYqw",
               "type": "application/hal+json"
           },
           "checkoutPreviewUrl": {
               "href": "https://www.mollie.com/payscreen/preview/pfl_v9hTwCvYqw",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/profiles-api/create-profile",
               "type": "text/html"
           }
       }
   }
