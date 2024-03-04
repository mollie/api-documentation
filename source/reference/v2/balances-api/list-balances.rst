List balances
=============
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all the organization's balances, including the primary balance, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: currency
    :type: string
    :condition: optional

    Currency filter that will make it so only balances in given currency are returned. For example ``EUR``.

.. parameter:: from
    :type: string
    :condition: optional

    Offset the result set to the balance with this ID. The balance with this ID is included in the result set as
    well.

.. parameter:: limit
    :type: integer
    :condition: optional

    The number of balances to return (with a maximum of 250).

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
    :type: integer

    The number of balances found in ``_embedded``, which is either the requested number (with a maximum of 250) or
    the default number.

.. parameter:: _embedded
    :type: object

    The object containing the queried data.

    .. parameter:: balances
        :type: array

        An array of balance objects as described in
        :doc:`Get balance </reference/v2/balances-api/get-balance>`.

.. parameter:: _links
    :type: object

    Links to help navigate through the lists of balances. Every URL object will contain an ``href`` and a ``type``
    field.

    .. parameter:: self
        :type: URL object

        The URL to the current set of balances.

    .. parameter:: previous
        :type: URL object

        The previous set of balances, if available.

    .. parameter:: next
        :type: URL object

        The next set of balances, if available.

    .. parameter:: documentation
        :type: URL object

        The URL to the balances list endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/balances?limit=5 \
         -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW");
      $from = null;
      $limit = 5;
      $balances = $mollie->balances->page($from, $limit);

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
     "count": 5,
     "_embedded": {
       "balances": [
          {
            "resource": "balance",
            "id": "bal_gVMhHKqSSRYJyPsuoPNFH",
            "mode": "live",
            "createdAt": "2019-01-10T12:06:28+00:00",
            "currency": "EUR",
            "status": "active",
            "availableAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "pendingAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "transferFrequency": "daily",
            "transferThreshold": {
              "value": "40.00",
              "currency": "EUR"
            },
            "transferReference": "Mollie payout",
            "transferDestination": {
              "type": "bank-account",
              "beneficiaryName": "Jack Bauer",
              "bankAccount": "NL53INGB0654422370",
              "bankAccountId": "bnk_jrty3f"
            },
            "_links": {
              "self": {
                "href": "https://api.mollie.com/v2/balances/bal_gVMhHKqSSRYJyPsuoPNFH",
                "type": "application/hal+json"
              }
            }
          },
          {
            "resource": "balance",
            "id": "bal_gVMhHKqSSRYJyPsuoPABC",
            "mode": "live",
            "createdAt": "2019-01-10T10:23:41+00:00",
            "status": "active",
            "currency": "EUR",
            "availableAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "pendingAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "transferFrequency": "twice-a-month",
            "transferThreshold": {
              "value": "5.00",
              "currency": "EUR"
            },
            "transferReference": "Mollie payout",
            "transferDestination": {
              "type": "bank-account",
              "beneficiaryName": "Jack Bauer",
              "bankAccount": "NL97MOLL6351480700",
              "bankAccountId": "bnk_jrty3e"
            },
            "_links": {
              "self": {
                "href": "https://api.mollie.com/v2/balances/bal_gVMhHKqSSRYJyPsuoPABC",
                "type": "application/hal+json"
              }
            }
          },
          { },
          { },
          { }
       ]
     },
     "_links": {
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/balances-api/list-balances",
         "type": "text/html"
       },
       "self": {
         "href": "https://api.mollie.com/v2/balances?limit=5",
         "type": "application/hal+json"
       },
       "previous": null,
       "next": {
         "href": "https://api.mollie.com/v2/balances?from=bal_gVMhHKqSSRYJyPsuoPABC&limit=5",
         "type": "application/hal+json"
       }
     }
   }
