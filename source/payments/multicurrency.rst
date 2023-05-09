Multicurrency
=============
Mollie offers payments in non-EUR currencies via its ``v2`` APIs. This allows your shoppers outside of the eurozone to
pay in their own currency. If you have a Mollie balance in the same currency as the payment, it will be settled on that
balance directly without conversion. In all other cases, the payment will be converted to your primary balance currency.
You can view the converted amount via the API or via your `Mollie Dashboard <https://www.mollie.com/dashboard>`_.

Supported currencies
--------------------
For PayPal, `all currencies supported by PayPal <https://developer.paypal.com/docs/classic/api/currency_codes/>`_ are
also supported by Mollie.

Support for other currencies than ``EUR`` varies per payment method.

+--------------------------------+----------+----------------+---------------------------------------------------------+
| Currency                       | ISO code | Decimal places | Payment methods                                         |
+================================+==========+================+=========================================================+
| United Arab Emirates dirham    | ``AED``  |              2 | Credit card                                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Australian dollar              | ``AUD``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Bulgarian lev                  | ``BGN``  |              2 | Credit card                                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Brazilian real                 | ``BRL``  |              2 | PayPal                                                  |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Canadian dollar                | ``CAD``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Swiss franc                    | ``CHF``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Czech koruna                   | ``CZK``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Danish krone                   | ``DKK``  |              2 | PayPal, credit card, Klarna                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Euro                           | ``EUR``  |              2 | All payment methods                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| British pound                  | ``GBP``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Hong Kong dollar               | ``HKD``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Hungarian forint               | ``HUF``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| .. note::                                                                                                            |
|    Note that at PayPal, fillér are not supported, but at Mollie they                                                 |
|    are. We will round the amount sent to PayPal to whole forints.                                                    |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Israeli new shekel             | ``ILS``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Icelandic króna                | ``ISK``  |              0 | Credit card                                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Japanese yen                   | ``JPY``  |              0 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Mexican peso                   | ``MXN``  |              2 | PayPal                                                  |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Malaysian ringgit              | ``MYR``  |              2 | PayPal                                                  |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Norwegian krone                | ``NOK``  |              2 | PayPal, credit card, Klarna                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| New Zealand dollar             | ``NZD``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Philippine piso                | ``PHP``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Polish złoty                   | ``PLN``  |              2 | Przelewy24, PayPal, credit card                         |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Romanian leu                   | ``RON``  |              2 | Credit card                                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Russian ruble                  | ``RUB``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Swedish krona                  | ``SEK``  |              2 | PayPal, credit card, Klarna                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Singapore dollar               | ``SGD``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| Thai baht                      | ``THB``  |              2 | PayPal                                                  |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| New Taiwan dollar              | ``TWD``  |              2 | PayPal                                                  |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| .. note::                                                                                                            |
|    Note that at PayPal, cents are not supported, but at Mollie they                                                  |
|    are. We will round the amount sent to PayPal to whole dollars.                                                    |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| United States dollar           | ``USD``  |              2 | PayPal, credit card                                     |
+--------------------------------+----------+----------------+---------------------------------------------------------+
| South African rand             | ``ZAR``  |              2 | Credit card                                             |
+--------------------------------+----------+----------------+---------------------------------------------------------+

Filtering payment methods
-------------------------
When integrating multicurrency we can use the :doc:`Methods API </reference/v2/methods-api/overview>` to retrieve
all methods available for the given amount and currency.

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -g -X GET "https://api.mollie.com/v2/methods?amount[value]=10.00&amount[currency]=SEK" \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 2,
       "_embedded": {
           "methods": [
               {
                   "resource": "method",
                   "id": "creditcard",
                   "description": "Credit card",
                   "image": {
                       "size1x": "https://www.mollie.com/images/payscreen/methods/creditcard.png",
                       "size2x": "https://www.mollie.com/images/payscreen/methods/creditcard%402x.png"
                   },
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/methods/creditcard",
                           "type": "application/hal+json"
                       }
                   }
               },
               {
                   "resource": "method",
                   "id": "paypal",
                   "description": "PayPal",
                   "image": {
                       "size1x": "https://www.mollie.com/images/payscreen/methods/paypal.png",
                       "size2x": "https://www.mollie.com/images/payscreen/methods/paypal%402x.png"
                   },
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/methods/paypal",
                           "type": "application/hal+json"
                       }
                   }
               }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/methods",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/methods-api/list-methods",
               "type": "text/html"
           }
       }
   }
