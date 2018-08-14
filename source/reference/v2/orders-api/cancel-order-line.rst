Cancel order line
=================
.. api-name:: Orders API
   :version: 2

.. warning::
   This API is currently in private beta. If you are interested in participating, please contact your account manager at
   Mollie.

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/orders/*orderId*/lines/*lineId*

.. authentication::
   :api_keys: true
   :oauth: true

An order line can only be canceled while its ``status`` field is either ``created`` or ``authorized``. You should
cancel an order line if you don't intend to ship it.

If the order line is ``paid`` or already ``shipped``, you should create a refund instead.

For more information about the status transitions please check our <link to guide here>.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U`` and replace ``lineId`` in
the endpoint URL by the order line's ID, for example ``odl_dgtxyl``.

Response
--------
``204 No Content``

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/lines/odl_dgtxyl \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 204 No Content
