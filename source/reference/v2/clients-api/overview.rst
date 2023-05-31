Clients API
===========
The Clients API is part of our partnerships toolkit. If you are a registered Mollie partner, you can use the Clients API
to create new organizations for your customers, or retrieve a list of Mollie organizations connected to your partner
account.

For more information on our partnership program, visit `mollie.com/partners <https://www.mollie.com/partners>`_.

Endpoints
---------
.. endpoint-card::
   :name: Create client link
   :method: POST
   :url: /v2/clients
   :ref: /reference/v2/clients-api/create-client-link

   Create a new client connected to your partner account.

.. endpoint-card::
   :name: Get client
   :method: GET
   :url: /v2/clients/*id*
   :ref: /reference/v2/clients-api/get-client

   Retrieve details of a specific connected client.

.. endpoint-card::
   :name: List clients
   :method: GET
   :url: /v2/clients
   :ref: /reference/v2/clients-api/list-clients

   Retrieve a list of all of your connected clients.
