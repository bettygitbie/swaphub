export const CATEGORIES = [
    "Electronics",
    "Furniture",
    "Vehicles",
    "Clothing",
    "Books",
    "Sports",
    "Home & Garden",
  ] as const;

  export type Category = typeof CATEGORIES[number];