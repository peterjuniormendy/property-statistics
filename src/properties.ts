import { properties } from "./data";
import type { Property } from "./types/property";

const isValidProperty = (property) => {
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

const isObject = (obj) => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

const isEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

const formatProperty = (property) => {
  if (!isObject(property)) return "Invalid property format.";
  if (isEmpty(property)) return "Empty property";
  let id = property.id ? `#${property.id}` : "";
  let name = property.name ? property.name : "No name";
  let propertyLocation = property.location
    ? property.location[0].toUpperCase() + property.location.slice(1)
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
      ? property.type[0].toUpperCase() + property.type.slice(1)
      : "No type";

  return `${id} ${name} - ${propertyLocation} - ${price} - ${beds} - ${baths} - ${propertyType}`;
};

const getProperties = () => {
  const validProperties = properties.filter((property) =>
    isValidProperty(property),
  );
  return validProperties;
};

const getInvalidProperties = () => {
  const invalidProperties = properties.filter(
    (property) => !isValidProperty(property),
  );
  return invalidProperties;
};

const getPropertyById = (id) => {
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
    (total, property) => total + property.price,
    0,
  );
  return totalPrice / propertiesWithValidPrice.length;
};

const getCheapestProperty = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  if (propertiesWithValidPrice.length === 0) return null;
  const cheapestProperty = propertiesWithValidPrice.reduce(
    (cheapest, property) =>
      property.price < cheapest.price ? property : cheapest,
  );
  return cheapestProperty;
};

const getMostExpensiveProperty = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  if (propertiesWithValidPrice.length === 0) return null;
  const mostExpensiveProperty = propertiesWithValidPrice.reduce(
    (mostExpensive, property) =>
      property.price > mostExpensive.price ? property : mostExpensive,
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

const filterByLocation = (location) => {
  const validProperties = getProperties();
  const getPropertiesByLocation = validProperties.filter(
    (property) => property.location.toLowerCase() === location.toLowerCase(),
  );
  return getPropertiesByLocation;
};

const filterByPrice = (price) => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  const getPropertiesByPrice = propertiesWithValidPrice.filter(
    (property) => property.price <= price,
  );
  return getPropertiesByPrice;
};

const filterByBedrooms = (numberOfBedrooms) => {
  const validProperties = getProperties();
  const getPropertiesByBedrooms = validProperties.filter(
    (property) => property.bedrooms >= numberOfBedrooms,
  );
  return getPropertiesByBedrooms;
};

const countByPropertyType = () => {
  const validProperties = getProperties();
  const counts = {};
  validProperties.forEach((property) => {
    const type = (property.type || "no type").toLowerCase();
    if (type in counts) {
      counts[type] += 1;
    } else {
      counts[type] = 1;
    }
  });

  return counts;
};

const searchProperties = (criteria) => {
  if (!isObject(criteria))
    return "Invalid search term. Please provide an object.";
  const validProperties = getProperties();
  const results = [];
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
  const highestPrices = {};
  const propertiesWithValidPrice = getPropertiesWithValidPrice();
  propertiesWithValidPrice.forEach((property) => {
    let location = property.location.toLowerCase();
    if (
      !highestPrices[location] ||
      property.price > highestPrices[location].price
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
console.log("Get cheapest property: ", formatProperty(getCheapestProperty()));
console.log(
  "Get most expensive property: ",
  formatProperty(getMostExpensiveProperty()),
);
console.log("Count properties by type: ", countByPropertyType());
console.log(
  "Search properties: ",
  searchProperties({ maxPrice: 300000 }).map(formatProperty),
);

console.log(
  "Filter property by locaiton",
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
