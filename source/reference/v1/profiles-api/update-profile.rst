Update profile
==============
.. api-name:: Profiles API
   :version: 1

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v1/profiles/*id*

.. authentication::
   :api_keys: false
   :oauth: true

In order to process payments, you need to create a website profile. A website profile can easily be created via the
Dashboard manually. However, the Mollie API also allows automatic profile creation via the Profiles API.

A profile's API keys can be set up with this API as well.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment profile's ID, for example ``pfl_v9hTwCvYqw``.

.. list-table::
   :widths: auto

   * - | ``name``

       .. type:: string
          :required: true

     - The profile's new name.

   * - | ``website``

       .. type:: string
          :required: true

     - The new URL to the profile's website or application. The URL should start with ``https://`` or ``http://``.

   * - | ``email``

       .. type:: string
          :required: true

     - The new email address associated with the profile's tradename or brand.

   * - | ``phone``

       .. type:: string
          :required: true

     - The new phone number associated with the profile's tradename or brand.

   * - | ``categoryCode``

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

   * - | ``mode``

       .. type:: string
          :required: false

     - The new profile mode. Note switching from test to production mode will trigger a verification process
       where we review the payment profile.

       Possible values: ``live`` ``test``

Response
--------
``200`` ``application/json; charset=utf-8``

The updated profile object is returned, as described in :doc:`Get profile </reference/v1/profiles-api/get-profile>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v1/profiles/pfl_v9hTwCvYqw \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ" \
       -d "name=My website name - Update 1" \
       -d "website=https://www.mywebsite2.com" \
       -d "email=info@mywebsite2.com" \
       -d "phone=31123456789" \
       -d "categoryCode=5399"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json; charset=utf-8

   {
       "resource": "profile",
       "id": "pfl_v9hTwCvYqw",
       "mode": "live",
       "name": "My website name - Update 1",
       "website": "https://www.mywebsite2.com",
       "email": "info@mywebsite2.com",
       "phone": "31123456789",
       "categoryCode": 5399,
       "status": "verified",
       "review": {
           "status": "pending"
       },
       "createdDatetime": "2018-03-16T23:44:03.0Z",
       "updatedDatetime": "2018-03-17T01:47:46.0Z",
       "links": {
           "apikeys": "https://api.mollie.com/v1/profiles/pfl_v9hTwCvYqw/apikeys"
       }
   }
