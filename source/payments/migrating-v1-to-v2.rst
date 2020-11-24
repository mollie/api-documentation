Migrating from v1 to v2
=======================

Why upgrade to v2?
------------------
The **Mollie API v2** offers some compelling new features compared to the older ``v1`` API:

* Fully supports :doc:`multicurrency </payments/multicurrency>`. You can create payments, subscriptions, and refunds in
  non-``EUR`` currencies. Your account will still be settled in ``EUR``, so new fields have been added in the API to
  reflect the settlement amount for various resources.
* Possible to update details of payments via the new :doc:`/reference/v2/payments-api/update-payment`.
* Improved support for accessing large sets of objects, now uses :doc:`cursor-based pagination </guides/pagination>`
  instead of pagination based on counts and offsets.
* Settlement details are now available for refunds and chargebacks as well.
* New features such as :doc:`Mollie Components </guides/mollie-components/overview>`, using
  :doc:`/orders/overview` for Pay later and Slice it, and wallets such as :doc:`/wallets/applepay` are
  only available in the Mollie API v2.
* Improved error messages. Error message will contain more details to help you quickly resolve any implementation
  problems.

Changes in v2
-------------
In general, the API has adopted the `HAL specification <https://en.wikipedia.org/wiki/Hypertext_Application_Language>`_,
allowing you to discover new resources and follow links to new resources while working with the API.

Several fields have changed too to support new features or to clear up confusing aspects of the ``v1`` API.

The identifier for the payment method *Bancontact* has been renamed from ``mistercash`` to ``bancontact`` in the ``v2``
API.

Some resources support embedding of related sub-resources. For instance, when retrieving a payment any refunds can be
embedded by using the ``embed=refunds`` query string parameter. See the
:doc:`Get Payment API</reference/v2/payments-api/get-payment>` for more information.

Amount changes
^^^^^^^^^^^^^^
All amounts in the API are passed as a map containing both a ``currency`` and a ``value`` property, for example:

.. code-block:: json
   :linenos:

   {
       "amount": {
           "currency": "EUR",
           "value": "10.00"
       }
   }

This example object describes an amount of €10.00.

.. note:: If you specify an amount, you must specify the *correct* number of decimals. We strongly recommend sending
          ``value`` as a string. And even though most currencies use two decimals, some use three or none, like
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
* If you want to see if a payment has been settled to your bank account, it will contain the ``settlement`` key in the
  ``_links`` property.
* If you want to see if a payment has any refunds, the payment will have the ``refunds`` key in the ``_links`` property,
  which will point you to the refunds resource where you can view the refund details.
* If you want to see if a payment has any chargebacks, the payment will have the ``chargebacks`` key in the ``_links``
  property, which will point you to the chargeback resource where you can view the chargeback details.

The individual billing and shipping address parameters that can be used when creating a credit card or PayPal payment
have been replaced by address objects. Instead of passing ``billingAddress``, ``billingPostal``, ``billingCity``,
``billingRegion`` and/or ``billingCountry`` (or the equivalent fields starting with ``shipping``), one should now pass a
``billingAddress`` (and/or ``shippingAddress``) object, as follows:

.. code-block:: json
   :linenos:

   {
       "amount": {"currency": "USD", "value": "100.00"},
       "description": "Order #12345",
       "billingAddress": {
           "streetAndNumber": "Dorpstraat 1",
           "postalCode": "1122 AA",
           "city": "Amsterdam",
           "region": "Noord-Holland",
           "country": "NL",
       }
   }

.. note:: The usage of the address object parameters remains optional. Please refer to the
          :doc:`Create payment documentation </reference/v2/payments-api/create-payment>` for exact specifications on
          what input is accepted.

The following fields have been changed, renamed or moved:

* ``cancelledDatetime`` has been renamed to ``canceledAt``.
* ``createdDatetime`` has been renamed to ``createdAt``.
* ``expiredDatetime`` has been renamed to ``expiredAt``.
* ``failedDatetime`` has been renamed to ``failedAt``.
* ``paidDatetime`` has been renamed to ``paidAt``.
* ``canBeCancelled`` has been renamed to ``isCancelable``.
* ``recurringType`` has been renamed to ``sequenceType``. This field is now always present. A one-off payment (not the
  start of a recurring sequence and not a :doc:`recurring payment </payments/recurring>`) will have the value
  ``oneoff``.
* ``redirectUrl`` and ``webhookUrl`` are now part of the top-level object for Payments.
* ``links.paymentUrl`` has been renamed to ``_links.checkout`` as per HAL specifications.
* ``failureReason`` has been moved from the Payment resource to the credit card detail object, and no longer available
  for Bancontact payments.

The following fields have been removed:

* ``expiryPeriod`` has been removed from the Payment resource. You can use ``expiresAt`` which contains the same
  information.
* ``issuer`` has been removed from the Payment resource. You can however, still pass it to the
  :doc:`Create Payment API </reference/v2/payments-api/create-payment>`.
* ``details.bitcoinRate`` has been removed from the Bitcoin detail object.
* ``details.bitcoinAmount`` has been removed from the Bitcoin detail object.
* ``details.cardCountry`` has been removed from the credit card detail object.
* The option to include the settlement using the ``include`` query string parameter has been removed.

These new fields have been added:

.. _settlementAmount:

