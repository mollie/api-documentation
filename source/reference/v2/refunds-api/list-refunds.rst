List refunds
============
.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/refunds

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a list of all of your refunds.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
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
:doc:`OAuth app </connect/overview>`, you can specify which profile you are retrieving refunds for using the
``profileId`` parameter. Organizations can have multiple profiles for each of their websites. If you omit the
``profileId`` parameter, the API will return all refunds across all profiles. See
:doc:`Profiles API </reference/v2/profiles-api/overview>` for more information.

For these authentication methods the optional ``testmode`` parameter is available as well to enable test mode.

.. parameter:: profileId
   :type: string
   :condition: optional
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. Omit this parameter to retrieve all refunds
   across all profiles.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to true to only retrieve refunds made for test mode payments. By default, only refunds on live mode payments
   are returned.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed`` query
string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` the refunds were created for.

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

      curl -X GET https://api.mollie.com/v2/refunds \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $refunds = $mollie->refunds();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      refunds = mollie_client.refunds.list()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      refunds = Mollie::Refund.all

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const refunds = mollieClient.refunds.iterate();

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
               "href": "https://api.mollie.com/v2/refunds?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/refunds?from=re_APBiGPH2vV&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/refunds-api/list-refunds",
               "type": "text/html"
           }
       }
   }
