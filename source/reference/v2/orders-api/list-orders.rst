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

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the order with this ID. The order with this
   ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of orders to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can specify which profile you are retrieving orders for using the
``profileId`` parameter. Organizations can have multiple profiles for each of their websites. If you omit the
``profileId`` parameter, the API will return all orders across all profiles. See
:doc:`Profiles API </reference/v2/profiles-api/overview>` for more information.

For these authentication methods the optional ``testmode`` parameter is available as well to enable test mode.

.. parameter:: profileId
   :type: string
   :condition: optional
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. Omit this parameter to retrieve all orders
   across all profiles.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to list test mode orders.

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of orders found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: orders
      :type: array

      An array of order objects as described in :doc:`Get order </reference/v2/orders-api/get-order>`.

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of orders. Every URL object will contain an ``href`` and a ``type`` field.

   .. parameter:: self
      :type: URL object

      The URL to the current set of orders.

   .. parameter:: previous
      :type: URL object

      The previous set of orders, if available.

   .. parameter:: next
      :type: URL object

      The next set of orders, if available.

   .. parameter:: documentation
      :type: URL object

      The URL to the orders list endpoint documentation.

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
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

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

      const orders = mollieClient.orders.iterate();

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
