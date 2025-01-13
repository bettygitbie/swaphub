import React from "react";
import { Tag } from "lucide-react";
import "./categories.css";
import { CATEGORIES, Category } from "../types/categories";
import Link from "next/link";

export default function Categories({ handleCategory }) {

  const handleCat = (category : Category)=>{
    handleCategory(category);
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {CATEGORIES.map((category) => (
        // <Link  href={`/search?category=${category.toLowerCase()}`}
        // > </Link>
          <button
          key={category}
            className="categoriesBtn"
            onClick={() => handleCat(category)}
          >
            <Tag /> <Link href={`/search?category=${category.toLowerCase()}`}>{category}</Link>
          </button>
        
      ))}
    </div>
  );
}
