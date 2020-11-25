List Payment Refunds API
========================

.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/refunds

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/refunds

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve Refunds.

* If the payment-specific endpoint is used, only Refunds for that specific Payment are returned.
* When using the top level endpoint ``v2/refunds`` with an API key, only refunds for the corresponding website profile
  and mode are returned.
* When using the top level endpoint with OAuth, you can specify the profile and mode with the ``profileId`` and
  ``testmode`` parameters respectively. If you omit ``profileId``, you will get all Refunds for the Organization.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
When using the payment-specific endpoint, replace ``paymentId`` in the endpoint URL by the payment's ID, for example
``tr_7UhSN1zuXS``.

.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the refund with this ID. The refund with this ID is included in the result
       set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of refunds to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you can specify which profile you want to look at when listing refunds. If you omit the ``profileId``
parameter, you will get all refunds on the organization.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: false

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve Refunds made in test mode. By default, only Refunds on live mode Payments are
       returned.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`Payments </reference/v2/payments-api/get-payment>` the Refunds were created for.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of refunds found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``refunds``

              .. type:: array

            - An array of refund objects as described in
              :doc:`Get payment refund </reference/v2/refunds-api/get-refund>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of refunds. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of refunds.

          * - ``previous``

              .. type:: object

            - The previous set of refunds, if available.

          * - ``next``

              .. type:: object

            - The next set of refunds, if available.

          * - ``documentation``

              .. type:: object

            - The URL to the List payment refunds endpoint documentation.

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
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      refunds = mollie_client.payments.get('tr_WDqYK6vllg').refunds

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

      (async () => {
        const refunds = await mollieClient.payments_refunds.page({ paymentId: 'tr_WDqYK6vllg' });
      })();

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
                           "href": "https://docs.mollie.com/reference/v2/refunds-api/get-refund",
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
               "href": "https://docs.mollie.com/reference/v2/refunds-api/list-refunds",
               "type": "text/html"
           }
       }
   }
