Get subscription
================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a subscription by its ID and its customer's ID.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the subscription's ID. For
example ``/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_rVKGtNd6s3``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` query string parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to retrieve a test mode subscription.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a subscription object. Will always contain ``subscription`` for this endpoint.

.. parameter:: id
   :type: string

   The identifier uniquely referring to this subscription. Mollie assigns this identifier at subscription creation
   time. For example ``sub_rVKGtNd6s3``.

.. parameter:: mode
   :type: string

   The mode used to create this subscription. Mode determines whether the subscription's payments are real or test
   payments.

   Possible values: ``live`` ``test``

.. parameter:: createdAt
   :type: datetime

   The subscription's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: status
   :type: string

   The subscription's current status, depends on whether the customer has a pending, valid or invalid mandate.

   Possible values: ``pending`` ``active`` ``canceled`` ``suspended`` ``completed``

.. parameter:: amount
   :type: amount object

   The constant amount that is charged with each subscription payment, e.g. ``{"currency":"EUR", "value":"10.00"}`` for
   a €10.00 subscription.

   .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact amount of the payment in the given currency.

.. parameter:: times
   :type: integer

   Total number of charges for the subscription to complete.

.. parameter:: timesRemaining
   :type: integer

   Number of charges left for the subscription to complete.

.. parameter:: interval
   :type: string

   Interval to wait between charges, for example ``1 month`` or ``14 days``.

   Possible values: ``... months`` ``... weeks`` ``... days``

.. parameter:: startDate
   :type: date

   The start date of the subscription in ``YYYY-MM-DD`` format.

.. parameter:: nextPaymentDate
   :type: date
   :condition: optional

   The date of the next scheduled payment in ``YYYY-MM-DD`` format. When there will be no next payment, for example when
   the subscription has ended, this parameter will not be returned.

.. parameter:: description
   :type: string

   The description specified during subscription creation. This will be included in the payment description.

.. parameter:: method
   :type: string

   The payment method used for this subscription, either forced on creation or ``null`` if any of the customer's valid
   mandates may be used.

   Possible values: ``creditcard`` ``directdebit`` ``paypal`` ``null``

.. parameter:: mandateId
   :type: string
   :condition: optional

   The mandate used for this subscription. When there is no mandate specified, this parameter will not be returned.

.. parameter:: canceledAt
   :type: datetime

   The subscription's date and time of cancellation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.
   This parameter is omitted if the payment is not canceled (yet).

.. parameter:: webhookUrl
   :type: string

   The URL Mollie will call as soon a payment status change takes place.

.. parameter:: metadata
   :type: mixed

   The optional metadata you provided upon subscription creation. Metadata can for example be used to link a plan
   to a subscription.

.. parameter:: applicationFee
   :type: object
   :condition: optional

   The application fee, if the subscription was created with one. This will be applied on each payment created for
   the subscription.

   .. parameter:: amount
      :type: decimal

      The application fee amount in EUR as specified during subscription creation.

   .. parameter:: description
      :type: string

      The description of the application fee as specified during subscription creation.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the subscription. Every URL object will contain an ``href`` and a
   ``type`` field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the subscription itself.

   .. parameter:: customer
      :type: URL object

      The API resource URL of the customer the subscription is for.

   .. parameter:: profile
      :type: URL object
      :condition: optional

      The API resource URL of the website profile on which this subscription was created.

   .. parameter:: payments
      :type: URL object
      :condition: optional

      The API resource URL of the payments that are created by this subscription. Not present if no payments yet
      created.

   .. parameter:: documentation
      :type: URL object

      The URL to the subscription retrieval endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3 \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $customer = $mollie->customers->get("cst_stTC2WHAuS");
      $subscription = $customer->getSubscription("sub_rVKGtNd6s3");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      subscription = mollie_client.customer_subscriptions.with_parent_id('cst_stTC2WHAuS').get('sub_rVKGtNd6s3')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      subscription = Mollie::Customer::Subscription.get(
        'sub_rVKGtNd6s3',
        customer_id: 'cst_stTC2WHAuS'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const subscription = await mollieClient.customers_subscriptions.get('sub_rVKGtNd6s3', { customerId: 'cst_stTC2WHAuS' });
      })();

Response
^^^^^^^^
.. code-block:: json
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "subscription",
       "id": "sub_rVKGtNd6s3",
       "mode": "live",
       "createdAt": "2016-06-01T12:23:34+00:00",
       "status": "active",
       "amount": {
           "value": "25.00",
           "currency": "EUR"
       },
       "times": 4,
       "timesRemaining": 4,
       "interval": "3 months",
       "startDate": "2016-06-01",
       "nextPaymentDate": "2016-09-01",
       "description": "Quarterly payment",
       "method": null,
       "mandateId": "mdt_38HS4fsS",
       "webhookUrl": "https://webshop.example.org/payments/webhook",
       "metadata": {
           "plan": "small"
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3",
               "type": "application/hal+json"
           },
           "customer": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS",
               "type": "application/hal+json"
           },
           "profile": {
               "href": "https://api.mollie.com/v2/profiles/pfl_URR55HPMGx",
               "type": "application/hal+json"
           },
          "payments": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3/payments",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription",
               "type": "text/html"
           }
       }
   }
