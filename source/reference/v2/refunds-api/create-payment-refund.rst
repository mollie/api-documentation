Create payment refund
=====================
.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payments/*id*/refunds

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Creates a refund for a specific payment. The refunded amount is credited to your customer usually either via a bank
transfer or by refunding the amount to your customer's credit card.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``v2/payments/tr_7UhSN1zuXS/refunds``.

.. parameter:: amount
   :type: amount object
   :condition: required

   The amount to refund. For some payments, it can be up to €25.00 more than the original transaction amount.

   .. parameter:: currency
      :type: string
      :condition: required

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The currency must be the same as the
      corresponding payment.

   .. parameter:: value
      :type: string
      :condition: required

      A string containing the exact amount you want to refund in the given currency. Make sure to send the right amount
      of decimals. Non-string values are not accepted.

.. parameter:: description
   :type: string
   :condition: optional

   The description of the refund you are creating. This will be shown to the consumer on their card or bank statement
   when possible. Max. 140 characters.

.. parameter:: metadata
   :type: mixed
   :condition: optional

   Provide any data you like, for example a string or a JSON object. We will save the data alongside the refund.
   Whenever you fetch the refund with our API, we will also include the metadata. You can use up to approximately 1kB.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to refund a test mode payment.

Mollie Connect parameters
^^^^^^^^^^^^^^^^^^^^^^^^^
With Mollie Connect you can split payments that are processed through your app across multiple connected accounts.

When creating **full** refunds for those split payments, you can use the ``reverseRouting`` parameter to pull the split
payment back to the platform balance.

.. parameter:: reverseRouting
   :type: boolean
   :condition: optional
   :collapse: true

   For a full reversal of the split that was specified during payment creation, simply set this parameter to ``true``.
   For example, if a €10,00 payment got split by sending €2,50 to the platform and €7,50 to the connected account, then
   setting this parameter to ``true`` will pull back the €7,50 from the connected account.


When creating **partial** refunds for split payments, you should instead use the ``routingReversals`` array to set the
amount that you want to pull back from the single routes.

.. parameter:: routingReversals
   :type: array
   :condition: optional
   :collapse: true

   If a routing reversals array is supplied, it must contain one or more routing objects with the following parameters:

   .. parameter:: amount
      :type: amount object
      :condition: conditional

      The routing reversal object must indicate what portion of the originally routed amount is being reversed.

      .. parameter:: currency
         :type: string
         :condition: required

         An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. Currently only ``EUR`` payments can be
         routed.

      .. parameter:: value
         :type: string
         :condition: required

         A string containing the exact amount of this portion of the routed amount in the given currency. Make
         sure to send the right amount of decimals. Non-string values are not accepted.


   .. parameter:: source
      :type: object
      :condition: conditional

      The source of this portion of the route.

      .. parameter:: type
         :type: string
         :condition: required

         The type of source. Currently only the source type ``organization`` is supported.

         Possible values: ``organization``

      .. parameter:: organizationId
         :type: string
         :condition: required

         Required for source type ``organization``. The ID of the connected organization the funds
         should reversed from, for example ``org_12345``.

         **Please note:** ``me`` or the ID of the current organization are not accepted as an ``organizationId``.

To learn more about creating refunds for split payments, please refer to the
:doc:`Refunds and chargebacks for split payments guide </connect/refunds-and-chargebacks>`.

Response
--------
``201`` ``application/hal+json``

A refund object is returned, as described in :doc:`Get payment refund </reference/v2/refunds-api/get-payment-refund>`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "amount[currency]=EUR" \
         -d "amount[value]=5.95" \
         -d "metadata={\"bookkeeping_id\": 12345}"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $payment = $mollie->payments->get("tr_WDqYK6vllg");
      $refund = $payment->refund([
      "amount" => [
         "currency" => "EUR",
         "value" => "5.95" // You must send the correct number of decimals, thus we enforce the use of strings
      ]
      ]);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      payment = mollie_client.payments.get("tr_WDqYK6vllg")
      refund = payment.refunds.create({
          "amount": {
              "value": "5.95",
              "currency": "EUR",
          }
      })

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      refund = Mollie::Payment::Refund.create(
        payment_id: 'tr_WDqYK6vllg',
        amount:      { value: '5.00', currency: 'EUR' },
        description: 'Example refund description'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const refund = await mollieClient.paymentRefunds.create({
        paymentId: 'tr_WDqYK6vllg',
        amount: {
          value: '5.95',
          currency: 'EUR'
        }
      });

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

   {
       "resource": "refund",
       "id": "re_4qqhO89gsT",
       "amount": {
           "currency": "EUR",
           "value": "5.95"
       },
       "status": "pending",
       "createdAt": "2018-03-14T17:09:02.0Z",
       "description": "Order #33",
       "metadata": {
            "bookkeeping_id": 12345
       },
       "paymentId": "tr_WDqYK6vllg",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT",
               "type": "application/hal+json"
           },
           "payment": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/refunds-api/create-payment-refund",
               "type": "text/html"
           }
       }
   }

Response (duplicate refund detected)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: none
   :linenos:

   HTTP/1.1 409 Conflict
   Content-Type: application/hal+json

    {
        "status": 409,
        "title": "Conflict",
        "detail": "A duplicate refund has been detected",
        "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/overview/handling-errors",
                "type": "text/html"
            }
        }
    }
