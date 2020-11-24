List subscriptions
==================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all subscriptions of a customer.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the subscription with this ID. The subscription with this ID is included
       in the result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of subscriptions to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the only mandatory extra query string parameter is the ``profileId`` parameter. With it,
you can specify for which profile you want to retrieve subscriptions. Organizations can have multiple profiles for each
of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve test mode subscriptions.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of subscriptions found in ``_embedded``, which is either the requested number (with a maximum of 250)
       or the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``subscriptions``

              .. type:: array

            - An array of subscription objects as described in
              :doc:`Get subscription </reference/v2/subscriptions-api/get-subscription>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of subscriptions. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of subscriptions.

          * - ``previous``

              .. type:: URL object

            - The previous set of subscriptions, if available.

          * - ``next``

              .. type:: URL object

            - The next set of subscriptions, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the subscriptions list endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $customer = $mollie->customers->get("cst_8wmqcHMN4U");
      $subscriptions = $customer->subscriptions();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      customer = Mollie::Customer.get('cst_8wmqcHMN4U')
      subscriptions = customer.subscriptions

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const subscriptions = await mollieClient.customers_subscriptions.all({ customerId: 'cst_8wmqcHMN4U' });
      })();

Response
^^^^^^^^
.. code-block:: json
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
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions?from=sub_mnfbwhMfvo",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions",
               "type": "text/html"
           }
       }
   }
