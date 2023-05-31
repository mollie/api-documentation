List terminals
==============
.. api-name:: Terminals API
   :version: 2
   :beta: true

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/terminals

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all point-of-sale terminal devices linked to your organization or profile, ordered from newest to oldest.

For more information on accepting point-of-sale payments, please refer to the
:doc:`point-of-sale guide </point-of-sale/overview>`.

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
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you can specify which profile you want to look at when listing terminals. If you omit the ``profileId``
parameter, you will get all terminals on the organization. Organizations can have multiple profiles for each of their
websites. See :doc:`Profiles API </reference/v1/profiles-api/create-profile>` for more information.

.. parameter:: profileId
   :type: string
   :condition: optional
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. Omit this parameter to retrieve all
   terminals across all profiles.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to true to only retrieve terminals made in test mode. By default, only live terminals are returned.

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

       An array of terminal objects as described in :doc:`Get terminal </reference/v2/terminals-api/get-terminal>`.

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
