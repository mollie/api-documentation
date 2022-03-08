Get subscription
================
.. api-name:: Subscriptions API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving subscriptions in the new v2 API can be found
             :doc:`here </reference/v2/subscriptions-api/get-subscription>`. For more information on the v2 API, refer
             to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/customers/*customerId*/subscriptions/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve a subscription by its ID and its customer's ID.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the subscription's ID. For
example ``/v1/customers/cst_8wmqcHMN4U/subscriptions/sub_rVKGtNd6s3``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the ``testmode`` query string parameter is also available.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to retrieve a test mode subscription.

Response
--------
``200`` ``application/json``

.. parameter:: resource
   :type: string

   Indicates the response contains a subscription object. Will always contain ``subscription`` for this endpoint.

.. parameter:: id
   :type: string

   The identifier uniquely referring to this subscription. Mollie assigns this identifier at subscription creation time.
   For example ``sub_rVKGtNd6s3``.

.. parameter:: customerId
   :type: string

   The customer's unique identifier, for example ``cst_8wmqcHMN4U``.

.. parameter:: mode
   :type: string

   The mode used to create this subscription. Mode determines whether the subscription's payments are real or test
   payments.

   Possible values: ``live`` ``test``

.. parameter:: createdDatetime
   :type: datetime

   The subscription's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: status
   :type: string

   The subscription's current status, depends on whether the customer has a pending, valid or invalid mandate.

   Possible values: ``pending`` ``active`` ``cancelled`` ``suspended`` ``completed``

.. parameter:: amount
   :type: decimal

   The constant amount that is charged with each subscription payment.

.. parameter:: times
   :type: integer

   Total number of charges for the subscription to complete.

.. parameter:: interval
   :type: string

   Interval to wait between charges, for example ``1 month`` or ``14 days``.

   Possible values: ``... months`` ``... weeks`` ``... days``

.. parameter:: startDate
   :type: date

   The start date of the subscription in ``YYYY-MM-DD`` format.

.. parameter:: description
   :type: string

   The description specified during subscription creation. This will be included in the payment description.

.. parameter:: method
   :type: string

   The payment method used for this subscription, either forced on creation or ``null`` if any of the customer's valid
   mandates may be used.

   Possible values: ``creditcard`` ``directdebit`` ``paypal`` ``null``

.. parameter:: cancelledDatetime
   :type: datetime

   The subscription's date and time of cancellation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: links
   :type: object

   An object with URLs important to the subscription.

   .. parameter:: webhookUrl
      :type: string

      The URL Mollie will call as soon a payment status change takes place.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3 \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

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
           "webhookUrl": "https://webshop.example.org/payments/webhook"
       }
   }
