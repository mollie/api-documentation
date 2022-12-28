Changelog
~~~~~~~~~
.. api-name:: Mollie API
   :version: 2

Occasionally, we will add new resources, new fields, or new possible values to existing fields to the v2 Mollie API. All
changes are documented here.

December 2022
=============
- Added support for a dedicated ``cancelUrl`` in the Payments API and Orders API. The consumer will be sent to this URL
  if they cancel a payment or order. If the ``cancelUrl`` is not provided, the consumer will be sent to the
  ``redirectUrl`` as was already the case.

- Added support for ``Idempotency-Key`` headers in the Mollie API, making API requests repeatable and idempotent within
  a specific timeframe. See :doc:`API idempotency </overview/api-idempotency>`.

October 2022
============
- Added new ``Balances API`` docs.

- Added the ``horseandgifts`` and ``shoesandsneakerscadeau`` as gift card issuer.

June 2022
=========
- Added ``in3`` as new payment method, which is only supported by the Orders API. If you are interested in accepting in3
  payments, you can enable the payment method via the Mollie Dashboard.

March 2022
==========
- Added the ``en_GB`` (British English) locale to localize translations and allow for ordering the payment methods in
  the preferred order for the country.

February 2022
=============
- Added the ``doenkadotickets`` as gift card issuers.

January 2022
=============
- Added the support for more than one route to the :doc:`Create payment </reference/v2/payments-api/create-payment>`
  endpoint.

- Added the possibility to :doc:`Refund a split payment </connect/refunds-and-chargebacks>` with the ``routingReversals``
  optional parameter to the :doc:`Create refund </reference/v2/refunds-api/create-payment-refund>` endpoint.

November 2021
=============
- Added the ``wijncadeaukaart`` and ``jewelcard`` as gift card issuers.

- Added optional ``landing_page`` parameter to the :doc:`Authorize </reference/oauth2/authorize>` endpoint.

October 2021
============
- Added a new Partners section containing the
  :doc:`Get client </reference/v2/clients-api/get-client>` and the
  :doc:`List client </reference/v2/clients-api/list-clients>` endpoints.

- Added a :doc:`Get partner status endpoint </reference/v2/organizations-api/get-partner>` to the Organizations API.

- Added ``huistuincadeaukaart`` as gift card issuer.

September 2021
==============
- Added ``authentication_required`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v1/payments-api/get-payment>` for credit card payments.

August 2021
===========
- Added gift card issuers ``bloemplantgiftcard`` and ``sodexosportculturepass``.

July 2021
=========
- Added the possibility to create :doc:`Split payments </connect/splitting-payments>`, with which you can distribute
  and split payments between your platform and your connected merchant accounts.

- Added ``routing`` optional parameter to the
  :doc:`Create payment endpoint </reference/v2/payments-api/create-payment>`.

- Added optional ``routing`` response parameter to the :doc:`Create payment </reference/v2/payments-api/create-payment>`
  and :doc:`Get payment </reference/v2/payments-api/get-payment>` endpoint responses.

- Added the possibility to :doc:`Refund a split payment </connect/refunds-and-chargebacks>`. Added ``reverseRouting``
  optional parameter to the :doc:`Create refund endpoint </reference/v2/refunds-api/create-payment-refund>` and
  ``routingReversals`` optional object to the :doc:`Get refund endpoint </reference/v2/refunds-api/get-payment-refund>`
  response.

June 2021
=========
- We released the new :doc:`Payment links API </reference/v2/payment-links-api/overview>`. This API makes it possible to
  generate payment links. These can for example be used to attach to invoices that have yet to be completed.

May 2021
========
- The :doc:`Create order payment endpoint </reference/v2/orders-api/create-order-payment>` on the Orders API now has a
  limit on how many payments can be created for an order. After reaching the limit of 25 payments a call to this
  endpoint will result in an error.

April 2021
==========
- Added ``sku`` optional parameter to the :doc:`Update order line endpoint </reference/v2/orders-api/update-order-line>`
  of the Orders API.

