Wallets API
===========
Wallet payment methods provide customers quick access to their credit cards and banking cards, leveraging the existing
authentication methods of their own devices.

The :doc:`Mollie hosted checkout </payments/hosted-checkout>` provides wallet payment methods such as Apple Pay out of
the box. If you wish to fully integrate a wallet payment method into your checkout, you can do so using the Wallets API.

Refer to the :doc:`Wallets guides </wallets/applepay>` for step-by-step tutorials.

Endpoints
---------
.. endpoint-card::
   :name: Request Apple Pay Payment Session
   :method: POST
   :url: /v2/wallets/applepay/sessions
   :ref: /reference/v2/wallets-api/request-apple-pay-payment-session

   Set up an Apple Pay Payment Session via Mollie.
