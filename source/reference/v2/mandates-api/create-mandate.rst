Create mandate
==============
.. api-name:: Mandates API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/customers/*customerId*/mandates

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Create a mandate for a specific customer. Mandates allow you to charge a customer's credit card,
PayPal account or bank account recurrently.

It is only possible to create mandates for IBANs and PayPal billing agreements with this endpoint.
To create mandates for credit cards, have your customers perform a
:ref:`'first payment' <payments/recurring/first-payment>` with their credit card.

.. note:: Created mandates are unique to your account and can not be transferred to other accounts.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``/v2/customers/cst_8wmqcHMN4U/mandates``.

.. list-table::
   :widths: auto

   * - ``method``

       .. type:: string
          :required: true

     - Payment method of the mandate.

       Possible values: ``directdebit`` ``paypal``

   * - ``consumerName``

       .. type:: string
          :required: true

     - The consumer's name.

   * - ``consumerAccount``

       .. type:: string
          :required: false

     - The consumer's IBAN.

       .. note:: Required for ``directdebit`` mandates

   * - ``consumerBic``

       .. type:: string
          :required: false

     - The consumer's bank's BIC.

   * - ``consumerEmail``

       .. type:: string
          :required: false

     - The consumer's email address.

       .. note:: Required for ``paypal`` mandates

   * - ``signatureDate``

       .. type:: date
          :required: false

     - The date when the mandate was signed in ``YYYY-MM-DD`` format.

   * - ``mandateReference``

       .. type:: string
          :required: false

     - A custom mandate reference. Use an unique ``mandateReference`` as some banks decline a
       Direct Debit payment if the ``mandateReference`` is not unique.

   * - ``paypalBillingAgreementId``

       .. type:: string
          :required: false

     - The billing agreement ID given by PayPal.

       For example: ``B-12A34567B8901234CD``

       .. note:: Required for ``paypal`` mandates


Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode mandate.

Response
--------
``201`` ``application/json``

A mandate object is returned, as described in :doc:`Get mandate </reference/v2/mandates-api/get-mandate>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/customers/cst_4qqhO89gsT/mandates \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "method=directdebit" \
         -d "consumerName=John Doe" \
         -d "consumerAccount=NL55INGB0000000000" \
         -d "consumerBic=INGBNL2A" \
         -d "signatureDate=2018-05-07" \
         -d "mandateReference=YOUR-COMPANY-MD13804"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $mandate = $mollie->customers->get("cst_4qqhO89gsT")->createMandate([
         "method" => \Mollie\Api\Types\MandateMethod::DIRECTDEBIT,
         "consumerName" => "John Doe",
         "consumerAccount" => "NL55INGB0000000000",
         "consumerBic" => "INGBNL2A",
         "signatureDate" => "2018-05-07",
         "mandateReference" => "YOUR-COMPANY-MD13804",
      ]);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      mandate = mollie_client.customer_mandates.with_parent_id('cst_4qqhO89gsT').create({
          'method': 'directdebit',
          'consumerName': 'John Doe',
          'consumerAccount': 'NL55INGB0000000000',
          'consumerBic': 'INGBNL2A',
          'signatureDate': '2020-04-23',
          'mandateReference': 'YOUR-COMPANY-MD13804'
      })

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      mandate = Mollie::Customer::Mandate.create(
        customer_id:       'cst_4qqhO89gsT',
        method:            'directdebit',
        consumer_name:     'John Doe',
        consumer_account:  'NL55INGB0000000000',
        consumer_bic:      'INGBNL2A',
        signature_date:    '2018-05-07',
        mandate_reference: 'YOUR-COMPANY-MD13804'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const mandate = await mollieClient.customers_mandates.create({
          customerId: 'cst_4qqhO89gsT',
          method: 'directdebit',
          consumerName: 'John Doe',
          consumerAccount: 'NL55INGB0000000000',
          consumerBic: 'INGBNL2A',
          signatureDate: '2018-05-07',
          mandateReference: 'YOUR-COMPANY-MD13804',
        });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json

   {
       "resource": "mandate",
       "id": "mdt_h3gAaD5zP",
       "mode": "test",
       "status": "valid",
       "method": "directdebit",
       "details": {
           "consumerName": "John Doe",
           "consumerAccount": "NL55INGB0000000000",
           "consumerBic": "INGBNL2A"
       },
       "mandateReference": "YOUR-COMPANY-MD13804",
       "signatureDate": "2018-05-07",
       "createdAt": "2018-05-07T10:49:08+00:00",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_4qqhO89gsT/mandates/mdt_h3gAaD5zP",
               "type": "application/hal+json"
           },
           "customer": {
               "href": "https://api.mollie.com/v2/customers/cst_4qqhO89gsT",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/mandates-api/create-mandate",
               "type": "text/html"
           }
       }
   }
