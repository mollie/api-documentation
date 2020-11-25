List invoices
=============
.. api-name:: Invoices API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving invoices in the new v2 API can be found
             :doc:`here </reference/v2/invoices-api/list-invoices>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/invoices

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
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

   * - ``offset``

       .. type:: integer
          :required: false

     - The number of invoices to skip.

   * - ``count``

       .. type:: integer
          :required: false

     - The number of invoices to return (with a maximum of 250).

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``lines`` Include invoice details such as which products were invoiced.
* ``settlements`` Include settlements for which the invoices were created, if applicable.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of invoices available.

   * - ``offset``

       .. type:: integer

     - The number of skipped invoices as requested.

   * - ``count``

       .. type:: integer

     - The number of invoices found in ``data``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``data``

       .. type:: array

     - An array of invoice objects as described in :doc:`Get invoice </reference/v1/invoices-api/get-invoice>`.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of invoices, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of invoices, if available.

          * - ``next``

              .. type:: string

            - The next set of invoices, if available.

          * - ``first``

              .. type:: string

            - The first set of invoices, if available.

          * - ``last``

              .. type:: string

            - The last set of invoices, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET "https://api.mollie.com/v1/invoices?include=lines" \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount":1,
       "offset":0,
       "count":1,
       "data":[
           {
               "resource":"invoice",
               "id":"inv_xBEbP9rvAq",
               "reference":"2017.10000",
               "vatNumber":"NL001234567B01",
               "status":"open",
               "issueDate":"2017-08-31",
               "dueDate":"2017-09-14",
               "amount": {
                   "net":"45.00",
                   "vat":"9.45",
                   "gross":"54.45"
               },
               "lines":[
                   {
                       "period":"2017-09",
                       "description":"Transaction costs iDEAL",
                       "count":100,
                       "vatPercentage":21,
                       "amount":"29.00"
                   }
               ],
               "links": {
                   "pdf":"https://www.mollie.com/merchant/download/invoice/sbd9gu/52981a39788e5e0acaf71bbf570e941f"
               }
           }
       ]
   }
