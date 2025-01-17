"use client";
import React from "react";
import User from "@/models/UserModel";
import { User as UserType } from "@/app/components/types/user";
import { Item as ItemType } from "@/app/components/types/item";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import axios from "axios";
import Sidebar from "../components/sidebar/sidebar";

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [items, setItems] = useState<ItemType[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/api/users/user");
        setUser(response.data.user);
        const response2 = await axios.get("/api/items/listings");
        setItems(response2.data.item);
      } catch (error: any) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error: any) {
      console.error("Failed to logout", error);
    }
  };

  const handleDelete= async(id:string)=>{
    const response = await axios.delete('/api/items/deleteitem')
    router.push('/dashboard')
    setItems((items)=> items.filter(item=>item._id!==id))
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
              <div
                key={item._id}
                className="bg-white shadow-lg overflow-hidden"
              >
                <img
                  src={`/api/images/${item.image}`}
                  alt="image"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-700">
                    {item.description.substring(0, 100)}...
                  </p>
                  <p className="text-lg">{item.price}</p>
                </div>
                <div className="text-sm text-gray-400">
                  <button className="mr-3 ml-3 mb-3">Edit</button>
                  <button onClick={()=>handleDelete(item._id)} className="mr-3 ml-3 mb-3">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
}
