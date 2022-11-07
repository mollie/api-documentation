Get chargeback
==============
.. api-name:: Chargebacks API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/chargebacks/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single chargeback by its ID. Note the original payment's ID is needed as well.

If you do not know the original payment's ID, you can use the
:doc:`chargebacks list endpoint </reference/v2/chargebacks-api/list-chargebacks>`.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the chargeback's ID. For example:
``/v2/payments/tr_7UhSN1zuXS/chargebacks/chb_n9z0tp``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you have to specify which profile you are retrieving a chargeback for using the
``profileId`` parameter. Organizations can have multiple profiles for each of their websites. See
:doc:`Profiles API </reference/v2/profiles-api/overview>` for more information.

For these authentication methods the optional ``testmode`` parameter is available as well to enable test mode.

.. parameter:: profileId
   :type: string
   :condition: required for access tokens
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to get a chargeback made in test mode. If you omit this parameter, you can only retrieve live mode chargebacks.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payment </reference/v2/payments-api/get-payment>` this chargeback was issued for.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a chargeback object. Will always contain ``chargeback`` for this endpoint.

.. parameter:: id
   :type: string

   The chargeback's unique identifier, for example ``chb_n9z0tp``.

.. parameter:: amount
   :type: amount object

   The amount charged back by the consumer.

   .. parameter:: currency
      :type: string

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact amount that was charged back in the given currency.

.. parameter:: settlementAmount
   :type: amount object

   This optional field will contain the amount that will be deducted from your account, converted to the currency your
   account is settled in. It follows the same syntax as the ``amount`` property.

   Note that for chargebacks, the ``value`` key of ``settlementAmount`` will be negative.

   Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal chargebacks.

   .. parameter:: currency
      :type: string

      The settlement currency, an `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact amount that was deducted for the chargeback from your account balance in the
      settlement currency. Note that this will be negative.

.. parameter:: createdAt
   :type: datetime

   The date and time the chargeback was issued, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: reason
   :type: object

   Reason for the chargeback as given by the bank.

   .. note:: This field will only be returned for chargebacks where *direct debit* was used as the original payment
      method.

   .. parameter:: code
      :type: string

      Bank code of the chargeback reason.

   .. parameter:: description
      :type: string

      Detailed description of the reason.

.. parameter:: reversedAt
   :type: datetime

   The date and time the chargeback was reversed if applicable, in
   `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: paymentId
   :type: string

   The unique identifier of the payment this chargeback was issued for. For example: ``tr_7UhSN1zuXS``. The full payment
   object can be retrieved via the ``payment`` URL in the ``_links`` object.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the chargeback. Every URL object will contain an ``href`` and a
   ``type`` field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the chargeback itself.

   .. parameter:: payment
      :type: URL object

      The API resource URL of the payment this chargeback belongs to.

   .. parameter:: settlement
      :type: URL object
      :condition: optional

      The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.

   .. parameter:: documentation
      :type: URL object

      The URL to the chargeback retrieval endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $payment = $mollie->payments->get("tr_WDqYK6vllg");
      $chargeback = $payment->getChargeback("chb_n9z0tp");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      payment = mollie_client.payments.get("tr_WDqYK6vllg")
      chargeback = payment.chargebacks.get("chb_n9z0tp")

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      chargeback = Mollie::Payment::Chargeback.get(
        'chb_n9z0tp',
        payment_id: 'tr_WDqYK6vllg'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const chargeback = await mollieClient.paymentChargebacks.get('chb_n9z0tp', {
        paymentId: 'tr_WDqYK6vllg'
      });

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

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
        "reason": {
          "code": "AC01",
          "description": "Account identifier incorrect (i.e. invalid IBAN)"
        },
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
   }
