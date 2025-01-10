"use client";
import { useState } from "react";
import Navbar from "./components/layout/navbar";
import SearchBar from "./components/search/searchBar";
import Categories from "./components/items/categories";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e:any) => {
    e.preventDefault();
    console.log("Searching for", searchQuery);
  };

  return (
    <>
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
          <h2 className="text-2xl text-custom-green font-semibold mb-6">Browse Categories</h2>
          <Categories />
        </section>
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl text-custom-green font-semibold mb-6">Featured Items</h2>
        </section>
      </main>
      {/* RecentItems */}
    </>
  );
}
