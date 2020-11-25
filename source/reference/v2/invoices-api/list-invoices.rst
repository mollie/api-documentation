List invoices API
=================
.. api-name:: Invoices API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/invoices

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all invoices on the account. Optionally filter on year or invoice number.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``reference``

       .. type:: string
          :required: false

     - Use this parameter to filter for an invoice with a specific invoice number / reference. An example
       reference would be ``2018.10000``.

   * - ``year``

       .. type:: integer
          :required: false

     - Use this parameter to filter for invoices from a specific year (e.g. ``2018``).

   * - ``from``

       .. type:: integer
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the invoice with this ID. The invoice with this ID is included in the result
       set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of invoices to return (with a maximum of 250).

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of invoices found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``invoices``

              .. type:: array

            - An array of invoice objects as described in :doc:`Get invoice </reference/v2/invoices-api/get-invoice>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of invoices. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of invoices.

          * - ``previous``

              .. type:: URL object

            - The previous set of invoices, if available.

          * - ``next``

              .. type:: URL object

            - The next set of invoices, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the invoice list endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET "https://api.mollie.com/v2/invoices" \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $invoices = $mollie->invoices->page();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      invoices = Mollie::Invoice.all

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 5,
       "_embedded": {
           "invoices": [
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
                            "href": "https://www.mollie.com/merchant/download/invoice/xBEbP9rvAq/2ab44d60b35955fa2c602",
                            "type": "application/pdf",
                            "expiresAt": "2018-11-09T14:10:36+00:00"
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
               "href": "https://api.mollie.nl/v2/invoices?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.nl/v2/invoices?from=inv_xBEbP9rvAq&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/invoices-api/list-invoices",
               "type": "text/html"
           }
       }
   }
