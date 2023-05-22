Get Terminal
============
.. api-name:: Terminals API
   :version: 2
   :coming-soon: true

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/terminals/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single terminal object by its terminal ID. Please note that this endpoint is not publicly available yet.

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

   The status of the terminal, which is a read-only value determined by Mollie, according to the actions performed for that terminal.
   Its values can be ``pending``, ``active``, ``inactive``. ``pending`` means the device has been linked to your account,
   but has not yet been activated. ``active`` means that the terminal is active and can take payments.
   ``inactive`` means that the terminal has been deactivated.

.. parameter:: brand
   :type: string

   The brand of the terminal.

.. parameter:: model
   :type: string

   The model of the terminal.

.. parameter:: serialNumber
   :type: string

   The serial number of the terminal. The serial number is provided at terminal creation time.

.. parameter:: currency
   :type: string

   The currency which is set for the terminal, in `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ format.

.. parameter:: description
   :type: string

   A short description of the terminal. The description will be visible in the Dashboard, but also on the device itself for identification purposes.

.. parameter:: createdAt
   :type: datetime

   The date and time the terminal was created, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: updatedAt
   :type: datetime

   The date and time the terminal was last updated, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: deactivatedAt
   :type: datetime
   :condition: optional

   The date and time the terminal was deactivated, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This
   parameter is omitted if the terminal is not deactivated yet.

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
       "updatedAt": "2022-11-15T13:32:11+00:00",
       "deactivatedAt": "2022-02-12T12:13:35.0Z",
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
