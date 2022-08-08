API idempotency
===============
When issuing requests to an API, there is always a small chance of networking issues.

For example, the API may not respond to the request within a reasonable timeframe. Your server will then mark the
request as 'timed out'. However, your request may still arrive at the API eventually. So even though you consider the
request to have timed out, it actually may have gotten executed by the API.

In most API integrations, these timeouts and other connection issues are usually handled by simply retrying the request.
There are cases, however, where this may lead to issues. For example, when executing a recurring payment on the Mollie
API, retrying the request may lead to the consumer being charged twice.

In the Mollie API, these sorts of problems can be solved in two ways.

#. If an API request fails, you can actively inspect the API (using its 'list' endpoints) to see if the request got
   executed.
#. You can send a unique value with every API request via the ``Idempotency-Key`` header. If two requests come in with
   the same value, the second request is considered a duplicate that can be ignored. This makes your requests
   *idempotent*.

Impact on the Mollie API
------------------------
In the Mollie API, there is in most cases no harm in simply retrying a request. For example, when setting up a regular
payment, setting up the payment twice will just result in one of the two payments eventually expiring.

Retrying can potentially be harmful only in the following cases:

* **Recurring payments**. When issuing a payment with ``sequenceType:recurring``, the payment will get executed using a
  previously established authorization from the consumer. In other words, it gets executed immediately. Issuing these
  requests twice can lead to double charges.
* **Subscriptions**. Similar to recurring payments, creating a subscription will lead to recurring charges on a
  pre-existing authorization mandate. Creating a subscription twice will lead to double charges during the entire
  duration of the subscription.
* **Partial refunds**. A completed payment can be reversed fully or partially, for example if only some parts of the
  order were returned by the consumer. Since there is a limit to the refund amount, generally executing a full refund
  twice is not possible. When issuing partial refunds, however, executing the refund twice may lead to two separate
  partial refunds that will both get executed.

Using an idempotency key
------------------------
Mollie supports the ``Idempotency-Key`` industry standard. When sending a request to the Mollie API, you can send along
a header with a unique value. If another request is made with the exact same header value within 24 hours, the Mollie
API will return a cached version of the initial response. This way, your API requests become what we call *idempotent*.

A simple implementation looks as follows:

#. You generate a unique value. We recommend using UUID4 to guarantee uniqueness across multiple processes or servers.
#. When you create your API request, attach the unique value to it using header ``Idempotency-Key: <value>``.
#. If your request faces a network issue, simply retry the same request with the exact same ``Idempotency-Key`` value.

A basic example in PHP:

.. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $key = generate_uuid4(); // Your own key generating function

      $parameters = [
          "amount" => ["currency" => "EUR", "value" => "10.00"],
          "description" => "Order 12345",
          "customerId" => "cst_8wmqcHMN4U",
          "sequenceType" => "recurring",
          "idempotencyKey" => $key,
      ];

      try {
        $payment = $mollie->payments->create($parameters);
      } catch (\Mollie\Api\Exceptions\CurlConnectTimeoutException $e) {
        // Try once more with the same idempotency key
        $payment = $mollie->payments->create($parameters);
      }

All ``POST`` endpoints accept idempotency keys. Sending idempotency keys for ``GET``, ``PATCH``, or ``DELETE`` requests
is not necessary since these API requests are repeatable by nature. These keys will thus always be ignored by the Mollie
API.

Keys older than 24 hours will be removed from our cache. If the same key is used again after these 24 hours, it will be
considered a new request.

You can recognize whether the Mollie API returned a cached response by the presence of the ``Idempotent-Replayed: true``
header.

Handling errors
^^^^^^^^^^^^^^^
If you send the same idempotency key for requests to two different endpoints or for requests with different parameters,
the API will return a ``400 Bad Request`` HTTP response.

In rare cases, sending the same request with the same idempotency key twice may result in a situation where the second
request comes in while the first request is still being processed by the Mollie API. If this is the case, the API will
respond to the second request with a ``409 Conflict`` HTTP response.

In the case of a severe network disruption on either side, a single retry may not prove sufficient. When retrying
requests we therefore recommend implementing *exponential back-off*, i.e. adding an exponentially increasing delay
between each attempt until the API responds again. This way you can be certain the request will eventually get executed,
while preventing flooding the Mollie API with requests and hitting rate-limits.