March 2021
==========
- Added gift card issuers ``delokalecadeaukaart``, ``boekenbon``, ``bloemencadeaukaart``, and ``kluscadeau``.

- Added ``authentication_abandoned`` and ``authentication_unavailable_acs`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v2/payments-api/get-payment>` for credit card payments.

February 2021
=============
- We discontinued the support for ING Home'Pay as a payment method. This means that the API now rejects all
  :doc:`Create payment endpoint </reference/v2/payments-api/create-payment>` calls with the method ``inghomepay``. Be
  sure to remove this payment method from your checkout if needed. Please `contact us <https://www.mollie.com/contact>`_
  for more info.

January 2021
============
- ``amountChargedBack.value`` in the :doc:`Payments API</reference/v2/payments-api/get-payment>` has been changed from a
  negative to a positive value to make it consistent with the other equivalent fields in the API.

December 2020
=============
- We have added Revolut as new iDEAL issuer. It will appear automatically in your checkout if you use the Mollie Hosted
  Payment Page or the Methods API to get the issuers. If you use a custom integration you should add the issuer ID
  ``ideal_REVOLT21`` to your list of available iDEAL banks.

November 2020
=============
- Added a new merchant category code (MCC) for profiles: ``5262 Marketplaces, crowdfunding, donation platforms``.

- Added the optional ``givenName`` and ``familyName`` fields to the Paypal ``shippingAddress``
  :ref:`object <payment-method-specific-parameters>` in the
  :doc:`Payments API </reference/v2/payments-api/create-payment>`.

- Added the ``amountChargedBack`` field to the payment response if the payment has some chargebacks.

- We have added the following range to the list of IP addresses used to call webhooks: 87.233.217.240/28.
  The full list of IP addresses can be found `here <https://help.mollie.com/hc/en-us/articles/213470829>`_.

- We have added 7 new Merchant Category Codes for profiles:
  ``5712 Home furnishing``
  ``5945 Hobby, Toy, and Game Shops``
  ``6051 Crypto currency``
  ``7922 Events, conferences, concerts, tickets``
  ``7997 Gyms, membership fee based sports``
  ``8111 Lawyers and legal advice``
  ``9399 Government services``

October 2020
============
- We brought the method ``vouchers`` out of beta, you can enable this method in the dashboard. Please see the
  :doc:`voucher guide </orders/integrating-vouchers>` for more info and the requirements.

- Some ``feeRegion`` values for credit card were missing in the documentation. We have added them now.

September 2020
==============
- Added the ``failureReason`` to the Bancontact details object if the payment did not succeed.

- The ``locale`` field of a payment object can now be updated via the
  :doc:`Update payment endpoint </reference/v2/payments-api/update-payment>`.

August 2020
===========
- We have added a ``dashboard`` URL to the :doc:`Get payment </reference/v2/payments-api/get-payment>`,
  :doc:`Get order </reference/v2/orders-api/get-order>`, :doc:`Get customer </reference/v2/customers-api/get-customer>`,
  :doc:`Get organization </reference/v2/organizations-api/get-organization>`, and
  :doc:`Get profiles </reference/v2/profiles-api/get-profile>` endpoints. This URL points directly to the correct
  resource in the Mollie Dashboard.

- Added gift card issuers ``good4fun`` and ``decadeaukaart``.

- You can now update the ``issuer`` field for gift card, iDEAL, and KBC/CBC payments via the
  :doc:`Update payment endpoint </reference/v2/payments-api/update-payment>`.

July 2020
=========
- We have added a ``mobileAppCheckout`` URL to the :doc:`Payments API response </reference/v2/payments-api/get-payment>`
  if the payment method supports payments via a companion (mobile) app. At the moment, this only involves
  ``bancontact``.

June 2020
=========
- It is now possible to import your PayPal billing agreements by creating mandates via the
  :doc:`Create mandates endpoint </reference/v2/mandates-api/create-mandate>`.

- We limit the amount that can be spent with a gift card to 50 euro per payment due to new regulations.

