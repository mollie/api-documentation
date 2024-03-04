Create capture
==============

.. api-name:: Captures API
   :version: 2
   :beta: true

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payments/*id*/captures

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Capture an 'authorized' payment.

Some payment methods allow you to first collect a consumer's authorization, and capture the amount at a later point.

By default, Mollie captures payments automatically. If however you configured your payment with captureMode: ``manual``,
you can capture the payment using this endpoint after having collected the consumer's authorization.

For more details about capturing payments, see the guide on
:doc:`Placing a hold for a payment </payments/place-a-hold-for-a-payment>`.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``v2/payments/tr_7UhSN1zuXS/captures``.

.. parameter:: amount
   :type: amount object
   :condition: optional

   The amount to capture. If no amount is provided, the full authorized amount is captured.

   .. parameter:: currency
      :type: string
      :condition: required

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The currency must be the same as the
      corresponding payment.

   .. parameter:: value
      :type: string
      :condition: required

      A string containing the exact amount you want to capture in the given currency. Make sure to send the right amount
      of decimals. Non-string values are not accepted.

.. parameter:: description
   :type: string
   :condition: optional

   The description of the capture you are creating.

.. parameter:: metadata
   :type: mixed
   :condition: optional

   Provide any data you like, for example a string or a JSON object. We will save the data alongside the capture.
   Whenever you fetch the capture with our API, we will also include the metadata. You can use up to approximately 1kB.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to capture a test mode payment.

Response
--------
``201`` ``application/hal+json``

A capture object is returned, as described in :doc:`Get capture </reference/v2/captures-api/get-capture>`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "amount[currency]=EUR" \
         -d "amount[value]=35.95" \
         -d "description=Capture for cart #12345"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

   {
       "resource": "capture",
       "id": "cpt_mNepDkEtco6ah3QNPUGYH",
       "mode": "live",
       "amount": {
           "value": "35.95",
           "currency": "EUR"
       },
       "paymentId": "tr_WDqYK6vllg",
       "createdAt": "2018-08-02T09:29:56+00:00",
       "description": "Capture for cart #12345",
       "metadata": {
           "bookkeeping_id": 12345
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_mNepDkEtco6ah3QNPUGYH",
               "type": "application/hal+json"
           },
           "payment": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/captures-api/create-capture",
               "type": "text/html"
           }
       }
   }
