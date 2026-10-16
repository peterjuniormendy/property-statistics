# property-statistics

This is a vanilla javaScript project mainly to provide and simplify property listings to the user.

# Agreed data rules

- A property with a missing or non-numeric price remains valid, but must be excluded from price-dependent calculations.
- A missing or empty title is allowed; display it as No name.
- A missing or empty property type is allowed; display it as No type.
- Compare and count property types in lowercase.
- When displaying a property type, capitalise the first letter and lowercase the rest (for example, studio becomes Studio).
- Zero bedrooms is allowed.
- Negative bedrooms are invalid.
- A provided bedroom count must be a valid number.
- Missing bathroom count is allowed; treat it as unknown and exclude it from bathroom calculations.
- Zero bathrooms is allowed in the dataset but should be flagged for review because it may indicate incomplete data or an unusual property.
- Negative bathroom counts are invalid.
- A provided bathroom count must be numeric. Decimal values such as 1.5 are allowed to represent a full bathroom plus a half-bathroom.
- Invalid bathroom data should not automatically invalidate the whole property: preserve the property where possible, mark the bathroom value as invalid/unknown, and exclude it from bathroom-related calculations. Report data-quality issues clearly.
- A property must have a valid ID.
- Do not silently drop invalid records. Report how many records were skipped and, where useful, why.
- Unless a function says otherwise, work with valid properties only.
- For price calculations, include only properties with a valid, non-negative numeric price.
- For bedroom calculations, include only properties with a valid bedroom count.
