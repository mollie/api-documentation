Get profile
===========
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/profiles/*id*

.. authentication::
   :api_keys: false
   :oauth: true

Retrieve details of a profile, using the profile's identifier.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw``.

Response
--------
``200`` ``application/json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a profile object. Will always contain ``profile`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this profile, for example ``pfl_v9hTwCvYqw``.

   * - ``mode``

       .. type:: string

     - Indicates whether the profile is in test or production mode.

       Possible values: ``live`` ``test``

   * - ``name``

       .. type:: string

     - The profile's name, this will usually reflect the tradename or brand name of the profile's website or
       application.

   * - ``website``

       .. type:: string

     - The URL to the profile's website or application.

   * - ``email``

       .. type:: string

     - The email address associated with the profile's trade name or brand.

   * - ``phone``

       .. type:: phone number

     - The phone number associated with the profile's trade name or brand.

   * - ``categoryCode``

       .. type:: integer

     - The industry associated with the profile's trade name or brand.

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

   * - ``status``

       .. type:: string

     - The profile status determines whether the profile is able to receive live payments.

       Possible values:

       * ``unverified`` The profile has not been verified yet and can only be used to create test payments.
       * ``verified`` The profile has been verified and can be used to create live payments and test payments.
       * ``blocked`` The profile is blocked and can thus no longer be used or changed.

   * - ``review``

       .. type:: object

     - The presence of a review object indicates changes have been made that have not yet been approved by Mollie.
       Changes to test profiles are approved automatically, unless a switch to a live profile has been requested. The
       review object will therefore usually be ``null`` in test mode.

       .. list-table::
          :widths: auto

          * - ``status``

              .. type:: string

            - The status of the requested profile changes.

              Possible values:

              * ``pending`` The changes are pending review. We will review your changes soon.
              * ``rejected`` We've reviewed and rejected your changes.

   * - ``createdAt``

       .. type:: datetime

     - The profile's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the profile. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the profile itself.

          * - ``chargebacks``

              .. type:: URL object

            - The API resource URL of the chargebacks that belong to this profile.

          * - ``methods``

              .. type:: URL object

            - The API resource URL of the methods that are enabled for this profile.

          * - ``payments``

              .. type:: URL object

            - The API resource URL of the payments that belong to this profile.

          * - ``refunds``

              .. type:: URL object

            - The API resource URL of the refunds that belong to this profile.

          * - ``checkoutPreviewUrl``

              .. type:: URL object

            - The Checkout preview URL. You need to be logged in to access this page.

          * - ``documentation``

              .. type:: URL object

            - The URL to the profile retrieval endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
    $profile = $mollie->profiles->get("pfl_v9hTwCvYqw");

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
       "name": "My website name",
       "website": "https://www.mywebsite.com",
       "email": "info@mywebsite.com",
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
