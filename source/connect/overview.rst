Mollie Connect
==============
**Mollie Connect** is a set of APIs and tools that allows you to connect multiple Mollie accounts together. This toolkit
can be used for varying purposes, including:

* Automating or white-labeling the Mollie onboarding for your customers
* Allowing your app to view your customer's Mollie data
* Enabling your app to manage your customer's Mollie account
* Charging fees on payments processed through your app
* Routing and splitting payments between connected accounts
* Receiving referral commissions for your customers' payment volumes

Depending on the use case, accounts will be connected either through `OAuth <https://en.wikipedia.org/wiki/OAuth>`_ or,
for platforms and resellers, automatically during onboarding.

If you are not familiar with OAuth: it is an open standard that our API supports, which allows your app to access data
from a connected account with their consent. This prevents having to manually exchange API keys. For example, with your
user's consent, using OAuth you can call the Invoices API on behalf of your user to retrieve **their** Mollie invoice.

Getting started
---------------
In virtually all use cases you should start by learning a bit about how OAuth works at Mollie, and then registering an
OAuth app. The following guide offers detailed instructions.

:doc:`/connect/getting-started`

Onboarding your customers
-------------------------
If your users do not yet have a Mollie account, you can either:

* Have them sign up by themselves, and have them install your app at a later point
* Sign them up yourself and have them complete the onboarding in the Mollie Dashboard
* Offer a complete white-label onboarding experience in your app

The following guide will dive into these last two use cases.

:doc:`/connect/onboarding`

Accessing your customer's Mollie account
----------------------------------------
To access or manage the account of your customer, you need an OAuth app. Follow the
:doc:`Getting started guide </connect/getting-started>` for instructions.

Once you have set up the app, you can access virtually any Mollie API endpoint with the OAuth access token, as long as
your user gave permission for your app to access their data. Refer to :doc:`/connect/permissions` for a full list of
available permissions.

Charging fees on payments processed through your app
----------------------------------------------------
Mollie Connect enables you to route and split payments between two or more connected accounts.

The simplest use case is when your app processes payments for other Mollie accounts, and you want to deduct a fee that
gets sent to your own balance. The user in this case will still have their own dashboard, pay their own Mollie payment
fees, and receive a Mollie invoice. For this case we offer :doc:`Application fees </connect/application-fees>`.

For more advanced use cases, for example if you want to cover the Mollie payment fees yourself, or for example if you
want to split a payment with another party, we offer :doc:`Split payments </connect/splitting-payments>`.

Referral commissions
--------------------
You can sign up for our referral program to receive commissions for merchants that you are onboarding to Mollie. Once
your account is configured as a partner account, any merchant you sign up through the OAuth onboarding flow will
automatically be linked to your account.

For more information about partnering with Mollie, see our
`Partner page <https://www.mollie.com/partners>`_ or reach out to your Mollie partner manager.
