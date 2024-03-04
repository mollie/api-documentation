List payment refunds
====================
.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/refunds

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a list of all refunds created for a specific payment.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, for example ``tr_7UhSN1zuXS``.

.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the refund with this ID. The refund with this
   ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of refunds to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the optional ``testmode`` parameter is available to filter on test mode refunds.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to true to retrieve refunds made on a test mode payment. By default, only refunds on live mode payments are
   returned.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payment </reference/v2/payments-api/get-payment>` the refunds were created for.

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of refunds found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: refunds
      :type: array

      An array of refund objects as described in
      :doc:`Get payment refund </reference/v2/refunds-api/get-payment-refund>`.

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of refunds. Every URL object will contain an ``href`` and a ``type`` field.

   .. parameter:: self
      :type: object

      The URL to the current set of refunds.

   .. parameter:: previous
      :type: object

      The previous set of refunds, if available.

   .. parameter:: next
      :type: object

      The next set of refunds, if available.

   .. parameter:: documentation
      :type: object

      The URL to the List payment refunds endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $refunds = $mollie->payments->get("tr_WDqYK6vllg")->refunds();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      payment = mollie_client.payments.get("tr_WDqYK6vllg")
      refunds = payment.refunds.list()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      refunds = Mollie::Payment.get('tr_7UhSN1zuXS').refunds

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const refunds = mollieClient.paymentRefunds.iterate({ paymentId: 'tr_WDqYK6vllg' });

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 5,
       "_embedded": {
           "refunds": [
               {
                   "resource": "refund",
                   "id": "re_4qqhO89gsT",
                   "amount": {
                       "currency": "EUR",
                       "value": "5.95"
                   },
                   "status": "pending",
                   "createdAt": "2018-03-14T17:09:02.0Z",
                   "description": "Order",
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
                           "href": "https://docs.mollie.com/reference/v2/refunds-api/get-payment-refund",
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
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?from=re_APBiGPH2vV&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/refunds-api/list-payment-refunds",
               "type": "text/html"
           }
       }
   }
