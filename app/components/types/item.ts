import { type Category } from "./categories";

export interface Item {
  _id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  location: string;
  owner: string;
  createdAt: Date;
};