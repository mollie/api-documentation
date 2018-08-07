Create profile
==============
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles

.. authentication::
   :api_keys: false
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

     - The profile's name should reflect the tradename or brand name of the profile's website or application.

   * - ``website``

       .. type:: string
          :required: true

     - The URL to the profile's website or application. The URL should start with ``https://`` or ``http://``.

   * - ``email``

       .. type:: string
          :required: true

     - The email address associated with the profile's tradename or brand.

   * - ``phone``

       .. type:: phone number
          :required: true

     - The phone number associated with the profile's trade name or brand. Must be in the
       `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example ``+31208202070``.

   * - ``categoryCode``

       .. type:: integer
          :required: false

     - The industry associated with the profile's tradename or brand.

       Possible values:

       * ``5399`` General merchandise
       * ``5732`` Electronics, computers, and software
       * ``4121`` Travel, rental, and transportation
       * ``6012`` Financial services
       * ``5499`` Food and drinks
       * ``7999`` Events, festivals, and recreation
       * ``5192`` Books, magazines, and newspapers
       * ``7299`` Personal services
       * ``8398`` Charity and donations
       * ``0`` Other

   * - ``mode``

       .. type:: string
          :required: false

     - Creating a test profile by setting this parameter to ``test``, enables you to start using the API
       without having to provide all your business info just yet. Defaults to ``live``.

       Possible values: ``live`` ``test``

Response
--------
``201`` ``application/json; charset=utf-8``

A profile object is returned, as described in :doc:`Get profile </reference/v2/profiles-api/get-profile>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
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

Request (PHP)
^^^^^^^^^^^^^
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

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

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
