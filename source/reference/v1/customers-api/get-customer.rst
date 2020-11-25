Get customer
============
.. api-name:: Customers API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving customers in the new v2 API can be found
             :doc:`here </reference/v2/customers-api/get-customer>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/customers/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve a single customer by its ID.

Parameters
----------
Replace ``id`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` query string parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve a test mode customer.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a customer object. Will always contain ``customer`` for this endpoint.

   * - ``id``

       .. type:: string

     - The customer's unique identifier, for example ``cst_vsKJpSsabw``.

   * - ``mode``

       .. type:: string

     - The mode used to create this customer.

       Possible values: ``live`` ``test``

   * - ``name``

       .. type:: string

     - The full name of the customer as provided when the customer was created.

   * - ``email``

       .. type:: string

     - The email address of the customer as provided when the customer was created.

   * - ``locale``

       .. type:: string

     - Allows you to preset the language to be used in the hosted payment pages shown to the consumer. If this parameter
       was not provided when the customer was created, the browser language will be used instead in the payment flow
       (which is usually more accurate).

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

   * - ``metadata``

       .. type:: mixed

     - Data provided during the customer creation.

   * - ``recentlyUsedMethods``

       .. type:: array

     - Payment methods that the customer recently used for payments.

       Possible array values: ``banktransfer`` ``belfius`` ``creditcard`` ``directdebit`` ``eps``
       ``giftcard`` ``giropay`` ``ideal`` ``inghomepay`` ``kbc`` ``mistercash`` ``paypal`` ``paysafecard``
       ``przelewy24`` ``sofort``

   * - ``createdDatetime``

       .. type:: datetime

     - The customer record's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/customers/cst_kEn1PlbGa \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "customer",
       "id": "cst_vsKJpSsabw",
       "mode": "test",
       "name": "Customer A",
       "email": "customer@example.org",
       "locale": "nl_NL",
       "metadata": null,
       "recentlyUsedMethods": [
           "creditcard",
           "ideal"
       ],
       "createdDatetime": "2016-04-06T13:23:21.0Z"
   }
