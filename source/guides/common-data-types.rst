.. _guides/common-data-types:

Common data types
=================
To keep things simple, the Mollie API endpoints will always attempt to use the same structure when representing certain
value objects.

The API references lists the data type used for each field and parameter of every endpoint. This guide contains a list
of all data types used, along with an explanation of the way these data types are structured.

.. _amount-object:

Amount object
-------------
In v2 endpoints, an amount object is always represented as follows.

.. list-table::
   :widths: auto

   * - | ``currency``
       | string
     - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   * - | ``value``
       | string
     - A string containing the exact amount in the given currency.

.. _address-object:

Address object
--------------
In the v2 endpoints, an address object is always represented as follows.

.. list-table::
   :widths: auto

   * - | ``streetAndNumber``
       | string
     - The street and street number of the address.

   * - | ``postalCode``
       | string
     - The postal code of the address.

   * - | ``city``
       | string
     - The city of the address.

   * - | ``region``
       | string
     - The region of the address.

   * - | ``country``
       | string
     - The country of the address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

When providing an address object as parameter to a request, the following conditions must be met:

* If any of the fields is provided, all fields have to be provided, with exception of the ``region`` field.
* If only the ``region`` field is given, one should provide all the other fields, per the previous condition.
* In the case of certain PayPal payments, the ``region`` field is required, please see the :ref:`Create payment documentation <v2/payments-create>`.

Boolean
-------

In JSON structures, booleans should be passed as the JSON boolean type.

In query string parameters (e.g. ``GET`` requests) only the strings ``true`` and ``false`` are accepted.

Date
----
A string representing a date in ``YYYY-MM-DD`` format.

Datetime
--------
A string representing a date and time in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

QR code object
--------------
The QR code object represents an image of a QR code.

.. list-table::
   :widths: auto

   * - | ``height``
       | integer
     - Height of the image in pixels.

   * - | ``width``
       | integer
     - Width of the image in pixels.

   * - | ``src``
       | string
     - The URI you can use to display the QR code. Note that we can send both data URIs as well as links to HTTPS
       images. You should support both.

URL object
----------
In v2 endpoints, URLs are commonly represented as objects with an ``href`` and ``type`` field.

.. list-table::
   :widths: auto

   * - | ``href``
       | string
     - The actual URL string.

   * - | ``type``
       | string
     - The content type of the page or endpoint the URL points to.
