List payments
=============
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all payments created with the current website profile, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: from
   :type: string
   :condition: optional

   Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the payment with this ID. The payment with
   this ID is included in the result set as well.

.. parameter:: limit
   :type: integer
   :condition: optional

   The number of payments to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can specify which profile you are retrieving payments for using the
``profileId`` parameter. Organizations can have multiple profiles for each of their websites. If you omit the
``profileId`` parameter, the API will return all payments across all profiles. See
:doc:`Profiles API </reference/v2/profiles-api/overview>` for more information.

For these authentication methods the optional ``testmode`` parameter is available as well to enable test mode.

.. parameter:: profileId
   :type: string
   :condition: optional
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. Omit this parameter to retrieve all payments
   across all profiles.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to true to only retrieve payments made in test mode. By default, only live payments are returned.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``details.qrCode`` Include a :doc:`QR code </payments/qr-codes>` object for each payment that supports it. Only
  available for iDEAL, Bancontact and bank transfer payments.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint also allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``refunds`` Include any :doc:`refunds </reference/v2/refunds-api/get-payment-refund>` created for the payments.
* ``chargebacks`` Include any :doc:`chargebacks </reference/v2/chargebacks-api/get-payment-chargeback>` issued for the
  payments.

Response
--------
``200`` ``application/hal+json``

.. parameter:: count
   :type: integer

   The number of payments found in ``_embedded``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: _embedded
   :type: object
   :collapse-children: false

   The object containing the queried data.

   .. parameter:: payments
      :type: array

      An array of payment objects as described in :doc:`Get payment </reference/v2/payments-api/get-payment>`.

.. parameter:: _links
   :type: object

   Links to help navigate through the lists of payments. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The URL to the current set of payments.

   .. parameter:: previous
      :type: URL object

      The previous set of payments, if available.

   .. parameter:: next
      :type: URL object

      The next set of payments, if available.

   .. parameter:: documentation
      :type: URL object

      The URL to the payments list endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments?limit=5 \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      // get the first page
      $payments = $mollie->payments->page();

      // get the next page
      $next_payments = $payments->next();

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      # get the first page
      payments = mollie_client.payments.list()

      # get the next page
      next_payments = payments.get_next()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      payments = Mollie::Payment.all

      # get the next page
      next_payments = payments.next

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const payments = mollieClient.payments.iterate();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 5,
       "_embedded": {
           "payments": [
               {
                   "resource": "payment",
                   "id": "tr_7UhSN1zuXS",
                   "mode": "test",
                   "createdAt": "2018-02-12T11:58:35.0Z",
                   "expiresAt": "2018-02-12T12:13:35.0Z",
                   "status": "open",
                   "isCancelable": false,
                   "amount": {
                       "value": "75.00",
                       "currency": "GBP"
                   },
                   "description": "Order #12345",
                   "method": "ideal",
                   "metadata": null,
                   "details": null,
                   "profileId": "pfl_QkEhN94Ba",
                   "redirectUrl": "https://webshop.example.org/order/12345/",
                   "_links": {
                       "checkout": {
                           "href": "https://www.mollie.com/paymentscreen/issuer/select/ideal/7UhSN1zuXS",
                           "type": "text/html"
                       },
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
                           "type": "application/hal+json"
                       },
                       "dashboard": {
                           "href": "https://www.mollie.com/dashboard/org_12345678/payments/tr_7UhSN1zuXS",
                           "type": "application/json"
                       },
                   }
               },
               { },
               { },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/payments?from=tr_SDkzMggpvx&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/list-payments",
               "type": "text/html"
           }
       }
   }
