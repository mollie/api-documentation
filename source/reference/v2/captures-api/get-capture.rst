Get capture
===========

.. api-name:: Captures API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*paymentId*/captures/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a single capture by its ID. Note the original payment's ID is needed as well.

Captures are used for payments that have the *authorize-then-capture* flow. The only payment methods at the moment
that have this flow are **Klarna Pay later** and **Klarna Slice it**.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the payment's ID, and replace ``id`` by the capture's ID. For example:
``/v2/payments/tr_7UhSN1zuXS/captures/cpt_4qqhO89gsT``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` query string parameter is
also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve a test mode capture.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a capture object. Will always contain ``capture`` for this endpoint.

   * - ``id``

       .. type:: string

     - The capture's unique identifier, for example ``cpt_4qqhO89gsT``.

   * - ``mode``

       .. type:: string

     - The mode used to create this capture.

       Possible values: ``live`` ``test``

   * - ``amount``

       .. type:: amount object

     - The amount captured.

   * - ``settlementAmount``

       .. type:: amount object

     - This optional field will contain the amount that will be settled to your account, converted to the currency
       your account is settled in. It follows the same syntax as the ``amount`` property.

   * - ``paymentId``

       .. type:: string

     - The unique identifier of the payment this capture was created for, for example: ``tr_7UhSN1zuXS``. The full
       payment object can be retrieved via the ``payment`` URL in the ``_links`` object.

   * - ``shipmentId``

       .. type:: string
          :required: false

     - The unique identifier of the shipment that triggered the creation of this capture, for example:
       ``shp_3wmsgCJN4U``. The full shipment object can be retrieved via the ``shipment`` URL in the ``_links`` object.

   * - ``settlementId``

       .. type:: string
          :required: false

     - The unique identifier of the settlement this capture was settled with, for example: ``stl_jDk30akdN``. The full
       settlement object can be retrieved via the ``capture`` URL in the ``_links`` object.

   * - ``createdAt``

       .. type:: datetime

     - The capture's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the customer. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the capture itself.

          * - ``payment``

              .. type:: URL object

            - The API resource URL of the payment the capture belongs to.

          * - ``shipment``

              .. type:: URL object
                 :required: false

            - The API resource URL of the shipment that triggered the capture to be created.

          * - ``settlement``

              .. type:: URL object
                 :required: false

            - The API resource URL of the settlement this capture has been settled with. Not present if not yet settled.

          * - ``documentation``

              .. type:: URL object

            - The URL to the capture retrieval endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

    $payment = $mollie->payments->get("tr_WDqYK6vllg");
    $capture = $payment->getCapture("cpt_4qqhO89gsT");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "capture",
       "id": "cpt_4qqhO89gsT",
       "mode": "live",
       "amount": {
           "value": "1027.99",
           "currency": "EUR"
       },
       "settlementAmount": {
           "value": "399.00",
           "currency": "EUR"
       },
       "paymentId": "tr_WDqYK6vllg",
       "shipmentId": "shp_3wmsgCJN4U",
       "settlementId": "stl_jDk30akdN",
       "createdAt": "2018-08-02T09:29:56+00:00",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT",
               "type": "application/hal+json"
           },
           "payment": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "shipment": {
               "href": "https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/shipments/shp_3wmsgCJN4U",
               "type": "application/hal+json"
           },
           "settlement": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/captures-api/get-capture",
               "type": "text/html"
           }
       }
   }

