Changelog
~~~~~~~~~
Occasionally, we will add new resources, new fields, or new possible values to existing fields to the v2 Mollie API. All
changes are documented here.

June 2021
=========
Friday, 2nd
-----------
- We released the new :doc:`Payment Links API </reference/v2/payment-links-api/create-payment-link>`. This API makes it
  possible to generate payment links which can be used for, for example, invoices.

May 2021
========
Tuesday, 18th
-------------
- The :doc:`Create order payment endpoint </reference/v2/orders-api/create-order-payment>` on the Orders API now has a
  limit on how many payments can be created for an order. After reaching the limit of 25 payments a call to this endpoint
  will result in an error.

April 2021
==========
Friday, 16th
--------------
- Added ``sku`` optional parameter to :doc:`Orders API</reference/v2/orders-api/update-orderline>`.

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
- Added ``authentication_abandoned`` and ``authentication_unavailable_acs`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v2/payments-api/get-payment>` for credit card payments.

Tuesday, 16th
-------------
- Added ``bloemencadeaukaart`` and ``kluscadeau`` as gift card issuers.


February 2021
=============

Monday, 1st
-----------
- We discontinued the support for ING Home'Pay as a payment method. This means that the API now rejects all
  :doc:`Create Payment API</reference/v2/payments-api/create-payment>`-calls with the method ``inghomepay``. Make sure
  to remove this payment method from your checkout if needed. Please `contact us <https://www.mollie.com/contact>`_ for
  more info.

January 2021
=============

Wednesday, 13th
---------------
- ``amountChargedBack.value`` in the :doc:`Payments API</reference/v2/payments-api/get-payment>` has been changed from a negative to a positive value to make it consistent with the other equivalent fields in the API.

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

Thursday, 19th
--------------
- Added the optional ``givenName`` and ``familyName`` fields to the Paypal ``shippingAddress``
  :ref:`object <payment-method-specific-parameters>` in the
  :doc:`Payments API </reference/v2/payments-api/create-payment>`.

Friday, 13th
------------
- Added the ``amountChargedBack`` field to the payment response if the payment has some chargebacks.

Monday, 9th
-----------
- We have added the following range to the list of IP addresses used to call webhooks: 87.233.217.240/28.
  The full list of IP addresses can be found `here <https://help.mollie.com/hc/en-us/articles/213470829>`_.
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

Thursday, 22th
--------------
- We brought the method ``vouchers`` out of beta, you can enable this method in the dashboard. Please see the
  :doc:`voucher guide </orders/integrating-vouchers>` for more info and the requirements.

Monday, 12th
------------
- Some ``feeRegion`` values for credit card were missing in the documentation. We have added them now.

September 2020
==============

Monday, 14th
------------
- Added the ``failureReason`` to the Bancontact details object if the payment did not succeed.

Tuesday, 8th
------------
- The ``locale`` field of a payment object can now be updated via the
  :doc:`Update payment endpoint </reference/v2/payments-api/update-payment>`.

August 2020
===========

Friday, 28th
------------
- We have added a ``dashboard`` URL to the :doc:`Payment </reference/v2/payments-api/get-payment>`,
  :doc:`Order </reference/v2/orders-api/get-order>`, :doc:`Customer </reference/v2/customers-api/get-customer>`,
  :doc:`Organization </reference/v2/organizations-api/get-organization>`, and
  :doc:`Profiles </reference/v2/profiles-api/get-profile>` endpoints. This URL points directly to the correct resource
  in the Mollie Dashboard.

Thursday, 20th
--------------
- Added ``good4fun`` as gift card issuer.

Thursday, 13th
--------------
- You can now update the ``issuer`` field for gift card, iDEAL, and KBC/CBC payments via the
  :doc:`Update payment endpoint </reference/v2/payments-api/update-payment>`.

Monday, 10th
------------
- Added ``decadeaukaart`` as gift card issuer.

July 2020
=========

Thursday, 9th
-------------
- We have added a ``mobileAppCheckout`` URL to the :doc:`Payment API response </reference/v2/payments-api/get-payment>`
  if the payment method supports payments via a companion (mobile) app. At the moment, this only involves
  ``bancontact``.

