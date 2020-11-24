List subscription payments
==========================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions/*subscriptionId*/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all payments of a specific subscriptions of a customer.

Parameters
----------
Replace ``customerId`` and ``subscriptionId`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``,
and by the subscription's ID, for example ``sub_8JfGzs6v3K``.

.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the payment with this ID. The payment with this ID is included
       in the result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of payments to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, it is possible to get test payments by setting the ``testmode`` query string parameter
to ``true``.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve test mode payments.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``payments``

              .. type:: array

            - An array of payment objects as described in
              :doc:`Get payment </reference/v2/payments-api/get-payment>`.

   * - ``count``

       .. type:: integer

     - The number of payments found in ``_embedded``, which is either the requested number (with a maximum of 250)
       or the default number.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of payments. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of payments.

          * - ``previous``

              .. type:: URL object

            - The previous set of payments, if available.

          * - ``next``

              .. type:: URL object

            - The next set of payments, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the list subscription payments endpoint documentation.

Example
-------

Request
^^^^^^^

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K/payments \
         -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: json
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
        "_embedded": {
            "payments": [
                {
                    "resource": "payment",
                    "id": "tr_DtKxVP2AgW",
                    "mode": "live",
                    "createdAt": "2018-09-19T12:49:52+00:00",
                    "amount": {
                        "value": "10.00",
                        "currency": "EUR"
                    },
                    "description": "Some subscription 19 sep. 2018",
                    "method": "directdebit",
                    "metadata": null,
                    "status": "pending",
                    "isCancelable": true,
                    "expiresAt": "2019-09-19T12:49:52+00:00",
                    "locale": "nl_NL",
                    "profileId": "pfl_rH9rQtedgS",
                    "customerId": "cst_8wmqcHMN4U",
                    "mandateId": "mdt_aGQNkteF6w",
                    "subscriptionId": "sub_8JfGzs6v3K",
                    "sequenceType": "recurring",
                    "redirectUrl": null,
                    "webhookUrl": "https://example.org/webhook",
                    "settlementAmount": {
                        "value": "10.00",
                        "currency": "EUR"
                    },
                    "details": {
                        "transferReference": "SD67-6850-2204-6029",
                        "creditorIdentifier": "NL08ZZZ502057730000",
                        "consumerName": "Customer A",
                        "consumerAccount": "NL50INGB0006588912",
                        "consumerBic": "INGBNL2A",
                        "dueDate": "2018-09-21",
                        "signatureDate": "2018-09-19"
                    },
                    "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/payments/tr_DtKxVP2AgW",
                            "type": "application/hal+json"
                        },
                        "checkout": null,
                        "customer": {
                            "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U",
                            "type": "application/hal+json"
                        },
                        "mandate": {
                            "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates/mdt_aGQNkteF6w",
                            "type": "application/hal+json"
                        },
                        "subscription": {
                            "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K",
                            "type": "application/hal+json"
                        }
                    }
                },
                {...},
                {...},
                {...}
            ]
        },
        "count": 4,
        "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments",
                "type": "text/html"
            },
            "self": {
                "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K/payments?limit=50",
                "type": "application/hal+json"
            },
            "previous": null,
            "next": null
        }
    }
