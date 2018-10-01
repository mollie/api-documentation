Get subscription
================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a subscription by its ID and its customer's ID.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the subscription's ID. For
example ``/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_rVKGtNd6s3``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` query string parameter is
also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve a test mode subscription.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a subscription object. Will always contain ``subscription`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this subscription. Mollie assigns this identifier at subscription creation
       time. For example ``sub_rVKGtNd6s3``.

   * - ``mode``

       .. type:: string

     - The mode used to create this subscription. Mode determines whether the subscription's payments are real or test
       payments.

       Possible values: ``live`` ``test``

   * - ``createdAt``

       .. type:: datetime

     - The subscription's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``status``

       .. type:: string

     - The subscription's current status, depends on whether the customer has a pending, valid or invalid mandate.

       Possible values: ``pending`` ``active`` ``canceled`` ``suspended`` ``completed``

   * - ``amount``

       .. type:: amount object

     - The constant amount that is charged with each subscription payment, e.g.
       ``{"currency":"EUR", "value":"10.00"}`` for a €10.00 subscription.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact amount of the payment in the given currency.

   * - ``times``

       .. type:: integer

     - Total number of charges for the subscription to complete.

   * - ``interval``

       .. type:: string

     - Interval to wait between charges, for example ``1 month`` or ``14 days``.

       Possible values: ``... months`` ``... weeks`` ``... days``

   * - ``startDate``

       .. type:: date

     - The start date of the subscription in ``YYYY-MM-DD`` format.

   * - ``nextPaymentDate``

       .. type:: date
          :required: false

     - The date of the next scheduled payment in ``YYYY-MM-DD`` format. When there will be no next payment, for example
       when the subscription has ended, this parameter will not be returned.

   * - ``description``

       .. type:: string

     - The description specified during subscription creation. This will be included in the payment description along
       with the charge date in ``YYYY-MM-DD`` format.

   * - ``method``

       .. type:: string

     - The payment method used for this subscription, either forced on creation or ``null`` if any of the
       customer's valid mandates may be used.

       Possible values: ``creditcard`` ``directdebit`` ``null``

   * - ``canceledAt``

       .. type:: datetime

     - The subscription's date and time of cancellation, in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This parameter is omitted if the payment is not
       canceled (yet).

   * - ``webhookUrl``

       .. type:: string

     - The URL Mollie will call as soon a payment status change takes place.

   * - ``metadata``

       .. type:: mixed

     - The optional metadata you provided upon subscription creation. Metadata can for example be used to link a plan
       to a subscription.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the subscription. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the subscription itself.

          * - ``customer``

              .. type:: URL object

            - The API resource URL of the customer the subscription is for.

          * - ``documentation``

              .. type:: URL object

            - The URL to the subscription retrieval endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3 \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

    $customer = $mollie->customers->get("cst_stTC2WHAuS");
    $subscription = $customer->getSubscription("sub_rVKGtNd6s3");

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
       "interval": "3 months",
       "startDate": "2016-06-01",
       "nextPaymentDate": "2016-09-01",
       "description": "Quarterly payment",
       "method": null,
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
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription",
               "type": "text/html"
           }
       }
   }