June 2020
=========

Tuesday, 30th
-------------
- It is now possible to import your PayPal billing agreements by creating mandates via the
  :doc:`Create mandates API </reference/v2/mandates-api/create-mandate>`.

Friday, 26th
------------
- We limit the amount that can be spent with a gift card to 50 euros per payment due to new regulations.

Tuesday, 23rd
-------------
- `Pay later <https://www.mollie.com/en/payments/klarna-pay-later>`_ is now available for Belgian shoppers.

May 2020
========

Tuesday, 26th
-------------
- It is now possible to update the ``metadata`` of an order line via the
  :doc:`Update order line endpoint </reference/v2/orders-api/update-orderline>`.

Thursday, 14th
--------------
- Added ``voucher`` as new payment method. See our :doc:`guide </orders/integrating-vouchers>` for how you can integrate
  this into your checkout. Please note that this payment method is currently in a private beta state. If you are
  interested in participating, reach out to your account manager or our support department.

April 2020
==========

Friday, 3rd
-----------
- Added ``restaurantcadeau`` as gift card issuer.
- Added ``dinercadeau`` as gift card issuer.

March 2020
==========

Tuesday, 24th
-------------
- Mollie is moving to a monthly invoicing system. As some settlements span multiple months, these settlements will have
  their associated costs put on multiple invoices (one for each month). To accommodate the linking of specific costs to
  the specific invoice of that month, an ``invoiceId`` field is included for each monthly period (see the
  :doc:`Get settlement endpoint </reference/v2/settlements-api/get-settlement>`).

  For such settlements that span multiple months, the top-level ``invoiceId`` field now refers only to the oldest
  invoice. This could cause your bookkeeping integration to break as the invoice referenced by this ID will no longer
  cover all costs. The new ``invoiceId`` field of each period should be used instead.

- We made it easier to ship a whole order at once by making the ``lines`` parameter in the
  :doc:`Create shipment endpoint </reference/v2/shipments-api/create-shipment>` optional.

Tuesday, 17th
-------------
- It is now possible to update the ``webhookUrl`` and ``redirectUrl`` of an order via the
  :doc:`Update order endpoint </reference/v2/orders-api/update-order>`.

Thursday, 12th
--------------
- Duplicate Refunds (same amount as another Refund on the same Payment within the hour) are now blocked by the API.

- Added the possibility to get the details of the remainder payment in the ``details`` object of a stacked payment. See
  the :doc:`Get payment endpoint </reference/v2/payments-api/get-payment>` for more info.

Friday, 6th
-----------
- Added "Sustainable Fashion Gift Card" as giftcard issuer.

Thursday, 5th
-------------
- Added "FestivalCadeau Giftcard" as giftcard issuer.

Wednesday, 4th
--------------
- The expiry time of SOFORT Banking was changed to 2 hours.

February 2020
=============

Thursday, 20th
--------------
- Added ``shippingAddress`` to the PayPal payment details. See :doc:`/reference/v2/payments-api/get-payment`.

Friday, 7th
------------
- Added dashboard URL to the :doc:`/reference/v2/organizations-api/current-organization`.

Tuesday, 4th
------------
- Added the possibility to embed the :doc:`shipments </reference/v2/shipments-api/get-shipment>`
  of an order in the :doc:`Get order endpoint </reference/v2/orders-api/get-order>`.

January 2020
============

Monday, 27th
------------
- Added ``restrictPaymentMethodsToCountry`` to the :doc:`/reference/v2/payments-api/update-payment`.

- Added support for IDNs (internationalized domain names) for webhook and redirect URLs in the
  :doc:`Payments API </reference/v2/payments-api/create-payment>`.

Friday, 17th
------------
- Added the possibility to also update the ``interval`` of a subscription via the
  :doc:`Update subscription endpoint </reference/v2/subscriptions-api/update-subscription>`

Thursday, 9th
-------------
- The ``self.href``, ``next.href`` and ``previous.href`` links now correctly contain all query parameters used when
  performing the request. For example, the ``year`` query parameter will now be included in the ``next`` and
  ``previous`` links for the response of the :doc:`/reference/v2/invoices-api/list-invoices` if it was in the initial
  request.
