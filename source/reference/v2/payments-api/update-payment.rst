Update payment
==============
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/payments/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

This endpoint can be used to update some details of a created payment.

Parameters
----------
For a more in-depth explanation of each parameter, see the :doc:`create-payment`. There are also
payment method specific parameters available, see :ref:`below <payment-method-specific-parameters-update>`.

.. parameter:: description
   :type: string
   :condition: optional

   The description of the payment. The maximum length of the description field differs per payment method, with the
   absolute maximum being 255 characters. The API will not reject strings longer than the maximum length but it will
   truncate them to fit.

.. parameter:: redirectUrl
   :type: string
   :condition: optional

   The URL your customer will be redirected to after the payment process.

   Updating this field is only possible when the payment is not yet finalized.

.. parameter:: webhookUrl
   :type: string
   :condition: optional

   Set the webhook URL, where we will send payment status updates to.

.. parameter:: metadata
   :type: mixed
   :condition: optional

   Provide any data you like, for example a string or a JSON object. We will save the data alongside the payment.
   Whenever you fetch the payment with our API, we will also include the metadata. You can use up to approximately 1kB.

.. parameter:: method
   :type: string
   :condition: optional

   Change the payment to a different payment method.

   Updating this field is only possible when the payment was created *without* a payment method and is not yet
   finalized.

.. parameter:: locale
   :type: string
   :condition: optional

   Allows you to update the language to be used in the hosted payment pages shown to the consumer. Can be any ``xx_XX``
   format ISO 15897 locale.

.. parameter:: restrictPaymentMethodsToCountry
   :type: string
   :condition: optional
   :collapse: true

   For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT
   rates you have used for the order to ensure your customer's country matches the VAT country.

   Use this parameter to restrict the payment methods available to your customer to those from a single country.

   If available, the credit card method will still be offered, but only cards from the allowed country are accepted.

.. _payment-method-specific-parameters-update:

Payment method-specific parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you specify the ``method`` parameter, optional parameters may be available for the payment method. If no method is
specified, you can still send the optional parameters and we will apply them when the consumer selects the relevant
payment method.

Bank transfer
"""""""""""""
.. parameter:: billingEmail
   :type: string
   :condition: optional

   Consumer's email address.

.. parameter:: dueDate
   :type: string
   :condition: optional

   The date the payment should :doc:`expire </payments/status-changes>`, in ``YYYY-MM-DD`` format.

   Updating this field is only possible when the payment is not yet finalized.

Gift cards
""""""""""
.. parameter:: issuer
   :type: string
   :condition: optional

   See :ref:`Payments API <payment-method-specific-parameters>`.

   Updating this field is only possible when the payment is not yet finalized.

iDEAL
"""""
.. parameter:: issuer
   :type: string
   :condition: optional

   See :ref:`Payments API <payment-method-specific-parameters>`.

   Updating this field is only possible when the payment is not yet finalized.

KBC/CBC Payment Button
""""""""""""""""""""""
.. parameter:: issuer
   :type: string
   :condition: optional

   See :ref:`Payments API <payment-method-specific-parameters>`.

   Updating this field is only possible when the payment is not yet finalized.

Przelewy24
""""""""""
.. parameter:: billingEmail
   :type: string
   :condition: optional

   Consumer's email address.

Response
--------
``200`` ``application/hal+json``

A payment object is returned, as described in :doc:`get-payment`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X PATCH https://api.mollie.com/v2/payments/tr_7UhSN1zuXS \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "description=Order #98765" \
         -d "redirectUrl=https://example.org/webshop/order/98765/" \
         -d "webhookUrl=https://example.org/webshop/payments/webhook/" \
         -d "metadata={\"order_id\": \"98765\"}"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $payment = $mollie->payments->get("tr_7UhSN1zuXS");

      $payment->description = "Order #98765";
      $payment->redirectUrl = "https://example.org/webshop/order/98765/";
      $payment->webhookUrl = "https://example.org/webshop/payments/webhook/";
      $payment->metadata = ["order_id" => "98765"];

      $payment = $payment->update();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      payment = mollie_client.payments.update("tr_7UhSN1zuXS", {
        'description': 'Order #98765',
        'redirectUrl': 'https://webshop.example.org/order/98765/',
        'webhookUrl': 'https://webshop.example.org/payments/webhook/',
        'metadata': {'order_id': '98765'}
      })

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      payment = Mollie::Payment.update(
        'tr_7UhSN1zuXS',
        description: 'Order #98765',
        redirect_url: 'https://example.org/webshop/order/98765/',
        webhook_url: 'https://example.org/webshop/payments/webhook/',
        metadata: {
          order_id: '98765'
        }
      )

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "payment",
       "id": "tr_7UhSN1zuXS",
       "mode": "test",
       "createdAt": "2018-03-20T09:13:37+00:00",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "description": "Order #98765",
       "method": null,
       "metadata": {
           "order_id": "98765"
       },
       "status": "open",
       "isCancelable": false,
       "expiresAt": "2018-03-20T09:28:37+00:00",
       "details": null,
       "profileId": "pfl_QkEhN94Ba",
       "sequenceType": "oneoff",
       "redirectUrl": "https://example.org/webshop/order/98765/",
       "webhookUrl": "https://example.org/webshop/payments/webhook/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
               "type": "application/json"
           },
           "checkout": {
               "href": "https://www.mollie.com/payscreen/select-method/7UhSN1zuXS",
               "type": "text/html"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_12345678/payments/tr_7UhSN1zuXS",
               "type": "application/json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/update-payment",
               "type": "text/html"
           }
       }
   }
