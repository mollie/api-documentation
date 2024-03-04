Settlements API
===============
Via the Settlements API you can access details on the settlements made from your Mollie balance to your organization's
bank account.

Settlements are created automatically based on the settlement frequency configured in your Mollie account.

Where possible, the settlements will include information on which payments were included in the settlement, which
refunds were deducted from it, and so forth.

For more information on settlements and on receiving payments, refer to our
`knowledge base <https://help.mollie.com/hc/en-us/sections/360004882139-Receiving-payments>`_.

Endpoints
---------
.. endpoint-card::
   :name: Get settlement
   :method: GET
   :url: /v2/settlements/*id*
   :ref: /reference/v2/settlements-api/get-settlement

   Retrieve details of a specific settlement.

.. endpoint-card::
   :name: Get next settlement
   :method: GET
   :url: /v2/settlements/next
   :ref: /reference/v2/settlements-api/get-next-settlement

   Retrieve details of the upcoming settlement.

.. endpoint-card::
   :name: Get open settlement
   :method: GET
   :url: /v2/settlements/open
   :ref: /reference/v2/settlements-api/get-open-settlement

   Retrieve details of the funds on your balance that are not yet paid out.

.. endpoint-card::
   :name: List settlements
   :method: GET
   :url: /v2/settlements
   :ref: /reference/v2/settlements-api/list-settlements

   Retrieve a list of all of your settlements.

.. endpoint-card::
   :name: List settlement payments
   :method: GET
   :url: /v2/settlements/*id*/payments
   :ref: /reference/v2/settlements-api/list-settlement-payments

   Retrieve a list of all payments included in a specific settlement.

.. endpoint-card::
   :name: List settlement captures
   :method: GET
   :url: /v2/settlements/*id*/captures
   :ref: /reference/v2/settlements-api/list-settlement-captures

   Retrieve a list of all captures included in a specific settlement.

.. endpoint-card::
   :name: List settlement refunds
   :method: GET
   :url: /v2/settlements/*id*/refunds
   :ref: /reference/v2/settlements-api/list-settlement-refunds

   Retrieve a list of all payments deducted from a specific settlement.

.. endpoint-card::
   :name: List settlement chargebacks
   :method: GET
   :url: /v2/settlements/*id*/chargebacks
   :ref: /reference/v2/settlements-api/list-settlement-chargebacks

   Retrieve a list of all chargebacks deducted from a specific settlement.
