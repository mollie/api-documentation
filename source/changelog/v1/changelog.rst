Changelog
~~~~~~~~~
.. api-name:: Mollie API
   :version: 1

Occasionally, we will add new resources, new fields, or new possible values to existing fields to the v1 Mollie API. All
changes are documented here.

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             For more information on the v2 API, refer to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

October 2022
============
Monday, 24th
-------------
- Added the ``horseandgifts`` and ``shoesandsneakerscadeau`` as gift card issuer.

February 2022
=============
Monday, 21st
-------------
- Added the ``doenkadotickets`` as gift card issuer.

November 2021
=============
Tuesday, 23rd
-------------
- The `/v1/settlements/next` and `/v1/settlements/open` endpoints are being shut down, since these endpoints were no
  longer being used. The documentation has been removed accordingly. The corresponding v2 endpoints will remain
  available.
- Added the ``wijncadeaukaart`` and ``jewelcard`` as gift card issuers.

October 2021
============
Friday, 8th
-----------
- Added ``huistuincadeaukaart`` as gift card issuer.

September 2021
==============
Thursday, 23rd
--------------
- Added ``authentication_required`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v1/payments-api/get-payment>` for credit card payments.

August 2021
===========
Tuesday, 10th
-------------
- Added ``bloemplantgiftcard`` as gift card issuer.

Wednesday, 4th
--------------
- Added ``sodexosportculturepass`` as gift card issuer.

March 2021
==========
Tuesday, 30th
--------------
- Added ``delokalecadeaukaart`` as gift card issuer.

Wednesday, 24th
---------------
- Added ``boekenbon`` as gift card issuer.

Tuesday, 23rd
-------------
- Added ``authentication_abandoned``, ``authentication_unavailable_acs`` and ``card_declined`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v1/payments-api/get-payment>` for credit card payments.

Tuesday, 16th
-------------
- Added ``bloemencadeaukaart`` and ``kluscadeau`` as gift card issuers.

February 2021
=============

Monday, 1st
-----------
- We discontinued the support for ING Home'Pay as a payment method. This means that the API now rejects all
  :doc:`Create payment endpoint</reference/v2/payments-api/create-payment>` calls with the method ``inghomepay``. Be
  sure to remove this payment method from your checkout if needed. Please `contact us <https://www.mollie.com/contact>`_
  for more information.

December 2020
=============

Wednesday, 16th
---------------
- We have added Revolut as new iDEAL issuer. It will appear automatically in your checkout if you use the Mollie Hosted
  Payment Page or the Methods API to get the issuers. If you use a custom integration you should add the issuer ID
  ``ideal_REVOLT21`` to your list of available iDEAL banks.

November 2020
=============

Monday, 23th
------------
- We have added a new Merchant Category Code for profiles:
  5262 Marketplaces, crowdfunding, donation platforms

Monday, 9th
-----------
- We have added the following range to the list of IP addresses used to call webhooks: ``87.233.217.240/28``. The full
  list of IP addresses can be found `here <https://help.mollie.com/hc/en-us/articles/213470829>`_.
- We have added 7 new Merchant Category Codes for profiles:
  5712 Home furnishing
  5945 Hobby, Toy, and Game Shops
  6051 Crypto currency
  7922 Events, conferences, concerts, tickets
  7997 Gyms, membership fee based sports
  8111 Lawyers and legal advice
  9399 Government services

October 2020
============

Monday, 12th
------------
- Some ``feeRegion`` values for credit card were missing in the documentation. We have added them now.

August 2020
===========

Thursday, 20th
--------------
- Added ``good4fun`` as gift card issuer.

Monday, 10th
------------
- Added ``decadeaukaart`` as gift card issuer.

June 2020
=========

Friday, 26th
------------
- We limit the amount that can be spent with a gift card to 50 euros per payment due to new regulations.

April 2020
==========

Friday, 3rd
-----------
- Added ``restaurantcadeau`` as gift card issuer.
- Added ``dinercadeau`` as gift card issuer.

March 2020
==========

Thursday, 12th
--------------
- Duplicate Refunds (same amount as another Refund on the same Payment within the hour) are now blocked by the API.

Friday, 6th
-----------
- Added "Sustainable Fashion Gift Card" as giftcard issuer.

