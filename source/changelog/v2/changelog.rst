Changelog
~~~~~~~~~

Occasionally, we will add new resources, new fields, or new possible values to existing fields to the v2 Mollie API. All
changes are documented here.

July 2018
=========

Wednesday, 4th
--------------
- Created a guide for :doc:`Mollie Payouts </guides/payouts>`.
- Introduced the :doc:`Balances API </reference/v2/balances-api/create-balance>` for Mollie Payouts.
- Introduced the :doc:`Transfers API </reference/v2/transfers-api/create-transfer>` for Mollie Payouts.
- Added support for payment routing using the new ``routing`` parameter on the 
  :doc:`Payments API </reference/v2/payments-api/create-payment>` for Mollie Payouts.
- Introduced the :doc:`payment route subresource </reference/v2/payments-api/get-payment-route>` for Mollie Payouts.

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
