Changelog
~~~~~~~~~

Occasionally, we will add new resources, new fields, or new possible values to existing fields to the v2 Mollie API. All
changes are documented here.

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