Thursday, 5th
-------------
- Added "FestivalCadeau Giftcard" as giftcard issuer.

Wednesday, 4th
--------------
- The expiry time of SOFORT Banking was changed to 2 hours.

December 2019
=============

Monday, 2nd
-----------
- The webhooks will now be called from different IP addresses. This should not cause any problems if you do not check
  our IP address. We advise you not to check our IP address. A full list of all the IP addresses that we use to send
  webhooks can be found `in our help center <https://help.mollie.com/hc/en-us/articles/213470829>`_.

November 2019
=============

Thursday, 28th
--------------
- The ``cardFingerprint`` field for Bancontact is not longer useful for identifying returning customers. See
  :doc:`Get Payment </reference/v1/payments-api/get-payment>` for more information.

Wednesday, 27th
---------------
- Added ``authentication_failed`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v1/payments-api/get-payment>` for credit card payments.

Monday, 4th
-----------
- Added support for PayPal Reference Transactions (recurring) payments. Make sure that the
  `correct permissions <https://help.mollie.com/hc/en-us/articles/213856625>`_ are set and your merchant account has
  been approved by PayPal before using this.
- Added the ``paypalFee`` field to the PayPal payment details which shows the amount of fee PayPal is charging for that
  transaction.

October 2019
============

Monday, 7th
-----------
- Added the ``paypalPayerId`` field to the PayPal payment details.

September 2019
==============

Friday, 20th
------------
- Changed the retry schedule of our webhook system. We will try to call your webhook for 26 hours in total now. See the
  :doc:`webhooks guide </overview/webhooks>` for the new schedule.

Tuesday, 17th
-------------
- Added "OhMyGood" as giftcard issuer.

Thursday, 12th
--------------
- Added "Reiscadeau" as giftcard issuer.

Wednesday, 4th
--------------
- Added property ``vatRegulation`` to :doc:`/reference/v1/organizations-api/get-organization`.

August 2019
===========

Thursday, 29th
--------------
- Removed the charge date from the description of payments created by a subscription.

Wednesday, 21st
---------------
- Lowered the minimum amount for credit card payments with `recurringType=first` to zero. See
  :doc:`Recurring payments </payments/recurring>` for more info.

July 2019
=========

Thursday, 4th
-------------
- Added MyBank (``mybank``) as new payment method. Currently, it's not possible to activate MyBank via the Dashboard.
  Please contact your account manager to enable this new method.

May 2019
========

Tuesday, 21st
-------------
- Added ``american-express``, ``carte-bancaire`` and ``maestro`` as possible values for the ``feeRegion`` in the credit
  card payment details. See the :ref:`Get Payment endpoint <Credit card v1>` for details.

Monday, 20th
------------
- :doc:`Apple Pay </wallets/applepay>` is now supported in Mollie Checkout.

Thursday, 2nd
-------------
- Added "VVV Dinercheque" and "VVV Lekkerweg" as giftcard issuers.

Wednesday, 1st
--------------
- Removed ``bitcoin`` as payment method.

April 2019
==========

Friday, 19th
------------
- Added a new endpoint for Mollie Connect to revoke access and refresh tokens. See the
  :doc:`Revoke token endpoint </reference/oauth2/revoke-token>` for details.

March 2019
==========

Thursday, 21th
--------------
- Added the "Nationale Golfbon" and "Sport & Fit Cadeau" as giftcard issuers.

Tuesday, 12th
-------------
- Added the new payment method `Przelewy24 <https://www.mollie.com/payments/przelewy24>`_ (``przelewy24``).

February 2019
=============

Thursday, 28th
--------------
- Added profile website URL validation to the :doc:`Create profile </reference/v1/profiles-api/create-profile>`
  endpoint.

Monday, 25th
------------
- Updated the list of available profile :doc:`merchant category codes </reference/v1/profiles-api/create-profile>`

Wednesday, 6th
--------------
- We will now also call the webhook when a refund got canceled

December 2018
=============

November 2018
=============

Monday, 12th
------------
- Subscriptions in test mode will now be canceled automatically after 10 charges.

Thursday, 8th
-------------
- It's now possible to refund SEPA Direct Debit payments

Monday, 5th
-----------
- Added referral-functionality for Mollie Partners to the Connect API. See the :doc:`documentation </connect/overview>`
  for more info.

