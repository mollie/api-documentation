Security
========

Security comes first at Mollie, and the Mollie API is no exception. Mollie guarantees a safe yet easy-to-use API in a
number of key ways described below.

Connecting to the Mollie API
----------------------------
To connect to the Mollie API, an HTTPS connection with at minimum TLS1.2 is required. Requests are authenticated using
:doc:`API keys </overview/authentication>`. This follows the industry's best practices.

End-to-end safety on the transport level is guaranteed by the HTTPS-requirement, no need to encrypt the data itself
again.  We only support TLS 1.2 (or higher). Connection is not possible when using a lower version.

HTTPS mitigates *packet sniffing* and *timing & replay attacks*. Thanks to HTTPS, data exchanged between Mollie and the
merchant is protected and guaranteed to be authentic. HTTPS implements *hashed signatures*, *nonces* and other tried and
tested cryptographic safeties.

*Man-in-the-middle attacks* are prevented by strictly checking the HTTPS certificate used on
``https://api.mollie.com/``. If the client detects a fake certificate — for example because of a hacked DNS-server — no
connection will be established.

Sensitive information
---------------------
Any sensitive payment information entered by your customer on our platform is stored securely. Our credit card platform
specifically is `PCI DSS certified <https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard>`_. Your
own website does not require any form of certification, since we handle the entire transaction for you.

What about the webhooks?
------------------------
The Mollie API :doc:`webhooks </overview/webhooks>` never contain sensitive information. Instead, webhooks will only
signal to your server that an update is ready to be fetched from the Mollie API, after which you are expected to
:doc:`fetch the object </reference/v2/payments-api/get-payment>` yourself in order to retrieve the updated details — for
example the updated status of a payment. Since your API call to us takes place over HTTPS, all the earlier-mentioned
security guarantees stay in effect.

Reporting vulnerabilities
-------------------------
If you believe you have found a security issue in our product or service, please notify us as soon as possible by
emailing us at `security@mollie.com <mailto:security@mollie.com>`_. For more information on this program, please refer
to our `Responsible Disclosure Policy <https://www.mollie.com/responsible-disclosure>`_.
