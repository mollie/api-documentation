List payment chargebacks
========================
.. api-name:: Chargebacks API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/chargebacks

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve the chargebacks initiated for a specific payment.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, for example ``tr_7UhSN1zuXS``.

.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the chargeback with this ID. The chargeback
   with this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of chargebacks to return (with a maximum of 250).

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payment </reference/v2/payments-api/get-payment>` these chargebacks were issued for.

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of chargebacks found in ``_embedded``.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: chargebacks
      :type: array

      An array of chargeback objects as described in
      :doc:`Get chargeback </reference/v2/chargebacks-api/get-payment-chargeback>`.

.. parameter:: _links
   :type: object

   Links related to the lists of chargebacks. Every URL object will contain an ``href`` and a ``type`` field.

   .. parameter:: self
      :type: object

      The URL to the current set of chargebacks.

   .. parameter:: documentation
      :type: object

      The URL to the chargebacks list endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/chargebacks \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $payment = $mollie->payments->get("tr_7UhSN1zuXS");
      $chargebacks = $payment->chargebacks();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      payment = mollie_client.payments.get("tr_WDqYK6vllg")
      chargebacks = payment.chargebacks.list()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      payment = Mollie::Payment.get('tr_WDqYK6vllg')
      chargebacks = payment.chargebacks

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const chargebacks = mollieClient.paymentChargebacks.iterate({ paymentId: 'tr_WDqYK6vllg' });

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 3,
       "_embedded": {
           "chargebacks": [
               {
                   "resource": "chargeback",
                   "id": "chb_n9z0tp",
                   "amount": {
                       "currency": "USD",
                       "value": "43.38"
                   },
                   "settlementAmount": {
                       "currency": "EUR",
                       "value": "-35.07"
                   },
                   "createdAt": "2018-03-14T17:00:52.0Z",
                   "reversedAt": null,
                   "paymentId": "tr_WDqYK6vllg",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/chargebacks-api/get-payment-chargeback",
                           "type": "text/html"
                       }
                   }
               },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/chargebacks",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/chargebacks-api/list-payment-chargebacks",
               "type": "text/html"
           }
       }
   }
