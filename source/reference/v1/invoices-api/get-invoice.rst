Get invoice
===========
.. api-name:: Invoices API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving invoices in the new v2 API can be found
             :doc:`here </reference/v2/invoices-api/get-invoice>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/invoices/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Retrieve details of an invoice, using the invoice's identifier.

If you want to retrieve the details of an invoice by its invoice number, use the
:doc:`list endpoint </reference/v1/invoices-api/list-invoices>` with the ``reference`` parameter.

Parameters
----------
Replace ``id`` in the endpoint URL by the invoice ID, for example ``inv_FrvewDA3Pr``.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``lines`` Include invoice details such as which products were invoiced.
* ``settlements`` Include settlements for which the invoice was created, if applicable.

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

   * - ``issueDate``

       .. type:: string

     - The invoice date in ``YYYY-MM-DD`` format.

   * - ``paidDate``

       .. type:: string

     - The date on which the invoice was paid, in ``YYYY-MM-DD`` format. Only for paid invoices.

   * - ``dueDate``

       .. type:: string

     - The date on which the invoice is due, in ``YYYY-MM-DD`` format. Only for due invoices.

   * - ``amount``

       .. type:: object

     - The total amount of the invoice with and without VAT.

       .. list-table::
          :widths: auto

          * - ``net``

              .. type:: decimal

            - Total amount of the invoice excluding VAT.

          * - ``vat``

              .. type:: decimal

            - VAT amount of the invoice. Only for merchants registered in the Netherlands. For EU merchants, VAT will be
              shifted to recipient; article 44 and 196 EU VAT Directive 2006/112. For merchants outside the EU, no VAT
              will be charged.

          * - ``gross``

              .. type:: decimal

            - Total amount of the invoice including VAT.

   * - ``lines``

       .. type:: array

     - Only available if you require this field to be included – The collection of products which make up the invoice.

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

              .. type:: decimal

            - Amount excluding VAT.

   * - ``settlements``

       .. type:: array

     - Only available if you require this field to be included – An array of
       :doc:`settlements </reference/v1/settlements-api/get-settlement>` that were invoiced on this invoice. You need
       the ``settlements.read`` permission for this field.

   * - ``links``

       .. type:: object

     - Useful URLs to related resources.

       .. list-table::
          :widths: auto

          * - ``pdf``

              .. type:: string

            - The URL to the PDF version of the invoice. The URL will expire after 60 minutes.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET "https://api.mollie.com/v1/invoice/inv_xBEbP9rvAq?include=lines" \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource":"invoice",
       "id":"inv_xBEbP9rvAq",
       "reference":"2016.10000",
       "vatNumber":"NL001234567B01",
       "status":"open",
       "issueDate":"2016-08-31",
       "dueDate":"2016-09-14",
       "amount": {
           "net":"45.00",
           "vat":"9.45",
           "gross":"54.45"
       },
       "lines":[
           {
               "period":"2016-09",
               "description":"iDEAL transactiekosten",
               "count":100,
               "vatPercentage":21,
               "amount":"45.00"
           }
       ],
       "links": {
           "pdf":"https://www.mollie.com/merchant/download/invoice/sbd9gu/52981a39788e5e0acaf71bbf570e941f"
       }
   }
