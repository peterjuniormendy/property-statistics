# property-statistics

This is a vanilla JavaScript project mainly to simplify property listings and how to request or manage those listings. This project can be run by navigating into the project folder property-statistics and running `node properties.js` in the terminal.

## Agreed data rules

- A property must have a valid ID.
- For price calculations, include only properties with a valid, non-negative numeric price.
- For bedroom calculations, include only properties with a valid bedroom count.
- Negative bedrooms are invalid.
- A provided bedroom count must be a valid number.
- Compare and count property types in lowercase.
- Missing bathroom count is allowed; treat it as unknown and exclude it from bathroom calculations.
- Price of zero is valid and included in the price calculations.
- If an property name is missing, it's displayed as 'No name'.
- If an property price is missing, it's displayed as 'Missing price'.
- If an property bedrooms is missing, it's displayed as 'Missing bedrooms'.
- If an property bathrooms is missing, it's displayed as 'Missing bathrooms'.
- All property types are displayed by capitalizing the first letter.

## Bad records table

| ID  | Problem | How the program handles it |
| --- | ------- | -------------------------- |

| 2 | Price is "gfd" (not a number) | Kept, but excluded from price calculations; shows "Missing price" |
| '' | No id | Rejected: No property is|
| 18 | Bathroom is -2 (negative number) | Rejected: negative bathroom count |
| 'as20 | Not a valid ID | Rejected: Invalid property ID |
| 15 | no property type | Kept, but shows "Missing price" |

## Extra feature

highestPricedByLocation: I added this feature because it can come in very handy when a user wants to know all the locations highest priced property at once, rather than checking for all each individual location.
