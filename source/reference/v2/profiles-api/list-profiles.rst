List profiles
=============
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/profiles

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all profiles available on the account.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the profile with this ID. The profile with
   this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of profiles to return (with a maximum of 250).

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of profiles found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: profiles
      :type: array

      An array of profile objects as described in :doc:`Get profile </reference/v2/profiles-api/get-profile>`.

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of profiles. Every URL object will contain an ``href`` and a ``type`` field.

   .. parameter:: self
      :type: URL object

      The URL to the current set of profiles.

   .. parameter:: previous
      :type: URL object

      The previous set of profiles, if available.

   .. parameter:: next
      :type: URL object

      The next set of profiles, if available.

   .. parameter:: documentation
      :type: URL object

      The URL to the profiles list endpoint documentation.

Example
-------
.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/profiles?limit=5 \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $profiles = $mollie->profiles->page();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_access_token("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ")

      profiles = mollie_client.profiles.list()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      profiles = Mollie::Profile.all

Response
^^^^^^^^

.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "_embedded": {
           "profiles": [
               {
                   "resource": "profiles",
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
               },
               { },
               { },
               { },
               { }
           ]
       },
       "count": 5,
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/profiles-api/list-profiles",
               "type": "text/html"
           },
           "self": {
               "href": "https://api.mollie.com/v2/profiles?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/profiles?from=pfl_3RkSN1zuPE&limit=5",
               "type": "application/hal+json"
           }
       }
   }
