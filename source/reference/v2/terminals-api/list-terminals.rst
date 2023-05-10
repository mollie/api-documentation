List Terminals
==============
.. api-name:: Terminals API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/terminals

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all terminals created for the current organization / profile, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the payment with this ID. The terminal with
   this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of terminals to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>`, the
``profileId`` parameter can be used to retrieve terminals for a specific profile. If the
``profileId`` parameter is not sent, the API will return all terminals across all profiles.

.. parameter:: profileId
   :type: string
   :condition: optional
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. Omit this parameter to retrieve all payments
   across all profiles.

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of terminals found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: terminals
      :type: array
      :collapse: true

      An array of terminal objects as described below.

      Terminal object:
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
           Its values can be ``pending``, ``active``, ``inactive``. ``pending`` means that the terminal has been created, but not yet activated. ``active``
           means that the terminal is active and can take payments. ``inactive`` means that the terminal has been deactivated.

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

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of terminals. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The URL to the current set of terminals.

   .. parameter:: previous
      :type: URL object

      The previous set of terminals, if available.

   .. parameter:: next
      :type: URL object

      The next set of terminals, if available.

   .. parameter:: documentation
      :type: URL object

      The URL to the terminals list endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/terminals?limit=5 \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      // get the first page
      $terminals = $mollie->terminals->page();

      // get the next page
      $next_terminals = $terminals->next();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      # get the first page
      terminals = mollie_client.terminals.list()

      # get the next page
      next_terminals = terminals.get_next()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      terminals = Mollie::Terminal.all

      # get the next page
      next_terminals = terminals.next

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const payments = await mollieClient.terminals.list();
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 5,
       "_embedded": {
           "terminals": [
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
                       }
                   }
               },
               { },
               { },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/terminalss?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/terminals?from=term_7MgL4wea46qkRcoTZjWEH&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/terminals-api/list-terminals",
               "type": "text/html"
           }
       }
   }
