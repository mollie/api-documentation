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

.. parameter:: currency
   :type: string
   :condition: required

   An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

.. parameter:: value
   :type: string
   :condition: required

   A string containing the exact amount in the given currency.

.. _address-object:

Address object
--------------
In the v2 endpoints, an address object includes at least the following fields.

.. parameter:: streetAndNumber
   :type: string
   :condition: required

   The street and street number of the address.

.. parameter:: streetAdditional
   :type: string
   :condition: optional

   Any additional addressing details, for example an apartment number.

.. parameter:: postalCode
   :type: string
   :condition: optional

   The postal code of the address. Required for countries that use postal codes. May only be
   omitted for these country codes:

   ``AE`` ``AN`` ``AO`` ``AW`` ``BF`` ``BI`` ``BJ`` ``BO`` ``BS`` ``BV`` ``BW`` ``BZ`` ``CD`` ``CF`` ``CG`` ``CI``
   ``CK`` ``CM`` ``DJ`` ``DM`` ``ER`` ``FJ`` ``GA`` ``GD`` ``GH`` ``GM`` ``GN`` ``GQ`` ``GY`` ``HK`` ``JM`` ``KE``
   ``KI`` ``KM`` ``KN`` ``KP`` ``LC`` ``ML`` ``MO`` ``MR`` ``MS`` ``MU`` ``MW`` ``NA`` ``NR`` ``NU`` ``PA`` ``QA``
   ``RW`` ``SB`` ``SC`` ``SL`` ``SO`` ``SR`` ``ST`` ``SY`` ``TF`` ``TK`` ``TL`` ``TO`` ``TT`` ``TV`` ``UG`` ``VU``
   ``YE`` ``ZM`` ``ZW``

.. parameter:: city
   :type: string
   :condition: required

   The city of the address.

.. parameter:: region
   :type: string
   :condition: optional

   The region of the address.

.. parameter:: country
   :type: string
   :condition: required

   The country of the address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

When providing an address object as parameter to a request, the following conditions must be met:

* At least the ``streetAndNumber``, ``city``, and ``country`` fields should be provided to create a valid address.
* The ``postalCode`` field is required for countries that have postal codes. See the list above.
* For certain PayPal payments the ``region`` field is required. See the
  :ref:`Create payment documentation <paypal-method-details>` for more information.

Boolean
-------
In JSON structures, booleans should be passed as the JSON boolean type.

In query string parameters (e.g. ``GET`` requests) only the strings ``true`` and ``false`` are accepted.

.. _business-category:

Business Category
-----------------
A token that represents the industry associated with the profile's trade name or brand.

Possible values:

* Animal Services

  * ``PET_SHOPS`` Pet Shops, Pet Food, and Supplies
  * ``VETERINARY_SERVICES`` Veterinary services

* Building Services

  * ``AC_AND_HEATING_CONTRACTORS`` A/C and heating contractors
  * ``CARPENTRY_CONTRACTORS`` Carpentry contractors
  * ``ELECTRICAL_CONTRACTORS`` Electrical contractors
  * ``EQUIPMENT_TOOLS_FURNITURE_RENTAL_LEASING`` Equipment, tools or furniture rental/leasing
  * ``GENERAL_CONTRACTORS`` General contractors
  * ``SPECIAL_TRADE_CONTRACTORS`` Special trade contractors

* Charity and Donations

  * ``CHARITY_AND_DONATIONS`` Charity and Donations
  * ``FUNDRAISING_CROWDFUNDING_SOCIAL_SERVICE`` Fundraising, crowdfunding and social service organizations

* Digital Products

  * ``APPS`` Apps
  * ``BOOKS_MEDIA_MOVIES_MUSIC`` Books, media, movies, music
  * ``GAMES`` Games
  * ``SOFTWARE_AND_SUBSCRIPTIONS`` Software and subscriptions

