Update payment route
====================
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/payments/*paymentId*/routes/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Update a payment route object that was created using the ``routing`` field during
:doc:`payment creation </reference/v2/payments-api/create-payment>`.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the route's ID. For example:
``/v2/payments/tr_7UhSN1zuXS/routes/rt_9dk4al1n``.

.. list-table::
   :widths: auto

   * - ``releaseDate``

       .. type:: date
          :required: true

     - Update a future release date to delay routing of this part of the payment to a later date. The date must be given
       in ``YYYY-MM-DD`` format.

       The ``releaseDate`` cannot be added if it wasn't previously set. If the funds have already been released or are
       about to be released, the date can no longer be updated either.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you are creating an app with Mollie Connect (OAuth), the ``testmode`` parameter is available. You must pass this as a
parameter in the query string if you want to update a route for a payment that was created in test mode.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a payment route made in test mode. If you omit this parameter, you can only
       update live mode payment routes.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

The updated payment route object is returned, as described in
:doc:`Get payment route </reference/v2/payments-api/get-payment-route>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X PATCH https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/routes/rt_9dk4al1n \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"
       -d "releaseDate=2021-05-01"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

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
           "type": "organization",
           "organizationId": "org_12345"
       },
       "releaseDate": "2021-05-01",
       "paymentId": "tr_7UhSN1zuXS",
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
               "href": "https://docs.mollie.com/reference/v2/payments-api/update-payment-route",
               "type": "text/html"
           }
       }
   }
