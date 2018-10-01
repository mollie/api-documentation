Create subscription
===================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions

.. authentication::
   :api_keys: true
   :oauth: true

With subscriptions, you can schedule :doc:`recurring payments </payments/recurring>` to take place at regular intervals.

For example, by simply specifying an ``amount`` and an ``interval``, you can create an endless subscription to charge a
monthly fee, until the consumer cancels their subscription.

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

   * - ``interval``

       .. type:: string
          :required: true

     - Interval to wait between charges, for example ``1 month`` or ``14 days``.

       Possible values: ``... months`` ``... weeks`` ``... days``

   * - ``startDate``

       .. type:: date
          :required: false

     - The start date of the subscription in ``YYYY-MM-DD`` format. This is the first day on which your
       customer will be charged. When this parameter is not provided, the current date will be used instead.

   * - ``description``

       .. type:: string
          :required: true

     - A description unique per subscription . This will be included in the payment description along with the charge
       date.

   * - ``method``

       .. type:: string
          :required: false

     - The payment method used for this subscription, either forced on creation or ``null`` if any of the
       customer's valid mandates may be used.

       Possible values: ``creditcard`` ``directdebit`` ``null``

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - Use this parameter to set a webhook URL for all subscription payments.

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, and we will save the data alongside the subscription. Whenever you fetch the
       subscription with our API, we'll also include the metadata. You can use up to 1kB of JSON.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the only mandatory extra parameter is the
``profileId`` parameter. With it, you can specify to which profile the subscription belongs. Organizations can have
multiple profiles for each of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more
information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. This field is mandatory.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode subscription.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A subscription object is returned, as described in
:doc:`Get subscription </reference/v2/subscriptions-api/get-subscription>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
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

Request (PHP)
^^^^^^^^^^^^^
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
       "interval": "3 months",
       "description": "Quarterly payment",
       "startDate": "2016-06-01",
       "nextPaymentDate": "2016-09-01",
       "method": null,
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3",
               "type": "application/hal+json"
           },
           "customer": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription",
               "type": "text/html"
           }
       }
   }
