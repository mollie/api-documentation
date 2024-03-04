Mollie Connect
==============
**Mollie Connect** provides an optimal solution for setting up payments for platforms and marketplaces. The Connect product serves various purposes, including:

* Allowing your App to manage your customer’s accounts and access their data. 
* Automating and co-branding the :doc:`Mollie onboarding process <onboarding>` for your customers.
* Enabling your app to create payments, orders, and refunds on behalf of your customer.
* Monetizing payments by adding a surcharge or receiving a commission.

All these use cases are facilitated through the use of OAuth. If you are unfamiliar with OAuth, it is an open standard supported 
by our API that allows your app to access data from a connected account with the user's consent. This eliminates the need 
for manual exchange of API keys. For example, you can utilize OAuth to call the Balances API on behalf of your user to retrieve 
their open balance in real-time.

Getting started
---------------
Regardless of the use case, it is essential to start by understanding how OAuth functions at Mollie and then registering an OAuth app.

OAuth is an open standard for access delegation, a prerequisite to benefit from the Mollie Connect product offering. For detailed 
information on creating your OAuth app, refer to the :doc:`Getting started with Mollie Connect </connect/getting-started>` guide.

Onboarding your customers
-------------------------
If your customers do not have a Mollie account, you can:

* Have them sign up individually and install your app later,
* Create an account on their behalf and let them complete the onboarding in the Mollie Dashboard,
* Offer a co-branded onboarding experience in your app, which includes creating organizations for them using an API.

The :doc:`Onboard your customers <onboarding>` guide covers the last two scenarios, utilizing the following Connect features:

* **Clients API**: A robust API endpoint to create Mollie accounts on behalf of your customer and prefill data points for a seamless onboarding experience.
* **Organizations & Onboarding dashboards and APIs**: Monitor connected customer accounts and their onboarding status to optimally inform and support your customer base.
* **Profiles API**: Create the customer's profile and activate payment methods to expedite onboarding and enhance your platform's operations.
* **Co-branded onboarding**: A Mollie-hosted onboarding interface in your app's look and feel.

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
