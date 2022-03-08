Get payment route
=================
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/routes/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single payment route object by its route token.

Routes can only be created by passing along an array of route objects in the ``routing`` field during
:doc:`payment creation </reference/v2/payments-api/create-payment>`.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the route's ID. For example:
``/v2/payments/tr_7UhSN1zuXS/routes/rt_9dk4al1n``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you are creating an app with Mollie Connect (OAuth), the ``testmode`` parameter is available. You must pass this as a
parameter in the query string if you want to retrieve a route for a payment that was created in test mode.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to get a payment route made in test mode. If you omit this parameter, you can only retrieve
       live mode payment routes.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a payment route object. Will always contain ``route`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this payment route. Mollie assigns this identifier at route creation time.
       For example ``rt_9dk4al1n``. Its ID will always be used by Mollie to refer to a certain route.

   * - ``mode``

       .. type:: string

     - The mode used to create this payment route.

       Possible values: ``live`` ``test``

   * - ``createdAt``

       .. type:: datetime

     - The payment route's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``amount``

       .. type:: amount object

     - The portion of the total payment amount that is being routed. If the payment is routed to one connected account
       and the parameter is omitted, the amount will be equal to the payment amount.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact routed amount in the given currency.

   * - ``destination``

       .. type:: object

     - The destination of the part of the payment being routed.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string

            - The type of destination. Currently only the destination type ``organization`` is supported.

              Possible values: ``organization``

          * - ``organizationId``

              .. type:: string

            - Only available for destination type ``organization``. The ID of the connected organization the funds will
              be routed to, for example ``org_12345``.

   * - ``releaseDate``

       .. type:: date

     - Upon payment creation, an optional future release date may have been given to delay routing of this part of the
       payment to a later date. The date must be given in ``YYYY-MM-DD`` format.

       If no date is given, the funds become available to the connected account as soon as the payment succeeds.

   * - ``paymentId``

       .. type:: string

     - The unique identifier of the payment this route belongs to. For example: ``tr_7UhSN1zuXS``. The full payment
       object can be retrieved via the ``payment`` URL in the ``_links`` object.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the payment route. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the payment route itself.

          * - ``payment``

              .. type:: URL object

            - The API resource URL of the payment this payment route belongs to.

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment route retrieval endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/routes/rt_9dk4al1n \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

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
       "releaseDate": "2018-03-22",
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
               "href": "https://docs.mollie.com/reference/v2/payments-api/get-payment-route",
               "type": "text/html"
           }
       }
   }
