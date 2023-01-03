Get balance
===========
.. api-name:: Balances API
   :version: 2
   :beta: true

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/*balanceId*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

When processing payments with Mollie, we put all pending funds — minus Mollie fees — on a balance. Once you have linked
a bank account to your Mollie account, we can pay out your balance towards this bank account.

With the Balances API you can retrieve your current balance. The response includes two amounts:

* The 'pending amount'. These are payments that have been marked as 'paid', but are not yet available for paying out.
* The 'available amount'. This is the amount that you can get paid out to your bank account.

With instant payment methods like iDEAL, payments are moved to the available balance instantly. With slower payment
methods, like credit card for example, it can take a few days before the funds are available on your balance. These
funds will be shown under the 'pending amount' in the meanwhile.

Parameters
----------
Replace ``balanceId`` in the endpoint URL by the balance ID, which can be retrieved by the
:doc:`List balances </reference/v2/balances-api/list-balances>` endpoint.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
    :type: string

    Indicates the response contains a balance object. Will always contain ``balance`` for this endpoint.

.. parameter:: id
    :type: string

    The identifier uniquely referring to this balance. Mollie assigns this identifier at balance creation time. For
    example ``bal_gVMhHKqSSRYJyPsuoPNFH``.

.. parameter:: createdAt
    :type: datetime

    The balance's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: currency
    :type: string

    The balance's `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

.. parameter:: status
    :type: string

    The status of the balance.

    Possible values:

    * ``active`` The balance is operational and ready to be used.
    * ``inactive`` In case the account is still being validated by our team or the balance has been blocked.
      `Contact our support department <https://www.mollie.com/contact>`_ for more information.

.. parameter:: transferFrequency
    :type: string

    The frequency at which the available amount on the balance will be settled to the configured transfer
    destination. See ``transferDestination``.

    Possible values:

    * ``daily`` Every business day.
    * ``twice-a-week`` Every Tuesday and Friday.
    * ``every-monday`` Every Monday.
    * ``every-tuesday`` Every Tuesday.
    * ``every-wednesday`` Every Wednesday.
    * ``every-thursday`` Every Thursday.
    * ``every-friday`` Every Friday.
    * ``twice-a-month`` On the first and the fifteenth of the month.
    * ``monthly`` On the first of the month.
    * ``never`` Automatic settlements are paused for this balance.

    .. note:: Settlements created during weekends or on bank holidays will take place on the next business day.

.. parameter:: transferThreshold
    :type: amount object

    The minimum amount configured for scheduled automatic settlements. As soon as the amount on the balance
    exceeds this threshold, the complete balance will be paid out to the ``transferDestination`` according to the
    configured ``transferFrequency``.

    .. parameter:: currency
      :type: string

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. Currently only ``EUR`` is
      supported.

    .. parameter:: value
      :type: string

      A string containing the exact EUR threshold. Make sure to send the right amount of decimals. Non-string
      values are not accepted.

.. parameter:: transferReference
    :type: string

    The transfer reference set to be included in all the transfers for this balance. Either a string or ``null``.

.. parameter:: transferDestination
    :type: object

    The destination where the available amount will be automatically transferred to according to the configured
    ``transferFrequency``.

    .. parameter:: type
      :type: string

      The default destination of automatic scheduled transfers. Currently only ``bank-account`` is supported.

      Possible values:

      * ``bank-account`` Transfer the balance amount to an external bank account.

    .. parameter:: bankAccount
      :type: string

      The configured bank account number of the beneficiary the balance amount is to be transferred to.

    .. parameter:: beneficiaryName
      :type: string

      The full name of the beneficiary the balance amount is to be transferred to.

.. parameter:: availableAmount
    :type: amount object

    The amount directly available on the balance, e.g. ``{"currency":"EUR", "value":"100.00"}``.

    .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the available amount.

    .. parameter:: value
      :type: string

      A string containing the exact available amount of the balance in the given currency.

.. parameter:: pendingAmount
    :type: amount object

    The total amount that is queued to be transferred to your balance. For example, a credit card payment can take a
    few days to clear.

    .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the pending amount.

    .. parameter:: value
      :type: string

      A string containing the exact pending amount of the balance in the given currency.

.. parameter:: _links
    :type: object

    An object with several URL objects relevant to the balance. Every URL object will contain an ``href`` and a
    ``type`` field.

    .. parameter:: self
      :type: URL object

      The API resource URL of the balance itself.

    .. parameter:: documentation
      :type: URL object

      The URL to the balance retrieval endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/balances/bal_gVMhHKqSSRYJyPsuoPNFH \
         -H 'Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW");
      $balance = $mollie->balances->get("bal_gVMhHKqSSRYJyPsuoPNFH");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
     "resource": "balance",
     "id": "bal_gVMhHKqSSRYJyPsuoPNFH",
     "mode": "live",
     "createdAt": "2019-01-10T10:23:41+00:00",
     "currency": "EUR",
     "status": "active",
     "availableAmount": {
       "value": "905.25",
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
       "bankAccount": "NL53INGB0654422370",
       "bankAccountId": "bnk_jrty3f"
     },
     "_links": {
       "self": {
         "href": "https://api.mollie.com/v2/balances/bal_gVMhHKqSSRYJyPsuoPNFH",
         "type": "application/hal+json"
       },
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/balances-api/get-balance",
         "type": "text/html"
       }
     }
   }
