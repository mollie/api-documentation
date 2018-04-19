.. _migrate-to-v2:

Migrating from v1 to v2
=======================

Why upgrade to v2?
------------------
The Mollie API ``v2`` offers some compelling new features compared to the older ``v1`` API:

* Fully supports :ref:`multi currency <guides/multi-currency>`, e.g. you can create payments, subscriptions and refunds
  in non-``EUR`` currencies.
  Your account will still be settled in ``EUR``, so new fields have been added in the API to reflect the settlement
  amount for various resources.
* Improved support for accessing large sets of objects, now uses :ref:`cursor-based pagination <guides/pagination>`
  instead of pagination based on counts and offsets.
* Settlement details are now available for refunds and chargebacks as well.
* Improved error messages. Error message will contain more details to help you quickly resolve any implementation
  problems.

Changes in v2
-------------
In general, the API has adopted the HAL specification, allowing you to discover new resources and follow links to new
resources while working with the API.

Several fields have changed too to support new features or to clear up confusing aspects of the ``v1`` API.

Amount changes
^^^^^^^^^^^^^^
All amounts in the API are passed as a map containing both a ``currency`` and a ``value`` property, for example:

.. code-block:: json

   {
       "amount": {
           "currency": "EUR",
           "value": "10.00"
       }
   }

This example object describes an amount of €10.00.

.. note:: If you specify an amount, you must specify the *correct* number of decimals. We strongly recommend sending
          ``value`` as a string. Note that even though most currencies use two decimals, some use three or none, like
          ``JPY``.

All amounts returned in the ``v2`` API will use this format.

Locale changes
^^^^^^^^^^^^^^
Only full locales with both the language and the country code are supported, e.g. ``nl_NL``. Locales are always returned
as full locales.

Combined date and time fields
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Formatting of fields such as ``createdAt`` has been updated to be strictly compliant to ISO-8601 formatting. Example
value: ``2018-03-05T12:30:10+00:00``.

Changes in the Payments API
^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following changes have been made in regards to the status of payments:

* The statuses ``paidout``, ``refunded`` and ``charged_back`` have been removed.
* The status ``cancelled`` has been renamed to `canceled` (US English spelling).
* If you want to see if a payment has been settled to your bank account, it will contain the ``settlement`` key in the ``_links`` property.
* If you want to see if a payment has any refunds, the payment will have the ``refunds`` key in the ``_links`` property,
  which will point you to the refunds resource where you can view the refund details.
* If you want to see if a payment has any chargebacks, the payment will have the ``chargebacks`` key in the ``_links``
  property, which will point you to the chargeback resource where you can view the refund details.

The individual billing and shipping address parameters that can be used when creating a credit card or PayPal payment have been replaced by address objects. Instead of passing ``billingAddress``, ``billingPostal``, ``billingCity``, ``billingRegion`` and/or ``billingCountry`` (or the equivalent fields starting with ``shipping``), one should now pass a ``billingAddress`` (and/or ``shippingAddress``) object, as follows:

.. code-block:: json

    {
        "amount": {"currency": "USD", "value": "100.00"},
        ...
        "billingAddress": {
            "streetAndNumber": "Dorpstraat 1",
            "postalCode": "1122 AA",
            "city": "Amsterdam",
            "region": "Noord",
            "country": "NL",
        }
    }

**Please note**: the usage of the address object parameters remains optional. Please refer to the :ref:`Create payment documentation <v2/payments-create>` for exact specifications on what input is accepted.

The following fields have been changed, renamed or moved:

* ``cancelledDatetime`` has been renamed to ``canceledAt``.
* ``createdDatetime`` has been renamed to ``createdAt``.
* ``expiredDatetime`` has been renamed to ``expiredAt``.
* ``failedDatetime`` has been renamed to ``failedAt``.
* ``paidDatetime`` has been renamed to ``paidAt``.
* ``canBeCancelled`` has been renamed to ``isCancelable``.
* ``recurringType`` has been renamed to ``sequenceType``. This field is now always present. A one-off payment (not the
  start of a recurring sequence and not a :ref:`recurring payment <guides/recurring>`) will have the value ``oneoff``.
* ``redirectUrl`` and ``webhookUrl`` are now part of the top-level object for Payments.
* ``links.paymentUrl`` has been renamed to ``_links.checkout`` as per HAL specifications.
* ``failureReason`` has been moved from the Payment resource to the credit card detail object, and is not available
  anymore for Bancontact payments.

The following fields have been removed:

* ``expiryPeriod`` has been removed from the Payment resource. You can use ``expiresAt`` which contains the same
  information.
* ``issuer`` has been removed from the Payment resource. You can however, still pass it to the Create payment call.
* ``bitcoinRate`` has been removed from the Bitcoin detail object on the Payment resource.
* ``cardCountry`` has been removed from the creditcard detail object on the Payment resource.

