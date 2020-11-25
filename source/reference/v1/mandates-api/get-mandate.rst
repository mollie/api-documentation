Get mandate
===========
.. api-name:: Mandates API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving mandates in the new v2 API can be found
             :doc:`here </reference/v2/mandates-api/get-mandate>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/customers/*customerId*/mandates/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve a mandate by its ID and its customer's ID. The mandate will either contain IBAN or credit card details,
depending on the type of mandate.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the mandate's ID. For example
``/v1/customers/cst_8wmqcHMN4U/mandates/mdt_pWUnw6pkBN``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` query string parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve a test mode mandate.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a mandate object. Will always contain ``mandate`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this mandate. Mollie assigns this identifier at mandate creation time. For
       example ``mdt_pWUnw6pkBN``.

   * - ``mode``

       .. type:: string

     - The mode used to create this mandate.

   * - ``status``

       .. type:: string

     - The status of the mandate. Please note that a status can be ``pending`` for mandates when the
       first payment is not yet finalized or when we did not received the IBAN yet.

       Possible values: ``valid`` ``pending`` ``invalid``

   * - ``method``

       .. type:: string

     - Payment method of the mandate.

       Possible values: ``directdebit`` ``creditcard`` ``paypal``

   * - ``customerId``

       .. type:: string

     - The customer's unique identifier, for example ``cst_3RkSN1zuPE``.

   * - ``details``

       .. type:: object

     - The mandate detail object contains different fields per payment method. See the list below.

   * - ``mandateReference``

       .. type:: string

     - The mandate's custom reference, if this was provided when creating the mandate.

   * - ``signatureDate``

       .. type:: string

     - The signature date of the mandate in ``YYYY-MM-DD`` format.

   * - ``createdDatetime``

       .. type:: datetime

     - The mandate's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

Payment method specific details
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The mandate detail object contains different fields per payment method.

Direct Debit
""""""""""""
.. list-table::
   :widths: auto

   * - ``consumerName``

       .. type:: string

     - The account holder's name.

   * - ``consumerAccount``

       .. type:: string

     - The account holder's IBAN.

   * - ``consumerBic``

       .. type:: string

     - The account holder's bank's BIC.

Credit Card
"""""""""""
.. list-table::
   :widths: auto

   * - ``cardHolder``

       .. type:: string

     - The credit card holder's name.

   * - ``cardNumber``

       .. type:: string

     - The last four digits of the credit card number.

   * - ``cardLabel``

       .. type:: string

     - The credit card's label. Note that not all labels can be processed through Mollie.

       Possible values: ``American Express`` ``Carta Si`` ``Carte Bleue`` ``Dankort`` ``Diners Club`` ``Discover``
       ``JCB`` ``Laser`` ``Maestro`` ``Mastercard`` ``Unionpay`` ``Visa`` ``null``

   * - ``cardFingerprint``

       .. type:: string

     - Unique alphanumeric representation of the credit card, usable for identifying returning customers.

   * - ``cardExpiryDate``

       .. type:: date

     - Expiry date of the credit card in ``YYYY-MM-DD`` format.

PayPal
""""""
.. list-table::
   :widths: auto

   * - ``consumerName``

       .. type:: string

     - The consumer's first and last name.

   * - ``consumerAccount``

       .. type:: string

     - The consumer's email address.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/customers/cst_4qqhO89gsT/mandates/mdt_h3gAaD5zP \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

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
       "method": "creditcard",
       "customerId": "cst_4qqhO89gsT",
       "details": {
           "cardHolder": "John Doe",
           "cardNumber": "1234",
           "cardLabel": "Mastercard",
           "cardFingerprint": "fHB3CCKx9REkz8fPplT8N4nq",
           "cardExpiryDate": "2016-03-31"
       },
       "createdDatetime": "2016-04-13T11:32:38.0Z"
   }
