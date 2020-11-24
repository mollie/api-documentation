Cancel Payment API
==================
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/payments/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Some payment methods can be canceled by the merchant for a certain amount of time, usually until the
next business day. Or as long as the payment status  is ``open``. Payments may be canceled manually
from the Mollie Dashboard, or programmatically by using this endpoint.

The ``isCancelable`` property on the :doc:`Payment object </reference/v2/payments-api/get-payment>` will indicate if the
payment can be canceled.

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
``200`` ``application/hal+json``

A Payment object is returned, as described in :doc:`/reference/v2/payments-api/get-payment`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X DELETE https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $canceled_payment = $mollie->payments->delete("tr_WDqYK6vllg");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      canceled_payment = mollie_client.payments.delete('tr_WDqYK6vllg')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      canceled_payment = Mollie::Payment.cancel('tr_WDqYK6vllg')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const canceledPayment = await mollieClient.payments.delete('tr_Eq8xzWUPA4');
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "mode": "live",
       "createdAt": "2018-03-19T10:18:33+00:00",
       "amount": {
           "value": "35.07",
           "currency": "EUR"
       },
       "description": "Order 33",
       "method": "banktransfer",
       "metadata": null,
       "status": "canceled",
       "canceledAt": "2018-03-19T10:19:15+00:00",
       "details": {
           "bankName": "Stichting Mollie Payments",
           "bankAccount": "NL53ABNA0627535577",
           "bankBic": "ABNANL2A",
           "transferReference": "RF12-3456-7890-1234"
       },
       "profileId": "pfl_QkEhN94Ba",
       "sequenceType": "oneoff",
       "redirectUrl": "https://webshop.example.org/order/33/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_12345678/payments/tr_WDqYK6vllg",
               "type": "application/json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/cancel-payment",
               "type": "text/html"
           }
       }
   }