- `Pay later <https://www.mollie.com/payments/klarna-pay-later>`_ is now available for Belgian shoppers.

May 2020
========
- It is now possible to update the ``metadata`` of an order line via the
  :doc:`Update order line endpoint </reference/v2/orders-api/update-order-line>`.

- Added ``voucher`` as new payment method. See our :doc:`guide </orders/integrating-vouchers>` for how you can integrate
  this into your checkout. Please note that this payment method is currently in a private beta state. If you are
  interested in participating, reach out to your account manager or our support department.

April 2020
==========
- Added gift card issuers ``restaurantcadeau`` and ``dinercadeau``.

March 2020
==========
- Mollie is moving to a monthly invoicing system. As some settlements span multiple months, these settlements will have
  their associated costs put on multiple invoices (one for each month). To accommodate the linking of specific costs to
  the specific invoice of that month, an ``invoiceId`` field is included for each monthly period (see the
  :doc:`Get settlement endpoint </reference/v2/settlements-api/get-settlement>`).

  For such settlements that span multiple months, the top-level ``invoiceId`` field now refers only to the oldest
  invoice. This could cause your bookkeeping integration to break as the invoice referenced by this ID will no longer
  cover all costs. The new ``invoiceId`` field of each period should be used instead.

- We made it easier to ship a whole order at once by making the ``lines`` parameter in the
  :doc:`Create shipment endpoint </reference/v2/shipments-api/create-shipment>` optional.

- It is now possible to update the ``webhookUrl`` and ``redirectUrl`` of an order via the
  :doc:`Update order endpoint </reference/v2/orders-api/update-order>`.

- Duplicate refunds (same amount as another Refund on the same Payment within the hour) are now blocked by the API.

- Added the possibility to get the details of the remainder payment in the ``details`` object of a stacked payment. See
  the :doc:`Get payment endpoint </reference/v2/payments-api/get-payment>` for more info.

- Added "Sustainable Fashion Gift Card" as giftcard issuer.

- Added "FestivalCadeau Giftcard" as giftcard issuer.

- The expiry time of SOFORT Banking was changed to 2 hours.

February 2020
=============
- Added ``shippingAddress`` to the PayPal payment details. See :doc:`/reference/v2/payments-api/get-payment`.

- Added dashboard URL to the :doc:`/reference/v2/organizations-api/current-organization`.

- Added the possibility to embed the :doc:`shipments </reference/v2/shipments-api/overview>`
  of an order in the :doc:`Get order endpoint </reference/v2/orders-api/get-order>`.

January 2020
============
- Added ``restrictPaymentMethodsToCountry`` to the :doc:`/reference/v2/payments-api/update-payment`.

- Added support for IDNs (internationalized domain names) for webhook and redirect URLs in the
  :doc:`Payments API </reference/v2/payments-api/create-payment>`.

- Added the possibility to also update the ``interval`` of a subscription via the
  :doc:`Update subscription endpoint </reference/v2/subscriptions-api/update-subscription>`

- The ``self.href``, ``next.href`` and ``previous.href`` links now correctly contain all query parameters used when
  performing the request. For example, the ``year`` query parameter will now be included in the ``next`` and
  ``previous`` links for the response of the :doc:`List invoices endpoint </reference/v2/invoices-api/list-invoices>` if
  it was in the initial request.
- Values for ``_links.nnnn.href`` elements now correctly include the ``?testmode=true`` query parameter if this is
  necessary to be able to follow the link. This affects OAuth and Application Token authenticated requests only.

December 2019
=============
- Added the possibility to submit ``extraMerchantData`` for Klarna in the
  :doc:`Orders API </reference/v2/orders-api/overview>` for merchants who have agreed this with Klarna.

- Added ``restrictPaymentMethodsToCountry`` in the :doc:`Payments API </reference/v2/payments-api/create-payment>`.

- Added ``shopperCountryMustMatchBillingCountry`` in the :doc:`Orders API </reference/v2/orders-api/overview>`.

- Enabled :doc:`Application fees </connect/application-fees>` for the
  :doc:`Orders API </reference/v2/orders-api/overview>`.

