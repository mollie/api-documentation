List chargebacks
================
.. api-name:: Chargebacks API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/chargebacks

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/chargebacks

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all received chargebacks. If the payment-specific endpoint is used, only chargebacks for that specific payment
are returned.

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

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the chargeback with this ID. The chargeback with this ID is
       included in the result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of chargebacks to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the only mandatory extra parameter is the ``profileId`` parameter. With it, you can
specify which profile the payment belongs to. Organizations can have multiple profiles for each of their websites. See
:doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` these chargebacks were issued for.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of chargebacks found in ``_embedded``.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``chargebacks``

              .. type:: array

            - An array of chargeback objects as described in
              :doc:`Get chargeback </reference/v2/chargebacks-api/get-chargeback>`.

   * - ``_links``

       .. type:: object

     - Links related to the lists of chargebacks. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of chargebacks.

          * - ``documentation``

              .. type:: object

            - The URL to the chargebacks list endpoint documentation.

Example
-------

.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/chargebacks \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      // List chargebacks for a single payment
      $payment = $mollie->payments->get("tr_7UhSN1zuXS");
      $chargebacks = $payment->chargebacks();

      // List chargebacks across all payments on the payment profile
      // (For all chargebacks on the organizations, use an OAuth or Organization access token.)
      $all_chargebacks = $mollie->chargebacks->page();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      payment = mollie_client.payments.get('tr_WDqYK6vllg')
      chargebacks = payment.chargebacks

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      # List chargebacks for a single payment
      payment = Mollie::Payment.get('tr_WDqYK6vllg')
      chargebacks = payment.chargebacks

      # List chargebacks across all payments on the payment profile
      # (For all chargebacks on the organizations, use an OAuth or Organization access token.)
      chargebacks = Mollie::Chargeback.all

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        // List chargebacks for a single payment
        let chargebacks = await mollieClient.payments_chargebacks.list({ paymentId: 'tr_WDqYK6vllg' });

        // List chargebacks across all payments on the payment profile
        // (For all chargebacks on the organizations, use an OAuth or Organization access token.)
        chargebacks = await mollieClient.chargebacks.list();
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 3,
       "_embedded": {
           "chargebacks": [
               {
                   "resource": "chargeback",
                   "id": "chb_n9z0tp",
                   "amount": {
                       "currency": "USD",
                       "value": "43.38"
                   },
                   "settlementAmount": {
                       "currency": "EUR",
                       "value": "35.07"
                   },
                   "createdAt": "2018-03-14T17:00:52.0Z",
                   "reversedAt": null,
                   "paymentId": "tr_WDqYK6vllg",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback",
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
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/chargebacks",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks",
               "type": "text/html"
           }
       }
   }
