Get chargeback
==============
.. api-name:: Chargebacks API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving chargebacks in the new v2 API can be found
             :doc:`here </reference/v2/chargebacks-api/get-chargeback>`. For more information on the v2 API, refer to
             our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/payments/*paymentId*/chargebacks/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve a single chargeback by its ID. Note the original payment's ID is needed as well.

If you do not know the original payment's ID, you can use the
:doc:`chargebacks list endpoint </reference/v1/chargebacks-api/list-chargebacks>`.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the chargeback's ID. For example:
``/v1/payments/tr_7UhSN1zuXS/chargebacks/chb_n9z0tp``.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``payment`` Include the payment object in the response.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``id``

       .. type:: string

     - The chargeback's unique identifier, for example ``chb_n9z0tp``.

   * - ``payment``

       .. type:: string, object

     - The ID of the payment this chargeback belongs to. If the payment include is requested, the ID will be replaced by
       a payment object as described in :doc:`Get payment </reference/v1/payments-api/get-payment>`.

   * - ``amount``

       .. type:: decimal

     - The amount charged back.

   * - ``chargebackDatetime``

       .. type:: datetime

     - The date and time the chargeback was issued, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``reversedDatetime``

       .. type:: datetime

     - The date and time the chargeback was reversed if applicable, in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "chargeback",
       "id": "chb_n9z0tp",
       "payment": "tr_WDqYK6vllg",
       "amount": "-35.07",
       "chargebackDatetime": "2018-03-14T17:00:52.0Z",
       "reversedDatetime": null
   }
