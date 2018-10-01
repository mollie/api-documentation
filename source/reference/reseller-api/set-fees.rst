Set fees
========

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/set-fees

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

The method set-fees can be used to change a merchant's rates.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account of which you would like to retrieve the bank accounts

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account of which you would like to retrieve the bank accounts

   * - ``partner_id_customer``

       .. type:: string
          :required: false

     - The partner ID of the account of which you would like to retrieve the bank accounts. It can be used instead of
       the parameters username and password

   * - ``payment_method``

       .. type:: string
          :required: true

     - The payment method of which you would like to adjust the rate. Possible values are:

        * ``ideal``
        * ``paysafecard``
        * ``creditcard``
        * ``mistercash``
        * ``banktransfer``
        * ``paypal``
        * ``bitcoin``
        * ``sofort``
        * ``belfius``
        * ``directdebit``
        * ``podiumcadeaukaart``
        * ``refund``

   * - ``payment_subtype``

       .. type:: string
          :required: false

     - The payment method subtype of which you would like to adjust the rate. This field is required when you use one of
       the mentioned payment types.

       **Only applicable to credit card:**

       * ``region_1`` for adjusting rates for Region 1 (Intra EU consumer cards to merchants within the EU)
       * ``region_2`` for adjusting rates for Region 2 (Other cards)

       **Only applicable to SOFORT Banking:**

       * ``retail``
       * ``digital``
       * ``adult``

       **Only applicable to refund:**

       * ``creditcard`` for adjusting credit card refunds
       * ``ideal`` for adjusting all other refunds.

   * - ``fee_type``

       .. type:: string
          :required: true

     - Possible options are:

       * ``fixed`` for the adjustment of fixed costs per transaction
       * ``percentage`` for the adjustment of variable transaction costs

   * - ``fee``

       .. type:: double
          :required: true

     - The new rate of fee. Send amounts (of the fixed type with two decimals (for instance ``0.43``), and variable
       transaction costs as a fraction (for instance ``0.025`` for 2.50%).

Response
--------
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0" encoding="UTF-8"?>
    <response>
        <success>true</success>
        <resultcode>10</resultcode>
        <resultmessage>Fee for payment method iDEAL set to &#x20AC; 0,22 per transaction.</resultmessage>
    </response>

Possible response codes
^^^^^^^^^^^^^^^^^^^^^^^
.. list-table::
   :widths: auto

   * - ``10``

     - The rate has been adjusted.

   * - ``20``

     - The username field is missing.

   * - ``21``

     - The password field is missing.

   * - ``30``

     - The combination of username and password is incorrect.

   * - ``37``

     - The combination payment_method and fee_type is invalid; the set percentage or fee is too high or too low, or the
       payment method cannot be set via the API. See the accompanying error message for the exact error.