Thursday, 1st
-------------
- The maximum amount for SOFORT Banking payments has been increased from €5,000 to €50,000.

October 2018
============

Wednesday, 24th
---------------
- Consumer IBANs of Bancontact payments will now always be shared via the API.

Friday, 19th
--------------
- PayPal refund period has been increased from 60 to 180 days.

Monday, 15th
------------
- It is now possible to specify a URL with a custom URI scheme as ``redirectUrl`` parameter. Previously, only the *HTTP*
  and *HTTPS* schemes were allowed. You can for example immediately redirect the customer back to your mobile app after
  completing a payment, by setting the ``redirectUrl`` to your own App Scheme, like ``my-app://payment-return``.

Friday, 12th
------------
- Added new category codes ``5533`` ``5641`` ``5651`` ``5732`` ``5735`` ``5815`` ``5944`` ``5977`` ``7999``
  to the :doc:`Create profile </reference/v1/profiles-api/create-profile>` and
  :doc:`Update profile </reference/v1/profiles-api/update-profile>` endpoints.

Tuesday, 2nd
------------
- We have removed the dedicated French bank account for bank transfer payments. Your customers can use our Dutch bank
  account to finish the payment.

July 2018
=========

Tuesday, 31st
-------------
- Test payments are no longer cleaned up after 2 weeks. Just like live payments they will never be removed.

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
  the :doc:`Create customer </reference/v1/customers-api/create-customer>`,
  :doc:`Create payment </reference/v1/payments-api/create-payment>`, and
  :doc:`List methods </reference/v1/methods-api/list-methods>` endpoints to localize translations and allow for ordering
  the payment methods in the preferred order for the country.

May 2018
========

Wednesday, 9th
--------------
- Launched multicurrency payments, along with the new v2 API.

Monday, 7th
-----------
- The iDEAL test issuer ideal_TESTNL99 has been removed from the test mode iDEAL issuers. Instead, the same issuers are
  now used for test and live payments.

April 2018
==========

Thursday, 19th
--------------
- Added the new iDEAL issuer Moneyou.

February 2018
=============

Tuesday, 27th
-------------
- Failed payments now have a failedDatetime property indicating exactly when the payment was failed.

Friday, 2nd
-----------
- SOFORT Banking payments have always had the issue that for a minor percentage of payments, the money would not
  actually come through even though the payment was paid successfully according to SOFORT.

  For these payments, Mollie would not settle the amount and inform you via an email.

  This process has now been changed to use the chargebacks that are also used for credit card and direct debit. If
  Mollie does not actually receive the money for a SOFORT payment, Mollie will trigger a chargeback and call your
  payment's webhook. The chargeback details are visible in the API and the Dashboard.

January 2018
============

Friday, 19th
------------
- The Organization resource now contains the organization's VAT number. You need this when you want to invoice your
  charged application fees to the organization.

Tuesday, 2nd
------------
- The Get open balance endpoint will now return the balance if it is € 0.00 or less instead of returning an HTTP 404.

- PayPal payments now expire after three hours, instead of after 15 minutes.

November 2017
=============

Wednesday, 8th
--------------
- Bank transfer payments can now be cancelled via the API or Mollie Dashboard as long as they are still open.

- Added Spanish as a locale for the Mollie Checkout. Use es_ES to get Spanish translations and localization in your
  checkout.

- VVV launched a new giftcard VVV Cadeaukaart which supersedes VVV Giftcard. We changed the name in the Checkout and
  API and have updated the branding.

October 2017
============

Thursday, 19th
--------------
Added more details to giftcard payments in case multiple gift cards are used or if the remaining amount was paid using
another payment method.

Tuesday, 17th
-------------
- Updated the hosted payment pages for payments created in test mode. All screens are now available in English, Dutch,
  French and German. No changes in the API are needed to use these new screens.

Tuesday, 10th
-------------
- Added Chargebacks API for a new Chargeback resource. Chargebacks are also available as subresource to Payments and
  Settlements. The Settlement resource now also contains a list of the ids of the chargebacks settled in that
  settlement.

Monday, 9th
-----------
- Belfius Pay Buttons now expire the next business day at 09.00 AM, instead of after an hour.

