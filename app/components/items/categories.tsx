import React from "react";
import { Tag } from "lucide-react";
import "./categories.css";
import { CATEGORIES} from "../types/categories";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {CATEGORIES.map((category) => (
        <Link  key={category} className="categoriesBtn" href={`/search?category=${category.toLowerCase()}`}>
          <button >
            <Tag />
            {category}
          </button>
        </Link>
      ))}
    </div>
  );
}
