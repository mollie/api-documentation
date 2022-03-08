Create mandate
==============
.. api-name:: Mandates API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for creating mandates in the new v2 API can be found
             :doc:`here </reference/v2/mandates-api/create-mandate>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v1/customers/*customerId*/mandates

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Create a mandate for a specific customer. Mandates allow you to charge a customer's credit card or bank account
recurrently.

It is only possible to create mandates for IBANs with this endpoint. To create mandates for credit cards, have your
customers perform a :ref:`'first payment' <payments/recurring/first-payment>` with their credit card.

.. note:: Created mandates are unique to your account and can not be transferred to other accounts.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``/v1/customers/cst_8wmqcHMN4U/mandates``.

.. parameter:: method
   :type: string
   :condition: required

   Payment method of the mandate.

   Possible values: ``directdebit``

.. parameter:: consumerName
   :type: string
   :condition: required

   The consumer's name.

.. parameter:: consumerAccount
   :type: string
   :condition: required

   The consumer's IBAN.

.. parameter:: consumerBic
   :type: string
   :condition: optional

   The consumer's bank's BIC.

.. parameter:: signatureDate
   :type: date
   :condition: optional

   The date when the mandate was signed in ``YYYY-MM-DD`` format.

.. parameter:: mandateReference
   :type: date
   :condition: optional

   A custom mandate reference. Use an unique ``mandateReference`` as some banks decline a Direct Debit payment if the
   ``mandateReference`` is not unique.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the ``testmode`` parameter is also available.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to create a test mode mandate.

Response
--------
``201`` ``application/json``

A mandate object is returned, as described in :doc:`Get mandate </reference/v1/mandates-api/get-mandate>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v1/customers/cst_stTC2WHAuS/mandates \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "method=directdebit" \
       -d "consumerName=Customer A" \
       -d "consumerAccount=NL53INGB0000000000" \
       -d "consumerBic=INGBNL2A" \
       -d "signatureDate=2016-05-01" \
       -d "mandateReference=YOUR-COMPANY-MD13804"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json

   {
       "resource": "mandate",
       "id": "mdt_pWUnw6pkBN",
       "mode": "test",
       "status": "valid",
       "method": "directdebit",
       "customerId": "cst_stTC2WHAuS",
       "details": {
           "consumerName": "Customer A",
           "consumerAccount": "NL53INGB0000000000",
           "consumerBic": "INGBNL2A"
       },
       "mandateReference": "YOUR-COMPANY-MD13804",
       "createdDatetime": "2016-04-30T22:00:00.0Z"
   }
