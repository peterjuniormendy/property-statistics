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
  id: number | string | null;
  name?: string;
  location: string;
  price?: number | string | null;
  bedrooms: number;
  bathrooms?: number | string | null;
  type?: string;
  area?: number | string | null;
};
