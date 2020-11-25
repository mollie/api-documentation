Get settlement
==============
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Successful payments, together with refunds, captures and chargebacks are collected into *settlements*, which are then
paid out according to your organization's payout schedule. By retrieving a single settlement, you can check which
payments were paid out with it, when the settlement took place, and what invoices were created to
invoice the costs in the settlement.

Beside payments, settlements can be composed of other entities such as :doc:`refunds <list-settlement-refunds>`,
:doc:`chargebacks <list-settlement-chargebacks>` or :doc:`captures <list-settlement-captures>`.

Parameters
----------
Replace ``id`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN`` or by the settlement's bank
reference, for example ``1234567.1804.03``.

Response
--------
``200`` ``application/hal+json``

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

     - The settlement's bank reference, as found in your Mollie account and on your bank statement.

   * - ``createdAt``

       .. type:: string

     - The date on which the settlement was created, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``settledAt``

       .. type:: string

     - The date on which the settlement was settled, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.
       When requesting the :doc:`open settlement <get-open-settlement>` or  :doc:`next settlement <get-next-settlement>`
       the return value is ``null``.

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

                 * - ``method``

                     .. type:: string

                   - The payment method ID, if applicable.

                 * - ``count``

                     .. type:: integer

                   - The number of payments received for this payment method.

                 * - ``amountNet``

                     .. type:: amount object

                   - The net total of received funds for this payment method (excludes VAT).

                 * - ``amountVat``

                     .. type:: amount object

                   - The VAT amount applicable to the revenue.

                 * - ``amountGross``

                     .. type:: amount object

                   - The gross total of received funds for this payment method (includes VAT).

          * - ``costs``

              .. type:: array

            - An array of Cost objects, describing the fees withheld for each payment method during this period. Each
              object has the following fields.

              .. list-table::
                 :widths: auto

                 * - ``description``

                     .. type:: string

                   - A description of the subtotal.

                 * - ``method``

                     .. type:: string

                   - The payment method ID, if applicable.

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

                 * - ``amountNet``

                     .. type:: amount object

                   - The net total costs for this payment method (excludes VAT).

                 * - ``amountVat``

                     .. type:: amount object

                   - The VAT amount applicable to the costs.

                 * - ``amountGross``

                     .. type:: amount object

                   - The gross total costs for this payment method (includes VAT).

          * - ``invoiceId``

              .. type:: string

            - The ID of the invoice that was created to invoice specifically the costs in this
              month/period.

              If an individual month/period has not been invoiced yet, then this field will not
              be present until that invoice is created.

   * - ``invoiceId``

       .. type:: string

     - The ID of the invoice on which this settlement is invoiced, if it has been invoiced.

       .. warning:: This field has been deprecated in favor of the ``invoiceId`` field inside each
                    monthly period in the ``periods`` object.

                    This was done because some newer settlements have each monthly period invoiced
                    separately, in which case this ID will reference only the oldest invoice. This
                    can result in incorrect bookkeeping.

                    For this reason the field should no longer be used. Use the aforementioned
                    ``invoiceId`` field of the individual monthly period objects instead.

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

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/settlements/stl_jDk30akdN \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

      # or, by bank reference

      curl -X GET https://api.mollie.com/v2/settlements/1234567.1804.03 \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $settlement = $mollie->settlements->get("stl_jDk30akdN");

      // or, by bank reference

      $settlement = $mollie->settlements->get("1234567.1804.03");

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      settlement = Mollie::Settlement.get('stl_jDk30akdN')

      # or, by bank reference

      settlement = Mollie::Settlement.get('1234567.1804.03')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "settlement",
       "id": "stl_jDk30akdN",
       "reference": "1234567.1804.03",
       "createdAt": "2018-04-06T06:00:01.0Z",
       "settledAt": "2018-04-06T09:41:44.0Z",
       "status": "paidout",
       "amount": {
           "value": "39.75",
           "currency": "EUR"
       },
       "periods": {
           "2018": {
               "04": {
                   "revenue": [
                       {
                           "description": "iDEAL",
                           "method": "ideal",
                           "count": 6,
                           "amountNet": {
                               "value": "86.1000",
                               "currency": "EUR"
                           },
                           "amountVat": null,
                           "amountGross": {
                               "value": "86.1000",
                               "currency": "EUR"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "amountNet": {
                               "value": "-43.2000",
                               "currency": "EUR"
                           },
                           "amountVat": null,
                           "amountGross": {
                               "value": "43.2000",
                               "currency": "EUR"
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
                                   "value": "0.3500",
                                   "currency": "EUR"
                               },
                               "percentage": null
                           },
                           "amountNet": {
                               "value": "2.1000",
                               "currency": "EUR"
                           },
                           "amountVat": {
                               "value": "0.4410",
                               "currency": "EUR"
                           },
                           "amountGross": {
                               "value": "2.5410",
                               "currency": "EUR"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "rate": {
                               "fixed": {
                                   "value": "0.2500",
                                   "currency": "EUR"
                               },
                               "percentage": null
                           },
                           "amountNet": {
                               "value": "0.5000",
                               "currency": "EUR"
                           },
                           "amountVat": {
                               "value": "0.1050",
                               "currency": "EUR"
                           },
                           "amountGross": {
                               "value": "0.6050",
                               "currency": "EUR"
                           }
                       }
                   ],
                   "invoiceId": "inv_FrvewDA3Pr"
               }
           }
       },
       "invoiceId": "inv_FrvewDA3Pr",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN",
               "type": "application/hal+json"
           },
           "invoice": {
                "href": "https://api.mollie.com/v2/invoices/inv_FrvewDA3Pr",
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
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/get-settlement",
               "type": "text/html"
           }
       }
   }