* Education

  * ``CHILD_CARE_SERVICES`` Child care services
  * ``COLLEGES_UNIVERSITIES`` Colleges or universities
  * ``ELEMENTARY_SECONDARY_SCHOOLS`` Elementary or secondary schools
  * ``OTHER_EDUCATIONAL_SERVICES`` Other educational services
  * ``VOCATIONAL_SCHOOLS_TRADE_SCHOOLS`` Vocational schools or trade schools

* Entertainment and Recreation

  * ``AMUSEMENT_PARKS`` Amusement Parks, Circuses, Carnivals, and Fortune Tellers
  * ``EVENT_TICKETING`` Event ticketing
  * ``GAMING_ESTABLISHMENTS`` Gaming establishments, incl. billiards, pool, bowling, arcades
  * ``MOVIE_THEATRES`` Movie theatres
  * ``MUSICIANS_BANDS_ORCHESTRAS`` Musicians, bands, or orchestras
  * ``ONLINE_GAMBLING`` Online gambling
  * ``OTHER_ENTERTAINMENT_RECREATION`` Other entertainment and recreation
  * ``SPORTING_RECREATIONAL_CAMPS`` Sporting and Recreational Camps
  * ``SPORTS_FORECASTING`` Sports forecasting or prediction services

* Financial Services

  * ``CREDIT_COUNSELLING_REPAIR`` Credit counselling or credit repair
  * ``DIGITAL_WALLETS`` Digital wallets
  * ``INVESTMENT_SERVICES`` Investment services
  * ``MONEY_SERVICES`` Money services or transmission
  * ``MORTGAGES_INSURANCES_LOANS_FINANCIAL_ADVICE`` Mortgages, insurances, loans and financial advice
  * ``SECURITY_BROKERS_DEALERS`` Security brokers or dealers
  * ``TRUST_OFFICES`` Trust offices
  * ``VIRTUAL_CRYPTO_CURRENCIES`` Virtual currencies and crypto currencies

* Food and Drink

  * ``CATERERS`` Caterers (prepare and delivery)
  * ``FAST_FOOD_RESTAURANTS`` Fast food restaurants
  * ``FOOD_PRODUCT_STORES`` Grocery stores, supermarkets and food product stores
  * ``RESTAURANTS_NIGHTLIFE`` Restaurants, nightlife & other on-premise consumption

* Lodging and Hospitality

  * ``BOAT_RENTALS_LEASING`` Boat Rentals and Leasing
  * ``CRUISE_LINES`` Cruise lines
  * ``LODGING`` Hotels, Motels, Resorts, Inns and other lodging and hospitality
  * ``PROPERTY_RENTALS_CAMPING`` Property rentals / Camping

* Marketplaces

  * ``MARKETPLACES`` Marketplaces

* Medical Services

  * ``DENTAL_EQUIPMENT_SUPPLIES`` Dental, lab and/or ophthalmic equipment and supplies
  * ``DENTISTS_ORTHODONTISTS`` Dentists and orthodontists
  * ``MEDICAL_SERVICES`` Doctors, physicians and other medical services
  * ``DRUG_PHARMACIES_PRESCRIPTION`` Drug Stores, pharmacies and prescription medicine
  * ``MEDICAL_DEVICES`` Medical devices
  * ``MEDICAL_ORGANIZATIONS`` Medical organizations
  * ``MENTAL_HEALTH_SERVICES`` Mental health services
  * ``NURSING`` Nursing or personal care facilities and assisted living
  * ``OPTICIANS_EYEGLASSES`` Opticians and eyeglasses

* Membership Organizations

  * ``SOCIAL_ASSOCIATIONS`` Civic, fraternal, or social associations
  * ``MEMBERSHIP_FEE_BASED_SPORTS`` Gyms, membership fee based sports
  * ``OTHER_MEMBERSHIP_ORGANIZATIONS`` Other membership organizations

