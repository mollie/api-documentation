List payments
=============
.. api-name:: Payments API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing payments in the new v2 API can be found
             :doc:`here </reference/v2/payments-api/list-payments>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve all payments created with the current payment profile, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``offset``

       .. type:: integer
          :required: false

     - The number of payments to skip.

   * - ``count``

       .. type:: integer
          :required: false

     - The number of payments to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you can specify which profile you want to look at when listing payments. If you omit the ``profileId``
parameter, you will get all payments on the organization. Organizations can have multiple profiles for each of their
websites. See :doc:`Profiles API </reference/v1/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: false

     - The payment profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve payments made in test mode. By default, only live payments are
       returned.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``settlement`` Include the settlement a payment belongs to, when available.
* ``details.qrCode`` Include a :doc:`QR code </guides/qr-codes>` object for each payment that supports it. Only
  available for iDEAL, Bancontact and bank transfer payments.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of payments available.

   * - ``offset``

       .. type:: integer

     - The number of skipped payments as requested.

   * - ``count``

       .. type:: integer

     - The number of payments found in ``data``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``data``

       .. type:: array

     - An array of payment objects as described in :doc:`Get payment </reference/v1/payments-api/get-payment>`.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of payments, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of payments, if available.

          * - ``next``

              .. type:: string

            - The next set of payments, if available.

          * - ``first``

              .. type:: string

            - The first set of payments, if available.

          * - ``last``

              .. type:: string

            - The last set of payments, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
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
               "createdDatetime": "2018-03-16T17:09:01.0Z",
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