- The webhooks will now be called from different IP addresses. This should not cause any problems if you do not check
  our IP address. We advise you not to check our IP address. A full list of all the IP addresses that we use to send
  webhooks can be found `in our help center <https://help.mollie.com/hc/en-us/articles/213470829>`_.

November 2019
=============
- We made the ``cardFingerprint`` field for Bancontact deprecated. See
  :doc:`Get payment </reference/v2/payments-api/get-payment>` for more information.

- Added ``authentication_failed`` as possible ``failureReason`` in the
  :doc:`Payments API</reference/v2/payments-api/get-payment>` for Credit Card payments.

- Added the ``sellerProtection`` field to the PayPal payment details.

- The :doc:`Apple Pay direct integration </wallets/applepay-direct-integration>` can now also be used with
  :doc:`/reference/v2/orders-api/create-order`.

- Added the ``digitalGoods`` field as PayPal parameter. See :doc:`/reference/v2/payments-api/create-payment` for more
  information.

- Added support for PayPal Reference Transactions (recurring) payments. Make sure that the
  `correct permissions <https://help.mollie.com/hc/en-us/articles/213856625>`_ are set and your merchant account has
  been approved by PayPal before using this.

- Added the ``paypalFee`` field to the PayPal payment details which shows the amount of fee PayPal is charging for that
  transaction.

October 2019
============
- Added the ``feeRegion`` to the pricing object for credit card in the
  :doc:`Methods API </reference/v2/methods-api/overview>`.

- Added the ``paypalPayerId`` field to the PayPal payment details.

September 2019
==============
- Introduced a new endpoint for getting all subscriptions created for a website profile. See
  :doc:`List all subscriptions </reference/v2/subscriptions-api/list-all-subscriptions>` for more info.

- Added new currencies for credit card: ``AED``, ``NZD``, ``PHP``, ``RUB``, ``SGD`` and ``ZAR``.

- Changed the retry schedule of our webhook system. We will try to call your webhook for 26 hours in total now. See the
  :doc:`webhooks guide </overview/webhooks>` for the new schedule.

- Added gift card issuers ``ohmygood`` and ``reiscadeau``.

- Added the ``payments`` key to the ``_links`` object in the
  :doc:`Subscription </reference/v2/subscriptions-api/get-subscription>` object.

- Added property ``vatRegulation`` to :doc:`/reference/v2/organizations-api/get-organization` and
  :doc:`Submit onboarding data </reference/v2/onboarding-api/submit-onboarding-data>`.

August 2019
===========
- Removed the charge date from the description of payments created by a subscription.

- Introduced a new endpoint to update some details of created payments. See
  :doc:`Update payment </reference/v2/payments-api/update-payment>` for more info.

- Lowered the minimum amount for credit card payments with `sequenceType=first` to zero. See
  :doc:`Recurring payments </payments/recurring>` for more info.

July 2019
=========
- Orders can now be created with a custom expiry date. Use the new ``expiresAt`` parameter to set the custom date. See
  :doc:`Create order </reference/v2/orders-api/create-order>` for more info.

- Added MyBank (``mybank``) as new payment method. Currently, it's not possible to activate MyBank via the Dashboard.
  Please contact your account manager to enable this new method.
- Polish złoty (``PLN``) is now supported as a currency for the Przelewy24 payment method.

- Settlements can now be retrieved using either their ID or their bank reference. See
  :doc:`/reference/v2/settlements-api/get-settlement` for more info.

June 2019
=========
- Added the ``settlementId`` field to the refund response. See :doc:`/reference/v2/refunds-api/get-payment-refund` for
  more info.

- Changed the conditions for when an order is cancelable. Canceling an order is not longer possible when there are any
  open payments for the order, unless for four specific methods. See :doc:`/reference/v2/orders-api/cancel-order` for
  more info.

- :doc:`/wallets/applepay-direct-integration` is now available.

