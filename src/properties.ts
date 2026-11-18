import { properties } from "./data";
import type { Criteria } from "./types/criteria";
import type { Property, RawProperty } from "./types/property";

export const isValidProperty = (
  property: RawProperty,
): property is Property => {
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

export const toProperty = (raw: Property): Property => {
  return {
    ...raw,
    price: typeof raw.price === "number" ? raw.price : undefined,
    bathrooms: typeof raw.bathrooms === "number" ? raw.bathrooms : undefined,
    area: typeof raw.area === "number" ? raw.area : undefined,
  };
};

export const isObject = (obj: object) => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

export const isEmpty = (obj: object) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const formatProperty = (property: Property) => {
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

export const getProperties = (properties: RawProperty[]) => {
  const validProperties = properties
    .filter((property) => isValidProperty(property))
    .map((validProperty) => toProperty(validProperty));
  return validProperties;
};

export const getInvalidProperties = () => {
  const invalidProperties = properties.filter(
    (property) => !isValidProperty(property),
  );
  return invalidProperties;
};

export const getPropertyById = (id: number) => {
  const validProperties = getProperties(properties);
  return validProperties.find((property) => property.id === id);
};

export const getTotalProperties = () => {
  const validProperties = getProperties(properties);
  return validProperties.length;
};

export const getPropertiesWithValidPrice = (properties: RawProperty[]) => {
  const validProperties = getProperties(properties);
  const propertiesWithValidPrice = validProperties.filter(
    (property) =>
      property.price !== undefined &&
      typeof property.price === "number" &&
      property.price >= 0,
  );
  return propertiesWithValidPrice;
};

export const getAveragePrice = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
  if (propertiesWithValidPrice.length === 0) return 0;

  const totalPrice = propertiesWithValidPrice.reduce(
    (total, property) =>
      property.price !== undefined ? total + property.price : total,
    0,
  );
  return totalPrice / propertiesWithValidPrice.length;
};

export const getCheapestProperty = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
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

export const getMostExpensiveProperty = () => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
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

export const getAverageBedrooms = () => {
  const validProperties = getProperties(properties);
  if (validProperties.length === 0) return 0;
  const totalBedrooms = validProperties.reduce(
    (total, property) => total + property.bedrooms,
    0,
  );
  return (totalBedrooms / validProperties.length).toFixed(1);
};

export const filterByLocation = (location: string) => {
  const validProperties = getProperties(properties);
  const getPropertiesByLocation = validProperties.filter(
    (property) => property.location.toLowerCase() === location.toLowerCase(),
  );
  return getPropertiesByLocation;
};

export const filterByPrice = (price: number) => {
  const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
  const getPropertiesByPrice = propertiesWithValidPrice.filter(
    (property) => property.price !== undefined && property.price <= price,
  );
  return getPropertiesByPrice;
};

export const filterByBedrooms = (numberOfBedrooms: number) => {
  const validProperties = getProperties(properties);
  const getPropertiesByBedrooms = validProperties.filter(
    (property) => property.bedrooms >= numberOfBedrooms,
  );
  return getPropertiesByBedrooms;
};

export const countByPropertyType = () => {
  const validProperties = getProperties(properties);
  const counts: Record<string, number> = {};
  validProperties.forEach((property) => {
    const type = (property.type || "no type").toLowerCase();
    counts[type] = (counts[type] ?? 0) + 1;
  });

  return counts;
};

export const searchProperties = (criteria: Criteria) => {
  if (!isObject(criteria)) return [];
  const validProperties = getProperties(properties);
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

// export const medianPropertyPrice = () => {
//   const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
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
// export const mostCommonLocation = () => {
//   const validProperties = getProperties(properties);
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
//   const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
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

export const highestPricedByLocation = () => {
  const highestPrices: Record<string, Property> = {};
  const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
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

// week-02 friday.test exercise
export function pricePerBedroom(
  properties: Property[],
): { id: number; name?: string; pricePerBedroom: number }[] {
  const pricePerBedroom: {
    id: number;
    name?: string;
    pricePerBedroom: number;
  }[] = [];
  const propertiesWithValidPrice = getPropertiesWithValidPrice(properties);
  if (propertiesWithValidPrice.length === 0) return [];
  propertiesWithValidPrice.forEach((property) => {
    const id = property.id;
    const name = property.name ? property.name : "No name";
    const result =
      property.bedrooms === 0 && property.price !== undefined
        ? Number(property.price.toFixed(2))
        : property.price !== undefined
          ? Number((property.price / property.bedrooms).toFixed(2))
          : 0;
    const prop = {
      id: id,
      name: name,
      pricePerBedroom: result,
    };
    pricePerBedroom.push(prop);
  });

  return pricePerBedroom;
}
