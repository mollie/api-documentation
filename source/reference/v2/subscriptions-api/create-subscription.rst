Create Subscription API
=======================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

With subscriptions, you can schedule :doc:`recurring payments </payments/recurring>` to take place at regular intervals.

For example, by simply specifying an ``amount`` and an ``interval``, you can create an endless subscription to charge a
monthly fee, until you cancel the subscription.

Or, you could use the ``times`` parameter to only charge a limited number of times, for example to split a big
transaction in multiple parts.

A few example usages:

* ``amount[currency]="EUR" amount[value]="5.00" interval="2 weeks"``
  Your consumer will be charged €5 once every two weeks.
* ``amount[currency]="EUR" amount[value]="20.00" interval="1 day" times=5``
  Your consumer will be charged €20 every day, for five consecutive days.
* ``amount[currency]="EUR" amount[value]="10.00" interval="1 month" startDate="2018-04-30"``
  Your consumer will be charged €10 on the last day of each month, starting in April 2018.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example
``/v2/customers/cst_8wmqcHMN4U/subscriptions``.

.. list-table::
   :widths: auto

   * - ``amount``

       .. type:: amount object
          :required: true

     - The amount that you want to charge, e.g. ``{"currency":"EUR", "value":"100.00"}`` if you would want to charge
       €100.00.

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

   * - ``times``

       .. type:: integer
          :required: false

     - Total number of charges for the subscription to complete. Leave empty for an ongoing subscription.

       .. note::
          Subscriptions in test mode will be canceled automatically after 10 charges.

   * - ``interval``

       .. type:: string
          :required: true

     - Interval to wait between charges, for example ``1 month`` or ``14 days``.

       Possible values: ``... months`` ``... weeks`` ``... days``

       .. note::
          The maximum interval is 1 year (``12 months``, ``52 weeks`` or ``365 days``).

   * - ``startDate``

       .. type:: date
          :required: false

     - The start date of the subscription in ``YYYY-MM-DD`` format. This is the first day on which your
       customer will be charged. When this parameter is not provided, the current date will be used instead.

   * - ``description``

       .. type:: string
          :required: true

     - A description unique per subscription. This will be included in the payment description.

   * - ``method``

       .. type:: string
          :required: false

     - The payment method used for this subscription, either forced on creation or ``null`` if any of the
       customer's valid mandates may be used. Please note that this parameter can not set together with ``mandateId``.

       Possible values: ``creditcard`` ``directdebit`` ``paypal`` ``null``

       .. warning:: Using PayPal Reference Transactions is only possible if PayPal has activated this feature on your
                    merchant-account.

   * - ``mandateId``

       .. type:: string
          :required: false

     - The mandate used for this subscription. Please note that this parameter can not set together with ``method``.

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - Use this parameter to set a webhook URL for all subscription payments.

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, and we will save the data alongside the subscription. Whenever you fetch the
       subscription with our API, we'll also include the metadata. You can use up to 1kB of JSON.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the only mandatory extra parameter is the ``profileId`` parameter. With it, you can
specify on which profile the payments for the subscription should be created. Organizations can have multiple profiles
for each of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode subscription.

   * - ``applicationFee``

       .. type:: object
          :required: false

     - Adding an :doc:`application fee </oauth/application-fees>` allows you to charge the merchant for each payment
       in the subscription and transfer these amounts to your own account.

       .. list-table::
          :widths: auto

          * - ``amount``

              .. type:: amount object
                 :required: true

            - The amount in that the app wants to charge, e.g. ``{"currency":"EUR", "value":"10.00"}`` if the app would
              want to charge €10.00.

              .. list-table::
                 :widths: auto

                 * - ``currency``

                     .. type:: string
                        :required: true

                   - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                 * - ``value``

                     .. type:: string
                        :required: true

                   - A string containing the exact amount you want to charge in the given currency. Make sure to send
                     the right amount of decimals. Non-string values are not accepted.

          * - ``description``

              .. type:: string
                 :required: true

            - The description of the application fee. This will appear on settlement reports to the merchant and to you.

              The maximum length is 255 characters.

Response
--------
``201`` ``application/hal+json``

A subscription object is returned, as described in
:doc:`Get subscription </reference/v2/subscriptions-api/get-subscription>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "amount[currency]=EUR" \
         -d "amount[value]=25.00" \
         -d "times=4" \
         -d "interval=3 months" \
         -d "description=Quarterly payment" \
         -d "webhookUrl=https://webshop.example.org/subscriptions/webhook/"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $customer = $mollie->customers->get("cst_stTC2WHAuS");
      $customer->createSubscription([
         "amount" => [
               "currency" => "EUR",
               "value" => "25.00",
         ],
         "times" => 4,
         "interval" => "3 months",
         "description" => "Quarterly payment",
         "webhookUrl" => "https://webshop.example.org/subscriptions/webhook/",
      ]);

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      subscription = Mollie::Customer::Subscription.create(
        customer_id: 'cst_stTC2WHAuS',
        amount:      { value: '25.00', currency: 'EUR' },
        times:       4,
        interval:    '3 months',
        description: 'Quarterly payment',
        webhook_url: 'https://webshop.example.org/subscriptions/webhook/'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const subscription = await mollieClient.customers_subscriptions.create({
          customerId: 'cst_stTC2WHAuS',
          amount: {
            currency: 'EUR',
            value: '25.00',
          },
          times: 4,
          interval: '3 months',
          description: 'Quarterly payment',
          webhookUrl: 'https://webshop.example.org/subscriptions/webhook/',
        });
      })();

Response
^^^^^^^^
.. code-block:: json
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

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
       "timesRemaining": 4,
       "interval": "3 months",
       "description": "Quarterly payment",
       "startDate": "2018-06-01",
       "nextPaymentDate": "2018-09-01",
       "method": null,
       "webhookUrl": "https://webshop.example.org/subscriptions/webhook/",
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
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription",
               "type": "text/html"
           }
       }
   }
