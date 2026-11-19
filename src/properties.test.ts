import { describe, it, expect } from "vitest";
import type { Property, RawProperty } from "./types/property";
import {
  pricePerBedroom,
  getPropertiesWithValidPrice,
  isValidProperty,
  toProperty,
} from "./properties";

describe("isValidProperty", () => {
  it("rejects a text id", () => {
    const property: RawProperty = {
      id: "as20",
      location: "Leeds",
      bedrooms: 2,
    };
    expect(isValidProperty(property)).toBe(false);
  });

  it("reject an empty id", () => {
    const property: RawProperty = {
      id: "",
      location: "Leeds",
      bedrooms: 2,
    };
    expect(isValidProperty(property)).toBe(false);
  });

  it("reject negative numeric bedrooms", () => {
    const property: RawProperty = {
      id: 1,
      location: "Leeds",
      bedrooms: -2,
    };
    expect(isValidProperty(property)).toBe(false);
  });

  it("accept valid properties", () => {
    const property: Property = {
      id: 1,
      name: "luxury bungalow",
      location: "Leenwood",
      price: 100000,
      bedrooms: 3,
      bathrooms: 2,
      type: "House",
      area: 1500,
    };
    expect(isValidProperty(property)).toBe(true);
  });
});

describe(toProperty, () => {
  it("should accept undefined price as undefined", () => {
    const properties: Property[] = [
      {
        id: 1,
        name: "Property A",
        location: "Leeds",
        price: undefined,
        bedrooms: 2,
      },
    ];

    expect(toProperty(properties[0]!)).toEqual({
      id: 1,
      name: "Property A",
      location: "Leeds",
      price: undefined,
      bedrooms: 2,
    });
  });

  it("should keep price of 0 as 0", () => {
    const properties: Property[] = [
      {
        id: 1,
        name: "Property A",
        location: "Leeds",
        price: 0,
        bedrooms: 2,
      },
    ];

    expect(toProperty(properties[0]!)).toEqual({
      id: 1,
      name: "Property A",
      location: "Leeds",
      price: 0,
      bedrooms: 2,
    });
  });
});

describe("pricePerBedroom", () => {
  it("should calculate the price per bedroom", () => {
    const properties: Property[] = [
      {
        id: 1,
        name: "Property A",
        location: "Leeds",
        price: 200000,
        bedrooms: 2,
      },
      {
        id: 2,
        name: "Property B",
        location: "Manchester",
        price: 300000,
        bedrooms: 3,
      },
    ];

    expect(pricePerBedroom(properties)).toEqual([
      { id: 1, name: "Property A", pricePerBedroom: 100000.0 },
      { id: 2, name: "Property B", pricePerBedroom: 100000.0 },
    ]);
  });

  it("should return the original price when bedrooms are zero", () => {
    const properties: Property[] = [
      {
        id: 3,
        name: "Studio",
        location: "Leeds",
        price: 120000,
        bedrooms: 0,
      },
    ];

    expect(pricePerBedroom(properties)).toEqual([
      { id: 3, name: "Studio", pricePerBedroom: 120000 },
    ]);
  });

  it("should exclude properties with non-numeric prices", () => {
    const properties: RawProperty[] = [
      {
        id: 4,
        name: "Invalid Property",
        location: "Leeds",
        price: "200000",
        bedrooms: 2,
      },
    ];

    expect(getPropertiesWithValidPrice(properties)).toEqual([]);
  });
  it("should exclude properties with negative prices", () => {
    const properties: Property[] = [
      {
        id: 5,
        name: "Negative Price",
        location: "Leeds",
        price: -50000,
        bedrooms: 2,
      },
    ];

    expect(pricePerBedroom(properties)).toEqual([]);
  });
});
