Get balance report
==================
.. api-name:: Balances API
   :version: 2
   :beta: true

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/*balanceId*/report

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

With the Get balance report endpoint you can retrieve a summarized report for all movements on a given balance within a
given timeframe.

The API also provides a detailed report on all Mollie 'fee-prepayments' that were deducted from your balance during the
reported period ahead of your Mollie invoice.

Parameters
----------

Replace ``*balanceId*`` in the endpoint URL by the balance token, which can be retrieved by the
:doc:`List balances </reference/v2/balances-api/list-balances>` endpoint.

.. parameter:: from
    :type: date

    The start date of the report, in ``YYYY-MM-DD`` format. The from date is 'inclusive', and in Central European
    Time. This means a report with for example ``from: 2020-01-01`` will include movements of
    ``2020-01-01 0:00:00 CET`` and onwards.

.. parameter:: until
    :type: date

    The end date of the report, in ``YYYY-MM-DD`` format. The until date is 'exclusive', and in Central European
    Time. This means a report with for example ``until: 2020-02-01`` will include movements up until
    ``2020-01-31 23:59:59 CET``.

.. parameter:: grouping
    :type: string
    :condition: optional

    You can retrieve reports in two different formats. With the ``status-balances`` format, transactions are grouped
    by status (e.g. pending, available), then by transaction type, and then by other sub-groupings where available
    (e.g. payment method).

    With the ``transaction-categories`` format, transactions are grouped by transaction type, then by status, and
    then again by other sub-groupings where available.

    Possible values: ``status-balances`` ``transaction-categories``

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
    :type: string

    Indicates the response contains a balance report object. Will always contain ``balance-report`` for
    this endpoint.

.. parameter:: balanceId
    :type: string

    The ID of a :doc:`Balance </reference/v2/balances-api/get-balance>` this report is generated for.

.. parameter:: timeZone
    :type: string

    The time zone used for the ``from`` and ``until`` parameters. Currently only time zone ``Europe/Amsterdam`` is
    supported.

.. parameter:: from
    :type: date

    The start date of the report, in ``YYYY-MM-DD`` format. The from date is 'inclusive', and in Central European
    Time. This means a report with for example ``from: 2020-01-01`` will include movements of
    ``2020-01-01 0:00:00 CET`` and onwards.

.. parameter:: until
    :type: date

    The end date of the report, in ``YYYY-MM-DD`` format. The until date is 'exclusive', and in Central European
    Time. This means a report with for example ``until: 2020-02-01`` will include movements up until
    ``2020-01-31 23:59:59 CET``.

.. parameter:: grouping
    :type: string

    You can retrieve reports in two different formats. With the ``status-balances`` format, transactions are grouped
    by status (e.g. pending, available), then by direction of movement (e.g. moved from pending to available), then
    by transaction type, and then by other sub-groupings where available (e.g. payment method).

    With the ``transaction-categories`` format, transactions are grouped by transaction type, then by direction of
    movement, and then again by other sub-groupings where available.

    Both reporting formats will always contain opening and closing amounts that correspond to the start and end dates
    of the report.

    Possible values: ``status-balances`` ``transaction-categories``

.. parameter:: totals
    :type: object

    If grouping ``status-balances`` is chosen, the ``totals`` object will be formatted roughly as follows:

    * ``pendingBalance``

        * ``open``

        * ``amount``

        * ``pending``

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

        * ``movedFromPending``

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

        * ``pending``

        * ``amount``

        * ``available``

        * ``amount``

    * ``payments``

        * ``pending``

        * ``count``

        * ``amount``

        * ``subtotals``

            * etc.

        * ``movedToAvailable``

        * etc.

        * ``immediatelyAvailable``

        * etc.

    * ``refunds``

        * etc.

    * ``chargebacks``

        * etc.

    * ``capital``

        * etc.

    * ``transfers``

        * etc.

    * ``fee-prepayments``

        * etc.

    * ``corrections``

        * etc.

    * ``close``

        * etc.

.. parameter:: _links
    :type: object

    Links to help navigate through the API. Every URL object will contain an ``href`` and a ``type`` field.

    .. parameter:: self
        :type: URL object

        The URL to the current balance report.

    .. parameter:: documentation
        :type: URL object

        The URL to the balance reporting endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/balances/bal_gVMhHKqSSRYJyPsuoPNFH/report?from=2021-01-01&until=2021-02-01&grouping=transaction-categories \
          -H 'Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW'

   .. code-block-selector::
      :lineos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW");

      $report = $mollie->balanceReports->get(
         "bal_gVMhHKqSSRYJyPsuoPNFH",
         [
            "from" => "2021-01-01",
            "until" => "2021-02-01",
            "grouping" => "transaction-categories",
         ]
      );


Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "balance-report",
       "balanceId": "bal_gVMhHKqSSRYJyPsuoPNFH",
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
               "pending": {
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
               "pending": {
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
           "refunds": {
               "..."
           },
           "chargebacks": {
               "..."
           },
           "capital": {
               "..."
           },
           "transfers": {
               "..."
           },
           "fee-prepayments": {
               "immediatelyAvailable": {
                   "amount": {
                       "currency": "EUR",
                       "value": "0.00"
                   }
               },
               "movedToAvailable": {
                   "amount": {
                       "currency": "EUR",
                       "value": "-0.36"
                   },
                   "subtotals": [
                       {
                           "amount": {
                               "currency": "EUR",
                               "value": "-0.29"
                           },
                           "count": 1,
                           "prepaymentPartType": "fee",
                           "subtotals": [
                               {
                                   "amount": {
                                       "currency": "EUR",
                                       "value": "-0.29"
                                   },
                                   "count": 1,
                                   "feeType": "payment-fee",
                                   "subtotals": [
                                       {
                                           "amount": {
                                               "currency": "EUR",
                                               "value": "-0.29"
                                           },
                                           "count": 1,
                                           "method": "ideal"
                                       }
                                   ]
                               }
                           ]
                       },
                       {
                           "amount": {
                               "currency": "EUR",
                               "value": "-0.0609"
                           },
                           "prepaymentPartType": "fee-vat"
                       },
                       {
                           "amount": {
                               "currency": "EUR",
                               "value": "-0.0091"
                           },
                           "prepaymentPartType": "fee-rounding-compensation"
                       }
                   ]
               },
               "pending": {
                   "amount": {
                       "currency": "EUR",
                       "value": "-0.36"
                   },
                   "subtotals": [
                       {
                           "amount": {
                               "currency": "EUR",
                               "value": "-0.29"
                           },
                           "count": 1,
                           "prepaymentPartType": "fee",
                           "subtotals": [
                               {
                                   "amount": {
                                       "currency": "EUR",
                                       "value": "-0.29"
                                   },
                                   "count": 1,
                                   "feeType": "payment-fee",
                                   "subtotals": [
                                       {
                                           "amount": {
                                               "currency": "EUR",
                                               "value": "-0.29"
                                           },
                                           "count": 1,
                                           "method": "ideal"
                                       }
                                   ]
                               }
                           ]
                       },
                       {
                           "amount": {
                               "currency": "EUR",
                               "value": "-0.0609"
                           },
                           "prepaymentPartType": "fee-vat"
                       },
                       {
                           "amount": {
                               "currency": "EUR",
                               "value": "-0.0091"
                           },
                           "prepaymentPartType": "fee-rounding-compensation"
                       }
                   ]
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
               "pending": {
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
               "href": "https://api.mollie.com/v2/balances/{balanceId}/report?from=2021-01-01&until=2021-02-01&grouping=transaction-categories",
               "type": "application/hal+json"
           }
       }
   }