Wednesday, 4th
--------------
- We have updated all payment methods to allow the absolute minimums that the method allows. For most payment methods,
  you can now create payments with amounts as low as €0.01. In our help center you can find the exact list of minimum
  and maximum amounts.

Tuesday, 3rd
------------
- Only payment methods that are enabled in the Dashboard will appear in the API and the Mollie Checkout, if the test
  mode is used. Before, all payment method would be visible in test mode.

This brings the behavior of test mode in line with that of live mode.

September 2017
==============

Tuesday, 26th
-------------
- The refund status failed was missing from our API docs. This could happen, if the customer cancels his / her bank
  account between the payment and the refund.

Monday, 25th
------------
- We have extended the expiry time for Bancontact from 17 minutes to 60 minutes.

Tuesday, 19th
-------------
- We have added a dedicated French bank account for the bank transfer payment method. Your customers can use this bank
  account if you specify the French locale fr_FR.

Setting the correct locale is very important for having high conversion and error free bank transfer payments. At the
moment, we have dedicated bank accounts for bank transfers in Belgium, France, Germany and the Netherlands.

Wednesday, 13th
---------------
- You will no longer receive an error from our API if you have insufficient balance in your account to create a refund.
  Instead, we will queue the refund and perform it automatically once enough balance comes in. The payment will
  transition to refunded once the refund becomes pending, at which point we will call the payment's webhook.

- We have introducted a new queued status for refunds in our API so you can see if the refund was queued or is pending.

Tuesday, 12th
-------------
- We have added a new integration guide for QR codes. At the moment, we support the desktop-to-mobile flow with QR codes
  for the payment methods iDEAL and bank transfer. We have also fully integrated iDEAL QR into Mollie Checkout.

Thursday, 7th
-------------
- Added new endpoint ``/v1/settlements/*/refunds`` to retrieve all refunds included in a settlement, and added this
  URL to the Settlement resource as refunds in the links property.

August 2017
===========

Tuesday, 29th
-------------
- Added a new endpoint to cancel payments, and added the property canBeCancelled to (open) payments to indicate if a
  payment is eligible to be cancelled.

Tuesday, 22nd
-------------
- We have launched the giftcard payment method today. Check out the Gift card integration guide to get started.

Thursday, 3rd
-------------
- Added the image map to the issuers endpoint and includes in the Methods API. Just like methods, this map contains two
  keys normal and bigger which contain links to images that represent the issuer. Available for the iDEAL, KBC and gift
  card issuers.

July 2017
=========

Monday, 31st
------------
- Added the createdDatetime property to the settlements resource. This field shows the moment that the open funds were
  transferred to a new settlement.

- Added the settledDatetime property to the documentation. This field was previously undocumented, but already exposed
  through the API. This field shows the moment that the funds were settled (i.e. paid out by Mollie).

Wednesday, 26th
---------------
- The Payments API now returns a dueDate parameter for SEPA Direct Debit payments. The dueDate is the estimated date the
  payment is debited from the consumers bank account.

- Added the status property to the Settlements resource. The status indicates if the settlement is open, pending,
  paidout, or failed.

Thursday, 20th
--------------
- The ``refresh_token`` that is returned from the ``/oauth2/tokens`` endpoint when requesting an access token will not
  expire anymore. We previously generated a new ``access_token`` and ``refresh_token`` pair when a new access token was
  requested. We have changed this to only generate a new ``access_token`` - the ``refresh_token`` will stay the same
  indefinitely.

Monday, 17th
------------
- Application fees can now be created in test mode. This will not move any actual money, but you can now test
  integrating application fees in your platform.

Saturday, 1st
-------------
- Occasionally, we would not call the web hook for iDEAL payments if the payment status had already been retrieved via
  the API. This behavior has now been brought in line with the behavior of the other payment methods: we will now always
  call the web hook if there is a status update, whether or not the status has retrieved from the API.

May 2017
========

Wednesday, 3rd
--------------
- The Methods API resource can return issuers using ``?include=issuers``. At the moment this will include issuers for
  KBC and iDEAL.

April 2017
==========

Saturday, 1st
-------------
- The Payments API now supports emoji (such as 🍔) in the payment description.

March 2017
==========

Wednesday, 1st
--------------
- The Methods API and Payments API now return a resource parameter to indicate the type of object, consistent with the
  other APIs.

February 2017
=============

Wednesday, 1st
--------------
- You can now retrieve an organization's open balance using the settlements/open resource.

- The profiles method of the Reseller API will now return a <token /> field to help you integrate the Reseller API with
  our OAuth APIs.

- Added a details.qrCode include for the Payments resource. You can add this parameter to the resource endpoint
  ``?include=details.qrCode`` during creation, get or list operations and it will give you an object with a QR code
  embedded.

QR codes can be scanned by mobile applications to continue the payment on the mobile device.

At the moment, the QR code is only available for Bank transfer payments but we will add support for more
payment methods soon.

In the Netherlands, the bank transfer QR code can be scanned by the mobile banking apps from ING and bunq.

January 2017
============

Sunday, 1st
-----------
- The Reseller API erroneously only returned verified profiles for the profiles method. Now all profiles, including
  profiles you just created are returned. Use the <verified /> element to test if a profile is verified.

- Added the signatureDate property to the Mandate resource.

- Changed payment detail signatureDate of Direct debit payments to return the date without the time.

- Added the countryCode (ISO 3166-1 alpha-2) property to the Payments resource.

December 2016
=============

Thursday, 1st
-------------
- Changed the minimum amount for PayPal to € 0.01.

- The final state of Recurring Credit card payments will no longer be reported in the initial API call. Instead, we will
  report the final payment state via the webhookUrl, as per our documentation. This ensures any supplier outages will
  not delay or block our API response to your payment creation request.

November 2016
=============

Tuesday, 1st
-------------
- Added new endpoint ``/v1/settlements/*/payments`` to retrieve all payments included in a settlement. Also added this
  URL to the Settlement resource as payments in the links property.

