import { type Category } from "./categories";

export type Item = {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  timePosted: Date;
  location: string;
  seller: string;
};