- Values for ``_links.nnnn.href`` elements now correctly include the ``?testmode=true`` query parameter if this is
  necessary to be able to follow the link. This affects OAuth and Application Token authenticated requests only.

December 2019
=============

Tuesday, 3rd
------------
- Added the possibility to submit ``extraMerchantData`` for Klarna in the
  :doc:`Orders API </reference/v2/orders-api/create-order>` for merchants who have agreed this with Klarna.
- Added ``restrictPaymentMethodsToCountry`` in the :doc:`Payments API </reference/v2/payments-api/create-payment>`.
- Added ``shopperCountryMustMatchBillingCountry`` in the :doc:`Orders API </reference/v2/orders-api/create-order>`.
- Enabled :doc:`Application fees </connect/application-fees>` for the
  :doc:`Orders API </reference/v2/orders-api/create-order>`.

Monday, 2nd
-----------
- The webhooks will now be called from different IP addresses. This should not cause any problems if you do not check
  our IP address. We advise you not to check our IP address. A full list of all the IP addresses that we use to send
  webhooks can be found `in our help center <https://help.mollie.com/hc/en-us/articles/213470829>`_.

November 2019
=============

Thursday, 28th
--------------
- We made the ``cardFingerprint`` field for Bancontact deprecated. See
  :doc:`Get payment </reference/v2/payments-api/get-payment>` for more information.

Wednesday, 27th
---------------
- Added ``authentication_failed`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v2/payments-api/get-payment>` for Credit Card payments.

Tuesday, 19th
-------------
- Added the ``sellerProtection`` field to the PayPal payment details.
- The :doc:`Apple Pay direct integration </guides/applepay-direct-integration>` can now also be used with
  :doc:`/reference/v2/orders-api/create-order`.

Friday, 15th
--------------
- Added the ``digitalGoods`` field as PayPal parameter. See :doc:`/reference/v2/payments-api/create-payment` for more
  information.

Monday, 4th
-----------
- Added support for PayPal Reference Transactions (recurring) payments. Make sure that the
  `correct permissions <https://help.mollie.com/hc/en-us/articles/213856625>`_ are set and your merchant account has
  been approved by PayPal before using this.
- Added the ``paypalFee`` field to the PayPal payment details which shows the amount of fee PayPal is charging for that
  transaction.

October 2019
============

Tuesday, 29th
-------------
- Added the ``feeRegion`` to the pricing object for credit card in the
  :doc:`Methods API </reference/v2/methods-api/list-methods>`.

Monday, 7th
-----------
- Added the ``paypalPayerId`` field to the PayPal payment details.

September 2019
==============

Tuesday, 24th
-------------
- Introduced a new endpoint for getting all subscriptions created for a website profile. See
  :doc:`List all subscriptions </reference/v2/subscriptions-api/list-all-subscriptions>` for more info.

- Added new currencies for credit card: ``AED``, ``NZD``, ``PHP``, ``RUB``, ``SGD`` and ``ZAR``.

Friday, 20th
------------
- Changed the retry schedule of our webhook system. We will try to call your webhook for 26 hours in total now. See the
  :doc:`webhooks guide </guides/webhooks>` for the new schedule.

Tuesday, 17th
-------------
- Added "OhMyGood" as giftcard issuer.

Thursday, 12th
--------------
- Added "Reiscadeau" as giftcard issuer.

Monday, 9th
-----------
- Added the ``payments`` key to the ``_links`` object in the
  :doc:`Subscription </reference/v2/subscriptions-api/get-subscription>` object.

Wednesday, 4th
--------------
- Added property ``vatRegulation`` to :doc:`/reference/v2/organizations-api/get-organization` and
  :doc:`Submit onboarding data </reference/v2/onboarding-api/submit-onboarding-data>`.

August 2019
===========

Thursday, 29th
--------------
- Removed the charge date from the description of payments created by a subscription.

Monday, 26th
------------
- Introduced a new endpoint to update some details of created payments. See
  :doc:`Update payment </reference/v2/payments-api/update-payment>` for more info.