- The name and email parameters have been made optional when creating a customer via the Customers API. It is now valid
  to create a customer via our API without providing any details about the customer.

- When creating a payment without the method parameter, optional parameters are applied once the consumer selects the
  payment method. For example, you can send the dueDate parameter when creating a payment without a method. If the
  consumer then selects bank transfer, the due date is applied. If a different payment method is choosen, the due date
  is ignored.

- Creating a first Recurring payment now returns the mandateId when available. When providing any of the following
  values for the method parameter, you will now directly receive a mandateId in the response: ``kbc``, ``creditcard``,
  ``mistercash``, ``sofort`` and ``belfius``. When using ``ideal`` as the payment method value, you will only receive a
  ``mandateId`` in the response when the issuer is also set.

- Added the settlementId property to the Payment resource. It is also possible to include the complete settlement
  resource by providing the include parameter, e.g. ``/v1/payments/tr_7UhSN1zuXS?include=settlement``.

- The Settlement resource include parameter ``?include=settlement`` is now available on all endpoints that return
  payments.

October 2016
============

Saturday, 1st
-------------
- Added the recurringType parameter to the list methods endpoint. Using this parameter you are able to retrieve payment
  methods supporting first payments and recurring payments.

- Added the issuer parameter for KBC/CBC payments. These work the same as for iDEAL, however they are not dynamically
  available through the API and the possible value are kbc and cbc. When the issuer parameter is set in the API request,
  the Mollie Checkout screen will be skipped and the customer will be sent to KBC or CBC directly.

- Added the startDate parameter to the Subscriptions API. You can now specify the start date when you create a
  subscription.

- We have added a new payment method, the KBC/CBC Payment Button. As a result the method parameter now supports the
  value kbc, which will create a KBC/CBC payment.

- When the method parameter is passed with the value kbc or when no method value is passed and KBC/CBC is chosen as the
  payment method, the description parameter value will be truncated to 13 characters. This will be increased in the
  future.

September 2016
==============

Thursday, 1st
-------------
- The locale parameters on our API endpoints accept non-standard values like en and nl (shorthands for en_US and nl_NL,
  respectively). We still support those non-standard values, but we are discouraging using those notations in our API
  documentation in favor of ISO-15897 locales.

- You can now use locales such as de_AT and we will try to provide translated and localized payments.

If you send any codepages or modifiers these will be stripped.

August 2016
===========

Monday, 1st
-----------
- Added the locale parameter to the list methods and get method endpoints.
