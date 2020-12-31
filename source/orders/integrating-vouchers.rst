Integrating meal, eco, and gift vouchers
========================================
A voucher is for certain products given to employees as an employee benefit, allowing them to eat at outside
restaurants, typically for lunch, buying eco product or gifts. In many countries, vouchers had favorable tax treatment.
Vouchers are typically in the form of paper tickets but are gradually being replaced by electronic vouchers in the form
of a special payment card. It's possible to accept these cards via Mollie.

Supported brands
----------------
At the moment, the following brands are supported by Mollie:

* Monizze Eco
* Monizze Gift
* Monizze Meal
* Sodexo Cadeau Pass
* Sodexo Eco Pass
* Sodexo Lunch Pass

Contracting and settlement
--------------------------
In order to use vouchers as a payment method, you should have a contract with the owner of the brand(s) you want to
accept. For example, with Sodexo Belgium for the Sodexo vouchers. Once you have a contract, you can activate the brand
via the `Mollie Dashboard <https://www.mollie.com/dashboard>`_. Enter your contract ID and enable the brand(s) of the
brand owner(s) you want to provide.

In contrast to other payment methods such as iDEAL or credit card, Mollie does not handle settlement on your behalf.
Settlement is handled by the brand owner, like Sodexo Belgium.

Integration via the Orders API
------------------------------
Vouchers are only available as payment method via the :doc:`Orders API </reference/v2/orders-api/create-order>` since
these can only be used for eligible products. Therefor you should include the ``lines.category`` parameter for all your
order lines. We will calculate the eligible amount based on this parameter.

If you do not specify the ``lines.category`` for at least one order line, the voucher method will not be available to
the shopper.

Mollie supports stacking transactions, e.g. starting with a partial voucher payment and then finalizing the payment
using more vouchers or one of the other payment methods.

Canceled and abandoned payments
-------------------------------
If your shopper cancels or abandons the payment after partially paying with one or more vouchers, the amount paid with
the vouchers will **not** be refunded due to the limitation set by the brand issuers. You will still receive the money
via the brand owner and should handle a refund by yourself.

Refunds
-------
You cannot perform any voucher refunds due to the limitation set by the brand issuers. However, if another payment
method was used during the checkout, you can refund the part paid with the payment method used for the remainder amount.

Getting the details of the remainder payment
--------------------------------------------
In some cases it is desirable to receive the details of a payment. This is mostly the case from the remainder payment
when the consumer partially paid with a voucher. Receiving these details is possible in both the
:doc:`Payments API </reference/v2/payments-api/get-payment>` and :doc:`Orders API </reference/v2/orders-api/get-order>`.

To receive the remainder details in the Payments API, use the ``details.remainderDetails`` include. For example:
``GET https://api.mollie.com/v2/payments/tr_xxx?include=details.remainderDetails``. For the Orders API you should use
the ``payments.details.remainderDetails`` embed:
``GET https://api.mollie.com/v2/orders/ord_xxx?embed=payments.details.remainderDetails``.

Be aware that the ``remainderDetails`` is only available when the payment was partially paid with a voucher and then the
remainder was paid with a different payment method.
