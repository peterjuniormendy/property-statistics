import {
  getAverageBedrooms,
  getTotalProperties,
  getAveragePrice,
  getCheapestProperty,
  formatProperty,
  getMostExpensiveProperty,
  countByPropertyType,
  searchProperties,
  filterByLocation,
  filterByPrice,
  filterByBedrooms,
  highestPricedByLocation,
  getInvalidProperties,
} from "./properties";

console.log("PROPERTY STATISTICS");
console.log("===================");
console.log("Get total properties: ", getTotalProperties());
console.log(
  "Get average price: ",
  getAveragePrice().toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  }),
);

console.log("Get average Bedrooms: ", getAverageBedrooms());
const cheapestProperty = getCheapestProperty();
console.log(
  "Get cheapest property: ",
  cheapestProperty ? formatProperty(cheapestProperty) : "No properties found",
);
const mostExpensiveProperty = getMostExpensiveProperty();
console.log(
  "Get most expensive property: ",
  mostExpensiveProperty
    ? formatProperty(mostExpensiveProperty)
    : "No properties found",
);
console.log("Count properties by type: ", countByPropertyType());
const searchResults = searchProperties({ maxPrice: 300000 });
console.log("Search properties: ", searchResults.map(formatProperty));

console.log(
  "Filter property by location",
  filterByLocation("leeds").map(formatProperty),
);
console.log("Filter by max Price: ", filterByPrice(200000).map(formatProperty));
console.log(
  "Filter by min bedrooms: ",
  filterByBedrooms(2).map(formatProperty),
);
console.log(
  "Highest price per location: ",
  Object.values(highestPricedByLocation()).map(
    (property) => property.location + ": " + formatProperty(property),
  ),
);
console.log(
  "Number of invalid property records: ",
  getInvalidProperties().length,
  ", IDs: ",
  getInvalidProperties().map((property) => {
    return property.id;
  }),
);
