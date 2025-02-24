"use client";
import React, { useEffect, useState } from "react";
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
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [owner,setOwner] = useState("")

  useEffect(() => {
    async function fetchItems() {
      const res = await axios.get("/api/items/item");
      setItems(res.data.items.slice(0, 3));
    }
    fetchItems();
  }, []);
  useEffect(() => {
    async function checkToken() {
      const res = await axios.get("/api/users/user");
      if (res.data.message === "User found") setIsLoggedIn(true);
    }
    checkToken();
  }, []);

  async function ownerInfo() {
    if(selectedItem){
      console.log("selected owner ",selectedItem.owner)
      const res = await axios.get("/api/items/itemowner", {params: {owner: selectedItem.owner}});
      setOwner(res.data.email)
      console.log(res);
    }
  }
  
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  const openModal = (item: Item) => {
    if (isLoggedIn) {
      setSelectedItem(item);
      ownerInfo();
      document.body.style.overflow = "hidden";
    } else {
      router.push("/login");
    }
  };
  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto";
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
              onSearch={() => handleSearch}
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
              <div
                key={item._id}
                className="bg-white shadow-lg overflow-hidden"
              >
                <img
                  src={`/api/images/${item.image}`}
                  alt="image"
                  className="w-full h-48 object-cover"
                  onClick={() => openModal(item)}
                />
                <div className="px-4 flex justify-between">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-lg float-right">{item.price}</p>
                </div>
                <p
                  className={`px-2 float-right ${
                    item.status === "available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            ))}
          </div>
          {selectedItem && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content">
                <span className="close-btn" onClick={closeModal}>
                  x
                </span>
                <h2>{selectedItem.title}</h2>
                <img
                  src={`/api/images/${selectedItem.image}`}
                  alt="image"
                  className="w-full h-48 object-cover"
                />
                <p>Description: {selectedItem.description}</p>
                <p>Price: {selectedItem.price}</p>
                <p>Contact seller:{owner}</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
