Update subscription
===================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Some fields of a subscription can be updated by calling ``PATCH`` on the resource endpoint. Each field is optional.

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

   * - ``times``

       .. type:: integer
          :required: false

     - Total number of charges for the subscription to complete. Can not be less than number of times that subscription has been charged.

   * - ``startDate``

       .. type:: date
          :required: false

     - The start date of the subscription in ``YYYY-MM-DD`` format. This is the first day on which your customer will be charged. Should always be in the future.

   * - ``description``

       .. type:: string
          :required: false

     - A description unique per subscription . This will be included in the payment description along with the charge
       date.

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - Use this parameter to set a webhook URL for all subscription payments.

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
``200 OK``

A subscription object is returned, as described in
:doc:`Get subscription </reference/v2/subscriptions-api/get-subscription>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
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

Request (PHP)
^^^^^^^^^^^^^
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
        "interval": "15 days",
        "startDate": "2018-12-12",
        "webhookUrl": "https://example.org/webhook",
        "_links": {
            "self": {
                "href": "http://api.mollie.com/v2/customers/cst_5a2pPrwaWy/subscriptions/sub_8EjeBVgtEn",
                "type": "application/hal+json"
            },
            "customer": {
                "href": "http://api.mollie.com/v2/customers/cst_5a2pPrwaWy",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription",
                "type": "text/html"
            }
        }
    }