May 2019
========
- Added ``american-express``, ``carte-bancaire`` and ``maestro`` as possible values for the
  ``feeRegion`` in the credit card payment details. See the
  :doc:`Get payment endpoint </reference/v2/payments-api/get-payment>` for details.

- :doc:`Apple Pay </wallets/applepay>` is now supported in Mollie Checkout and can be integrated in your webshop's
  method selection.

- Refunds can now contain ``metadata``. We will save the data alongside the refund. Whenever you fetch the refund with
  our API, we will also include the metadata. See the :doc:`/reference/v2/refunds-api/create-payment-refund` and
  :doc:`/reference/v2/refunds-api/create-order-refund` documentation for more info.

- Added gift card issuers ``vvvdinercheque`` and ``vvvlekkerweg``.

- Removed ``bitcoin`` as payment method.

April 2019
==========
- Added a new endpoint for Mollie Connect to revoke access and refresh tokens. See the
  :doc:`Revoke Token endpoint </reference/oauth2/revoke-token>` for details.

March 2019
==========
- Added the ``profile`` key to the ``_links`` object in the
  :doc:`Subscription </reference/v2/subscriptions-api/get-subscription>` object.

- Subscriptions can now be created with :doc:`application fees </connect/application-fees>`. The application fees will
  be applied on each created Payment for the Subscription.

- Added the ``minimumAmount`` and ``maximumAmount`` properties to the
  :doc:`Methods API </reference/v2/methods-api/overview>` endpoints. It represents the minimum and maximum amount
  allowed for creating a payment with the specific methods.

- Added the ``amount`` query parameter to the :doc:`/reference/v2/methods-api/list-all-methods` endpoint.

- Added the ``currency`` query parameter to the :doc:`/reference/v2/methods-api/get-method` endpoint.

- The ``.dev`` TLD is now supported for webhooks.

- Added gift card issuers ``nationalegolfbon`` and ``sportenfitcadeau``.

- Added the new payment method `Przelewy24 <https://www.mollie.com/payments/przelewy24>`_ (``przelewy24``).

February 2019
=============
- Added profile website URL validation to the :doc:`Create profile </reference/v2/profiles-api/create-profile>`
  endpoint.

- Added profile website URL validation to the
  :doc:`Submit onboarding data endpoint </reference/v2/onboarding-api/submit-onboarding-data>`.

- Updated the list of available profile :doc:`merchant category codes </reference/v2/profiles-api/create-profile>`

- The ``changePaymentState`` link in the :doc:`Payments API </reference/v2/payments-api/get-payment>` is now available
  for paid payments in test mode. This allows you to create refunds and chargebacks for test mode payments from the
  checkout screen.

- We will now also call the webhook when a refund got canceled

January 2019
============
- Added a new API for submitting onboarding data of a merchant. This data will be prefilled in the onboarding forms of
  the merchant. You will need the new OAuth scope ``onboarding.write`` to submit data. For details, see the
  :doc:`Submit onboarding data endpoint </reference/v2/onboarding-api/submit-onboarding-data>`.

- It is now possible to also update the ``orderNumber`` of an order, see
  :doc:`Update order </reference/v2/orders-api/update-order>`.

- It is now possible to also update the ``quantity``, ``unitPrice``, ``discountAmount``, ``totalAmount``, ``vatAmount``
  and ``vatRate`` of the order line, see :doc:`Update order line </reference/v2/orders-api/update-order-line>`.

- We have added the ``metadata`` field to the order line entity. You can now store up to 1Kb of information with your
  order line, see :doc:`Create order </reference/v2/orders-api/create-order>`.

- Added a new endpoint to retrieve all payment methods Mollie is offering to an organization.
  See :doc:`List all payment methods </reference/v2/methods-api/list-all-methods>` for details.

- Added a new API for getting the onboarding status of a merchant. You will need the new OAuth scope ``onboarding.read``
  to access the data. For details, see the :doc:`Onboarding API </reference/v2/onboarding-api/overview>`.

December 2018
=============
- Added the ``locale`` field to organization details. This represents the locale that the merchant has set in their
  Mollie Dashboard.

