"use client";
import { useState, useEffect } from "react";
import { Item } from "../components/types/item";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "../components/types/categories";
import axios from "axios";
import Navbar from "../components/layout/navbar";

export default function SearchPage() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    try {
      const fetchItems = async () => {
        if (searchParam.get("category"))
          params.set("category", searchParam.get("category")!);
        else if (searchParam.get("q")) {
          const q = searchParam.get("q");
          if (q) params.set("q", q);
        }
        if (params) {
          const response = await axios.get(
            `/api/items/search?${params.toString()}`
          );
          setSearchResult(response.data.filteredItems);
        }
      };
      fetchItems();
    } catch (error) {
      console.log("unable to fetch", error);
    }
  }, [searchParam]);

  const handleRadioChange = async (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    router.push(`/search?category=${value.toLowerCase()}`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex text-custom-green">
        <div className="w-64 bg-custom-light-green text-custom-green p-6">
          <h1 className="text-2xl mb-4">Categories</h1>
          {CATEGORIES.map((category) => (
            <div
              key={category}
              className=" p-1 active:bg-green-500 focus:bg-green-500"
            >
              <Link
                onClick={() => handleCategoryClick(category)}
                className={`block p-2 rounded-md ${
                  selectedCategory === category
                    ? "bg-green-500 text-white"
                    : "active:bg-green-500 focus:bg-green-500 hover:bg-green-500"
                }`}
                href={`/search?category=${category.toLowerCase()}`}
              >
                {category}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-1 p-8">
          <h1 className="text-2xl">Search Results</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {searchResult.length ? (
              searchResult.map((result) => (
                <div
                  key={result._id}
                  className="bg-white shadow-lg overflow-hidden"
                >
                  <img
                    src={`/api/images/${result.image}`}
                    alt="image"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{result.title}</h3>
                    <p className="text-gray-700">
                      {result.description.substring(0, 100)}...
                    </p>
                    <p className="text-lg">{result.price}</p>
                    <p className= {`px-2 float-right ${result.status=== 'available'? "text-green-500":"text-red-500"}`}
              >{result.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>There are no items for selected category</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
