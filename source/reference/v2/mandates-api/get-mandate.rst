Get mandate
===========
.. api-name:: Mandates API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/mandates/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a mandate by its ID and its customer's ID. The mandate will either contain IBAN or credit card details,
depending on the type of mandate.

.. note::
   Trying to retrieve a revoked mandate will result in a 410 exception.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the mandate's ID. For example
``/v2/customers/cst_8wmqcHMN4U/mandates/mdt_pWUnw6pkBN``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` query string parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to retrieve a test mode mandate.

Response
--------
``200`` ``application/json``

.. parameter:: resource
   :type: string

   Indicates the response contains a mandate object. Will always contain ``mandate`` for this endpoint.

.. parameter:: id
   :type: string

   The identifier uniquely referring to this mandate. Mollie assigns this identifier at mandate creation time. For
   example ``mdt_pWUnw6pkBN``.

.. parameter:: mode
   :type: string

   The mode used to create this mandate.

.. parameter:: status
   :type: string

   The status of the mandate. Please note that a status can be ``pending`` for mandates when the first payment is not
   yet finalized or when we did not received the IBAN yet.

   Possible values: ``valid`` ``pending`` ``invalid``

.. parameter:: method
   :type: string

   Payment method of the mandate.

   Possible values: ``directdebit`` ``creditcard`` ``paypal``

.. parameter:: details
   :type: object

   The mandate detail object contains different fields per payment method. See the list below.

.. parameter:: mandateReference
   :type: string

   The mandate's custom reference, if this was provided when creating the mandate.

.. parameter:: signatureDate
   :type: string

   The signature date of the mandate in ``YYYY-MM-DD`` format.

.. parameter:: createdAt
   :type: datetime

   The mandate's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the mandate. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the mandate itself.

   .. parameter:: customer
      :type: URL object

      The API resource URL of the customer the mandate is for.

   .. parameter:: documentation
      :type: URL object

      The URL to the mandate retrieval endpoint documentation.

Payment method-specific details
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The mandate detail object contains different fields per payment method.

Direct Debit
""""""""""""
.. parameter:: consumerName
   :type: string

   The account holder's name.

.. parameter:: consumerAccount
   :type: string

   The account holder's IBAN.

.. parameter:: consumerBic
   :type: string

   The account holder's bank's BIC.

Credit Card
"""""""""""
.. parameter:: cardHolder
   :type: string

   The credit card holder's name.

.. parameter:: cardNumber
   :type: string

   The last four digits of the credit card number.

.. parameter:: cardLabel
   :type: string

   The credit card's label. Note that not all labels can be processed through Mollie.

   Possible values: ``American Express`` ``Carta Si`` ``Carte Bleue`` ``Dankort`` ``Diners Club`` ``Discover`` ``JCB``
   ``Laser`` ``Maestro`` ``Mastercard`` ``Unionpay`` ``Visa`` ``null``

.. parameter:: cardFingerprint
   :type: string

   Unique alphanumeric representation of the credit card, usable for identifying returning customers.

.. parameter:: cardExpiryDate
   :type: date

   Expiry date of the credit card in ``YYYY-MM-DD`` format.

PayPal
""""""
.. parameter:: consumerName
   :type: string

   The consumer's first and last name.

.. parameter:: consumerAccount
   :type: string

   The consumer's email address.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_4qqhO89gsT/mandates/mdt_h3gAaD5zP \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $customer = $mollie->customers->get("cst_4qqhO89gsT");
      $mandate = $customer->getMandate("mdt_h3gAaD5zP");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      customer = mollie_client.customers.get("cst_4qqhO89gsT")
      mandate = customer.mandates.get("mdt_h3gAaD5zP")

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      mandate = Mollie::Customer::Mandate.get('mdt_h3gAaD5zP', customer_id: 'cst_4qqhO89gsT')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const mandate = await mollieClient.customerMandates.get('mdt_h3gAaD5zP', {
        customerId: 'cst_4qqhO89gsT'
      });

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
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
       "mandateReference": "YOUR-COMPANY-MD1380",
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
               "href": "https://docs.mollie.com/reference/v2/mandates-api/get-mandate",
               "type": "text/html"
           }
       }
   }
