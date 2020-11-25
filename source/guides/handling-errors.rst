Handling errors
===============

HTTP status codes
-----------------
Whenever you send a request to the Mollie API you'll get a response in
`JSON (JavaScript Object Notation) <https://json.org>`_ format. This is a standard for data communication that's
easy to read for humans as well as machines. Alongside the JSON-response an HTTP status code is sent that shows whether
the request was successful or not. If it wasn't, you can tell by the code and the message in the response what went
wrong, why it went wrong and whether there is something you can do about it.

A successful request
--------------------
An HTTP status ``200 OK``, ``201 Created`` or ``204 No Content``  is issued whenever your request was a success. You see
this type of response in our examples like this one below where we successfully
:doc:`retrieve a payment </reference/v2/payments-api/get-payment>`.

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "payment",
       "id": "tr_PSj7b45bkj",
       "mode": "test",
       "createdAt": "2018-03-12T10:56:15+00:00",
       "amount": {
           "value": "1.00",
           "currency": "EUR"
       },
       "description": "Order #66",
       "method": null,
       "metadata": null,
       "status": "open",
       "isCancelable": false,
       "expiresAt": "2018-03-12T11:11:15+00:00",
       "details": null,
       "profileId": "pfl_7N5qjbu42V",
       "sequenceType": "oneoff",
       "redirectUrl": "https://www.example.org/payment/completed",
       "_links": {
         "self": {
             "href": "https://api.mollie.com/v2/payments/tr_PSj7b45bkj"
         },
         "checkout": {
             "href": "https://www.mollie.com/payscreen/select-method/PSj7b45bkj"
         }
       }
   }


The response types
------------------
The first digit of the status code indicates the type or class of the status. Using this first digit you can determine
the best approach for dealing with an error. The following classes of codes are relevant to the Mollie API:

* A code in the ``2xx`` range comes with a Mollie API response indicating success.
* A code in the ``4xx`` range is an error code returned from the Mollie API where the client (your responsibility) seems
  to be causing the error. Whenever this happens you can change your code to prevent the error from happening again. The
  error for this specific request usually won't go away by itself.
* A code in the ``5xx`` range is an error caused by the server (Mollie's responsibility). So caused by the Mollie API or
  it is infrastructure related. In the rare case you get this type of error, something is wrong with the Mollie API.
  The errors should subside without your mediation.

Examples of error responses
---------------------------
Things will sometimes go wrong. For instance when a request is made with the wrong API key, this error will be the
result:

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
       -H "Authorization: Bearer test_deliberately_invalid_key"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 401 Unauthorized
   Content-Type: application/hal+json

   {
       "status": 401,
       "title": "Unauthorized Request",
       "detail": "Missing authentication, or failed to authenticate",
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/guides/authentication",
               "type": "text/html"
           }
       }
   }

The HTTP status ``401 Unauthorized`` indicates missing or incorrect authorization to execute the desired
action.

Another error that occurs often, is the well known HTTP status ``404 Not Found``, which indicates the object you're
trying to retrieve or manipulate does not exist:

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_I_dont_exist \
       -H "Authorization: Bearer test_4BBB6H4s2jGi3ajsx4E2KqY5sxSXaRV"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 404 Not Found
   Content-Type: application/json

   {
       "status": 404,
       "title": "Not Found",
       "detail": "No payment exists with token tr_I_dont_exist.",
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/errors",
               "type": "text/html"
           }
       }
   }

Sometimes a status HTTP ``422 Unprocessable Entity`` is returned. When it occurs there is extra information in the JSON
about what part or field of your request is likely to be causing the error. In these cases you will find the response
has the parameter ``field``. In the example below we deliberately used an amount that was too high:

Request
~~~~~~~
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer test_4BBB6H4s2jGi3ajsx4E2KqY5sxSXaRV" \
       -d \
       "{
           \"amount\": {\"currency\":\"EUR\", \"value\":\"1000000000.00\"},
           \"description\": \"Order #66\",
           \"redirectUrl\": \"https://www.example.org/payment/completed\"
       }"

Response
~~~~~~~~
.. code-block:: none
   :linenos:

   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/hal+json

   {
       "status": 422,
       "title": "Unprocessable Entity",
       "detail": "The amount is higher than the maximum",
       "field": "amount",
       "_links": {
          "documentation": {
               "href": "https://docs.mollie.com/errors",
               "type": "text/html"
           }
       }
   }

All possible status codes
-------------------------
The Mollie API will only ever return a subset of all legal HTTP status codes. Here's the full list:

+---+------------------------------------------------------------------------------------------------------------------+
|200|OK – Your request was successful.                                                                                 |
+---+------------------------------------------------------------------------------------------------------------------+
|201|Created – The entity was created successfully.                                                                    |
+---+------------------------------------------------------------------------------------------------------------------+
|204|No Content – The requested entity was canceled / deleted successfully.                                            |
+---+------------------------------------------------------------------------------------------------------------------+
|400|Bad Request – The Mollie API was unable to understand your request. There might be an error in your syntax.       |
+---+------------------------------------------------------------------------------------------------------------------+
|401|Unauthorized – Your request wasn't executed due to failed authentication. Check your API key.                     |
+---+------------------------------------------------------------------------------------------------------------------+
|403|Forbidden – You do not have access to the requested resource.                                                     |
+---+------------------------------------------------------------------------------------------------------------------+
|404|Not Found – The object referenced by your URL does not exist.                                                     |
+---+------------------------------------------------------------------------------------------------------------------+
|405|Method Not Allowed – You're trying to use an HTTP method that is not applicable on this URL or resource. Refer to |
|   |the ``Allow`` header to see which methods the endpoint supports.                                                  |
+---+------------------------------------------------------------------------------------------------------------------+
|409|Conflict – You are making a duplicate API call that was probably a mistake (only in v2).                          |
+---+------------------------------------------------------------------------------------------------------------------+
|410|Gone – You are trying to access an object, which has previously been deleted (only in v2).                        |
+---+------------------------------------------------------------------------------------------------------------------+
|415|Unsupported Media Type – Your request's encoding is not supported or is incorrectly understood. Please always use |
|   |JSON.                                                                                                             |
+---+------------------------------------------------------------------------------------------------------------------+
|422|Unprocessable Entity – We could not process your request due to another reason than the ones listed above. The    |
|   |response usually contains a ``field`` property to indicate which field is causing the issue.                      |
+---+------------------------------------------------------------------------------------------------------------------+
|429|Too Many Requests – Your request has hit a rate limit. Please wait for a bit and retry.                           |
+---+------------------------------------------------------------------------------------------------------------------+
|500|Internal Server Error – An internal server error occurred while processing your request. Our developers are       |
|   |notified automatically, but if you have any information on how you triggered the problem, please contact us.      |
+---+------------------------------------------------------------------------------------------------------------------+
|502|Bad Gateway – The service is temporarily unavailable, either due to calamity or (planned) maintenance. Please     |
|   |retry the request at a later time.                                                                                |
+---+------------------------------------------------------------------------------------------------------------------+
|503|Service Unavailable – The service is temporarily unavailable, either due to calamity or (planned) maintenance.    |
|   |Please retry the request at a later time.                                                                         |
+---+------------------------------------------------------------------------------------------------------------------+
|504|Gateway Timeout – Your request is causing an unusually long process time.                                         |
+---+------------------------------------------------------------------------------------------------------------------+
