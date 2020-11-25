Create customer payment
=======================
.. api-name:: Customers API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/customers/*customerId*/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Creates a payment for the customer.

Linking customers to payments enables a number of
`Mollie Checkout <https://www.mollie.com/en/checkout>`_ features, including:

* Keeping track of payment preferences for your customers.
* Enabling your customers to charge a previously used credit card with a single click.
* Improved payment insights in your dashboard.
* :doc:`Recurring payments </payments/recurring>`.

.. note:: This endpoint is a shortcut for :doc:`creating a payment </reference/v2/payments-api/create-payment>` with a
          ``customerId`` parameter.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

This endpoint accepts the same parameters as the :doc:`Create payment </reference/v2/payments-api/create-payment>`
endpoint. For recurring payments, the following parameters have notable differences in comparison to regular payments:

.. list-table::
   :widths: auto

   * - ``sequenceType``

       .. type:: string
          :required: false

     - Enables recurring payments. If set to ``first``, a first payment for the customer is created, allowing
       the customer to agree to automatic recurring charges taking place on their account in the future. If set to
       ``recurring``, the customer is charged automatically.

   * - ``redirectUrl``

       .. type:: string
          :required: false

     - If the ``recurringType`` parameter is set to ``recurring``, this parameter can be omitted. Since the payment will
       take place without customer interaction, a redirect is not needed.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the only mandatory extra parameter is the ``profileId`` parameter. With it, you can
specify which profile the payment belongs to. Organizations can have multiple profiles for each of their websites. See
:doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a payment made in test mode.

Response
--------
``201`` ``application/hal+json``

A payment object is returned, as described in :doc:`/reference/v2/payments-api/get-payment`.

Example
-------

.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/payments \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "amount[currency]=EUR" \
         -d "amount[value]=10.00" \
         -d "description=Order #12345" \
         -d "sequenceType=first" \
         -d "redirectUrl=https://webshop.example.org/order/12345/" \
         -d "webhookUrl=https://webshop.example.org/payments/webhook/"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $payment = $mollie->customers->get("cst_8wmqcHMN4U")->createPayment([
          "amount" => [
             "currency" => "EUR",
             "value" => "10.00",
          ],
          "description" => "Order #12345",
          "sequenceType" => "first",
          "redirectUrl" => "https://webshop.example.org/order/12345/",
          "webhookUrl" => "https://webshop.example.org/payments/webhook/",
      ]);

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      payment = Mollie::Customer::Payment.create(
        customer_id:   'cst_8wmqcHMN4U',
        amount:        { value: '10.00', currency: 'EUR' },
        description:   'Order #12345',
        sequence_type: 'first',
        redirect_url:  'https://webshop.example.org/order/12345/',
        webhook_url:   'https://webshop.example.org/payments/webhook/'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const payment = await mollieClient.customers_payments.create({
          customerId: 'cst_8wmqcHMN4U',
          amount: {
            currency: 'EUR',
            value: '10.00', // We enforce the correct number of decimals through strings
          },
          description: 'Order #12345',
          sequenceType: 'first',
          redirectUrl: 'https://webshop.example.org/order/12345/',
          webhookUrl: 'https://webshop.example.org/payments/webhook/',
        });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
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
       "description": "Order #12345",
       "method": null,
       "metadata": {
           "order_id": "12345"
       },
       "status": "open",
       "isCancelable": false,
       "expiresAt": "2018-03-20T09:28:37+00:00",
       "details": null,
       "profileId": "pfl_QkEhN94Ba",
       "customerId": "cst_8wmqcHMN4U",
       "sequenceType": "first",
       "redirectUrl": "https://webshop.example.org/order/12345/",
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
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
               "href": "https://docs.mollie.com/reference/v2/payments-api/create-payment",
               "type": "text/html"
           }
       }
   }