- Added a new endpoint to update order lines. For details, see :doc:`/reference/v2/orders-api/update-order-line`.

- The expiry period for `Belfius Pay Button <https://www.mollie.com/payments/belfius>`_ has been decreased from 1 day
  to 1 hour.

- It is now possible to create (another) payment for an order via the
  :doc:`Create order payment endpoint </reference/v2/orders-api/create-order-payment>` on the Orders API.

- We are now offering webhooks for order payments. Please note that when the status of the payment becomes ``paid`` we
  are calling your order webhook instead. See the :doc:`Orders API </reference/v2/orders-api/overview>` for more
  info.

- Enabling and disabling payment methods via the API is now possible via the
  :doc:`Enable payment method endpoint </reference/v2/profiles-api/enable-method>` on the Profiles API.

- Refunds for Pay later and Slice it can now be created via the :doc:`Create payment refund endpoint
  </reference/v2/refunds-api/create-payment-refund>`. This allows refunding of arbitrary amounts.

- It is now possible to get the pricing of the payment methods that are active on the payment profile. Add the
  ``include=pricing`` parameter to the :doc:`Methods API </reference/v2/methods-api/overview>` to get the pricing object
  in your response.

November 2018
=============
- It is now possible to pass an ``amount`` when partially shipping, canceling or refunding order lines. This is
  necessary for order lines that have a non-zero ``discountAmount``.

  Before, it was not possible to partially ship, cancel or refund such order lines.

- Subscriptions in test mode will now be canceled automatically after 10 charges.

- It is now possible to refund SEPA Direct Debit payments.

- Moved the ``organizationName`` field in the ``shippingAddress`` and ``billingAddress`` objects.

- Added referral-functionality for Mollie Partners to the Connect API. See the :doc:`documentation </connect/overview>`
  for more info.

- The maximum amount for SOFORT Banking payments has been increased from €5,000 to €50,000.

October 2018
============
- Added ``organizationName`` field for orders, so from now a customer can specify the organization name if they buy
  something for business purposes.

- We now accept the use of an underscore ``_`` in Redirect- and Webhook-URLs.

- A :doc:`guide </overview/testing>` has been added explaining how to test your integration of the Mollie API.

- Added the ``changePaymentState`` link to the :doc:`Payments API </reference/v2/payments-api/get-payment>`.
  It allows you to set the final payment state for test mode recurring payments.

- Added the ``timesRemaining`` field to the :doc:`Subscriptions API </reference/v2/subscriptions-api/overview>`. The
  field lists how many charges are left for completing the subscription.

- Consumer IBANs of Bancontact payments will now always be shared via the API.

- Added :doc:`Organization access tokens </overview/authentication>` as an authentication method.

- PayPal refund period has been increased from 60 to 180 days.

- The ``method`` field on the :doc:`Create Payment </reference/v2/payments-api/create-payment>` and
  :doc:`Create order </reference/v2/orders-api/create-order>` now also accepts an array of methods. By doing so you can
  select which methods to show on the payment method selection screen. For example, you can use this functionality to
  only show payment methods from a specific country to your customer.

- It is now possible to specify a URL with a custom URI scheme as ``redirectUrl`` parameter. Previously, only the *HTTP*
  and *HTTPS* schemes were allowed. You can for example immediately redirect the customer back to your mobile app after
  completing a payment, by setting the ``redirectUrl`` to your own App Scheme, like ``my-app://payment-return``.

- Added new category codes ``5533`` ``5641`` ``5651`` ``5732`` ``5735`` ``5815`` ``5944`` ``5977`` ``7999``
  to the :doc:`Create profile </reference/v2/profiles-api/create-profile>` and
  :doc:`Update profile </reference/v2/profiles-api/update-profile>` endpoints.

- We have added the ``mandateId`` field in subscriptions. This makes it possible to sure a specific mandate for a
  subscription. For details, see the :doc:`Subscriptions API </reference/v2/subscriptions-api/overview>`.

- We have removed the dedicated French bank account for bank transfer payments. Your customers can use our Dutch
  bank account to finish the payment.

