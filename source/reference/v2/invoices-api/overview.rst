Invoices API
============
With the Invoices API you can access the details of your monthly Mollie invoice.

The monthly invoice is always sent at the start of a new month, and only include fees for the services Mollie provided
in the previous month.

Normally, Mollie fees are charged automatically by deducting fees from your balance as payments come in. In most cases
the Mollie invoice is thus already paid for by the time it is issued.

For more information on invoices, refer to our
`knowledge base <https://help.mollie.com/hc/en-us/sections/360004838360-Invoices>`_.

Endpoints
---------
.. endpoint-card::
   :name: Get invoice
   :method: GET
   :url: /v2/invoices/*id*
   :ref: /reference/v2/invoices-api/get-invoice

   Retrieve details of a specific invoice.

.. endpoint-card::
   :name: List invoices
   :method: GET
   :url: /v2/invoices
   :ref: /reference/v2/invoices-api/list-invoices

   Retrieve a list of all of your invoices.
