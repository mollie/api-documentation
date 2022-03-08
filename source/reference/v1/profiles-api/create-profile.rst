Create profile
==============
.. api-name:: Profiles API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for creating profiles in the new v2 API can be found
             :doc:`here </reference/v2/profiles-api/create-profile>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v1/profiles

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

In order to process payments, you need to create a website profile. A website profile can easily be created via the
Dashboard manually. However, the Mollie API also allows automatic profile creation via the Profiles API.

A profile's API keys can be set up with this API as well.

Parameters
----------
.. parameter:: name
   :type: string
   :condition: required

   The profile's name should reflect the trade name or brand name of the profile's website or application.

.. parameter:: website
   :type: string
   :condition: required

   The URL to the profile's website or application. The URL must be compliant to
   `RFC3986 <https://tools.ietf.org/html/rfc3986>`_ with the exception that we only accept URLs with ``http://`` or
   ``https://`` schemes and domains that contain a TLD. URLs containing an ``@`` are not allowed.

.. parameter:: email
   :type: string
   :condition: required

   The email address associated with the profile's trade name or brand.

.. parameter:: phone
   :type: string
   :condition: required

   The phone number associated with the profile's trade name or brand.

.. parameter:: businessCategory
   :type: string
   :condition: optional

   The industry associated with the profile's trade name or brand.

   Please refer to the documentation of the :ref:`business category <business-category>` for more information on which
   values are accepted.

.. parameter:: categoryCode
   :type: integer
   :condition: optional

   The industry associated with the profile's trade name or brand.

   .. warning:: This parameter is deprecated and will be removed in 2022. Please use the ``businessCategory`` parameter
                instead.

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

.. parameter:: mode
   :type: string
   :condition: optional

   Creating a test profile by setting this parameter to ``test``, enables you to start using the API without having to
   provide all your business info just yet. Defaults to ``live``.

   Possible values: ``live`` ``test``

Response
--------
``201`` ``application/json``

A profile object is returned, as described in :doc:`Get profile </reference/v1/profiles-api/get-profile>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v1/profiles \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ" \
       -d "name=My website name" \
       -d "website=https://www.mywebsite.com" \
       -d "email=info@mywebsite.com" \
       -d "phone=31123456789" \
       -d "businessCategory=OTHER_MERCHANDISE" \
       -d "mode=live"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json

   {
       "resource": "profile",
       "id": "pfl_v9hTwCvYqw",
       "mode": "live",
       "name": "My website name",
       "website": "https://www.mywebsite.com",
       "email": "info@mywebsite.com",
       "phone": "31123456789",
       "businessCategory": "OTHER_MERCHANDISE",
       "categoryCode": 5399,
       "status": "unverified",
       "review": {
           "status": "pending"
       },
       "createdDatetime": "2018-03-17T00:22:06.0Z",
       "updatedDatetime": "2018-03-17T00:22:06.0Z",
       "links": {
           "apikeys": "https://api.mollie.com/v1/profiles/pfl_v9hTwCvYqw/apikeys"
       }
   }