- Added the new payment status ``authorized`` for payments that still require a capture to receive the money. Currently,
  this status is only used for payment methods `Klarna Pay now <https://www.mollie.com/payments/klarna-pay-now>`_,
  `Klarna Pay later <https://www.mollie.com/payments/klarna-pay-later>`_ and
  `Klarna Slice it <https://www.mollie.com/payments/klarna-slice-it>`_. Because payments with these payment methods
  can only be created with the :doc:`Orders API </reference/v2/orders-api/overview>`, there is no change required in
  existing implementations of the Payments API.

  The new status is especially useful to give a meaningful representation when listing all payments.

September 2018
==============
- Added the ``nextPaymentDate`` field in subscriptions to see when the next payment should be initiated. For details,
  see the :doc:`Subscriptions API </reference/v2/subscriptions-api/overview>`.

- Added a new endpoint get all payments for a specific customer subscription. For details, see:
  :doc:`List subscription payments </reference/v2/subscriptions-api/list-subscription-payments>`

- Added ``amountCaptured`` and ``authorizedAt`` to the payment object.

- Added the ``metadata`` field to the :doc:`Subscriptions API </reference/v2/subscriptions-api/overview>`. This makes it
  possible to, for example, link a plan to a subscription.

- Added a new endpoint for partners to get all connected organizations. See the Reseller API Docs for more information.

- Added the :doc:`Orders API </reference/v2/orders-api/overview>` and the
  :doc:`Shipments API </reference/v2/shipments-api/overview>`. See the
  :doc:`Orders guide </orders/overview>` for more details on how to use these APIs.

- Added the :doc:`Captures API </reference/v2/captures-api/overview>`.

- The ``amount`` field in chargebacks had the wrong sign, though it was documented correctly. The API has been changed
  to use positive values for the ``amount`` field and negative values for the ``settlementAmount`` field in the
  :doc:`/reference/v2/chargebacks-api/get-payment-chargeback` endpoint.

- You can now use a cursor to scroll through all chargebacks of a payment using the
  :doc:`/reference/v2/chargebacks-api/list-payment-chargebacks` endpoint.

- Added the ``mode`` field to the :doc:`Mandates API </reference/v2/mandates-api/get-mandate>`. This makes it possible
  to see in which environment the mandate is created.

- Added a new endpoint for retrieving the website profile of the used API key. For details, see:
  :doc:`Get current profile </reference/v2/profiles-api/get-profile-me>`

August 2018
===========
- The icons returned by the :doc:`Methods API </reference/v2/methods-api/overview>` have been updated. Note that the
  size of the icons has changed from 40x40 to 32x24. All icons are now available in SVG as well, which we advise you to
  use where possible.

July 2018
=========
- Test payments are no longer cleaned up after 2 weeks. Just like live payments they will never be removed.

- The :doc:`Get settlement endpoint </reference/v2/settlements-api/get-settlement>` now returns the ``invoiceId`` if the
  settlement has been invoiced. The invoice is also available in the ``_link`` object.

- Added a new endpoint for updating Subscriptions. Now you can update a subscription when needed --
  for example when your customer switches price plans.

  For details, see :doc:`Update subscription </reference/v2/subscriptions-api/update-subscription>`.

June 2018
=========
- Added the new payment methods Giropay (``giropay``) and EPS (``eps``). Note that this method may not be available on
  your account straight away. If it is not, contact our support department to get it activated for your account.

- Passing a payment description in the form of ``Order <order number>`` will now pass the order number to PayPal in the
  *Invoice reference* field which you can search.

- Added new locales ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES`` ``ca_ES``
  ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` and ``lt_LT`` to
  the :doc:`Create customer </reference/v2/customers-api/create-customer>`,
  :doc:`Create payment </reference/v2/payments-api/create-payment>`, and
  :doc:`List methods </reference/v2/methods-api/list-methods>` endpoints to localize translations and allow for ordering
  the payment methods in the preferred order for the country.

May 2018
========
- Launched multicurrency payments, along with the new v2 API.
