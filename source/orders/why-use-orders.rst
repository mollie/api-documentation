Why use orders?
===============
The :doc:`Orders API <overview>` allows you to create “orders”. An order contains the personal information of a customer
(e.g. address) and products that the customer ordered. When an order is made, a corresponding payment will be created
automatically.

Using the Orders API is the preferred approach when integrating the Mollie API into e-commerce applications such as
webshops. Below you will find an overview which functionalities the Orders API offers as opposed to the Payments API.

Which extra features can I use with the Orders API?
---------------------------------------------------
* The Orders API allows you to use Mollie for your order management, including the payment process.

* **Pay after delivery** payment methods such as **Klarna Pay later**, **Klarna Slice it** or **in3**, **Klarna Pay now**, as
  well as **eco vouchers, gift vouchers, and meal vouchers** require the Orders API and cannot be used with the Payments
  API. This is because the order information is needed to do a risk assessment or to calculate which products are
  eligible per voucher.

* Some payment methods communicate the order lines to the customer in their hosted payment pages or in an invoice.
  For example, the customer will see the order lines on the checkout page of PayPal.

* You can manage the created orders in the `Mollie Dashboard <https://www.mollie.com/en/features/dashboard>`_.

When is it better to use the Payments API?
------------------------------------------
* When you do not collect customer details like the address, it is not possible to use the Orders API.
  Then you can choose for the Payments API to create a simple payment instead.

* When you only want to receive donations and you do not sell any digital or physical products.

* You are already using the Payments API and do not want to use all the nice extra features of the Orders API.
