List chargebacks
================
.. api-name:: Chargebacks API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing chargebacks in the new v2 API can be found
             :doc:`here </reference/v2/chargebacks-api/list-chargebacks>`. For more information on the v2 API, refer to
             our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/chargebacks

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/payments/*paymentId*/chargebacks

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve all received chargebacks. If the payment-specific endpoint is used, only chargebacks for that specific payment
are returned.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
When using the payment-specific endpoint, replace ``paymentId`` in the endpoint URL by the payment's ID, for example
``tr_7UhSN1zuXS``.

.. list-table::
   :widths: auto

   * - ``offset``

       .. type:: integer
          :required: false

     - The number of chargebacks to skip.

   * - ``count``

       .. type:: integer
          :required: false

     - The number of chargebacks to return (with a maximum of 250).

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``payment`` For each chargeback, include the payment it belongs to.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of chargebacks available.

   * - ``offset``

       .. type:: integer

     - The number of skipped chargebacks as requested.

   * - ``count``

       .. type:: integer

     - The number of chargebacks found in ``data``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``data``

       .. type:: array

     - An array of chargebacks objects as described in
       :doc:`Get chargeback </reference/v1/chargebacks-api/get-chargeback>`.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of chargebacks, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of chargebacks, if available.

          * - ``next``

              .. type:: string

            - The next set of chargebacks, if available.

          * - ``first``

              .. type:: string

            - The first set of chargebacks, if available.

          * - ``last``

              .. type:: string

            - The last set of chargebacks, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/payments/tr_7UhSN1zuXS/chargebacks \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 3,
       "offset": 0,
       "count": 3,
       "data": [
           {
               "resource": "chargeback",
               "id": "chb_n9z0tp",
               "payment": "tr_WDqYK6vllg",
               "amount": "-35.07",
               "chargebackDatetime": "2018-03-14T17:00:53.0Z",
               "reversedDatetime": null
           },
           { },
           { }
       ]
   }
