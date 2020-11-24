Version strings
---------------
When Mollie merchants contact our support department, knowing which integration the merchant uses is incredibly helpful in offering them the fastest and best possible support.  Having this information helps us understand which features are supported by your integration and pinpoint any issues.

The Mollie API gathers information about your plugin or platform with every API call. You can pass this information to the Mollie by amending the user agent with what we call *"version strings"*.

All our API clients expose convenient methods to supply version strings.

Syntax
^^^^^^
The basic syntax for version strings is ``Name/x.x.x``.

This syntax follows common user agent components you may be familiar with such as ``Mozilla/5.0`` or ``Googlebot/2.1``.

Depending on your integration, you may want to supply two or more version strings, e.g. one for your plugin and one for the platform it runs on.

Make sure that the name you choose clearly describes your integration and that you don't change the name over time.

*Examples:*

* Mollie module for Magento 2: ``MollieMagento2/0.9.9`` ``Magento/2.1.5``
* Mollie extension for OpenCart: ``MollieOpenCart/8.4.0`` ``OpenCart/3.0.2.0``
* Mollie plugin for WooCommerce on WordPress: ``MollieWoo/5.0.7`` ``WooCommerce/3.6.4`` ``WordPress/5.2.3``

Option A: Using an API client
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Our `API clients <https://docs.mollie.com/#clients-modules-and-plugins>`_ expose convenient methods for supplying version strings.

The code examples below illustrate how the Mollie plugin (v0.9.9) for Magento 2 (v2.1.5) would pass version strings.

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/payments \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -A "MollieMagento2/0.9.9 Magento/2.1.5" \
         -d '...'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $mollie->addVersionString("MollieMagento2/0.9.9");
      $mollie->addVersionString("Magento/2.1.5");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      mollie_client.set_user_agent_component('MollieMagento2', 0.9.9)
      mollie_client.set_user_agent_component('Magento', 2.1.5)

   .. code-block:: ruby
      :linenos:

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      Mollie::Client.instance.add_version_string('MollieMagento2/0.9.9')
      Mollie::Client.instance.add_version_string('Magento/2.1.5')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');

      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });
        apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM',
        versionStrings: 'MollieMagento2/0.9.9 Magento/2.1.5'
      });

If you're using Laravel, check out the ``addVersionString()`` method `here <https://github.com/mollie/laravel-mollie/blob/master/CHANGELOG.md#250-2019-03-03>`_.

Option B: Using the native REST API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
We always recommend using one of our `API clients <https://docs.mollie.com/#clients-modules-and-plugins>`_ for a solid foundation and faster development.

If, however, you're integrating our native REST API, use your HTTP client of choice to append integration data to the user-agent header. Refer to the syntax and cURL example above and be sure to separate multiple version strings with spaces.
