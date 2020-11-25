Refunds
=======

A *refund* allows an amount to be returned to your customer. The refunded amount will be withheld from your next
settlement.

Refunds are created using the :doc:`/reference/v2/refunds-api/create-refund`. When using Orders, we recommend using the
:doc:`/reference/v2/orders-api/create-order-refund` instead. Additionally, you can `create refunds manually
<https://help.mollie.com/hc/en-us/articles/115000014489-How-do-I-refund-a-payment-to-one-of-my-consumers->`_ via the
Mollie Dashboard.

Most payment methods support refunds. Refunds are not available for paysafecard and gift cards.

Refunds support descriptions, which we will show in the Mollie Dashboard, your exports and pass to your customer if
possible.

.. _refund-statuses:

Refund statuses
---------------
Refunds have their own status, independent of the Payment or Order they were created for.

*queued*
  The refund is queued due to a lack of balance. Once your account has sufficient balance or you manually top up
  your balance, the refund automatically transitions to the next status. A queued refund can be canceled.

*pending*
  The refund is ready to be sent to the bank. You can still cancel the refund if you like.

*processing*
  The refund is being processed. Cancellation is no longer possible.

*refunded*
  The refund has been settled to your customer.

*failed*
  The refund has failed after processing. For example, the customer has closed his / her bank account. The funds will
  be returned to your account.

Insufficient balance
--------------------
If you have insufficient balance with Mollie to perform the refund, the refund will be queued until sufficient balance
is available again. We will automatically process the refund once your balance increases.

Additionally, you can also manually top up your balance via the `Administration page
<https://www.mollie.com/dashboard/administration>`_ in the Mollie Dashboard.

Partial refunds and over refunding
----------------------------------
Partial refunds are fully supported. You can create multiple partial refunds if needed. Note that we will prevent
duplicate refunds in a short time frame.

Additionally, most payment methods (notable exceptions being credit card and PayPal) support over refunding, where you
can refund an additional €25.00 more than the original payment's amount. You can use this for crediting shipping costs
for returns to your customer, for example.

Possible errors
---------------
Sometimes a situation can occur in which it is not possible to perform the refund. In such cases an HTTP ``4xx`` error
will be returned. Some of these situations are illustrated here:

* There might not be enough balance on your account with the payment provider (e.g. PayPal).
* Your Refund is a duplicate (of the same amount in the last hour) of another Refund on the Payment.
* You may have forgotten to grant the appropriate rights to Mollie for the payment provider (PayPal only).
* It is possible that the payment has already been (partially) refunded.

If you perform many refunds in parallel, you may get an HTTP ``503 Service unavailable`` error. In this case, you can be
certain the refund was not performed and you can safely retry the refund.

If there is a connection issue during the creation of a refund (e.g. a client-side time out is triggered) you should
**not retry automatically** as you cannot be sure the refund has been performed or not. In this case we suggest logging
into the Mollie Dashboard, or retrieving the payment's refunds via the API to validate if the refund has been created.