Wednesday, 21st
---------------
- Lowered the minimum amount for credit card payments with `sequenceType=first` to zero. See
  :doc:`Recurring payments </payments/recurring>` for more info.

July 2019
=========

Wednesday, 17th
---------------
- Orders can now be created with a custom expiry date. Use the new ``expiresAt`` parameter to set the custom date. See
  :doc:`Create order </reference/v2/orders-api/create-order>` for more info.

Thursday, 4th
-------------
- Added MyBank (``mybank``) as new payment method. Currently, it's not possible to activate MyBank via the Dashboard.
  Please contact your account manager to enable this new method.
- Polish złoty (``PLN``) is now supported as a currency for the Przelewy24 payment method.

Tuesday, 2nd
------------
- Settlements can now be retrieved using either their ID or their bank reference. See
  :doc:`/reference/v2/settlements-api/get-settlement` for more info.

June 2019
=========

Thursday, 20th
--------------
- Added the ``settlementId`` field to the refund response. See :doc:`/reference/v2/refunds-api/get-refund` for more
  info.

Thursday, 13th
---------------
- Changed the conditions for when an order is cancelable. Canceling an order is not longer possible when there are any
  open payments for the order, unless for four specific methods. See :doc:`/reference/v2/orders-api/cancel-order` for
  more info.

Wednesday, 12th
---------------
- :doc:`/guides/applepay-direct-integration` is now available.

May 2019
========

Tuesday, 21st
-------------
- Added ``american-express``, ``carte-bancaire`` and ``maestro`` as possible values for the
  ``feeRegion`` in the credit card payment details. See the
  :doc:`Get payment endpoint </reference/v2/payments-api/get-payment>` for details.

Monday, 20th
------------
- :doc:`Apple Pay </wallets/applepay>` is now supported in Mollie Checkout and can be integrated in your webshop's
  method selection.

Wednesday, 8th
--------------
- Refunds can now contain ``metadata``. We will save the data alongside the refund. Whenever you fetch the refund with
  our API, we will also include the metadata. See the :doc:`/reference/v2/refunds-api/create-refund` and
  :doc:`/reference/v2/orders-api/create-order-refund` documentation for more info.

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
  :doc:`Revoke Token endpoint </reference/oauth2/revoke-token>` for details.

March 2019
==========

Wednesday, 27th
---------------
- Added the ``profile`` key to the ``_links`` object in the
  :doc:`Subscription </reference/v2/subscriptions-api/get-subscription>` object.
- Subscriptions can now be created with :doc:`application fees </connect/application-fees>`. The application fees will
  be applied on each created Payment for the Subscription.
- Added the ``minimumAmount`` and ``maximumAmount`` properties to the
  :doc:`Methods API </reference/v2/methods-api/list-methods>` endpoints. It represents the minimum and maximum amount
  allowed for creating a payment with the specific methods.
- Added the ``amount`` query parameter to the :doc:`/reference/v2/methods-api/list-all-methods` endpoint.
- Added the ``currency`` query parameter to the :doc:`/reference/v2/methods-api/get-method` endpoint.
- The ``.dev`` TLD is now supported for webhooks.

Thursday, 21th
--------------
- Added the "Nationale Golfbon" and "Sport & Fit Cadeau" as giftcard issuers.

Tuesday, 12th
-------------
- Added the new payment method `Przelewy24 <https://www.mollie.com/en/payments/przelewy24>`_ (``przelewy24``).

February 2019
=============

Thursday, 28th
--------------
- Added profile website URL validation to the :doc:`Create profile </reference/v2/profiles-api/create-profile>`
  endpoint.
- Added profile website URL validation to the
  :doc:`Submit onboarding data </reference/v2/onboarding-api/submit-onboarding-data>` endpoint.

Monday, 25th
------------
- Updated the list of available profile :doc:`merchant category codes </reference/v2/profiles-api/create-profile>`

Thursday, 21st
--------------
- The ``changePaymentState`` link in the :doc:`Payments API </reference/v2/payments-api/get-payment>` is now available
  for paid payments in test mode. This allows you to create refunds and chargebacks for test mode payments from the
  checkout screen.

