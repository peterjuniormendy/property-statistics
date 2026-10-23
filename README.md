# property-statistics

This is a vanilla javaScript project mainly to simplify property listings and how to request or manage those listings. This project can be run by navigation into the project folder property-statistics and running `node properties.js` in the terminal.

# Agreed data rules

Agreed data rules

- A property most have a valid ID.
- For price calculations, include only properties with a valid, non-negative numeric price.
- For bedroom calculations, include only properties with a valid bedroom count.
- Negative bedrooms are invalid.
- A provided bedroom count must be a valid number.
- Compare and count property types in lowercase.
- Missing bathroom count is allowed; treat it as unknown and exclude it from bathroom calculations.
- Price of zero is valid and included in the price calculations.

# Bad records table

│ (index) │ id │ name │ location │ price │ bedrooms │ bathrooms │ type │ area │
| 17 │ 18 │ 'waterfront' │ 'liverpool' │ 1800000 │ -2 │ 1 │ 'Apartment' │ 10000 │
│ 18 │ '' │ 'royal gardens' │ 'london' │ 1900000 │ 2 │ 2 │ 'Apartment' │ 10500 │
│ 19 │ 'as20' │ 'grand estate' │ 'huddersfield' │ 2000000 │ 4 │ 4 │ 'House' │ 11000 │

# Extra feature

highestPricedByLocation: I added this feature because it can come in very handy when a user what to know all the locations highest priced property at onces, rather than checking for all each indiviual location.
