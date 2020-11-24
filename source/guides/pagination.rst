Pagination
==========
Fetching all objects of a resource can be convenient. At the same time, returning too many objects at once can be
unpractical from a performance perspective. Doing so might be too much work for the Mollie API to generate, or for your
website to process. The maximum number of objects returned is 250.

For this reason the Mollie API only returns a subset of the requested set of objects. In other words, the Mollie API
chops the result of a certain API method call into pages you're able to programmatically scroll through.

.. _pagination-in-v2:

Pagination in v2 API endpoints
------------------------------
The ``v2`` API endpoints use the so-called cursor pagination method. In short, this ensures the objects in a page do not
get shifted when a new object is created with the same account in the meantime, by paginating by object ID rather than
by page number.

You can get the next page of objects by following the ``next`` link. 

Response object
^^^^^^^^^^^^^^^
.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of objects found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``_embedded``

       .. type:: object

     - The actual data you're looking for.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of objects. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of objects.

          * - ``previous``

              .. type:: object

            - The previous set of objects, if available.

          * - ``next``

              .. type:: object

            - The next set of objects, if available.

          * - ``documentation``

              .. type:: object

            - The URL to the current list endpoint documentation.

Example of v2 pagination
^^^^^^^^^^^^^^^^^^^^^^^^

Request
"""""""
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments \
          -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      // get the first page
      $payments = $mollie->payments->page();

      // get the next page
      if($payments->hasNext()) {
          $next_payments = $payments->next();
      }

      // get the previous page
      if($payments->hasPrevious()) {
          $previous_payments = $payments->previous();
      }


Response
""""""""
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 10,
       "_embedded": {
           "payments": [
               {
                   "resource": "payment",
                   "id": "tr_7UhSN1zuXS",
                   "mode": "test",
                   "createdAt": "2018-02-12T11:58:35.0Z",
                   "expiresAt": "2018-02-12T12:13:35.0Z",
                   "status": "open",
                   "isCancelable": false,
                   "amount": {
                       "value": "75.00",
                       "currency": "GBP"
                   },
                   "description": "test",
                   "method": "ideal",
                   "metadata": null,
                   "details": null,
                   "profileId": "pfl_QkEhN94Ba",
                   "redirectUrl": "https://webshop.example.org/order/12345/",
                   "_links": {
                       "checkout": {
                           "href": "https://www.mollie.com/paymentscreen/issuer/select/ideal/7UhSN1zuXS",
                           "type": "text/html"
                       },
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/payments-api/get-payment",
                           "type": "text/html"
                       }
                   }
               },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments?limit=10",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/payments?from=tr_SDkzMggpvx&limit=10",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/list-payments",
               "type": "text/html"
           }
       }
   }

Pagination in v1 API endpoints
------------------------------
.. warning:: This is the documentation of the v1 API. The documentation for pagination in the new v2 API can be found
             above. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

Using the ``count`` parameter you can set the page size up to a maximum of 250 objects. The result will be paginated
accordingly, presuming your request would otherwise have resulted in more than ``count`` objects. The ``offset``
parameter lets you skip a certain number of objects before your page starts.

In order to enable you to easily page through the result, every response links to the next, the previous, the first and
the last page. The following overview lists all response fields:

Response object
^^^^^^^^^^^^^^^
.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of objects available.

   * - ``offset``

       .. type:: integer

     - The number of skipped objects as requested.

   * - ``count``

       .. type:: integer

     - The number of objects found in ``data``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``data``

       .. type:: array

     - The actual data you're looking for.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of objects, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of objects, if available.

          * - ``next``

              .. type:: string

            - The next set of objects, if available.

          * - ``first``

              .. type:: string

            - The first set of objects, if available.

          * - ``last``

              .. type:: string

            - The last set of objects, if available.

Example of v1 pagination
^^^^^^^^^^^^^^^^^^^^^^^^

Request
"""""""
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
""""""""
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 280,
       "offset": 0,
       "count": 10,
       "data": [
           {
               "resource": "payment",
               "id": "tr_7UhSN1zuXS",
               "mode": "test",
               "createdDatetime": "2018-03-16T17:08:53.0Z",
               "status": "open",
               "expiryPeriod": "PT15M",
               "amount": "10.00",
               "description": "Order #12345",
               "metadata": {
                   "order_id": "12345"
               },
               "locale": "nl",
               "profileId": "pfl_QkEhN94Ba",
               "links": {
                   "redirectUrl": "https://webshop.example.org/order/12345/"
               }
           },
           { },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/payments?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/payments?count=10&offset=10",
           "last": "https://api.mollie.com/v1/payments?count=10&offset=270"
       }
   }