* Personal Services

  * ``ADULT_CONTENT_SERVICES`` Adult content or services
  * ``COUNSELING_SERVICES`` Counseling services
  * ``DATING_SERVICES`` Dating services
  * ``HEALTH_BEAUTY_SPAS`` Health and beauty spas
  * ``LANDSCAPING_SERVICES`` Landscaping services
  * ``LAUNDRY_DRYCLEANING_SERVICES`` Laundry or (dry)cleaning services
  * ``MASSAGE_PARLOURS`` Massage parlours
  * ``OTHER_PERSONAL_SERVICES`` Other personal services
  * ``PHOTOGRAPHY_STUDIOS`` Photography Studios
  * ``SALONS_BARBERS`` Salons or barbers

* Political Organizations

  * ``POLITICAL_PARTIES`` Political parties

* Professional Services

  * ``ACCOUNTING_AUDITING_BOOKKEEPING_TAX_PREPARATION_SERVICES`` Accounting, auditing, bookkeeping and tax preparation services
  * ``ADVERTISING_SERVICES`` Advertising Services
  * ``CLEANING_MAINTENANCE_JANITORIAL_SERVICES`` Cleaning and maintenance, janitorial services
  * ``COMPUTER_REPAIR`` Computer repair
  * ``CONSULTANCY`` Consultancy
  * ``SECURITY_SERVICES`` Detective/protective agencies, security services
  * ``DIRECT_MARKETING`` Direct marketing
  * ``FUNERAL_SERVICES`` Funeral services and crematories
  * ``GOVERNMENT_SERVICES`` Government services
  * ``HOSTING_VPN_SERVICES`` Hosting and VPN services
  * ``INDUSTRIAL_SUPPLIES_NOT_ELSEWHERE_CLASSIFIED`` Industrial supplies, not elsewhere classified
  * ``LEGAL_SERVICES_ATTORNEYS`` Legal Services and Attorneys
  * ``MOTION_PICTURES_DISTRIBUTION`` Motion picture / video tape production and/or distribution
  * ``OTHER_BUSINESS_SERVICES`` Other business services
  * ``PRINTING_PUBLISHING`` Printing and publishing
  * ``REAL_ESTATE_AGENTS`` Real Estate Agents
  * ``SANITATION_POLISHING_SPECIALTY_CLEANING`` Sanitation, polishing and specialty cleaning
  * ``OFFICE_SUPPLIES`` Stationery / Office supplies
  * ``TESTING_LABORATORIES_NOT_MEDICAL`` Testing laboratories (not medical)
  * ``TRAINING_AND_COACHING`` Training and Coaching
  * ``UTILITIES`` Utilities

* Religious Organizations

  * ``RELIGIOUS_ORGANIZATIONS`` Religious organizations

