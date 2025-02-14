"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/admin/page.module.css";
import axios from "axios";
import { Item } from "@/app/components/types/item";
import Sidebar from "../Sidebar";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState<Item[]>([]);
  let soldItems;
  let availableItems;

  const fetchUsers = async () => {
    const response = await axios.get("/api/users/allusers");
    setUsers(response.data.users);
  };
  const fetchItems = async () => {
    const response = await axios.get("/api/items/item");
    setItems(response.data.items);
  };

  useEffect(() => {
    fetchUsers();
    fetchItems();
  }, []);

  const countSold = ()=>{
    const filteredSold = items.filter(item=>item.status==='sold')
    soldItems = filteredSold.length;
  }
  countSold();

  const countAvailable = ()=>{
    const filteredSold = items.filter(item=>item.status==='available')
    availableItems = filteredSold.length;
  }
  countAvailable();

  return (
    <>
      <div className={styles.mainNav}>
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub Admin
        </Link>
      </div>
      <div className="flex h-screen bg-gray-100">
       <Sidebar />

        <div className="flex-1 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Users
              </h3>
              <p className="text-4xl text-gray-900 mt-4">{users.length}</p>
              <p className="text-sm text-gray-500">As of this month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Items Listed
              </h3>
              <p className="text-4xl text-gray-900 mt-4">{items.length}</p>
              <p className="text-sm text-gray-500">As of this month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Sold Items
              </h3>
              <p className="text-4xl text-gray-900 mt-4">{soldItems}</p>
              <p className="text-sm text-gray-500">As of this month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Available Items
              </h3>
              <p className="text-4xl text-gray-900 mt-4">{availableItems}</p>
              <p className="text-sm text-gray-500">As of this month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Latest Activity
            </h3>
            <ul>
              <li className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">User signed up</span>
                  <span className="text-sm text-gray-500">2 mins ago</span>
                </div>
              </li>
              <li className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Order #4554 shipped</span>
                  <span className="text-sm text-gray-500">10 mins ago</span>
                </div>
              </li>
              <li className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    New product added:
                  </span>
                  <span className="text-sm text-gray-500">30 mins ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
