import { properties } from "./data";
import type { Criteria } from "./types/criteria";
import type { Property, RawProperty } from "./types/property";

const isValidProperty = (property: RawProperty): property is Property => {
  if (!property) {
    return false;
  } else if (!property.id || typeof property.id !== "number") {
    return false;
  } else if (property.bedrooms < 0 || typeof property.bedrooms !== "number") {
    return false;
  } else {
    return true;
  }
};

const toProperty = (raw: Property): Property => {
  return {
    ...raw,
    price: typeof raw.price === "number" ? raw.price : undefined,
    bathrooms: typeof raw.bathrooms === "number" ? raw.bathrooms : undefined,
    area: typeof raw.area === "number" ? raw.area : undefined,
  };
};

const isObject = (obj: object) => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

const isEmpty = (obj: object) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

const formatProperty = (property: Property) => {
  if (!isObject(property)) return "Invalid property format.";
  if (isEmpty(property)) return "Empty property";
  let id = property.id ? `#${property.id}` : "";
  let name = property.name ? property.name : "No name";
  let propertyLocation = property.location
    ? property.location.charAt(0).toUpperCase() + property.location.slice(1)
    : "Missing location";
  let price =
    property.price !== undefined && typeof property.price === "number"
      ? property.price.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        })
      : "Missing price";
  let beds =
    property.bedrooms !== undefined
      ? `${property.bedrooms} beds`
      : "Missing Bedrooms";
  let baths =
    property.bathrooms !== undefined && typeof property.bathrooms === "number"
      ? `${property.bathrooms} baths`
      : "Missing bathrooms";

  let propertyType =
    property.type && typeof property.type === "string"
      ? property.type.charAt(0).toUpperCase() + property.type.slice(1)
      : "No type";

  return `${id} ${name} - ${propertyLocation} - ${price} - ${beds} - ${baths} - ${propertyType}`;
};

const getProperties = () => {
  const validProperties = properties
    .filter((property) => isValidProperty(property))
    .map((validProperty) => toProperty(validProperty));
  return validProperties;
};

const getInvalidProperties = () => {
  const invalidProperties = properties.filter(
    (property) => !isValidProperty(property),
  );
  return invalidProperties;
};

const getPropertyById = (id: number) => {
  const validProperties = getProperties();
  return validProperties.find((property) => property.id === id);
};

const getTotalProperties = () => {
  const validProperties = getProperties();
  return validProperties.length;
};

const getPropertiesWithValidPrice = () => {
  const validProperties = getProperties();
  const propertiesWithValidPrice = validProperties.filter(
    (property) =>
      property.price !== undefined &&
      typeof property.price === "number" &&
      property.price >= 0,
  );
  return propertiesWithValidPrice;
};

const getAveragePrice = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  if (propertiesWithValidPrice.length === 0) return 0;

  const totalPrice = propertiesWithValidPrice.reduce(
    (total, property) =>
      property.price !== undefined ? total + property.price : total,
    0,
  );
  return totalPrice / propertiesWithValidPrice.length;
};

const getCheapestProperty = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  if (propertiesWithValidPrice.length === 0) return null;
  const cheapestProperty = propertiesWithValidPrice.reduce(
    (cheapest, property) =>
      property.price !== undefined &&
      cheapest.price !== undefined &&
      property.price < cheapest.price
        ? property
        : cheapest,
  );
  return cheapestProperty;
};

const getMostExpensiveProperty = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  if (propertiesWithValidPrice.length === 0) return null;
  const mostExpensiveProperty = propertiesWithValidPrice.reduce(
    (mostExpensive, property) =>
      property.price !== undefined &&
      mostExpensive.price !== undefined &&
      property.price > mostExpensive.price
        ? property
        : mostExpensive,
  );
  return mostExpensiveProperty;
};

const getAverageBedrooms = () => {
  const validProperties = getProperties();
  if (validProperties.length === 0) return 0;
  const totalBedrooms = validProperties.reduce(
    (total, property) => total + property.bedrooms,
    0,
  );
  return (totalBedrooms / validProperties.length).toFixed(1);
};

