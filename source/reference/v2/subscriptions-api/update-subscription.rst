Update subscription
===================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Some fields of a subscription can be updated by calling ``PATCH`` on the resource endpoint. Each field is optional.

You cannot update a canceled subscription.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the subscription's ID. For
example: ``/v2/customers/cst_5a2pPrwaWy/subscriptions/sub_8EjeBVgtEn``.

.. list-table::
   :widths: auto

   * - ``amount``

       .. type:: amount object
          :required: false

     - The amount that you want to charge, e.g. ``{"currency":"EUR", "value":"100.00"}`` if you would want to change the
       charge to €100.00.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string
                 :required: true

            - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The currencies supported depend on
              the payment methods that are enabled on your account.

          * - ``value``

              .. type:: string
                 :required: true

            - A string containing the exact amount you want to charge in the given currency. Make sure to send the right
              amount of decimals. Non-string values are not accepted.

   * - ``description``

       .. type:: string
          :required: false

     - A description unique per subscription. This will be included in the payment description.

   * - ``interval``

       .. type:: string
          :required: false

     - Interval to wait between charges, for example ``1 month`` or ``14 days``.

       Possible values: ``... months`` ``... weeks`` ``... days``

       .. note::
          The new interval will be calculated from the last charge date.

   * - ``mandateId``

       .. type:: string
          :required: false

     - Use this parameter to set a specific mandate for all subscription payments. If you set a ``method`` before, it
       will be changed to ``null`` when setting this parameter.

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, and we will save the data alongside the subscription. Whenever you fetch the
       subscription with our API, we'll also include the metadata. You can use up to 1kB of JSON.

   * - ``startDate``

       .. type:: date
          :required: false

     - The start date of the subscription in ``YYYY-MM-DD`` format. This is the first day on which your customer will be
       charged. Should always be in the future.

       .. note::
          A subscription's start date cannot be changed if it has already been charged.

   * - ``times``

       .. type:: integer
          :required: false

     - Total number of charges for the subscription to complete. Can not be less than number of times that subscription
       has been charged.

       .. note::
          Subscriptions in test mode will be canceled automatically after 10 charges.

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - Use this parameter to set a webhook URL for all subscription payments.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a test mode subscription.

Response
--------
``200`` ``application/hal+json``

A subscription object is returned, as described in
:doc:`Get subscription </reference/v2/subscriptions-api/get-subscription>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X PATCH https://api.mollie.com/v2/customers/cst_5a2pPrwaWy/subscriptions/sub_8EjeBVgtEn \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "amount[currency]=EUR" \
         -d "amount[value]=10.00" \
         -d "times=42" \
         -d "startDate=2018-12-12" \
         -d "description=Mollie Recurring subscription" \
         -d "webhookUrl=https://example.org/webhook"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $customer = $mollie->customers->get("cst_8wmqcHMN4U");

      $subscription = $customer->getSubscription("sub_8EjeBVgtEn");
      $subscription->amount = (object) [
            "currency" => "EUR",
            "value" => "10.00",
      ];
      $subscription->times = 42;
      $subscription->startDate = "2018-12-12";
      $subscription->description = "Mollie recurring subscription";
      $subscription->webhookUrl = "https://example.org/webhook";
      $updatedSubscription = $subscription->update();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      subscription = Mollie::Customer::Subscription.update(
        'sub_8EjeBVgtEn',
        customer_id: 'cst_8wmqcHMN4U',
        amount: { value: '10.00', currency: 'EUR' },
        times: 42,
        start_date: '2018-12-12',
        description: 'Mollie recurring subscription',
        webhook_url: 'https://example.org/webhook'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const subscription = await mollieClient.customers_subscriptions.update('sub_8EjeBVgtEn', {
          customerId: 'cst_8wmqcHMN4U',
          amount: {
            currency: 'EUR',
            value: '10.00',
          },
          times: 42,
          startDate: '2018-12-12',
          description: 'Mollie recurring subscription',
          webhookUrl: 'https://example.org/webhook',
        });
      })();

Response
^^^^^^^^
.. code-block:: json
   :linenos:

    HTTP/1.1 200 OK
    Content-Type: application/hal+json

    {
        "resource": "subscription",
        "id": "sub_8EjeBVgtEn",
        "customerId": "cst_5a2pPrwaWy",
        "mode": "live",
        "createdAt": "2018-07-10T11:22:53+00:00",
        "status": "active",
        "amount": {
            "value": "10.00",
            "currency": "EUR"
        },
        "description": "Mollie Recurring subscription",
        "method": null,
        "times": 42,
        "timesRemaining": 38,
        "interval": "15 days",
        "startDate": "2018-12-12",
        "nextPaymentDate": "2018-12-12",
        "mandateId": "mdt_84HdeDr5",
        "webhookUrl": "https://example.org/webhook",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/customers/cst_5a2pPrwaWy/subscriptions/sub_8EjeBVgtEn",
                "type": "application/hal+json"
            },
            "customer": {
                "href": "https://api.mollie.com/v2/customers/cst_5a2pPrwaWy",
                "type": "application/hal+json"
            },
           "profile": {
               "href": "https://api.mollie.com/v2/profiles/pfl_URR55HPMGx",
               "type": "application/hal+json"
           },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription",
                "type": "text/html"
            }
        }
    }
