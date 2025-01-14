"use client";
import { useState, useEffect } from "react";
import { Item } from "../components/types/item";
import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES } from "../components/types/categories";
import axios from "axios";

export default function SearchPage() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);

    try {
      const fetchItems = async () => {
        if (searchParam.get("category"))
          params.set("category", searchParam.get("category")!);
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

  const handleRadioChange = async (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/search?category=${value.toLowerCase()}`)
  };

  return (
    <div className="min-h-screen flex text-custom-green">
      <div className="w-64 bg-custom-light-green text-custom-green p-6">
        <h1 className="text-2xl mb-4">Categories</h1>
        <ul className="space-y-4">
          {CATEGORIES.map((category) => (
            <li key={category} className="mr-5">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedOption === category}
                onChange={() => {
                  handleRadioChange(category);
                }}
              />
              <span className="ml-3">{category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-8">
        <h1>Search Results</h1>
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
                </div>
              </div>
            ))
          ) : (
            <p>There are no items for this category</p>
          )}
        </div>
      </div>
    </div>
  );
}
