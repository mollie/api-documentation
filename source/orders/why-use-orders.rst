Why use Orders?
===============
The :doc:`Orders API <overview>` allows you to create “orders”. An order contains the personal information of a
customer (e.g. address) and products that the customer ordered. When an order is made, a corresponding payment
will be created automatically.

Using the Orders API is the preferred approach when integrating the Mollie API into e-commerce applications such as
webshops. Below you will find an overview which functionalities the Orders API offers as opposed to the Payments API.

Which extra features can I use with the Orders API?
---------------------------------------------------
* The Orders API allows you to use Mollie for your order management, including the payment process.

* **Pay after delivery** payment methods such as **Klarna Pay later** or **Klarna Slice it** require the Orders API and
  cannot be used with the Payments API. This is because Klarna needs the order information to do a risk assessment.

* Some payment methods communicate the order lines to the customer in their hosted payment pages or in an invoice.
  For example, the customer will see the order lines on the checkout page of PayPal.

* You can manage the created orders in the `Mollie Dashboard <https://www.mollie.com/en/features/dashboard>`_.

When is it better to use the Payments API?
------------------------------------------
* When you don’t collect customer details like the address, it is not possible to use the Orders API.
  Then you can choose for the Payments API to create a simple payment instead.

* When you only want to receive donations and you don’t sell any digital or physical products.

* You’re already using the Payments API and don’t want to use all the nice extra features of the Orders API.
