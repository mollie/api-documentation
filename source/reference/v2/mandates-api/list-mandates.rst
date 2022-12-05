List mandates
=============
.. api-name:: Mandates API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/mandates

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all mandates for the given ``customerId``, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the mandate with this ID. The mandate with
   this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of mandates to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` query string parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to true to only retrieve mandates made in test mode. By default, only live mandates are returned.

Response
--------
``200`` ``application/json``

.. parameter:: count
   :type: integer

   The number of mandates found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: mandates
      :type: array

      An array of mandate objects as described in :doc:`Get mandate </reference/v2/mandates-api/get-mandate>`.

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of mandates. Every URL object will contain an ``href`` and a ``type`` field.

   .. parameter:: self
      :type: URL object

      The URL to the current set of mandates.

   .. parameter:: previous
      :type: URL object

      The previous set of mandates, if available.

   .. parameter:: next
      :type: URL object

      The next set of mandates, if available.

   .. parameter:: documentation
      :type: URL object

      The URL to the mandates list endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $customer = $mollie->customers->get("cst_stTC2WHAuS");
      $mandates = $customer->mandates();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      mandates = mollie_client.customer_mandates.with_parent_id('cst_stTC2WHAuS').list()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      customer = Mollie::Customer.get('cst_stTC2WHAuS')
      mandates = customer.mandates

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const mandates = mollieClient.customerMandates.iterate({ customerId: 'cst_stTC2WHAuS' });

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 5,
       "_embedded": {
           "mandates": [
               {
                   "resource": "mandate",
                   "id": "mdt_AcQl5fdL4h",
                   "mode": "test",
                   "status": "valid",
                   "method": "directdebit",
                   "details": {
                       "consumerName": "John Doe",
                       "consumerAccount": "NL55INGB0000000000",
                       "consumerBic": "INGBNL2A"
                   },
                   "mandateReference": null,
                   "signatureDate": "2018-05-07",
                   "createdAt": "2018-05-07T10:49:08+00:00",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates/mdt_AcQl5fdL4h",
                           "type": "application/hal+json"
                       },
                       "customer": {
                           "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/mandates-api/create-mandate",
                           "type": "text/html"
                       }
                   }
               },
               { },
               { },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates?from=mdt_AcQl5fdL4h&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate",
               "type": "text/html"
           }
       }
   }
