List settlements
================
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all settlements, ordered from new to old.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the settlement with this ID. The settlement with this ID is included in the result set
       as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of settlements to return (with a maximum of 250).

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of settlements found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``settlements``

              .. type:: array

            - An array of settlement objects as described in
              :doc:`Get settlement <get-settlement>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of settlements. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of settlements.

          * - ``previous``

              .. type:: URL object

            - The previous set of settlements, if available.

          * - ``next``

              .. type:: URL object

            - The next set of settlements, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the settlements list endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/settlements?limit=5 \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"


   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $settlements = $mollie->settlements->page();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      settlements = Mollie::Settlement.all

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
        "_embedded": {
            "settlements": [
                {
                    "resource": "settlement",
                    "id": "stl_77zGEcWNhg",
                    "reference": "3331641.1911.01",
                    "createdAt": "2019-11-21T05:02:00+00:00",
                    "settledAt": "2019-11-20T23:00:00+00:00",
                    "status": "paidout",
                    "amount": {
                        "value": "9200.34",
                        "currency": "EUR"
                    },
                    "periods": {
                        "2019": {
                            "11": {
                                "revenue": [],
                                "costs": []
                            }
                        }
                    },
                    "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/settlements/stl_77zGEcWNhg",
                            "type": "application/hal+json"
                        },
                        "payments": {
                            "href": "https://api.mollie.com/v2/settlements/stl_77zGEcWNhg/payments",
                            "type": "application/hal+json"
                        },
                        "refunds": {
                            "href": "https://api.mollie.com/v2/settlements/stl_77zGEcWNhg/refunds",
                            "type": "application/hal+json"
                        },
                        "chargebacks": {
                            "href": "https://api.mollie.com/v2/settlements/stl_77zGEcWNhg/chargebacks",
                            "type": "application/hal+json"
                        },
                        "captures": {
                          "href": "https://api.mollie.com/v2/settlements/stl_77zGEcWNhg/captures",
                          "type": "application/hal+json"
                        }
                    }
                },
                {
                    "resource": "settlement",
                    "id": "stl_r8FVT3rxGx",
                    "reference": "6551641.1911.01",
                    "createdAt": "2019-10-21T05:02:00+00:00",
                    "settledAt": "2019-10-20T23:00:00+00:00",
                    "status": "paidout",
                    "amount": {
                        "value": "10200.99",
                        "currency": "EUR"
                    },
                    "periods": {
                        "2019": {
                            "10": {
                                "revenue": [
                                    {
                                        "description": "SEPA-incasso",
                                        "method": "directdebit",
                                        "count": 459,
                                        "amountNet": {
                                            "value": "10312.50",
                                            "currency": "EUR"
                                        },
                                        "amountVat": null,
                                        "amountGross": {
                                            "value": "10312.50",
                                            "currency": "EUR"
                                        }
                                    },
                                    {
                                        "description": "SEPA-incasso weigeringen",
                                        "method": "directdebit",
                                        "count": 5,
                                        "amountNet": {
                                            "value": "-111.50",
                                            "currency": "EUR"
                                        },
                                        "amountVat": null,
                                        "amountGross": {
                                            "value": "-111.50",
                                            "currency": "EUR"
                                        }
                                    }
                                ],
                                "costs": [
                                    {
                                        "description": "SEPA-incasso storneringen",
                                        "method": null,
                                        "count": 12,
                                        "rate": {
                                            "fixed": {
                                                "value": "0.45",
                                                "currency": "EUR"
                                            },
                                            "percentage": "0"
                                        },
                                        "amountNet": {
                                            "value": "5.40",
                                            "currency": "EUR"
                                        },
                                        "amountVat": {
                                            "value": "1.134",
                                            "currency": "EUR"
                                        },
                                        "amountGross": {
                                            "value": "6.534",
                                            "currency": "EUR"
                                        }
                                    }
                                ],
                                "invoiceId": "inv_M8Sa6n5mf3"
                            }
                        }
                    },
                    "invoiceId": "inv_M8Sa6n5mf3",
                    "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/settlements/stl_r8FVT3rxGx",
                            "type": "application/hal+json"
                        },
                        "invoice": {
                            "href": "https://api.mollie.com/v2/invoices/inv_M8Sa6n5mf3",
                            "type": "application/hal+json"
                        },
                        "payments": {
                            "href": "https://api.mollie.com/v2/settlements/stl_r8FVT3rxGx/payments",
                            "type": "application/hal+json"
                        },
                        "refunds": {
                            "href": "https://api.mollie.com/v2/settlements/stl_r8FVT3rxGx/refunds",
                            "type": "application/hal+json"
                        },
                        "chargebacks": {
                            "href": "https://api.mollie.com/v2/settlements/stl_r8FVT3rxGx/chargebacks",
                            "type": "application/hal+json"
                        },
                        "captures": {
                            "href": "https://api.mollie.com/v2/settlements/stl_r8FVT3rxGx/captures",
                            "type": "application/hal+json"
                        }
                    }
                }
            ]
        },
        "count": 3,
        "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/settlements-api/list-settlements",
                "type": "text/html"
            },
            "self": {
                "href": "https://api.mollie.com/v2/settlements?limit=50",
                "type": "application/hal+json"
            },
            "previous": null,
            "next": null
        }
    }
