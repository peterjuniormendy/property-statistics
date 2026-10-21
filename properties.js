const properties = [
  {
    id: 1,
    name: "luxury bungalow",
    location: "Leenwood",
    price: 100000,
    bedrooms: 3,
    bathrooms: 2,
    type: "House",
    area: 1500,
  },
  {
    id: 2,
    name: "Rise Apartments",
    location: "leeds",
    price: "gfd",
    bedrooms: 4,
    bathrooms: 3,
    type: "House",
    area: 2000,
  },
  {
    id: 3,
    name: "running house",
    location: "birmingham",
    price: 300000,
    bedrooms: 4,
    bathrooms: 4,
    type: "Semi-detached",
    area: 250,
  },
  {
    id: 4,
    name: "mordern escape",
    location: "leeds",
    price: 400000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Studio",
    area: 3000,
  },
  {
    id: 5,
    name: "lake view",
    location: "london",
    price: 500000,
    bedrooms: 0,
    bathrooms: 0,
    type: "House",
    area: 3500,
  },
  {
    id: 6,
    name: "Runway Apartments",
    location: "sheffield",
    price: 600000,
    bedrooms: 2,
    bathrooms: 1,
    type: "Apartment",
    area: 4000,
  },
  {
    id: 7,
    name: "riverside",
    location: "sheffield",
    price: 700000,
    bedrooms: 1,
    bathrooms: 1,
    type: "House",
    area: 4500,
  },
  {
    id: 8,
    name: "palm view",
    location: "luton",
    price: 800000,
    bedrooms: 1,
    bathrooms: 1,
    type: "studio",
    area: 5000,
  },
  {
    id: 9,
    name: "bambi",
    location: "london",
    price: 900000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    area: 5500,
  },
  {
    id: 10,
    name: "Rosewood",
    location: "liverpool",
    price: 1000000,
    bedrooms: 3,
    bathrooms: 2,
    type: "Apartment",
    area: 6000,
  },
  {
    id: 11,
    name: "",
    location: "manchester",
    price: 1100000,
    bedrooms: 0,
    bathrooms: 0,
    type: "studio",
    area: 6500,
  },
  {
    id: 12,
    name: "mosaic",
    location: "manchester",
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    type: "Apartment",
    area: 7000,
  },
  {
    id: 13,
    name: "double decker",
    location: "birmingham",
    price: 1300000,
    bedrooms: 3,
    bathrooms: 2,
    type: "Semi-detached",
    area: 7500,
  },
  {
    id: 14,
    name: "sunset",
    location: "sheffield",
    price: 1400000,
    bedrooms: 3,
    bathrooms: 2,
    type: "Semi-detached",
    area: 8000,
  },
  {
    id: 15,
    name: "sunrise",
    location: "milton keynes",
    price: 1500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 8500,
  },
  {
    id: 16,
    name: "skyline",
    location: "burnley",
    price: 1600000,
    bedrooms: 1,
    bathrooms: 1,
    type: "House",
    area: 9000,
  },
  {
    id: 17,
    name: "crown estate",
    location: "newcastle",
    price: 1700000,
    bedrooms: 5,
    bathrooms: 3,
    type: "House",
    area: 9500,
  },
  {
    id: 18,
    name: "waterfront",
    location: "liverpool",
    price: 1800000,
    bedrooms: 2,
    bathrooms: 1,
    type: "Apartment",
    area: 10000,
  },
  {
    id: 19,
    name: "royal gardens",
    location: "london",
    price: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    area: 10500,
  },
  {
    id: 20,
    name: "grand estate",
    location: "huddersfield",
    price: 2000000,
    bedrooms: 4,
    bathrooms: 4,
    type: "House",
    area: 11000,
  },
];

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

const getProperties = () => {
  return properties;
};
console.log("properties:", getProperties());

const getPropertyById = (id) => {
  return properties.find((property) => property.id === id);
};
const getTotalProperties = () => {
  return properties.length;
};
const getAveragePrice = () => {
  const totalPrice = properties.reduce(
    (total, property) => total + property.price,
    0,
  );
  return totalPrice / properties.length;
};

const getCheapestProperty = () => {
  return properties.reduce((cheapest, property) => {
    return property.price < cheapest.price ? property : cheapest;
  });
};

const getMostExpensiveProperty = () => {
  return properties.reduce((mostExpensive, property) => {
    return property.price > mostExpensive.price ? property : mostExpensive;
  });
};

const getAverageBedrooms = () => {
  const totalBedrooms = properties.reduce(
    (total, property) => total + property.bedrooms,
    0,
  );
  return totalBedrooms / properties.length;
};

const filterByLocation = (location) => {
  const getPropertiesByLocation = properties.filter(
    (property) => property.location.toLowerCase() === location.toLowerCase(),
  );
  return getPropertiesByLocation;
};

const filterByPrice = (price) => {
  const getPropertiesByPrice = properties.filter(
    (property) => property.price <= price,
  );
  return getPropertiesByPrice;
};
const filterByBedrooms = (numberOfBedrooms) => {
  const getPropertiesByBedrooms = properties.filter(
    (property) => property.bedrooms === numberOfBedrooms,
  );
  return getPropertiesByBedrooms;
};
const countByPropertyType = () => {
  const propertyTypeCount = properties.reduce((count, property) => {
    count[property.type] = (count[property.type] || 0) + 1;
    return count;
  }, {});
  return propertyTypeCount;
};
const searchProperties = (searchTerm) => {
  const searchResults = properties.filter((property) => {
    return (
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return searchResults;
};
medianPropertyPrice = () => {
  const sortedProperties = properties.sort((a, b) => a.price - b.price);
  const middleIndex = Math.floor(sortedProperties.length / 2);
  if (sortedProperties.length % 2 === 0) {
    return (
      (sortedProperties[middleIndex - 1].price +
        sortedProperties[middleIndex].price) /
      2
    );
  }
};
mostCommonLocation = () => {
  const locationCount = properties.reduce((count, property) => {
    count[property.location] = (count[property.location] || 0) + 1;
    return count;
  }, {});
  return Object.keys(locationCount).reduce((mostCommon, location) => {
    return locationCount[location] > locationCount[mostCommon]
      ? location
      : mostCommon;
  });
};
averagePricePerBedroom = () => {
  const totalValue = properties.reduce(
    (total, property) => total + property.price,
    0,
  );
  const totalBedrooms = properties.reduce(
    (total, property) => total + property.bedrooms,
    0,
  );
  return totalValue / totalBedrooms;
};

highestPricedByLocation = () => {
  const highestPrices = {};
  properties.forEach((property) => {
    if (
      !highestPrices[property.location] ||
      property.price > highestPrices[property.location].price
    ) {
      highestPrices[property.location] = property;
    }
  });
  return highestPrices;
};
