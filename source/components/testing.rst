Testing Mollie Components
=========================
**Mollie Components** can be tested during implementation with the regular :doc:`test mode </overview/testing>`.

First, you will have to initialize the :ref:`components-mollie-constructor` constructor with your profile ID and
the ``testmode`` option:

.. code-block:: js
   :linenos:

   var mollie = Mollie('pfl_3RkSN1zuPE', { locale: 'nl_NL', testmode: true });

Then, you can implement the remainder of Mollie Components as specified in :doc:`our guide </components/overview>`. When
test mode is enabled for Mollie Components, the card tokens you receive should be used in combination with your
**Test API key** instead of your Live API key. Therefore, make sure you use the correct API key when
:doc:`creating the payment </reference/v2/payments-api/create-payment>`.

Card numbers for testing
------------------------
You can use these cards for testing, with any CVV and expiry date.

.. table::
   :header-alignment: left right
   :column-alignment: left right

   +------------------+------------------------------------+
   | Brand            | Card number                        |
   +==================+====================================+
   | American Express | 3782 822463 10005                  |
   +------------------+------------------------------------+
   | Mastercard       | 2223 0000 1047 9399                |
   +------------------+------------------------------------+
   | VISA             | 4543 4740 0224 9996                |
   +------------------+------------------------------------+

Testing failures
----------------
Of course testing only the happy path is not sufficient and you should
:doc:`handle errors </components/handling-errors>` as well.

This can be done by passing `magic amounts` when creating the payment. After redirecting to the URL in the
``_links.checkout`` property that is returned in the
:doc:`Create payment endpoint </reference/v2/payments-api/create-payment>` response, you should choose ``Failed``
as the final payment status. As a result, the requested failure reason will be present in the response of the
:doc:`Get payment endpoint </reference/v2/payments-api/get-payment>`.

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
   | ``card_declined``            |   € 1,011.00 |
   +------------------------------+--------------+
