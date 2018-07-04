List transfers
==============
.. api-name:: Transfers API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/transfers

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all the organization's transfers, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Offset the result set to the transfer with this ID. The transfer with this ID is included in the result set as
       well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of transfers to return (with a maximum of 250).

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve transfers made in test mode. By default, only live transfers are returned.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of transfers found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``transfers``

              .. type:: array

            - An array of transfer objects as described in
              :doc:`Get transfer </reference/v2/transfers-api/get-transfer>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of transfers. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of transfers.

          * - ``previous``

              .. type:: URL object

            - The previous set of transfers, if available.

          * - ``next``

              .. type:: URL object

            - The next set of transfers, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the transfers list endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/transfers?limit=5 \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 5,
       "_embedded": {
           "transfers": [
               {
                    "resource": "transfer",
                    "id": "trf_j7hn0d6x",
                    "mode": "live",
                    "createdAt": "2018-06-14T14:32:16+00:00",
                    "status": "open",
                    "amount": {
                        "value": "49.12",
                        "currency": "EUR"
                    },
                    "source": {
                        "type": "balance",
                        "balanceId": "bal_8irzh1y2"
                    },
                    "destination": {
                        "type": "bankaccount",
                        "bankAccount": "NL53INGB0654422370"
                    },
                    "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/transfers/trf_j7hn0d6x",
                            "type": "application/hal+json"
                        },
                        "documentation": {
                            "href": "https://docs.mollie.com/reference/v2/transfers-api/get-transfer",
                            "type": "text/html"
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
               "href": "https://api.mollie.com/v2/transfers?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/transfers?from=trf_j6ln0a1d&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/transfers-api/list-transfers",
               "type": "text/html"
           }
       }
   }
