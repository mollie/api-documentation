List chargebacks
================
.. api-name:: Chargebacks API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/chargebacks

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/chargebacks

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all received chargebacks. If the payment-specific endpoint is used, only chargebacks for that specific payment
are returned.

The results are not paginated.

Parameters
----------
When using the payment-specific endpoint, replace ``paymentId`` in the endpoint URL by the payment's ID, for example
``tr_7UhSN1zuXS``.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` these chargebacks were issued for.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of chargebacks found in ``_embedded``.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``chargebacks``

              .. type:: array

            - An array of chargeback objects as described in
              :doc:`Get chargeback </reference/v2/chargebacks-api/get-chargeback>`.

   * - ``_links``

       .. type:: object

     - Links related to the lists of chargebacks. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of chargebacks.

          * - ``documentation``

              .. type:: object

            - The URL to the chargebacks list endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/chargebacks \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

    $payment = $mollie->payments->get("tr_7UhSN1zuXS");
    $chargebacks = $payment->chargebacks();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 3,
       "_embedded": {
           "chargebacks": [
               {
                   "resource": "chargeback",
                   "id": "chb_n9z0tp",
                   "amount": {
                       "currency": "USD",
                       "value": "43.38"
                   },
                   "settlementAmount": {
                       "currency": "EUR",
                       "value": "35.07"
                   },
                   "createdAt": "2018-03-14T17:00:52.0Z",
                   "reversedAt": null,
                   "paymentId": "tr_WDqYK6vllg",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback",
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
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/chargebacks",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks",
               "type": "text/html"
           }
       }
   }
