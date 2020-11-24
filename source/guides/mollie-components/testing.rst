Testing Mollie Components
=========================

**Mollie Components** can be tested during implementation with the regular :doc:`test mode <../testing>`.

First, you will have to initialize the :ref:`components-mollie-constructor` constructor with your profile ID and
the ``testmode`` option:

.. code-block:: js
   :linenos:

   var mollie = Mollie('pfl_3RkSN1zuPE', { locale: 'nl_NL', testmode: true });

Then, you can implement the remainder of Mollie Components as specified in :doc:`our guide <overview>`. When testmode is enabled for Mollie Components, the card tokens you receive should be used in combination with your **Test API key** instead of your Live API key. Therefore, make sure you use the correct API key when :doc:`creating the Payment </reference/v2/payments-api/create-payment>`.

Card numbers for testing
------------------------

You can use these cards for testing, with any CVV and expiry date.

.. table::
   :header-alignment: left right right
   :column-alignment: left right right

   +------------------+------------------------------------+--------------------------------------------+
   | Brand            | Triggers 3-D Secure authentication | Does not trigger 3-D Secure authentication |
   +==================+====================================+============================================+
   | American Express | 3782 822463 10005                  | 3456 789012 34564                          |
   +------------------+------------------------------------+--------------------------------------------+
   | Mastercard       | 2223 0000 1047 9399                | 5436 0310 3060 6378                        |
   +------------------+------------------------------------+--------------------------------------------+
   | VISA             | 4543 4740 0224 9996                | 4242 4242 4242 4242                        |
   +------------------+------------------------------------+--------------------------------------------+

Testing failures
----------------

Of course testing only the happy path is not sufficient and you should :doc:`handle errors <handling-errors>` as well.

This can be done by passing `magic amounts` when creating the payment. Depending on whether you want to trigger 3-D Secure authentication or not, this works in a different manner:

- When you trigger 3-D Secure authentication for the test mode payment, you will have to redirect to the URL in the ``_links.checkout`` property that is returned in the :doc:`Create Payment API</reference/v2/payments-api/create-payment>` response. You should then choose ``Failed`` as the final payment status. As a result, the requested failure reason will be present in the response of the :doc:`Get Payment API</reference/v2/payments-api/get-payment>`.
- When you do not trigger 3-D Secure authentication, passing the magic amount will immediately result in an API error that indicates the failure reason that was requested.

Pass one of the following amounts to trigger a failure condition in test mode:

.. table::
   :header-alignment: left right
   :column-alignment: left right

   +------------------------------+--------------+
   | Failure reason to trigger    | Magic amount |
   +==============================+==============+
   | ``invalid_card_number``      |   € 1,001.00 |
   +------------------------------+--------------+
   | ``invalid_cvv``              |   € 1,002.00 |
   +------------------------------+--------------+
   | ``invalid_card_holder_name`` |   € 1,003.00 |
   +------------------------------+--------------+
   | ``card_expired``             |   € 1,004.00 |
   +------------------------------+--------------+
   | ``invalid_card_type``        |   € 1,005.00 |
   +------------------------------+--------------+
   | ``refused_by_issuer``        |   € 1,006.00 |
   +------------------------------+--------------+
   | ``insufficient_funds``       |   € 1,007.00 |
   +------------------------------+--------------+
   | ``inactive_card``            |   € 1,008.00 |
   +------------------------------+--------------+
   | ``possible_fraud``           |   € 1,009.00 |
   +------------------------------+--------------+
   | ``authentication_failed``    |   € 1,010.00 |
   +------------------------------+--------------+
