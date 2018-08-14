Create mandate
==============
.. api-name:: Mandates API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/customers/*customerId*/mandates

.. authentication::
   :api_keys: true
   :oauth: true

Create a mandate for a specific customer. Mandates allow you to charge a customer's credit card or bank account
recurrently.

It is only possible to create mandates for IBANs with this endpoint. To create mandates for credit cards, have your
customers perform a :ref:`'first payment' <payments/recurring/first-payment>` with their credit card.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``/v2/customers/cst_8wmqcHMN4U/mandates``.

.. list-table::
   :widths: auto

   * - ``method``

       .. type:: string
          :required: true

     - Payment method of the mandate.

       Possible values: ``directdebit``

   * - ``consumerName``

       .. type:: string
          :required: true

     - The consumer's name.

   * - ``consumerAccount``

       .. type:: string
          :required: true

     - The consumer's IBAN.

   * - ``consumerBic``

       .. type:: string
          :required: false

     - The consumer's bank's BIC.

   * - ``signatureDate``

       .. type:: date
          :required: false

     - The date when the mandate was signed in ``YYYY-MM-DD`` format.

   * - ``mandateReference``

       .. type:: string
          :required: false

     - A custom mandate reference.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode mandate.

Response
--------
``201`` ``application/json; charset=utf-8``

A mandate object is returned, as described in :doc:`Get mandate </reference/v2/mandates-api/get-mandate>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
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

Request (PHP)
^^^^^^^^^^^^^
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

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json; charset=utf-8

   {
       "resource": "mandate",
       "id": "mdt_h3gAaD5zP",
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
