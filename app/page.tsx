"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/layout/navbar";
import SearchBar from "./components/search/searchBar";
import Categories from "./components/items/categories";
import { useRouter } from "next/navigation";
import { Item } from "./components/types/item";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await axios.get("/api/items/item");
      setItems((res.data.items).slice(0,3));
    }
    fetchItems();
  }, []);
  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("Searching for", searchQuery);
    router.push(`/search?q=${searchQuery}`)
    //console.log(response)
  };
  

  return (
    <>
    <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-custom-light-green text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-custom-green md:text-5xl font-bold mb-6 text-center">
              Find Amazing Deals Near You
            </h2>
            {/* SearchBar */}
            <SearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>
        </section>
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl text-custom-green font-semibold mb-6">
            Browse Categories
          </h2>
          <Categories />
        </section>
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl text-custom-green font-semibold mb-6">
            Featured Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white shadow-lg overflow-hidden">
              <img
                src={`/api/images/${item.image}`}
                alt="image"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-lg float-right">{item.price}</p>
              </div>
            </div>
          ))}
          </div>
        </section>
      </main>
      {/* RecentItems */}
    </>
  );
}
