Balances API
============
The Balances API allows you to retrieve real-time as well as historical information about your Mollie balance.
This may be useful to for example integrate Mollie into your bookkeeping, or for SaaS providers to enrich the experience they offer their Mollie users.
With the Balances API, you can:

* Retrieve your real-time open balance(s)
* Retrieve all balance movements that took place on your balance (e.g. payments, refunds, etc.)
* Retrieve aggregated time-based reports of these balance movements

The Balances API has some overlap with the :doc:`Settlements API </reference/v2/settlements-api/overview>`, since the Settlements API allows you to retrieve the fixed list of balance movements that were included in each settlement.
Both APIs can be used for accounting and reconciliation purposes, however the Balances API will give you the most complete overview where you don't have to wait for the execution of the actual Settlement.

For more information, refer to
`knowledge base <https://help.mollie.com/hc/en-us/sections/360004882219-Accounting>`_.

.. note:: Due to technical limitations, data from before 1 July 2022 is not available via this API.

Endpoints
---------
.. endpoint-card::
   :name: Get balance
   :method: GET
   :url: /v2/balances/*balanceId*
   :ref: /reference/v2/balances-api/get-balance

   Retrieve details of a specific balance.

.. endpoint-card::
   :name: Get primary balance
   :method: GET
   :url: /v2/balances/primary
   :ref: /reference/v2/balances-api/get-primary-balance

   Retrieve details of the primary balance.

.. endpoint-card::
   :name: List balances
   :method: GET
   :url: /v2/balances
   :ref: /reference/v2/balances-api/list-balances

   Retrieve all the organization's balances, including the primary balance, ordered from newest to oldest.

.. endpoint-card::
   :name: Get balance report
   :method: GET
   :url: /v2/balances/*balanceId*/report
   :ref: /reference/v2/balances-api/get-balance-report

   Retrieve a summarized report for all movements on a specific balance within a given timeframe.

.. endpoint-card::
   :name: Get primary balance report
   :method: GET
   :url: /v2/balances/primary/report
   :ref: /reference/v2/balances-api/get-primary-balance

   Retrieve a summarized report for all movements on the primary balance within a given timeframe.

.. endpoint-card::
   :name: List balance transactions
   :method: GET
   :url: /v2/balances/*balanceId*/transactions
   :ref: /reference/v2/balances-api/list-balance-transactions

   Retrieve a list of all the movements on a specific balance.

.. endpoint-card::
   :name: List primary balance transactions
   :method: GET
   :url: /v2/balances/primary/transactions
   :ref: /reference/v2/balances-api/list-primary-balance-transactions

   Retrieve a list of all the movements on the primary balance.
