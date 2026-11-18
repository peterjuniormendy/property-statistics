import { describe, it, expect } from "vitest";
import type { Property, RawProperty } from "./types/property";
import { PricePerBedroom } from "./properties";

describe("PricePerBedroom", () => {
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

    expect(PricePerBedroom(properties)).toEqual([
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

    expect(PricePerBedroom(properties)).toEqual([
      { id: 3, name: "Studio", pricePerBedroom: 120000 },
    ]);
  });

  //   it("should exclude properties with non-numeric prices", () => {
  //     const properties: Property[] = [
  //       {
  //         id: 4,
  //         name: "Invalid Property",
  //         location: "Leeds",
  //         price: "200000",
  //         bedrooms: 2,
  //       },
  //     ];

  //     expect(PricePerBedroom(properties)).toEqual([]);
  //   });
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

    expect(PricePerBedroom(properties)).toEqual([]);
  });
});
