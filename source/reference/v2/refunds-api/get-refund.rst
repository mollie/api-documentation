Get refund
==========
.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/refunds/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a single refund by its ID. Note the original payment's ID is needed as well.

If you do not know the original payment's ID, you can use the
:doc:`List refunds </reference/v2/refunds-api/list-refunds>` endpoint.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the refund's ID. For example:
``/v2/payments/tr_7UhSN1zuXS/refunds/re_4qqhO89gsT``.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payment </reference/v2/payments-api/get-payment>` this refund was created for.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

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

   * - ``settlementAmount``

       .. type:: amount object|null

     -   This optional field will contain the amount that will be deducted from your account balance, converted to the
         currency your account is settled in. It follows the same syntax as the ``amount`` property.

         Note that for refunds, the ``value`` key of ``settlementAmount`` will be negative.

         Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal refunds.

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

   * - ``status``

       .. type:: string

     - Since refunds may be delayed for certain payment methods, the refund carries a status field.

       Possible values:

       * ``queued`` The refund will be processed once you have enough balance. You can still cancel this refund.
       * ``pending`` The refund will be processed soon (usually the next business day). You can still cancel this
         refund.
       * ``processing`` The refund is being processed. Cancellation is no longer possible.
       * ``refunded`` The refund has been paid out to your customer.
       * ``failed`` The refund has failed during processing.

   * - ``createdAt``

       .. type:: datetime

     - The date and time the refund was issued, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``paymentId``

       .. type:: string

     - The unique identifier of the payment this refund was created for. For example: ``tr_7UhSN1zuXS``. The full
       payment object can be retrieved via the ``payment`` URL in the ``_links`` object.

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

            - The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.

          * - ``documentation``

              .. type:: URL object

            - The URL to the refund retrieval endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $refund = $mollie->payments->get("tr_WDqYK6vllg")->getRefund("re_4qqhO89gsT");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

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
