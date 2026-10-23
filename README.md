# property-statistics

This is a vanilla javaScript project mainly to provide and simplify property listings to the user.

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
