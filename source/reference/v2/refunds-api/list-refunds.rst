List refunds
============
.. api-name:: Refunds API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/refunds

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/refunds

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all refunds. If the payment-specific endpoint is used, only refunds for that specific payment are returned.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
When using the payment-specific endpoint, replace ``paymentId`` in the endpoint URL by the payment's ID, for example
``tr_7UhSN1zuXS``.

.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Offset the result set to the refund with this ID. The refund with this ID is included in the result
       set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of refunds to return (with a maximum of 250).

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` the refunds were created for.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of refunds found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``refunds``

              .. type:: array

            - An array of refund objects as described in :doc:`Get refund </reference/v2/refunds-api/get-refund>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of refunds. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of refunds.

          * - ``previous``

              .. type:: object

            - The previous set of refunds, if available.

          * - ``next``

              .. type:: object

            - The next set of refunds, if available.

          * - ``documentation``

              .. type:: object

            - The URL to the refunds list endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $refunds = $mollie->payments->get("tr_WDqYK6vllg")->refunds();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 5,
       "_embedded": {
           "refunds": [
               {
                   "resource": "refund",
                   "id": "re_4qqhO89gsT",
                   "amount": {
                       "currency": "EUR",
                       "value": "5.95"
                   },
                   "status": "pending",
                   "createdAt": "2018-03-14T17:09:02.0Z",
                   "description": "Order",
                   "paymentId": "tr_WDqYK6vllg",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/refunds-api/get-refund",
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
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?from=re_APBiGPH2vV&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/refunds-api/list-refunds",
               "type": "text/html"
           }
       }
   }
