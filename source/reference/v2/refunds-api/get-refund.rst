Get Payment Refund API
======================

.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/refunds/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single :doc:`Refund </payments/refunds>` by its ID. Note the Payment's ID is needed as well.

If you do not know the original payment's ID, you can use the
:doc:`/reference/v2/refunds-api/list-refunds`.

.. note::
    Trying to retrieve a canceled refund will result in a 404 exception.


Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the refund's ID. For example:
``/v2/payments/tr_7UhSN1zuXS/refunds/re_4qqhO89gsT``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` query string parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to get a refund made in test mode. If you omit this parameter, you can only retrieve live
       mode refunds.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payment </reference/v2/payments-api/get-payment>` this refund was created for.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a refund object. Will always contain ``refund`` for this endpoint.

   * - ``id``

       .. type:: string

     - The refund's unique identifier, for example ``re_4qqhO89gsT``.

   * - ``amount``

       .. type:: amount object

     - The amount refunded to your customer with this refund.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The currencies supported depend on
              the payment methods that are enabled on your account.

          * - ``value``

              .. type:: string

            - A string containing the exact amount that was refunded in the given currency.

   * - ``settlementId``

       .. type:: string
          :required: false

     - The identifier referring to the settlement this payment was settled with. For example, ``stl_BkEjN2eBb``. This
       field is omitted if the refund is not settled (yet).

   * - ``settlementAmount``

       .. type:: amount object
          :required: false

     -   This optional field will contain the amount that will be deducted from your account balance, converted to the
         currency your account is settled in. It follows the same syntax as the ``amount`` property.

         Note that for refunds, the ``value`` key of ``settlementAmount`` will be negative.

         Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal refunds.

         Queued refunds in non EUR currencies will not have a settlement amount until they become ``pending``.

         .. list-table::
            :widths: auto

            * - ``currency``

                .. type:: string

              - The settlement currency, an `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

            * - ``value``

                .. type:: string

              - A string containing the exact amount that was deducted for the refund from your account balance in the
                settlement currency. Note that this will be negative.

                If the refund is queued and in a different currency than the settlement currency, the settlement amount
                will be ``null`` as the exchange rates may change until the refund is finally executed.

   * - ``description``

       .. type:: string

     - The description of the refund that may be shown to your customer, depending on the payment method used.

   * - ``metadata``

       .. type:: mixed

     - The optional metadata you provided upon refund creation. Metadata can for example be used to link an bookkeeping
       ID to a refund.

   * - ``status``

       .. type:: string

     - Since refunds may not be instant for certain payment methods, the refund carries a status field.

       For a full overview, see :ref:`refund-statuses`.

   * - ``lines``

       .. type:: array
          :required: false

     - An array of :ref:`order line objects<order-lines-details>` as described in
       :doc:`Get order </reference/v2/orders-api/get-order>`.

       The lines will show the ``quantity``, ``discountAmount``, ``vatAmount`` and ``totalAmount`` refunded. If the line
       was partially refunded, these values will be different from the values in response from the Get order API.

       Only available if the refund was created via the
       :doc:`Create Order Refund API </reference/v2/orders-api/create-order-refund>`.

   * - ``paymentId``

       .. type:: string

     - The unique identifier of the payment this refund was created for. For example: ``tr_7UhSN1zuXS``. The full
       payment object can be retrieved via the ``payment`` URL in the ``_links`` object.

   * - ``orderId``

       .. type:: string
          :required: false

     - The unique identifier of the order this refund was created for. For example: ``ord_8wmqcHMN4U``. Not present if
       the refund was not created for an order.

       The full order object can be retrieved via the ``order`` URL in the ``_links`` object.


   * - ``createdAt``

       .. type:: datetime

     - The date and time the refund was issued, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the refund. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the refund itself.

          * - ``payment``

              .. type:: URL object

            - The API resource URL of the payment the refund belongs to.

          * - ``settlement``

              .. type:: URL object
                 :required: false

            - The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.

          * - ``order``

              .. type:: URL object
                 :required: false

            - The API resource URL of the order the refund belongs to. Not present if the refund does not belong to an
              order.

          * - ``documentation``

              .. type:: URL object

            - The URL to the refund retrieval endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $refund = $mollie->payments->get("tr_WDqYK6vllg")->getRefund("re_4qqhO89gsT");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      payment = mollie_client.payments.get('tr_WDqYK6vllg')
      refund = mollie_client.payment_refunds.on(payment).get('re_4qqhO89gsT')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      refund = Mollie::Payment::Refund.get(
        're_4qqhO89gsT',
        payment_id: 'tr_WDqYK6vllg'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const refund = await mollieClient.payments_refunds.get('re_4qqhO89gsT', { paymentId: 'tr_WDqYK6vllg' });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "refund",
       "id": "re_4qqhO89gsT",
       "amount": {
           "currency": "EUR",
           "value": "5.95"
       },
       "status": "pending",
       "createdAt": "2018-03-14T17:09:02.0Z",
       "description": "Order #33",
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
   }
