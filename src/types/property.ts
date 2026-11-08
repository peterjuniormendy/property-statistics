export type Property = {
  id: number;
  name?: string;
  location: string;
  price?: number | undefined;
  bedrooms: number;
  bathrooms?: number | undefined;
  type?: string;
  area?: number | undefined;
};

export type RawProperty = {
  id: number | string | undefined;
  name?: string;
  location: string;
  price?: number | string | undefined;
  bedrooms: number;
  bathrooms?: number | string | undefined;
  type?: string;
  area?: number | string | undefined;
};

export type Counts = {
  house: number;
  apartment: number;
  studio: number;
  "semi-detached": number;
  "no type": number;
};
