Create shipment
===============
.. api-name:: Shipments API
   :version: 2

.. warning::
   This API is currently in private beta. If you are interested in participating, please contact your account manager at
   Mollie.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments

.. authentication::
   :api_keys: true
   :oauth: true

In addition to the :doc:`Orders API </reference/v2/orders-api/create-order>`, the create shipment endpoint can be used to ship
order lines. When using *Klarna Pay later* this is mandatory for the order amount to be captured.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``lines``

       .. type:: array
          :required: true

     - An array of objects containing the order line details you want to create a shipment for.  If you send an empty
       array, the entire order will be shipped. If the order is already partially shipped, any remaining lines will be
       shipped.

       .. list-table::
          :widths: auto

          * - ``id``

              .. type:: string

            - The API resource token of the order line, for example: ``odl_jp31jz``


Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, you should use the ``testmode`` parameter
if you want to create a shipment in test mode.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to make this order a test shipment.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A shipment object is returned, as described in :doc:`Get shipment </reference/v2/shipments-api/get-shipment>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/orders/ord_kEn1PlbGa/shipments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d '{
            "lines": [
                {
                    "id": "odl_dgtxyl"
                },
                {
                    "id": "odl_jp31jz"
                }
            ]
        }'
