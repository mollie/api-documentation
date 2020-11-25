List API keys
=============
.. api-name:: Profiles API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/profiles/*id*/apikeys

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

List the active API keys for the given payment profile.

.. note::
   You cannot retrieve API keys for a different account than your own, even if you have a valid OAuth token.

If you wish to create a payment on behalf of a different merchant, use your app's access token and the ``profileId`` of
one of the merchant's payment profiles when :doc:`creating a payment </reference/v1/payments-api/create-payment>`.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment profile's ID, for example ``pfl_v9hTwCvYqw``.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of API keys found in ``data``.

   * - ``data``

       .. type:: array

     - An array of API key objects as described in :doc:`Get API key </reference/v1/profiles-api/get-key>`.

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
       "count": 2,
       "data": [
           {
               "resource": "profile_api_key",
               "id": "live",
               "key": "live_eSf9fQRwpsdfPY8y3tUFFmqjADRKyA",
               "createdDatetime": "2018-03-17T01:47:47.0Z"
           },
           {
               "resource": "profile_api_key",
               "id": "test",
               "key": "test_UgfUyzqgrbh6dAfjYBQTMhPD3nQTda",
               "createdDatetime": "2018-03-17T01:47:47.0Z"
           }
       ]
   }
