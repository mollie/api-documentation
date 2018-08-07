Create subscription
===================
.. api-name:: Subscriptions API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for creating subscriptions in the new v2 API can be found
             :doc:`here </reference/v2/subscriptions-api/create-subscription>`. For more information on the v2 API,
             refer to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v1/customers/*customerId*/subscriptions

.. authentication::
   :api_keys: true
   :oauth: true

With subscriptions, you can schedule recurring payments to take place at regular intervals.

For example, by simply specifying an ``amount`` and an ``interval``, you can create an endless subscription to charge a
monthly fee, until the consumer cancels their subscription.

Or, you could use the ``times`` parameter to only charge a limited number of times, for example to split a big
transaction in multiple parts.

A few example usages:

* ``amount=5 interval="2 weeks"`` Your consumer will be charged €5 once every two weeks.
* ``amount=20 interval="1 day" times=5`` Your consumer will be charged €20 every day, for five consecutive days.
* ``amount=10 interval="1 month" startDate="2018-04-30"`` Your consumer will be charged €10 on the last day of each
  month, starting in April 2018.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example
``/v1/customers/cst_8wmqcHMN4U/subscriptions``.

.. list-table::
   :widths: auto

   * - ``amount``

       .. type:: decimal
          :required: true

     - The amount in EUR that you want to charge with each subscription payment, e.g. ``100.00`` if you would want to
       charge €100.00 every time.

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

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the only mandatory extra parameter is the
``profileId`` parameter. With it, you can specify to which profile the subscription belongs. Organizations can have
multiple profiles for each of their websites. See :doc:`Profiles API </reference/v1/profiles-api/get-profile>` for more
information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The payment profile's unique identifier, for example ``pfl_3RkSN1zuPE``. This field is mandatory.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode subscription.

Response
--------
``201`` ``application/json; charset=utf-8``

A subscription object is returned, as described in
:doc:`Get subscription </reference/v1/subscriptions-api/get-subscription>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v1/customers/cst_stTC2WHAuS/subscriptions \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount=25.00" \
       -d "times=4" \
       -d "interval=3 months" \
       -d "description=Quarterly payment" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json; charset=utf-8

   {
       "resource": "subscription",
       "id": "sub_rVKGtNd6s3",
       "customerId": "cst_stTC2WHAuS",
       "mode": "live",
       "createdDatetime": "2016-06-01T12:23:34.0Z",
       "status": "active",
       "amount": "25.00",
       "times": 4,
       "interval": "3 months",
       "description": "Quarterly payment",
       "method": null,
       "cancelledDatetime": null,
       "links": {
           "webhookUrl": "https://webshop.example.org/payments/webhook/"
       }
   }
