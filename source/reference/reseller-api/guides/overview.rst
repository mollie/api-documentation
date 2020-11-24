Reseller API
============

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             As an alternative, we recommend using :doc:`Mollie Connect </oauth/overview>` and the :doc:`Mollie v2 API
             </reference/v2/payments-api/create-payment>`.

The **Reseller API** can be used to register new merchants with Mollie, link existing merchants to your reseller account,
or change settings of merchants that you have referred to Mollie.

How to become a reseller?
-------------------------
Working with Mollie offers you a reliable and experienced partner in payments. If you want to become a reseller, please
see the `partner page <https://www.mollie.com/en/partners>`_ on our website.

Different base-url comparing to other APIs
------------------------------------------
The Reseller API uses an other base-url than all other Mollie APIs. Please use the following URL:
``https://www.mollie.com/api/reseller/v1/*endpoint*``

Downloads, examples & support
-----------------------------
There is no need for you to re-invent the wheel. Mollie has a
`ready-to-use PHP script <https://github.com/mollie/reseller-api>`_ lined up for you. Of course, you can also choose to
do the integration all on your own if the scripts don't meet your demands.

Are you using node.js? In that case, you can use the
`open source API-client for node.js <https://github.com/mvhenten/mollie-reseller>`_, which has been developed by
`Matthijs van Henten <https://github.com/mvhenten>`_.

Do you need support? Please don't hesitate to `contact us <https://www.mollie.com/nl/contact/>`_.
