List orders
===========
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/orders

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all orders.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the order with this ID. The order with this ID is included in the
       result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of orders to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you can specify which profile you want to look at when listing orders. If you omit the ``profileId``
parameter, you will get all orders on the organization. Organizations can have multiple profiles for each of their
websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: false

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to list test mode orders.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of orders found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``orders``

              .. type:: array

            - An array of order objects as described in
              :doc:`Get order </reference/v2/orders-api/get-order>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of orders. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of orders.

          * - ``previous``

              .. type:: URL object

            - The previous set of orders, if available.

          * - ``next``

              .. type:: URL object

            - The next set of orders, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the orders list endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/orders \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $most_recent_orders = $mollie->orders->page();
      $previous_orders = $most_recent_orders->next();

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      most_recent_orders = mollie_client.orders.list()
      previous_orders = most_recent_orders.get_next()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      orders = Mollie::Order.all

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const mostRecentOrders = await mollieClient.orders.page();
        const previousOrders = await mostRecentOrders.nextPage();
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 3,
       "_embedded": {
           "orders": [
               {
                   "resource": "order",
                   "id": "ord_kEn1PlbGa",
                   "...": "..."
               },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/orders",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/orders?from=ord_stTC2WHAuS",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/orders-api/list-orders",
               "type": "text/html"
           }
       }
   }
