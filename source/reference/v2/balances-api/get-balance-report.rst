Get balance report
==================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/default/reporting

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

With the Get balance report endpoint you can retrieve a summarized report for all movements on your balance within a
given timeframe.

The API also provides a detailed report on all Mollie fee 'prepayments' that were deducted from your balance during the
reported period ahead of your Mollie invoice.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: date

     - The start date of the report, in ``YYYY-MM-DD`` format. The from date is 'inclusive', and in Central European
       Time. This means a report with for example ``from: 2020-01-01`` will include movements of
       ``2020-01-01 0:00:00 CET`` and onwards.

   * - ``until``

       .. type:: date

     - The end date of the report, in ``YYYY-MM-DD`` format. The until date is 'exclusive', and in Central European
       Time. This means a report with for example ``until: 2020-02-01`` will include movements up until
       ``2020-01-31 23:59:59 CET``.

   * - ``grouping``

       .. type:: string
          :required: false

     - You can retrieve reports in two different formats. With the ``status-balances`` format, transactions are grouped
       by status (e.g. incoming, available), then by transaction type, and then by other sub-groupings where available
       (e.g. payment method).

       With the ``transaction-categories`` format, transactions are grouped by transaction type, then by status, and
       then again by other sub-groupings where available.

       Possible values: ``status-balances`` ``transaction-categories``

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a balance report object. Will always contain ``balance-report`` for
       this endpoint.

   * - ``balanceId``

       .. type:: string

     - The ID of the :doc:`Balance </reference/v2/balances-api/get-default-balance>` this report is generated for.

   * - ``timeZone``

       .. type:: string

     - The time zone used for the ``from`` and ``until`` parameters. Currently only time zone ``Europe/Amsterdam`` is
       supported.

   * - ``from``

       .. type:: date

     - The start date of the report, in ``YYYY-MM-DD`` format. The from date is 'inclusive', and in Central European
       Time. This means a report with for example ``from: 2020-01-01`` will include movements of
       ``2020-01-01 0:00:00 CET`` and onwards.

   * - ``until``

       .. type:: date

     - The end date of the report, in ``YYYY-MM-DD`` format. The until date is 'exclusive', and in Central European
       Time. This means a report with for example ``until: 2020-02-01`` will include movements up until
       ``2020-01-31 23:59:59 CET``.

   * - ``grouping``

       .. type:: string

     - You can retrieve reports in two different formats. With the ``status-balances`` format, transactions are grouped
       by status (e.g. incoming, available), then by direction of movement (e.g. moved from incoming to available), then
       by transaction type, and then by other sub-groupings where available (e.g. payment method).

       With the ``transaction-categories`` format, transactions are grouped by transaction type, then by direction of
       movement, and then again by other sub-groupings where available.

       Both reporting formats will always contain opening and closing amounts that correspond to the start and end dates
       of the report.

       Possible values: ``status-balances`` ``transaction-categories``

   * - ``totals``

       .. type:: object

     - If grouping ``status-balances`` is chosen, the ``totals`` object will be formatted roughly as follows:

       * ``incomingBalance``

         * ``open``

           * ``amount``

         * ``incoming``

           * ``amount``

           * ``subtotals``

             * ``payments``

               * ``count``

               * ``amount``

               * ``subtotals``

                 * etc.

         * ``movedToAvailable``

           * ``amount``

           * ``subtotals``

             * etc.

         * ``close``

           * ``amount``

       * ``availableBalance``

         * ``open``

           * ``amount``

         * ``movedFromIncoming``

           * ``amount``

           * ``subtotals``

             * etc.

         * ``immediatelyAvailable``

           * ``amount``

           * ``subtotals``

             * etc.

         * ``close``

           * ``amount``

       If grouping ``transaction-categories`` is chosen, the ``totals`` object will be formatted roughly as follows:

       * ``open``

         * ``incoming``

           * ``amount``

         * ``available``

           * ``amount``

       * ``payments``

         * ``incoming``

           * ``count``

           * ``amount``

           * ``subtotals``

             * etc.

         * ``movedToAvailable``

           * etc.

         * ``immediatelyAvailable``

           * etc.

       * ``deductions``

         * etc.

       * ``transfers``

         * etc.

       * ``prepayments``

         * etc.

       * ``corrections``

         * etc.

       * ``close``

         * etc.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the API. Every URL object will contain an ``href`` and a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current balance report.

          * - ``documentation``

              .. type:: URL object

            - The URL to the balance reporting endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/balances/default/reporting?from=2021-01-01&until=2021-02-01&grouping=transaction-categories \
       -H 'Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW'

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "balance-report",
       "balanceId": "bal_hinmkh",
       "timeZone": "Europe/Amsterdam",
       "from": "2021-01-01",
       "until": "2021-01-31",
       "grouping": "transaction-categories",
       "totals": {
           "open": {
               "available": {
                   "amount": {
                       "currency": "EUR",
                       "value": "0.00"
                   }
               },
               "incoming": {
                   "amount": {
                       "currency": "EUR",
                       "value": "0.00"
                   }
               }
           },
           "payments": {
               "immediatelyAvailable": {
                   "amount": {
                       "currency": "EUR",
                       "value": "0.00"
                   }
               },
               "incoming": {
                   "amount": {
                       "currency": "EUR",
                       "value": "4.98"
                   },
                   "subtotals": [
                       {
                           "transactionType": "payment",
                           "count": 1,
                           "amount": {
                               "currency": "EUR",
                               "value": "4.98"
                           },
                           "subtotals": [
                               {
                                   "amount": {
                                   "currency": "EUR",
                                       "value": "4.98"
                                   },
                                   "count": 1,
                                   "method": "ideal"
                               }
                           ]
                       }
                   ]
               },
               "movedToAvailable": {
                   "amount": {
                       "currency": "EUR",
                       "value": "0.00"
                   }
               }
           },
           "deductions": {
               "..."
           },
           "transfers": {
               "..."
           },
           "prepayments": {
               "immediatelyAvailable": {
                   "..."
               },
               "incoming": {
                   "amount": {
                       "currency": "EUR",
                       "value": "-0.66"
                   },
                   "subtotals": [
                       {
                           "amount": {
                               "currency": "EUR",
                               "value": "-0.66"
                           },
                           "subtotals": [
                               {
                                   "prepaymentPartType": "fee",
                                   "count": 2,
                                   "amount": {
                                       "currency": "EUR",
                                       "value": "-0.54"
                                   },
                                   "subtotals": [
                                       {
                                           "feeType": "payment-fee",
                                           "count": 2,
                                           "amount": {
                                               "currency": "EUR",
                                               "value": "-0.54"
                                           },
                                           "subtotals": [
                                               {
                                                   "method": "giftcard",
                                                   "count": 1,
                                                   "amount": {
                                                       "currency": "EUR",
                                                       "value": "-0.25"
                                                   }
                                               },
                                               {
                                                   "method": "ideal",
                                                   "count": 1,
                                                   "amount": {
                                                       "currency": "EUR",
                                                       "value": "-0.29"
                                                   }
                                               }
                                           ]
                                       }
                                   ]
                               },
                               {
                                   "prepaymentPartType": "fee-vat",
                                   "amount": {
                                       "currency": "EUR",
                                       "value": "-0.1134"
                                   }
                               },
                               {
                                   "prepaymentPartType": "fee-rounding-compensation",
                                   "amount": {
                                       "currency": "EUR",
                                       "value": "-0.0066"
                                   }
                               }
                           ],
                           "transactionType": "fee-prepayment"
                       }
                   ]
               },
               "movedToAvailable": {
                   "..."
               }
           },
           "corrections": {
               "..."
           },
           "close": {
               "available": {
                   "amount": {
                       "currency": "EUR",
                       "value": "0.00"
                   }
               },
               "incoming": {
                   "amount": {
                       "currency": "EUR",
                       "value": "4.32"
                   }
               }
           }
       },
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/balances-api/get-balance-report",
               "type": "text/html"
           },
           "self": {
               "href": "https://api.mollie.com/v2/balances/default/reporting?from=2021-01-01&until=2021-02-01&grouping=transaction-categories",
               "type": "application/hal+json"
           }
       }
   }
