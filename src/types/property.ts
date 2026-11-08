export type Property = {
  id: number;
  name?: string;
  location: string;
  price?: number;
  bedrooms: number;
  bathrooms?: number;
  type?: string;
  area?: number;
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
