Changelog
~~~~~~~~~
Occasionally, we will add new resources, new fields, or new possible values to existing fields to the v2 Mollie API. All
changes are documented here.

September 2018
==============

Friday, 28th
------------
- Bitcoin payments can now be created in non-EUR currencies. Your account will be settled in EUR.

Tuesday, 25th
-------------
- Added the ``nextPaymentDate`` field in subscriptions to see when the next payment should be initiated. For details,
  see the :doc:`Subscriptions API </reference/v2/subscriptions-api/get-subscription>`.

Thursday, 20th
--------------
- Added a new endpoint get all payments for a specific customer subscription. For details, see:
  :doc:`List subscription payments </reference/v2/subscriptions-api/list-subscriptions-payments>`

Tuesday, 18th
-------------
- Added the ``metadata`` field to the :doc:`Subscriptions API </reference/v2/subscriptions-api/get-subscription>`. This
  makes it possible to, for example, link a plan to a subscription.

Monday, 17th
------------
- Added a new endpoint for partners to get all connected organizations. For details, see:
  :doc:`List organizations </reference/v2/organizations-api/list-organizations>`

Wednesday, 12th
---------------
- Added the :doc:`Orders API </reference/v2/orders-api/create-order>` and the
  :doc:`Shipments API </reference/v2/shipments-api/create-shipment>`. See the
  :doc:`Orders API overview </orders/overview>` for more details on how to use these API's.

- Added the :doc:`Captures API </reference/v2/captures-api/get-capture>`.

- The ``amount`` field in chargebacks had the wrong sign, though it was documented correctly. The API has been changed
  to use positive values for the ``amount`` field and negative values for the ``settlementAmount`` field in the
  :doc:`/reference/v2/chargebacks-api/get-chargeback` API.

- You can now use cursors to scroll through all chargebacks of a Payment using the
  :doc:`/reference/v2/chargebacks-api/list-chargebacks` API.

Tuesday, 11th
-------------

- Added the ``mode`` field to the :doc:`Mandates API </reference/v2/mandates-api/get-mandate>`. This makes it possible
  to see in which environment the mandate is created.

Monday, 10th
------------

- Added a new endpoint for retrieving the website profile of the used API key. For details, see:
  :doc:`Get current profile </reference/v2/profiles-api/get-profile-me>`

August 2018
===========

Wednesday, 1st
--------------

- The icons returned by the :doc:`Methods API </reference/v2/methods-api/list-methods>` have been updated. Note that the
  size of the icons has changed from 40x40 to 32x24. All icons are now available in SVG as well, which we advise you to
  use where possible.

July 2018
=========

Tuesday, 31st
-------------

- Test payments are no longer cleaned up after 2 weeks. Just like live payments they will never be removed.

Thursday, 19th
--------------

- The :doc:`Get Settlement </reference/v2/settlements-api/get-settlement>` endpoint now returns the ``invoiceId`` if the
  settlement has been invoiced. The invoice is also available in the ``_link`` object.

Wednesday, 11th
---------------

- Added a new endpoint for updating Subscriptions. Now you can update a subscription when needed --
  for example when your customer switches price plans.

  For details, see: :doc:`Update Subscription </reference/v2/subscriptions-api/update-subscription>`

June 2018
=========

Monday, 25th
------------

- Added the new payment methods Giropay (``giropay``) and EPS (``eps``). Note that this method may not be available on
  your account straight away. If it is not, contact our support department to get it activated for your account.

- Passing a payment description in the form of ``Order <order number>`` will now pass the order number to PayPal in the
  *Invoice reference* field which you can search.

Friday, 1st
-----------
- Added new locales ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES`` ``ca_ES``
  ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` and ``lt_LT`` to
  the :doc:`Create Customer </reference/v2/customers-api/create-customer>`,
  :doc:`Create Payment </reference/v2/payments-api/create-payment>`, and
  :doc:`List Methods </reference/v2/methods-api/list-methods>` endpoints to localize translations and allow for ordering
  the payment methods in the preferred order for the country.

May 2018
========

Wednesday, 9th
--------------
- Launched `Multicurrency <https://www.mollie.com/nl/features/multicurrency>`_  and the new v2 api.
