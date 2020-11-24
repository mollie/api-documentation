Handling errors with Mollie Components
======================================

When paying with a credit card, several errors can occur during the payment process that are outside of your or
Mollie's control, e.g. the shopper has entered an incorrect CVV, has insufficient balance on his / her card or the
issuing bank could decline the transaction.

In order to provide a good experience to the shopper when using Mollie Components, *handling errors* is of course
essential.

Should an error occur, you should make the shopper aware of the error so he / she can correct the problem and continue
the checkout.

There are *two flows* to consider, depending on whether or not 3-D Secure [#f1]_ authentication is necessary.

#. If **no 3-D Secure authentication is necessary** and an error occurs, an error response will immediately be returned
   when when calling the :doc:`/reference/v2/payments-api/create-payment`.
   Should an error occur, then Mollie will not create a Payment.
#. If **3-D Secure authentication is necessary**, Mollie will create a Payment and give you the ``_links.checkoutUrl``
   where the shopper can authenticate the payment. If any errors occur during or after authentication, they will be
   part of the response when retrieving the payment via the :doc:`/reference/v2/payments-api/get-payment`.

The need for 3-D Secure authentication is determined by various factors, such as the estimated fraud risk for the
payment and any agreements between you and Mollie. In the general case, 3-D Secure authentication will be necessary.
However, you should always implement both flows.

When creating a test mode payment, failure conditions can be triggered :doc:`using magic amounts <testing>`.

Payments without 3-D Secure authentication
------------------------------------------

If no 3-D Secure authentication is necessary, you will receive the error upon creating the payment.

If the error is caused by the shopper, the response from the :doc:`/reference/v2/payments-api/create-payment` will
contain the ``extra`` property with two additional keys:

.. list-table::
   :widths: auto

   * - ``extra``

       .. type:: object

     - An object with details on the error.

       .. list-table::
          :widths: auto

          * - ``failureReason``

              .. type:: string

            - Only available for failed payments. Contains a failure reason code.

              Possible values: ``authentication_failed`` ``invalid_card_number`` ``invalid_cvv``
              ``invalid_card_holder_name`` ``card_expired`` ``invalid_card_type`` ``refused_by_issuer``
              ``insufficient_funds`` ``inactive_card`` ``unknown_reason`` ``possible_fraud``

          * - ``failureMessage``

              .. type:: string

            - A localized message that can be shown to the shopper, depending on the ``failureReason``.

              Example value: ``Der Kontostand Ihrer Kreditkarte ist unzureichend. Bitte verwenden Sie eine andere Karte.``.

              This is provided as a convenience, you can of course also use your own messages.

Example Create Payment API error response
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: none
   :linenos:

   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/hal+json

   {
       "status": 422,
       "title": "Unprocessable Entity",
       "detail": "The card has insufficient funds",
       "extra": {
           "failureReason": "insufficient_funds",
           "failureMessage": "Der Kontostand Ihrer Kreditkarte ist unzureichend. Bitte verwenden Sie eine andere Karte."
       },
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/guides/handling-errors",
               "type": "text/html"
           }
       }
   }

Payments with 3-D Secure authentication
---------------------------------------

If 3-D Secure authentication is necessary for the payment, the shopper will first have to authenticate him / herself
with his / her card issuer. Any errors that occur will be available to you in the response of the
:doc:`/reference/v2/payments-api/get-payment` which you should call from your webhook.

In this case, the payment status will be ``failed`` and final. For new payment attempts, you should collect a new card
token and create a new payment using our API.

The reason of the error will be available via the ``details`` object:

.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with credit card specific details on the payment. Note that there are
       :ref:`various other fields <Credit card v2>` which have been omitted here for the sake of brevity.

       .. list-table::
          :widths: auto

          * - ``failureReason``

              .. type:: string

            - Only available for failed payments. Contains a failure reason code.

              Possible values: ``authentication_failed`` ``invalid_card_number`` ``invalid_cvv``
              ``invalid_card_holder_name`` ``card_expired`` ``invalid_card_type`` ``refused_by_issuer``
              ``insufficient_funds`` ``inactive_card`` ``unknown_reason`` ``possible_fraud``

          * - ``failureMessage``

              .. type:: string

            - A localized message that can be shown to the shopper, depending on the ``failureReason``.

              Example value: ``Der Kontostand Ihrer Kreditkarte ist unzureichend. Bitte verwenden Sie eine andere Karte.``.

              This is provided as a convenience, you can of course also use your own messages.


Example Get Payment API response for ``failed`` Payment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. [#f1] 3-D Secure (also known as `MasterCard SecureCode`, `Verified by VISA` or `American Express SafeKey`) is an additional
         step during payment aimed at reducing credit card fraud. It requires the card holder to authenticate him / herself
         with the card issuer during the payment process.
