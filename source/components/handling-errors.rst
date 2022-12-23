Handling errors with Mollie Components
======================================
When paying with a credit card, several errors can occur during the payment process that are outside of your or
Mollie's control, e.g. the consumer has entered an incorrect CVV, has insufficient balance on their card or the
issuing bank could decline the transaction.

In order to provide a good experience to the consumer when using Mollie Components, *handling errors* is of course
essential. Should an error occur, you should make the consumer aware of the error so they can correct the problem and continue
the checkout.

When creating a test mode payment, failure conditions can be triggered :doc:`using magic amounts </components/testing>`.

How can I find out what error occurred?
---------------------------------------
If creating the payment was unsuccessful, the API response will contain an error in the format shown
:doc:`here </overview/handling-errors>`. If creating the payment was successful, Mollie will give you the
``_links.checkout`` URL where the consumer will have to authenticate themselves with their card issuer (through 3-D Secure
[#f1]_ authentication).

In the case that an error occurs during or after authentication, the payment status will be ``failed`` and final. If
you want to let the consumer attempt to pay again, you should collect a new card token and create a new payment using
our API. The reason of the error will be present in the ``details`` object of the
:doc:`Get payment endpoint </reference/v2/payments-api/get-payment>` response, as shown below:

.. parameter:: details
   :type: object

   An object with credit card-specific details on the payment. Note that there are
   :ref:`various other fields <Credit card v2>` which have been omitted here for the sake of brevity.

   .. parameter:: failureReason
      :type: string

      Only available for failed payments. Contains a failure reason code.

      Possible values: ``authentication_abandoned`` ``authentication_failed`` ``authentication_required``
      ``authentication_unavailable_acs`` ``card_declined`` ``card_expired`` ``inactive_card`` ``insufficient_funds``
      ``invalid_cvv`` ``invalid_card_holder_name`` ``invalid_card_number`` ``invalid_card_type`` ``possible_fraud``
      ``refused_by_issuer`` ``unknown_reason``

   .. parameter:: failureMessage
      :type: string

      A localized message that can be shown to the consumer, depending on the ``failureReason``.

      Example value: ``Der Kontostand Ihrer Kreditkarte ist unzureichend. Bitte verwenden Sie eine andere Karte.``

      This is provided as a convenience, you can of course also use your own messages.

Example Payments API response for ``failed`` payment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note that some fields have been omitted for the sake of brevity.

.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "mode": "live",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "description": "Order #12345",
       "method": "creditcard",
       "status": "failed",
       "...": "...",
       "details": {
           "cardToken": "tkn_UqAvArS3gw",
           "...": "...",
           "failureReason": "insufficient_funds",
           "failureMessage": "Der Kontostand Ihrer Kreditkarte ist unzureichend. Bitte verwenden Sie eine andere Karte."
       },
       "locale": "de_DE",
       "profileId": "pfl_QkEhN94Ba",
       "redirectUrl": "https://webshop.example.org/order/12345/",
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/get-payment",
               "type": "text/html"
           }
       }
   }

.. rubric:: Footnotes

.. [#f1] 3-D Secure (also known as `MasterCard SecureCode`, `Verified by VISA` or `American Express SafeKey`) is an
         additional step during payment aimed at reducing credit card fraud. It requires the card holder to authenticate
         themselves with the card issuer during the payment process.
