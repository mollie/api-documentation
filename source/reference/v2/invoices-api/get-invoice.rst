Get invoice
===========
.. api-name:: Invoices API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/invoices/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve details of an invoice, using the invoice's identifier.

If you want to retrieve the details of an invoice by its invoice number, use the
:doc:`list endpoint </reference/v2/invoices-api/list-invoices>` with the ``reference`` parameter.

Parameters
----------
Replace ``id`` in the endpoint URL by the invoice ID, for example ``inv_FrvewDA3Pr``.


Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains an invoice object. Will always contain ``invoice`` for this endpoint.

   * - ``id``

       .. type:: string

     - The invoice's unique identifier, for example ``inv_FrvewDA3Pr``.

   * - ``reference``

       .. type:: string

     - The reference number of the invoice. An example value would be: ``2018.10000``.

   * - ``vatNumber``

       .. type:: string

     - The VAT number to which the invoice was issued to (if applicable).

   * - ``status``

       .. type:: string

     - Status of the invoice.

       Possible values:

       * ``open`` The invoice is not paid yet.
       * ``paid`` The invoice is paid.
       * ``overdue`` Payment of the invoice is overdue.

   * - ``issuedAt``

       .. type:: string

     - The invoice date in ``YYYY-MM-DD`` format.

   * - ``paidAt``

       .. type:: string

     - The date on which the invoice was paid, in ``YYYY-MM-DD`` format. Only for paid invoices.

   * - ``dueAt``

       .. type:: string

     - The date on which the invoice is due, in ``YYYY-MM-DD`` format. Only for due invoices.

   * - ``netAmount``

       .. type:: amount object

     - Total amount of the invoice excluding VAT, e.g. ``{"currency":"EUR", "value":"100.00"}``.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact amount of the invoice excluding VAT in the given currency.

   * - ``vatAmount``

       .. type:: amount object

     - VAT amount of the invoice. Only for merchants registered in the Netherlands. For EU merchants, VAT will be
       shifted to recipient; article 44 and 196 EU VAT Directive 2006/112. For merchants outside the EU, no VAT
       will be charged.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact VAT amount in the given currency.

   * - ``grossAmount``

       .. type:: amount object

     - Total amount of the invoice including VAT.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact total amount of the invoice including VAT in the given currency.

   * - ``lines``

       .. type:: object

     - The collection of products which make up the invoice.

       .. list-table::
          :widths: auto

          * - ``period``

              .. type:: string

            - The administrative period in ``YYYY-MM`` on which the line should be booked.

          * - ``description``

              .. type:: string

            - Description of the product.

          * - ``count``

              .. type:: integer

            - Number of products invoiced (usually number of payments).

          * - ``vatPercentage``

              .. type:: decimal

            - VAT percentage rate that applies to this product.

          * - ``amount``

              .. type:: amount object

            - Amount excluding VAT.

              .. list-table::
                 :widths: auto

                 * - ``currency``

                     .. type:: string

                   - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                 * - ``value``

                     .. type:: string

                   - A string containing the exact amount of this line excluding VAT in the given currency.

   * - ``_links``

       .. type:: object

     - Useful URLs to related resources.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the invoice itself.

          * - ``pdf``

              .. type:: URL object

            - The URL to the PDF version of the invoice. The URL will expire after 60 minutes.

          * - ``documentation``

              .. type:: URL object

            - The URL to the invoice retrieval endpoint documentation.

Example
-------

.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X GET "https://api.mollie.com/v2/invoices/inv_xBEbP9rvAq" \
      -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $invoice = $mollie->invoices->get("inv_xBEbP9rvAq");

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      invoice = Mollie::Invoice.get('inv_xBEbP9rvAq')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "invoice",
       "id": "inv_xBEbP9rvAq",
       "reference": "2016.10000",
       "vatNumber": "NL001234567B01",
       "status": "open",
       "issuedAt": "2016-08-31",
       "dueAt": "2016-09-14",
       "netAmount": {
           "value": "45.00",
           "currency": "EUR"
       },
       "vatAmount": {
           "value": "9.45",
           "currency": "EUR"
       },
       "grossAmount": {
           "value": "54.45",
           "currency": "EUR"
       },
       "lines":[
           {
               "period": "2016-09",
               "description": "iDEAL transactiekosten",
               "count": 100,
               "vatPercentage": 21,
               "amount": {
                   "value": "45.00",
                   "currency": "EUR"
               }
           }
       ],
       "_links": {
           "self": {
                "href": "https://api.mollie.com/v2/invoices/inv_xBEbP9rvAq",
                "type": "application/hal+json"
           },
           "pdf": {
                "href": "https://www.mollie.com/merchant/download/invoice/xBEbP9rvAq/2ab44d60b35b1d06090bba955fa2c602",
                "type": "application/pdf",
                "expiresAt": "2018-11-09T14:10:36+00:00"
           }
       }
   }