* ``settlementAmount`` has been added to the responses of the
  :doc:`Payments API </reference/v2/payments-api/get-payment>`, the
  :doc:`Refunds API </reference/v2/refunds-api/get-refund>` and the
  :doc:`Chargebacks API </reference/v2/chargebacks-api/get-chargeback>`.
  This optional field will contain the amount that will be settled to your account, converted to the currency your
  account is settled in. It follows the same syntax as the ``amount`` property.

  Note that for refunds and chargebacks, the ``value`` key of ``settlementAmount`` will be negative.

  Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal or gift cards.

* ``_links.status`` has been added to the responses for ``banktransfer`` payments. Your customer can check the status of
  their transfer at this URL.

* ``_links.payOnline`` has been added to the responses for ``banktransfer`` payments. At this URL your customer can
  finish the payment using an alternative payment method also activated on your website profile.

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
* The resource will contain a link to the settlement if it is settled (via the ``settlement`` key in the ``_links``
  property.

These new fields have been added:

* ``settlementAmount`` has been added. See the explanation of the settlementAmount_ for the Payments API.

Changes in the Methods API
^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``amount`` including ``minimum`` and ``maximum`` have been renamed to ``minimumAmount`` and ``maximumAmount``. This
  should be an object containing ``value`` and ``currency``.
* The ``image`` fields ``normal`` and ``bigger`` have been renamed to ``size1x`` and ``size2x``.
* Pagination has been removed, so all fields related to pagination are not available anymore. The list method will now
  return all payment methods.

The following parameters have been changed or added:

* The parameter ``recurringType`` has been renamed to ``sequenceType``. Possible values are ``oneoff``, ``first`` or
  ``recurring``.
* The parameter ``amount`` has been added. This should be an object containing ``value`` and ``currency``. Only payment
  methods that support the amount/currency will be returned.
  Example: ``https://api.mollie.com/v2/methods?amount[value]=100.00&amount[currency]=USD``

Changes in the Issuers API
^^^^^^^^^^^^^^^^^^^^^^^^^^
The issuers API has been removed. Instead, you can get the issuers via the
:doc:`Get Method API </reference/v2/methods-api/get-method>` using the ``issuers`` include.

Changes in the Customers API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``createdDatetime`` has been renamed to ``createdAt``.
* ``recentlyUsedMethods`` has been removed.

Changes in the Subscriptions API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following changes have been made in regards to the status of subscriptions:

* Subscriptions that are canceled can be retrieved from the API, and will not return a HTTP status ``410 Gone``.
* The ``canceled`` status is changed from British English to American English.

The following fields have been changed, renamed or moved:

* ``createdDatetime`` has been renamed to ``createdAt``.
* ``cancelledDatetime`` has been renamed to ``canceledAt``, and is now only returned when the subscription is canceled.
* ``webhookUrl`` is now part of the top-level object for Subscriptions.

Changes in the Profiles API
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following fields have been changed, renamed or removed:

* ``createdDatetime`` has been renamed to ``createdAt``
* ``updatedDatetime`` has been removed.
* ``phone`` is now formatted in `E.164 <https://en.wikipedia.org/wiki/E.164>`_ formatting.
* The API keys subresource has been removed.

New APIs have been added, such as het :doc:`/reference/v2/profiles-api/get-profile-me`.

Changes in the Settlements API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``createdDatetime`` has been renamed to ``createdAt``.
* ``settledDatetime`` has been renamed to ``settledAt``.
* The fields ``paymentIds``, ``refundIds`` and ``chargebackIds`` has been removed.
* All amounts have been changed to the amount type. Note that the ``costs.amount*`` fields can have more decimals than
  you would expect. The same goes for ``rate.fixed``, which can contain fractional cents.
* ``amount.net``, ``amount.vat`` and ``amount.gross`` have been moved one level up as ``amountNet``, ``amountVat`` and
  ``amountGross``.
* If the settlement has been invoiced, it will contain the ``invoice`` key in the ``_links`` property.
* The ``reference`` parameter in the :doc:`List Settlements API </reference/v2/settlements-api/list-settlements>` has
  been removed.

Changes in the Mandates API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following fields have been changed, renamed or moved:

* ``createdDatetime`` has been renamed to ``createdAt``.

Changes in the Organizations API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* The fields ``country``, ``registrationDate`` and ``registrationType`` have been removed.
* The field ``address`` is now an :ref:`address-object`.

Changes in the Permissions API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* The field ``warning`` has been removed.

Changes in the Invoice API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* ``issuedDate`` has been renamed to ``issuedAt``.
* ``paidDate`` has been renamed to ``paidAt``.
* ``dueDate`` has been renamed to ``dueAt``.
* ``amount.net``, ``amount.vat`` and ``amount.gross`` have been moved one level up as ``netAmount``, ``vatAmount`` and
  ``grossAmount``.
* ``pdf`` has been moved into the ``_links`` property.

Changes in error reporting
^^^^^^^^^^^^^^^^^^^^^^^^^^
In general, error reporting has been improved to help you resolve any implementation errors as fast as possible.

The HAL specification has been adopted for error reporting as well. The difference between ``v1`` and ``v2`` is best
explained using an example.

The new error reporting format in ``v2`` is the following:

.. code-block:: json
   :linenos:

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

The HTTP status returned is now part of the error response, ``title`` is the default HTTP status message, the
``message`` field is renamed to ``detail``.
