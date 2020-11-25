List profiles
=============
.. api-name:: Profiles API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving profiles in the new v2 API can be found
             :doc:`here </reference/v2/profiles-api/list-profiles>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/profiles

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Retrieve all payment profiles available on the account.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``offset``

       .. type:: integer
          :required: false

     - The number of payment profiles to skip.

   * - ``count``

       .. type:: integer
          :required: false

     - The number of payment profiles to return (with a maximum of 250).

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of payment profiles available.

   * - ``offset``

       .. type:: integer

     - The number of skipped payment profiles as requested.

   * - ``count``

       .. type:: integer

     - The number of payment profiles found in ``data``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``data``

       .. type:: array

     - An array of payment profile objects as described in :doc:`Get profile </reference/v1/profiles-api/get-profile>`.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of payment profiles, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of payment profiles, if available.

          * - ``next``

              .. type:: string

            - The next set of payment profiles, if available.

          * - ``first``

              .. type:: string

            - The first set of payment profiles, if available.

          * - ``last``

              .. type:: string

            - The last set of payment profiles, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/profiles \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 25,
       "offset": 0,
       "count": 10,
       "data": [
           {
               "resource": "profile",
               "id": "pfl_v9hTwCvYqw",
               "mode": "live",
               "name": "My website name",
               "website": "https://www.mywebsite.com",
               "email": "info@mywebsite.com",
               "phone": "31123456789",
               "categoryCode": 5399,
               "status": "unverified",
               "review": {
                   "status": "pending"
               },
               "createdDatetime": "2018-03-16T23:33:43.0Z",
               "updatedDatetime": "2018-03-16T23:33:43.0Z",
               "links": {
                   "apikeys": "https://api.mollie.com/v1/profiles/pfl_v9hTwCvYqw/apikeys"
               }
           },
           {
               "resource": "profile",
               "id": "pfl_tqWEcAdnjG",
               "mode": "test",
               "name": "My website name",
               "website": "https://www.mywebsite.com",
               "email": "info@mywebsite.com",
               "phone": "31123456789",
               "categoryCode": 5399,
               "status": "unverified",
               "createdDatetime": "2018-03-17T01:47:45.0Z",
               "updatedDatetime": "2018-03-17T01:47:45.0Z",
               "links": {
                   "apikeys": "https://api.mollie.com/v1/profiles/pfl_tqWEcAdnjG/apikeys"
               }
           },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/profiles?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/profiles?count=10&offset=10",
           "last": "https://api.mollie.com/v1/profiles?count=10&offset=20"
       }
   }
