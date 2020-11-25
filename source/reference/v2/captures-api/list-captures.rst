List captures
=============

.. api-name:: Captures API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/captures

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all captures for a certain payment.

Captures are used for payments that have the *authorize-then-capture* flow. The only payment methods at the moment
that have this flow are *Klarna Pay later* and *Klarna Slice it*.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID. For example: ``/v2/payments/tr_7UhSN1zuXS/captures``.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` the captures were created for.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` query string parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve captures for a test mode payment.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of captures found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``captures``

              .. type:: array

            - An array of capture objects as described in :doc:`Get capture </reference/v2/captures-api/get-capture>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of captures. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of captures.

          * - ``previous``

              .. type:: object

            - The previous set of captures, if available.

          * - ``next``

              .. type:: object

            - The next set of captures, if available.

          * - ``documentation``

              .. type:: object

            - The URL to the List payment captures endpoint documentation.

Example
-------

.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $payment = $mollie->payments->get("tr_WDqYK6vllg");
      $captures = $payment->captures();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      captures = Mollie::Payment::Capture.all(payment_id: 'tr_WDqYK6vllg')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const captures = await mollieClient.payments_captures.list({ paymentId: 'tr_WDqYK6vllg'});
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "_embedded": {
           "captures": [
               {
                   "resource": "capture",
                   "id": "cpt_4qqhO89gsT",
                   "mode": "live",
                   "amount": {
                       "value": "1027.99",
                       "currency": "EUR"
                   },
                   "settlementAmount": {
                       "value": "399.00",
                       "currency": "EUR"
                   },
                   "paymentId": "tr_WDqYK6vllg",
                   "shipmentId": "shp_3wmsgCJN4U",
                   "settlementId": "stl_jDk30akdN",
                   "createdAt": "2018-08-02T09:29:56+00:00",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                           "type": "application/hal+json"
                       },
                       "shipment": {
                           "href": "https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/shipments/shp_3wmsgCJN4U",
                           "type": "application/hal+json"
                       },
                       "settlement": {
                           "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/captures-api/get-capture",
                           "type": "text/html"
                       }
                   }
               }
           ]
       },
       "count": 1,
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/captures-api/list-captures",
               "type": "text/html"
           },
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures?limit=50",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": null
       }
   }