These new fields have been added:

.. _settlementAmount:

* ``settlementAmount`` has been added to the responses of the Payments API, the Refunds API and the Chargebacks API.
  This optional field will contain the amount that will be settled to your account, converted to the currency your
  account is settled in. It follows the same syntax as the ``amount`` property.

  Note that for refunds and chargebacks, the ``value`` key of ``settlementAmount`` will be negative.

  Any amounts not settled by Mollie will be not be reflected in this amount, e.g. PayPal or gift cards.

Changes in the Refunds API
^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``amount`` is now mandatory when creating a refund. You must specify both ``amount.currency`` and ``amount.value``.
* The ``amount`` field is now of the ``amount`` type and contains a ``value`` and a ``currency``.
* ``payment``, which contained the payment resource related to the refund, is no longer returned. Instead, the payment
  ID is returned by default, in the ``paymentId`` field. The payment resource can still easily be accessed using the
  ``payment`` key in the ``_links`` property.
* The resource will contain a link to the settlement if it is settled (via the ``settlement`` key in the ``_links``
  property.

These new fields have been added:

* ``settlementAmount`` has been added. See the explanation of the settlementAmount_ for the Payments API.

Changes in the Chargebacks API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* The ``amount`` field is now of the ``amount`` type and contains a ``value`` and a ``currency``.
* ``chargebackDatetime`` has been renamed to ``createdAt``.
* ``reversedDatetime`` has been renamed to ``reversedAt``. This field is now only returned if the chargeback is
  reversed.
* ``payment``, which contained the payment ID related to the chargeback, has been renamed to ``paymentId``. The payment
  resource can easily be accessed using the ``payment`` key in the ``_links`` property.
* Pagination has been removed, so all fields related to pagination are not available anymore. The list method will now
  return all chargebacks.
* The resource will contain a link to the settlement if it is settled (via the ``settlement`` key in the ``_links``
  property.

These new fields have been added:

* ``settlementAmount`` has been added. See the explanation of the settlementAmount_ for the Payments API.

Changes in the Methods API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``amount`` including ``minimum`` and ``maximum`` have been removed.
* The ``image`` fields ``normal`` and ``bigger`` have been renamed to ``size1x`` and ``size2x``.
* Pagination has been removed, so all fields related to pagination are not available anymore. The list method will now
  return all payment methods.

The following parameters have been changed or added:

* The parameter ``recurringType`` has been renamed to ``sequenceType``. Possible values are ``oneoff``, ``first`` or
  ``recurring``.
* The parameter ``amount`` has been added. This should be an object containing ``value`` and ``currency``. Only payment
  methods that support the amount/currency will be returned.
  Example: ``https://api.mollie.com/v2/methods?amount[value]=100.00&amount[currency]=USD``

Changes in the Customers API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``createdDatetime`` has been renamed to ``createdAt``.

Changes in the Subscriptions API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following changes have been made in regards to the status of subscriptions:

* Subscriptions that are canceled can be retrieved from the API, and will not return a HTTP status ``410 Gone``.
* The ``canceled`` status is changed from British English to American English.

The following fields have been changed, renamed or moved:

* ``createdDatetime`` has been renamed to ``createdAt``.
* ``cancelledDatetime`` has been renamed to ``canceledAt``, and is now only returned when the subscription is canceled.
* ``webhookUrl`` is now part of the top-level object for Subscriptions.

Changes in the Settlements API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``createdDatetime`` has been renamed to ``createdAt``.
* ``paidDatetime`` has been renamed to ``paidAt``.
* The fields ``paymentIds``, ``refundIds`` and ``chargebackIds`` has been removed.
* All amounts have been changed to the amount type. Note that the ``costs.amount*`` fields can have more decimals than
  you would expect. The same goes for ``rate.fixed``, which can contain fractional cents.
* ``amount.net``, ``amount.vat`` and ``amount.gross`` have been moved one level up as ``amountNet``, ``amountVat`` and
  ``amountGross``.
* If the settlement has been invoiced, it will contain the ``invoice`` key in the ``_links`` property.

Changes in error reporting
^^^^^^^^^^^^^^^^^^^^^^^^^^
In general, error reporting has been improved to help you resolve any implementation errors as fast as possible.

The HAL specification has been adopted for error reporting as well. The difference between ``v1`` and ``v2`` is best
explained using an example.

The new error reporting format in ``v2`` is the following:

.. code-block:: json

   {
       "status": 401,
       "title": "Unauthorized Request",
       "detail": "Missing authentication, or failed to authenticate",
       "_links": {
           "documentation": {
               "href": "https://www.mollie.com/en/docs/authentication",
               "type": "text/html"
           }
       }
   }

The HTTP status returned is now part of the error response, ``title`` is the default HTTP status message, the
``message`` field is renamed to ``detail``.
