"use client";
import React from "react";
import User from "@/models/UserModel";
import { User as UserType } from "@/app/components/types/user";
import { Item, Item as ItemType } from "@/app/components/types/item";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import axios from "axios";
import Sidebar from "../components/sidebar/sidebar";
import ItemCard from "../components/items/itemcard";

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [items, setItems] = useState<ItemType[]>([]);
  const [editItem, setEditItem] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/api/users/user");
        setUser(response.data.user);
        fetchItems();
      } catch (error: any) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetchUser();
  }, []);

  const fetchItems= async ()=> {
    const response2 = await axios.get("/api/items/listings");
    setItems(response2.data.item);
  }

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error: any) {
      console.error("Failed to logout", error);
    }
  };

  const handleUpdate = async(updatedData : Item)=>{
    console.log("updated", updatedData)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex text-custom-green">
        <Sidebar handleLogout={handleLogout} />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1>Welcome to your dashboard, {user?.username} </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.length === 0 ? (
              <div className="col-span-full text-center">
                <p className="text-xl text-gray-600">
                  You haven't uploaded any items yet.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <span key={item._id}>
                  <ItemCard item={item} updateItem={handleUpdate} fetchItems={fetchItems}/>
                </span>
                
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
