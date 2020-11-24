Cancel Payment API
==================
.. api-name:: Payments API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for canceling payments in the new v2 API can be found
             :doc:`here </reference/v2/payments-api/cancel-payment>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v1/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Some payment methods are cancellable for an amount of time, usually until the next day. Or as long as the payment status
is open. Payments may be canceled manually from the Dashboard, or automatically by using this endpoint.

The ``canBeCancelled`` property on the :doc:`Payment object </reference/v1/payments-api/get-payment>` will indicate if
the payment can be canceled.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``tr_7UhSN1zuXS``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to cancel a test mode payment.

Response
--------
``200`` ``application/json``

A payment object is returned, as described in :doc:`/reference/v1/payments-api/get-payment`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v1/payments/tr_WDqYK6vllg \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "mode": "test",
       "createdDatetime": "2018-03-16T14:30:07.0Z",
       "status": "cancelled",
       "cancelledDatetime": "2018-03-16T14:34:50.0Z",
       "amount": "35.07",
       "description": "Order 33",
       "method": "banktransfer",
       "metadata": {
           "order_id": "33"
       },
       "details": {
           "bankName": "Stichting Mollie Payments",
           "bankAccount": "NL53ABNA0627535577",
           "bankBic": "ABNANL2A",
           "transferReference": "RF12-3456-7890-1234"
       },
       "profileId": "pfl_QkEhN94Ba",
       "links": {
           "webhookUrl": "https://webshop.example.org/payments/webhook",
           "redirectUrl": "https://webshop.example.org/order/33/"
       }
   }
