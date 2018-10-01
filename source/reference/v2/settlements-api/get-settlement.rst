Get settlement
==============
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements/*id*

.. authentication::
   :api_keys: false
   :oauth: true

Successful payments are collected into *settlements*, which are then paid out according to your organization's payout
schedule. By retrieving a single settlement, you can check which payments were paid out with it, when the settlement
took place, and what invoice reference was used for it.

Beside payments, settlements can be composed of other entities such as
:doc:`refunds </reference/v2/settlements-api/list-settlement-refunds>`,
:doc:`chargebacks </reference/v2/settlements-api/list-settlement-chargebacks>` or
:doc:`captures </reference/v2/settlements-api/list-settlement-captures>`.

Parameters
----------
Replace ``id`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN``.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a settlement object. Will always contain ``settlement`` for this endpoint.

   * - ``id``

       .. type:: string

     - The settlement's unique identifier, for example ``stl_jDk30akdN``.

   * - ``reference``

       .. type:: string

     - The settlement's bank reference, as found on your invoice and in your Mollie account.

   * - ``createdAt``

       .. type:: string

     - The date on which the settlement was created, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``settledAt``

       .. type:: string

     - The date on which the settlement was settled, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.
       When requesting the :doc:`open settlement </reference/v2/settlements-api/get-open-settlement>` or
       :doc:`next settlement </reference/v2/settlements-api/get-next-settlement>` the return value is ``null``.

   * - ``status``

       .. type:: string

     - The status of the settlement.

       Possible values:

       * ``open`` The settlement has not been closed yet.
       * ``pending`` The settlement has been closed and is being processed.
       * ``paidout`` The settlement has been paid out.
       * ``failed`` The settlement could not be paid out.

   * - ``amount``

       .. type:: amount object

     - The total amount paid out with this settlement.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact amount of the settlement in the given currency.

   * - ``periods``

       .. type:: object

     - This object is a collection of Period objects, which describe the settlement by month in full detail.

       Please note the periods are sorted by date. For example, the field may contain an object called ``2018``, which
       contains a Period object called ``03``. The Period object fields are listed below.

       .. list-table::
          :widths: auto

          * - ``revenue``

              .. type:: array

            - An array of revenue objects containing the total revenue for each payment method during this period. Each
              object has the following fields.

              .. list-table::
                 :widths: auto

                 * - ``description``

                     .. type:: string

                   - A description of the revenue subtotal.

                 * - ``amountNet``

                     .. type:: amount object

                   - The net total of received funds for this payment method (excludes VAT).

                 * - ``amountVat``

                     .. type:: amount object

                   - The VAT amount applicable to the revenue.

                 * - ``amountGross``

                     .. type:: amount object

                   - The gross total of received funds for this payment method (includes VAT).

                 * - ``count``

                     .. type:: integer

                   - The number of payments received for this payment method.

                 * - ``method``

                     .. type:: string

                   - The payment method ID, if applicable.

          * - ``costs``

              .. type:: array

            - An array of Cost objects, describing the fees withheld for each payment method during this period. Each
              object has the following fields.

              .. list-table::
                 :widths: auto

                 * - ``description``

                     .. type:: string

                   - A description of the subtotal.

                 * - ``amountNet``

                     .. type:: amount object

                   - The net total costs for this payment method (excludes VAT).

                 * - ``amountVat``

                     .. type:: amount object

                   - The VAT amount applicable to the costs.

                 * - ``amountGross``

                     .. type:: amount object

                   - The gross total costs for this payment method (includes VAT).

                 * - ``count``

                     .. type:: integer

                   - The number of times costs were made for this payment method.

                 * - ``rate``

                     .. type:: object

                   - The service rates, further divided into ``fixed`` and ``percentage`` costs.

                     .. list-table::
                        :widths: auto

                        * - ``fixed``

                            .. type:: amount object

                          - An amount object describing the fixed costs.

                        * - ``variable``

                            .. type:: string

                          - A string describing the variable costs as a percentage.

                 * - ``method``

                     .. type:: string

                   - The payment method ID, if applicable.

   * - ``invoiceId``

       .. type:: string

     - The ID of the invoice on which this settlement is invoiced, if it has been invoiced.


   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the settlement. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the settlement itself.

          * - ``payments``

              .. type:: URL object

            - The API resource URL of the payments that are included in this settlement.

          * - ``refunds``

              .. type:: URL object

            - The API resource URL of the refunds that are included in this settlement.

          * - ``chargebacks``

              .. type:: URL object

            - The API resource URL of the chargebacks that are included in this settlement.

          * - ``captures``

              .. type:: URL object

            - The API resource URL of the captures that are included in this settlement.

          * - ``invoice``

              .. type:: URL object

            - The API resource URL of the invoice that contains this settlement.

          * - ``documentation``

              .. type:: URL object

            - The URL to the settlement retrieval endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/settlements/stl_jDk30akdN \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
    $settlement = $mollie->settlements->get("stl_jDk30akdN");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "settlement",
       "id": "stl_jDk30akdN",
       "reference": "1234567.1804.03",
       "createdAt": "2018-04-06T06:00:01.0Z",
       "settledAt": "2018-04-06T09:41:44.0Z",
       "amount": {
           "currency": "EUR",
           "value": "39.75"
       },
       "periods": {
           "2018": {
               "4": {
                   "revenue": [
                       {
                           "description": "iDEAL",
                           "method": "ideal",
                           "count": 6,
                           "amountNet": {
                               "currency": "EUR",
                               "value": "86.1000"
                           },
                           "amountVat": null,
                           "amountGross": {
                               "currency": "EUR",
                               "value": "86.1000"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "amountNet": {
                               "currency": "EUR",
                               "value": "-43.2000"
                           },
                           "amountVat": null,
                           "amountGross": {
                               "currency": "EUR",
                               "value": "43.2000"
                           }
                       }
                   ],
                   "costs": [
                       {
                           "description": "iDEAL",
                           "method": "ideal",
                           "count": 6,
                           "rate": {
                               "fixed": {
                                   "currency": "EUR",
                                   "value": "0.3500"
                               },
                               "percentage": null
                           },
                           "amountNet": {
                               "currency": "EUR",
                               "value": "2.1000"
                           },
                           "amountVat": {
                               "currency": "EUR",
                               "value": "0.4410"
                           },
                           "amountGross": {
                               "currency": "EUR",
                               "value": "2.5410"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "rate": {
                               "fixed": {
                                   "currency": "EUR",
                                   "value": "0.2500"
                               },
                               "percentage": null
                           },
                           "amountNet": {
                               "currency": "EUR",
                               "value": "0.5000"
                           },
                           "amountVat": {
                               "currency": "EUR",
                               "value": "0.1050"
                           },
                           "amountGross": {
                               "currency": "EUR",
                               "value": "0.6050"
                           }
                       }
                   ]
               }
           }
       },
       "invoiceId": "inv_FrvewDA3Pr",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/settlements/next",
               "type": "application/hal+json"
           },
           "payments": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments",
               "type": "application/hal+json"
           },
           "refunds": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/refunds",
               "type": "application/hal+json"
           },
           "chargebacks": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/chargebacks",
               "type": "application/hal+json"
           },
           "captures": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/captures",
               "type": "application/hal+json"
           },
           "invoice": {
                "href": "https://api.mollie.com/v2/invoices/inv_FrvewDA3Pr",
                "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/get-settlement",
               "type": "text/html"
           }
       }
   }