* Retail

  * ``CLOTHING_SHOES_ACCESSORIES`` (Sports) clothing, shoes and accessories
  * ``COMMERCIAL_ART`` Art Dealers, Galleries, (commercial) Photography and Graphics
  * ``BEAUTY_PRODUCTS`` Beauty products
  * ``BOOKS_PERIODICALS_NEWSPAPERS`` Books, Periodicals and Newspapers
  * ``HOME_IMPROVEMENT`` Building, home improvement and equipment
  * ``GIFTS_SHOPS`` Cards, gifts, novelty and souvenir shops
  * ``CBD_MARIJUANA_PRODUCTS`` CBD/Marijuana (related) products
  * ``COFFEE_SHOPS`` Coffee shops / grow shops
  * ``CONVENIENCE_STORES`` Convenience Stores, Specialty Markets, Health Food Stores
  * ``GIFT_CARDS`` Credits, vouchers, gift cards (excl. SIM cards) for Non-Financial Institutions
  * ``EROTIC_TOYS`` Erotic toys
  * ``FLORISTS`` Florists, florist supplier
  * ``FUEL_DEALERS`` Fuel dealers (i.e. oil, pertroleum)
  * ``FURNITURE_FURNISHINGS_EQUIPMENT_STORES`` Furniture, Home Furnishings and Equipment Stores
  * ``GAME_TOY_HOBBY_SHOPS`` Game, Toy and Hobby Shops
  * ``OUTDOOR_EQUIPMENT`` Garden and outdoor equipment
  * ``HOME_ELECTRONICS`` Home electronics & (personal) computers
  * ``HOUSEHOLD_APPLIANCE_STORES`` Household appliance stores
  * ``JEWELRY_WATCH_CLOCK_AND_SILVERWARE_STORES_UNDER_1000`` Jewelry, Watch, Clock, and Silverware Stores (<1000 euro)
  * ``MUSIC_STORES`` Music Stores, Instruments and Records
  * ``OTHER_MERCHANDISE`` Other merchandise
  * ``LIQUOR_STORES`` Package Stores--Beer, Wine, and Liquor
  * ``PAID_TELEVISION_RADIO`` Paid television or radio services (cable/satellite)
  * ``PRECIOUS_STONES_METALS_JEWELRY_OVER_1000`` Precious Stones, Metals, Watches and Jewelry (>1000 euro)
  * ``REPAIR_SHOPS`` Repair shops and related services, not elsewhere classified
  * ``SECOND_HAND_STORES`` Second hand / used merchandise stores
  * ``SPORTING_GOODS_SPECIALTY_RETAIL_SHOPS`` Sporting Goods Stores, Miscellaneous and Specialty Retail Shops
  * ``SUPPLEMENTS_STORES`` Supplements, nutrition, vitamin stores
  * ``TELECOM_EQUIPMENT`` Telecom equipment (i.e. chargers, phones)
  * ``TELECOM_SERVICES`` Telecom services (incl. (anonymous) SIM cards)
  * ``TOBACCO_PRODUCTS`` Tobacco, cigars, e-cigarettes and related products
  * ``TRADERS_DIAMONDS`` Traders in diamonds
  * ``TRADERS_GOLD`` Traders in gold
  * ``WEAPONS_AMMUNITION`` Weapons or ammunition

* Transportation

  * ``COMMUTER_TRANSPORTATION`` Commuter transportation
  * ``COURIER_SERVICES`` Courier services and Freight forwarders
  * ``OTHER_TRANSPORTATION_SERVICES`` Other transportation services
  * ``RIDESHARING`` Taxis, limos and ridesharing

* Travel Services

  * ``TRAVEL_SERVICES`` Travel agencies, tour operators and other traval services

* Vehicles

  * ``AUTOMOTIVE_PARTS_ACCESSORIES`` Auto(motive) parts and accessories
  * ``CAR_TRUCK_COMPANIES`` Auto and truck sales and service dealers and leasing companies
  * ``AUTOMOTIVE_SERVICES`` Automotive services
  * ``BICYCLE_PARTS_SHOPS_SERVICE`` Bicycle (parts) shops and service
  * ``CAR_BOAT_CAMPER_MOBILE_HOME_DEALER`` Car, boat, camper, mobile Home dealer
  * ``CAR_RENTALS`` Car rentals
  * ``MOTORCYCLE_PARTS_SHOPS_AND_DEALERS`` Motorcycle (parts) shops and dealers

Date
----
A string representing a date in ``YYYY-MM-DD`` format.

Datetime
--------
A string representing a date and time in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

Locale
------
A string representing the country and language in the ``xx_XX`` format specified by
`ISO 15897 <https://en.wikipedia.org/wiki/ISO/IEC_15897>`_.

Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``.

Phone number
------------
All phone numbers must passed as strings in the `E.164 <https://en.wikipedia.org/wiki/E.164>`_ format. For example,
``+31208202070``.

QR code object
--------------
The QR code object represents an image of a QR code.

.. parameter:: height
   :type: string

   Height of the image in pixels.

.. parameter:: width
   :type: string

   Width of the image in pixels.

.. parameter:: src
   :type: string

   The URI you can use to display the QR code. Note that we can send both data URIs as well as links to HTTPS
   images. You should support both.

URL object
----------
In v2 endpoints, URLs are commonly represented as objects with an ``href`` and ``type`` field.

.. parameter:: href
   :type: string

   The actual URL string.

.. parameter:: type
   :condition: required
   :type: string

   The content type of the page or endpoint the URL points to.