Wednesday, 6th
--------------
- We will now also call the webhook when a refund got canceled

January 2019
============

Tuesday, 29th
-------------
- Added a new API for submitting onboarding data of a merchant. This data will be prefilled in the onboarding forms of
  the merchant. You will need the new OAuth scope ``onboarding.write`` to submit data. For details, see the
  :doc:`Submit onboarding data endpoint </reference/v2/onboarding-api/submit-onboarding-data>`.

Tuesday, 22th
-------------
- It is now possible to also update the ``orderNumber`` of an order, see
  :doc:`Update order </reference/v2/orders-api/update-order>`.

Thursday, 17th
--------------
- It is now possible to also update the ``quantity``, ``unitPrice``, ``discountAmount``, ``totalAmount``, ``vatAmount``
  and ``vatRate`` of the order line, see :doc:`Update order line </reference/v2/orders-api/update-orderline>`.

Monday, 14th
-------------
- We have added the ``metadata`` field to the order line entity. You can now store up to 1Kb of information with your
  order line, see :doc:`Create order </reference/v2/orders-api/create-order>`.

- Added a new endpoint to retrieve all payment methods Mollie is offering to an organization.
  See :doc:`List all payment methods  </reference/v2/methods-api/list-all-methods>` for details.

Thursday, 3th
-------------
- Added a new API for getting the onboarding status of a merchant. You will need the new OAuth scope ``onboarding.read``
  to access the data. For details, see the :doc:`Onboarding API </reference/v2/onboarding-api/get-onboarding-status>`.

December 2018
=============

Thursday, 20th
--------------
- Added the ``locale`` field to organization details. This represents the locale that the merchant has set in their
  Mollie Dashboard.

Tuesday, 18th
-------------
- Added a new endpoint to update order lines. For details, see :doc:`/reference/v2/orders-api/update-orderline`.

Friday, 14th
------------
- The expiry period for `Belfius Pay Button <https://www.mollie.com/en/payments/belfius>`_ has been decreased from 1 day
  to 1 hour.

Thursday, 13th
--------------
- It is now possible to create (another) payment for an order via the
  :doc:`Create order payment endpoint </reference/v2/orders-api/create-order-payment>` on the Orders API.
- We are now offering webhooks for order payments. Please note that when the status of the payment becomes ``paid`` we
  are calling your order webhook instead. See the :doc:`Orders API </reference/v2/orders-api/create-order>` for more
  info.

Monday, 10th
------------
- Enabling and disabling payment methods via the API is now possible via the
  :doc:`Profiles API </reference/v2/profiles-api/enable-method>`.

Friday, 7th
-----------
- Refunds for Pay Later and Slice it can now be created via the :doc:`Payments Refunds API
  </reference/v2/refunds-api/create-refund>`. This allows refunding of arbitrary amounts.

Tuesday, 4th
------------
- It is now possible to get the pricing of the payment methods that are active on the payment profile. Add the
  ``include=pricing`` parameter to the :doc:`Methods API </reference/v2/methods-api/list-methods>` to get the pricing
  object in your response.

November 2018
=============

Wednesday, 15th
---------------
- It is now possible to pass an ``amount`` when partially shipping, canceling or refunding order lines. This is
  necessary for order lines that have a non-zero ``discountAmount``.

  Before, it was not possible to partially ship, cancel or refund such order lines.

Monday, 12th
------------
- Subscriptions in test mode will now be canceled automatically after 10 charges.

Thursday, 8th
-------------
- It's now possible to refund SEPA Direct Debit payments

Wednesday, 7th
--------------
- Moved the ``organizationName`` field in the ``shippingAddress`` and ``billingAddress`` objects.

Monday, 5th
-----------
- Added referral-functionality for Mollie Partners to the Connect API. See the :doc:`documentation </connect/overview>`
  for more info.

Thursday, 1st
-------------
- The maximum amount for SOFORT Banking payments has been increased from €5,000 to €50,000.

October 2018
============

