Get API key
===========
.. api-name:: Profiles API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/profiles/*profileId*/apikeys/*mode*

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Get the API key for the given payment profile and profile mode.

.. note::
   You cannot retrieve API keys for a different account than your own, even if you have a valid OAuth token.

If you wish to create a payment on behalf of a different merchant, use your app's access token and the ``profileId`` of
one of the merchant's payment profiles when :doc:`creating a payment </reference/v1/payments-api/create-payment>`.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment profile's ID, and replace ``mode`` by ``live`` or ``test``. For
example: ``/v1/profiles/pfl_v9hTwCvYqw/apikeys/live``.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains an API key object. Will always contain ``profile_api_key`` for this endpoint.

   * - ``id``

       .. type:: string

     - The API key's identifier.

       Possible values: ``live`` ``test``

   * - ``key``

       .. type:: string

     - The actual API key, which you'll use when creating payments or when otherwise communicating with the API. Never
       share the API key with anyone.

   * - ``createdDatetime``

       .. type:: datetime

     - The API key's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/profiles/pfl_v9hTwCvYqw/apikeys/live \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "profile_api_key",
       "id": "live",
       "key": "live_eSf9fQRwpsdfPY8y3tUFFmqjADRKyA",
       "createdDatetime": "2018-03-17T01:47:48.0Z"
   }
