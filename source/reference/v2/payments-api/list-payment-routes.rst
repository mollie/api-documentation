List payment routes
===================
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*id*/routes

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all payment routes created for a specific payment.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Offset the result set to the payment route with this ID. The payment route with this ID is included in the result
       set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of payment routes to return (with a maximum of 250).

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the following parameters are also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve payment routes created for test mode payments. By default, only payment routes
       for live payments are returned.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of payment routes found in ``_embedded``, which is either the requested number (with a maximum of 250)
       or the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``route``

              .. type:: array

            - An array of payment route objects as described in
              :doc:`Get payment route </reference/v2/payments-api/get-payment-route>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of payment routes. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of payment routes.

          * - ``previous``

              .. type:: URL object

            - The previous set of payment routes, if available.

          * - ``next``

              .. type:: URL object

            - The next set of payment routes, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment routes list endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/routes \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 2,
       "_embedded": {
           "payment_routes": [
               {
                   "resource": "route",
                   "id": "rt_9dk4al1n",
                   "mode": "test",
                   "createdAt": "2018-03-20T13:13:37+00:00",
                   "amount": {
                       "value": "10.00",
                       "currency": "EUR"
                   },
                   "destination": {
                       "type": "balance",
                       "balanceId": "bal_8irzh1y2"
                   },
                   "releaseDate": "2018-03-22",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/routes/rt_9dk4al1n",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/payments-api/get-payment-route",
                           "type": "text/html"
                       }
                   }
               },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/routes",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": null,
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/list-payment-routes",
               "type": "text/html"
           }
       }
   }
