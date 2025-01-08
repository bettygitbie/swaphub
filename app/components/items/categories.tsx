import React from "react";
import { Tag } from "lucide-react";
import "./categories.css";
import { CATEGORIES } from "../types/categories";

export default function Categories() {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {CATEGORIES.map((category) => (
        <button key={category} className="categoriesBtn">
          <Tag /> {category}
        </button>
      ))}
    </div>
  );
}
