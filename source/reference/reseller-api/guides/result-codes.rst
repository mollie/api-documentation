Result codes
============

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             As an alternative, we recommend using :doc:`Mollie Connect </oauth/overview>` and the :doc:`Mollie v2 API
             </reference/v2/payments-api/create-payment>`.

Every API request will be answered with a **result code**. Results will look like:

.. code-block:: XML
   :linenos:

    <?xml version="1.0"?>
    <response version="v1">
        <success>true</success>
        <resultcode>10</resultcode>
        <resultmessage>It works!</resultmessage>
    </response>

The following elements are present in every API result:

* ``<success>`` Indicates whether a request was successfully executed.
* ``<resultcode>`` Indicates which error occurred during the request.
* ``<resultmessage>`` Provides additional information about the result.


**The following result codes are possible for all API requests:**

.. list-table::
   :widths: auto

   * - ``10``

     - The request was successfully executed.

   * - ``22``

     - The parameter ``timestamp`` is missing.

   * - ``23``

     - The parameter ``signature`` is missing.

   * - ``25``

     - The submitted website profile cannot be found.

   * - ``26``

     - The HTTP method is not allowed, use a method listed in the Allowed header.

   * - ``27``

     - The signature of the API request is incorrect.

   * - ``28``

     - The timestamp has expired, e.g. is located too far in the past or the future.

   * - ``29``

     - One of the obligatory parameters is missing.

   * - ``31``

     - The parameter ``partner_id`` is missing.

   * - ``32``

     - Access denied. The account is already claimed by another partner.

   * - ``95``

     - The API is temporarily unavailable.

   * - ``96``

     - One of the parameters contains bytes that can not be understood as UTF-8.

   * - ``97``

     - The stated object or the requested API method does not exist.

   * - ``98``

     - You have no access to the requested object or the API method.

   * - ``99``

     - An internal error occurred during the processing of the API request.

