List all subscriptions
======================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/subscriptions

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all subscriptions, ordered from newest to oldest.
By using an API key all the subscriptions created with the current website profile will be returned.
In the case of an OAuth Access Token relies the website profile on the ``profileId`` field. All
subscriptions of the merchant will be returned if you do not provide it.

Parameters
----------
.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the subscription with this ID. The
   subscription with this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of subscriptions to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can specify which profile you are retrieving subscriptions for using the
``profileId`` parameter. Organizations can have multiple profiles for each of their websites. If you omit the
``profileId`` parameter, the API will return all subscriptions across all profiles. See
:doc:`Profiles API </reference/v2/profiles-api/overview>` for more information.

For these authentication methods the optional ``testmode`` parameter is available as well to enable test mode.

.. parameter:: profileId
   :type: string
   :condition: optional
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. Omit this parameter to retrieve all
   subscriptions across all profiles.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to retrieve test mode subscriptions.

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of subscriptions found in ``_embedded``, which is either the requested number (with a maximum of 250) or
   the default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: subscriptions
      :type: array

      An array of subscription objects as described in
      :doc:`Get subscription </reference/v2/subscriptions-api/get-subscription>`.

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of subscriptions. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The URL to the current set of subscriptions.

   .. parameter:: previous
      :type: URL object

      The previous set of subscriptions, if available.

   .. parameter:: next
      :type: URL object

      The next set of subscriptions, if available.

   .. parameter:: documentation
      :type: URL object

      The URL to the subscriptions list endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/subscriptions \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $subscriptions = $mollie->subscriptions->page();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      subscriptions = mollie_client.subscriptions.list()

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 3,
       "_embedded": {
           "subscriptions": [
               {
                   "resource": "subscription",
                   "id": "sub_rVKGtNd6s3",
                   "mode": "live",
                   "createdAt": "2018-06-01T12:23:34+00:00",
                   "status": "active",
                   "amount": {
                       "value": "25.00",
                       "currency": "EUR"
                   },
                   "times": 4,
                   "timesRemaining": 3,
                   "interval": "3 months",
                   "startDate": "2016-06-01",
                   "nextPaymentDate": "2016-09-01",
                   "description": "Quarterly payment",
                   "method": null,
                   "webhookUrl": "https://webshop.example.org/subscriptions/webhook",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3",
                           "type": "application/hal+json"
                       },
                       "profile": {
                           "href": "https://api.mollie.com/v2/profiles/pfl_URR55HPMGx",
                           "type": "application/hal+json"
                       },
                       "customer": {
                           "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS",
                           "type": "application/hal+json"
                       }
                   }
               },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/subscriptions",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/subscriptions?from=sub_mnfbwhMfvo",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/subscriptions-api/list-all-subscriptions",
               "type": "text/html"
           }
       }
   }
