Get profile
===========
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/profiles/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve details of a profile, using the profile's identifier.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw``.

Response
--------
``200`` ``application/json``

.. parameter:: resource
   :type: string

   Indicates the response contains a profile object. Will always contain ``profile`` for this endpoint.

.. parameter:: id
   :type: string

   The identifier uniquely referring to this profile, for example ``pfl_v9hTwCvYqw``.

.. parameter:: mode
   :type: string

   Indicates whether the profile is in test or production mode.

   Possible values:

   * ``live``: The profile is verified.
   * ``test``: The profile has not been verified yet and can only be used to create test payments.

.. parameter:: name
   :type: string

   The profile's name, this will usually reflect the trade name or brand name of the profile's website or application.

.. parameter:: website
   :type: string

   The URL to the profile's website or application.

.. parameter:: email
   :type: string

   The email address associated with the profile's trade name or brand.

.. parameter:: phone
   :type: phone number

   The phone number associated with the profile's trade name or brand.

.. parameter:: description
   :type: string

   The products or services that the profile's website offers.

.. parameter:: countriesOfActivity
   :type: array

   The list of countries where you expect that the majority of the profile's customers will live, in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

.. parameter:: businessCategory
   :type: string

   The industry associated with the profile's trade name or brand.

   Refer to the documentation of the :ref:`business category <business-category>` for more information on which
   values are accepted.

.. parameter:: categoryCode
   :type: integer

   .. warning:: This parameter is deprecated and will be removed in 2022. Use the ``businessCategory`` parameter
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

.. parameter:: status
   :type: string

   The profile status determines whether the profile is able to receive live payments.

   Possible values:

   * ``unverified``: The profile has not been verified yet and can only be used to create test payments.
   * ``verified``: The profile has been verified and can be used to create live payments and test payments.
   * ``blocked``: The profile is blocked and can thus no longer be used or changed.

.. parameter:: review
   :type: object

   The presence of a review object indicates changes have been made that have not yet been approved by Mollie. Changes
   to test profiles are approved automatically, unless a switch to a live profile has been requested. The review object
   will therefore usually be ``null`` in test mode.

   .. parameter:: status
      :type: string

      The status of the requested profile changes.

      Possible values:

      * ``pending``: The changes are pending review. We will review your changes soon.
      * ``rejected``: We have reviewed and rejected your changes.

.. parameter:: createdAt
   :type: datetime

   The profile's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the profile. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the profile itself.

   .. parameter:: dashboard
      :type: URL object

      Direct link to the profile in the Mollie Dashboard.

   .. parameter:: chargebacks
      :type: URL object

      The API resource URL of the chargebacks that belong to this profile.

   .. parameter:: methods
      :type: URL object

      The API resource URL of the methods that are enabled for this profile.

   .. parameter:: payments
      :type: URL object

      The API resource URL of the payments that belong to this profile.

   .. parameter:: refunds
      :type: URL object

      The API resource URL of the refunds that belong to this profile.

   .. parameter:: checkoutPreviewUrl
      :type: URL object

      The Checkout preview URL. You need to be logged in to access this page.

   .. parameter:: documentation
      :type: URL object

      The URL to the profile retrieval endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $profile = $mollie->profiles->get("pfl_v9hTwCvYqw");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_access_token("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ")

      profile = mollie_client.profiles.get("pfl_v9hTwCvYqw")

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      profile = Mollie::Profile.get('pfl_v9hTwCvYqw')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "profile",
       "id": "pfl_v9hTwCvYqw",
       "mode": "live",
       "name": "My website name",
       "website": "https://www.mywebsite.com",
       "email": "info@mywebsite.com",
       "phone": "+31208202070",
       "businessCategory": "OTHER_MERCHANDISE",
       "categoryCode": 5399,
       "status": "verified",
       "review": {
           "status": "pending"
       },
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
