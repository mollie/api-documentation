Update profile
==============
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/profiles/*id*

.. authentication::
   :api_keys: false
   :oauth: true

A profile is required to process payments. A profile can easily be created and updated via the Dashboard manually.
However, the Mollie API also allows automatic profile creation and updates via the Profiles API.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw``.

.. list-table::
   :widths: auto

   * - ``name``

       .. type:: string
          :required: true

     - The profile's new name.

   * - ``website``

       .. type:: string
          :required: true

     - The new URL to the profile's website or application. The URL should start with ``https://`` or ``http://``.

   * - ``email``

       .. type:: string
          :required: true

     - The new email address associated with the profile's trade name or brand.

   * - ``phone``

       .. type:: phone number
          :required: true

     - The new phone number associated with the profile's trade name or brand. Must be in the
       `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example ``+31208202070``.


   * - ``categoryCode``

       .. type:: integer
          :required: false

     - The new industry identifier associated with the profile's tradename or brand.

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

     - The new profile mode. Note switching from test to production mode will trigger a verification process
       where we review the profile.

       Possible values: ``live`` ``test``

Response
--------
``200`` ``application/hal+json; charset=utf-8``

The updated profile object is returned, as described in :doc:`Get profile </reference/v2/profiles-api/get-profile>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X PATCH https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ" \
       -d "name=My website name - Update 1" \
       -d "website=https://www.mywebsite2.com" \
       -d "email=info@mywebsite2.com" \
       -d "phone=+31208202070" \
       -d "categoryCode=5399"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
    $profile = $mollie->profiles->get("pfl_v9hTwCvYqw");

    $profile->name = "My website name - Update 1";
    $profile->website = "https://www.mywebsite2.com";
    $profile->email = "info@mywebsite2.com";
    $profile->phone = "+31208202070";
    $profile->categoryCode = "5399";
    $updatedProfile = $profile->update();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "profile",
       "id": "pfl_v9hTwCvYqw",
       "mode": "live",
       "name": "My website name - Update 1",
       "website": "https://www.mywebsite2.com",
       "email": "info@mywebsite2.com",
       "phone": "+31208202070",
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
