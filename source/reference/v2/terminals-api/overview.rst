Terminals API
=============
.. customize-document-title::
   :beta: true

.. note:: The Terminals API is currently in beta. If you are interested in offering point-of-sale payments, please see
   `this page <https://www.mollie.com/products/payments-terminal>`_ for more information on our product offering. Once
   there, you can register your interest to be kept up-to-date.

If you process point-of-sale payments with Mollie, the Terminals API allows you to manage your point-of-sale devices.

With the Terminals API, you can list all terminals connected to your organisation and profiles.

Endpoints
---------
.. endpoint-card::
   :name: Get terminal
   :method: GET
   :url: /v2/terminals/*id*
   :ref: /reference/v2/terminals-api/get-terminal

   Retrieve a specific terminal.

.. endpoint-card::
   :name: List terminals
   :method: GET
   :url: /v2/terminals
   :ref: /reference/v2/terminals-api/list-terminals

   Retrieve a list of all your terminals.