const filterByLocation = (location: string) => {
  const validProperties = getProperties();
  const getPropertiesByLocation = validProperties.filter(
    (property) => property.location.toLowerCase() === location.toLowerCase(),
  );
  return getPropertiesByLocation;
};

const filterByPrice = (price: number) => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  const getPropertiesByPrice = propertiesWithValidPrice.filter(
    (property) => property.price !== undefined && property.price <= price,
  );
  return getPropertiesByPrice;
};

const filterByBedrooms = (numberOfBedrooms: number) => {
  const validProperties = getProperties();
  const getPropertiesByBedrooms = validProperties.filter(
    (property) => property.bedrooms >= numberOfBedrooms,
  );
  return getPropertiesByBedrooms;
};

const countByPropertyType = () => {
  const validProperties = getProperties();
  const counts: Record<string, number> = {};
  validProperties.forEach((property) => {
    const type = (property.type || "no type").toLowerCase();
    counts[type] = (counts[type] ?? 0) + 1;
  });

  return counts;
};

const searchProperties = (criteria: Criteria) => {
  if (!isObject(criteria)) return [];
  const validProperties = getProperties();
  const results: Property[] = [];
  validProperties.forEach((property) => {
    let isMatch = true;
    if (
      criteria.location !== undefined &&
      property.location.toLowerCase() !== criteria.location.toLowerCase()
    ) {
      isMatch = false;
    }
    if (
      criteria.maxPrice !== undefined &&
      (typeof property.price !== "number" || property.price > criteria.maxPrice)
    ) {
      isMatch = false;
    }
    if (
      criteria.minBedrooms !== undefined &&
      property.bedrooms < criteria.minBedrooms
    ) {
      isMatch = false;
    }
    if (isMatch) {
      results.push(property);
    }
  });
  return results;
};

// const medianPropertyPrice = () => {
//   const propertiesWithValidPrice = getPropertiesWithValidPrice();
//   if (propertiesWithValidPrice.length === 0) return 0;
//   const sortedProperties = propertiesWithValidPrice.sort(
//     (a, b) => a.price - b.price,
//   );
//   const middleIndex = Math.floor(sortedProperties.length / 2);
//   if (sortedProperties.length % 2 === 0) {
//     return (
//       (sortedProperties[middleIndex - 1].price +
//         sortedProperties[middleIndex].price) /
//       2
//     );
//   } else {
//     return sortedProperties[middleIndex].price;
//   }
// };
// const mostCommonLocation = () => {
//   const validProperties = getProperties();
//   const locationCount = validProperties.reduce((count, property) => {
//     count[property.location] = (count[property.location] || 0) + 1;
//     return count;
//   }, {});
//   return Object.keys(locationCount).reduce((mostCommon, location) => {
//     return locationCount[location] > locationCount[mostCommon]
//       ? location
//       : mostCommon;
//   });
// };
// const averagePricePerBedroom = () => {
//   const propertiesWithValidPrice = getPropertiesWithValidPrice();
//   const totalValue = propertiesWithValidPrice.reduce((total, property) => {
//     if (propertiesWithValidPrice.length === 0) return 0;
//     return total + property.price;
//   }, 0);
//   const totalBedrooms = propertiesWithValidPrice.reduce((total, property) => {
//     if (propertiesWithValidPrice.length === 0) return 0;
//     return total + property.bedrooms;
//   }, 0);
//   return totalValue / totalBedrooms;
// };

const highestPricedByLocation = () => {
  const highestPrices: Record<string, Property> = {};
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  propertiesWithValidPrice.forEach((property) => {
    const location = property.location.toLowerCase();
    const currentHighest = highestPrices[location];

    if (
      !currentHighest ||
      (property.price ?? 0) > (currentHighest.price ?? 0)
    ) {
      highestPrices[location] = property;
    }
  });
  return highestPrices;
};
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
console.log(
  "Search properties: ",
  Array.isArray(searchResults)
    ? searchResults.map(formatProperty)
    : searchResults,
);

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
