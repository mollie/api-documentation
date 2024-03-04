Get terminal
============
.. api-name:: Terminals API
   :version: 2
   :beta: true

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/terminals/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

With this endpoint you can retrieve a single terminal object by its terminal ID. This terminal object symbolizes
the physical device that you have received from us.
This endpoint is not publicly available yet — please reach out to your account manager to sign up for early access.

For more information on accepting point-of-sale payments, please refer to the
:doc:`point-of-sale guide </point-of-sale/overview>`.

Parameters
----------
Replace ``id`` in the endpoint URL by the Terminal's ID, for example ``term_7MgL4wea46qkRcoTZjWEH``.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a terminal object. Will always contain ``terminal`` for this endpoint.

.. parameter:: id
   :type: string

   The unique identifier used for referring to a terminal. Mollie assigns this identifier at terminal creation time.
   For example ``term_7MgL4wea46qkRcoTZjWEH``. This ID will be used by Mollie to refer to a certain terminal and will be
   used for assigning a payment to a specific terminal.

.. parameter:: profileId
   :type: string

   The identifier used for referring to the profile the terminal was created on. For example, ``pfl_QkEhN94Ba``.

.. parameter:: status
   :type: string

   The status of the terminal, which is a read-only value determined by Mollie, according to the actions performed for
   that terminal. Its values can be ``pending``, ``active``, ``inactive``.

   ``pending`` means the device has been linked to your account, but has not yet been activated. This is the first state
   that the terminal gets, as soon as it's ordered from us and assigned to your account.

   ``active`` means that the terminal is fully configured and ready to accept payments. As soon as we configure the terminal
   for you, it will be moved to this state.

   ``inactive`` means that the terminal has been deactivated, which can mean that you returned the device to us,
   or you requested to move it to another profile or organization.

.. parameter:: brand
   :type: string

   The brand of the terminal. For example, 'PAX'.

.. parameter:: model
   :type: string

   The model of the terminal. For example for a PAX A920, this field's value will be 'A920'.

.. parameter:: serialNumber
   :type: string

   The serial number of the terminal. The serial number is provided at terminal creation time.

.. parameter:: currency
   :type: string
   :condition: optional

   The currency which is set for the terminal, in `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ format.
   Please take into consideration that currently our terminals are bound to a specific currency, chosen during setup.

.. parameter:: description
   :type: string

   A short description of the terminal. The description can be used as an identifier for the terminal.
   Currently, the description is set when the terminal is initially configured.
   It will be visible in the dashboard as well as on the device itself.

.. parameter:: createdAt
   :type: datetime

   The date and time the terminal was created, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: updatedAt
   :type: datetime

   The date and time the terminal was last updated, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the terminal. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the terminal itself.

   .. parameter:: documentation
      :type: URL object

      The URL to the terminal retrieval endpoint documentation.


Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/terminals/term_7MgL4wea46qkRcoTZjWEH \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $terminal = $mollie->terminals->get("term_7MgL4wea46qkRcoTZjWEH");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      terminal = mollie_client.terminals.get('term_7MgL4wea46qkRcoTZjWEH')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      terminal = Mollie::Terminal.get('term_7MgL4wea46qkRcoTZjWEH')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const terminal = await mollieClient.terminals.get('term_7MgL4wea46qkRcoTZjWEH');
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "id": "term_7MgL4wea46qkRcoTZjWEH",
       "profileId": "pfl_QkEhN94Ba",
       "status": "active",
       "brand": "PAX",
       "model": "A920",
       "serialNumber": "1234567890",
       "currency": "EUR",
       "description": "Terminal #12345",
       "createdAt": "2022-02-12T11:58:35.0Z",
       "updatedAt": "2022-11-15T13:32:11.0Z",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/terminals/term_7MgL4wea46qkRcoTZjWEH",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/terminals-api/get-terminal",
               "type": "text/html"
           }
       }
   }