Monday, 29th
------------
- Added ``organizationName`` field for orders, so from now a customer can specify the organization name if they buy
  something for business purposes.

Thursday, 25th
--------------
- We now accept the use of an underscore ``_`` in Redirect- and Webhook-URLs.
- A :doc:`guide </guides/testing>` has been added explaining how to test your integration of the Mollie API.
- Added the ``changePaymentState`` link to the :doc:`Payments API </reference/v2/payments-api/get-payment>`.
  It allows you to set the final payment state for test mode recurring payments.

Wednesday, 24th
---------------
- Added the ``timesRemaining`` field to the :doc:`Subscriptions API </reference/v2/subscriptions-api/get-subscription>`
  to see how many charges are left for completing the subscription.
- Consumer IBANs of Bancontact payments will now always be shared via the API.
- Added :doc:`Organization access tokens </guides/authentication>` as an authentication method.

Friday, 19th
--------------
- PayPal refund period has been increased from 60 to 180 days.

Wednesday, 17th
---------------
- The ``method`` field on the :doc:`Create Payment </reference/v2/payments-api/create-payment>` and
  :doc:`Create Order </reference/v2/orders-api/create-order>` now also accepts an array of methods. By doing so you can
  select which methods to show on the payment method selection screen. For example, you can use this functionality to
  only show payment methods from a specific country to your customer.

Monday, 15th
------------
- It is now possible to specify a URL with a custom URI scheme as ``redirectUrl`` parameter. Previously, only the *HTTP*
  and *HTTPS* schemes were allowed. You can for example immediately redirect the customer back to your mobile app after
  completing a payment, by setting the ``redirectUrl`` to your own App Scheme, like ``my-app://payment-return``.

Friday, 12th
------------
- Added new category codes ``5533`` ``5641`` ``5651`` ``5732`` ``5735`` ``5815`` ``5944`` ``5977`` ``7999``
  to the :doc:`Create Profile </reference/v2/profiles-api/create-profile>` and
  :doc:`Update Profile </reference/v2/profiles-api/update-profile>` endpoints.

Friday, 5th
------------
- We have added the ``mandateId`` field in subscriptions. This makes it possible to sure a specific mandate for a
  subscription. For details, see the :doc:`Subscriptions API </reference/v2/subscriptions-api/create-subscription>`.

Tuesday, 2nd
------------
- We have removed the dedicated French bank account for bank transfer payments. Your customers can use our Dutch
  bank account to finish the payment.

- Added the new payment status ``authorized`` for payments that still require a capture to receive the money. Currently,
  this status is only used for payment methods `Klarna Pay later <https://www.mollie.com/payments/klarna-pay-later>`_
  and `Klarna Slice it <https://www.mollie.com/payments/klarna-slice-it>`_. Because payments with these payment methods
  can only be created with the :doc:`Orders API </reference/v2/orders-api/create-order>`, there is no change required in
  existing implementations of the Payments API.

  The new status is especially useful to give a meaningful representation when listing all payments.

September 2018
==============

Tuesday, 25th
-------------
- Added the ``nextPaymentDate`` field in subscriptions to see when the next payment should be initiated. For details,
  see the :doc:`Subscriptions API </reference/v2/subscriptions-api/get-subscription>`.

Thursday, 20th
--------------
- Added a new endpoint get all payments for a specific customer subscription. For details, see:
  :doc:`List subscription payments </reference/v2/subscriptions-api/list-subscriptions-payments>`

- Added ``amountCaptured`` and ``authorizedAt`` to the payment object.

Tuesday, 18th
-------------
- Added the ``metadata`` field to the :doc:`Subscriptions API </reference/v2/subscriptions-api/get-subscription>`. This
  makes it possible to, for example, link a plan to a subscription.

Monday, 17th
------------
- Added a new endpoint for partners to get all connected organizations. See the Reseller API Docs for more information.

Wednesday, 12th
---------------
- Added the :doc:`Orders API </reference/v2/orders-api/create-order>` and the
  :doc:`Shipments API </reference/v2/shipments-api/create-shipment>`. See the
  :doc:`Orders API overview </orders/overview>` for more details on how to use these APIs.

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
