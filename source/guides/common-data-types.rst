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

   * - ``currency``

       .. type:: string
          :required: true

     - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   * - ``value``

       .. type:: string
          :required: true

     - A string containing the exact amount in the given currency.

.. _address-object:

Address object
--------------
In the v2 endpoints, an address object is always represented as follows.

.. list-table::
   :widths: auto

   * - ``streetAndNumber``

       .. type:: string
          :required: true

     - The street and street number of the address.

   * - ``streetAdditional``

       .. type:: string
          :required: false

     - Any additional addressing details, for example an apartment number.

   * - ``postalCode``

       .. type:: string
          :required: true

     - The postal code of the address.

   * - ``city``

       .. type:: string
          :required: true

     - The city of the address.

   * - ``region``

       .. type:: string
          :required: false

     - The region of the address.

   * - ``country``

       .. type:: string
          :required: true

     - The country of the address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

When providing an address object as parameter to a request, the following conditions must be met:

* If any of the fields is provided, all fields have to be provided with exception of the ``region`` field.
* If only the ``region`` field is given, one should provide all the other fields as per the previous condition.
* For certain PayPal payments the ``region`` field is required. Please see the
  :ref:`Create payment documentation <paypal-method-details>` for more information.

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

Locale
------
A string representing the country and language in `ISO 15897 <https://en.wikipedia.org/wiki/ISO/IEC_15897>`_ format.

Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES`` ``ca_ES``
``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``.

Phone number
------------
All phone numbers must passed as strings in the `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example,
``+31208202070``.

QR code object
--------------
The QR code object represents an image of a QR code.

.. list-table::
   :widths: auto

   * - ``height``

       .. type:: integer

     - Height of the image in pixels.

   * - ``width``

       .. type:: integer

     - Width of the image in pixels.

   * - ``src``

       .. type:: string

     - The URI you can use to display the QR code. Note that we can send both data URIs as well as links to HTTPS
       images. You should support both.

URL object
----------
In v2 endpoints, URLs are commonly represented as objects with an ``href`` and ``type`` field.

.. list-table::
   :widths: auto

   * - ``href``

       .. type:: string

     - The actual URL string.

   * - ``type``

       .. type:: string
          :required: true

     - The content type of the page or endpoint the URL points to.
