"use client"
import React, {useState,useEffect} from "react";
import Navbar from "../components/layout/navbar";
import Link from "next/link";
import styles from "./page.module.css";
import axios from "axios";

export default function Admin() {
    const [users,setUsers]=useState([])
    const [items,setItems]=useState([])

    const fetchUsers = async ()=>{
        const response = await axios.get('/api/users/allusers')
        setUsers(response.data.users)
    }
    const fetchItems = async ()=>{
        const response = await axios.get('/api/items/item')
        setItems(response.data.items)
    }

    useEffect(()=>{
        fetchUsers();
        fetchItems();
    },[])

  return (
    <>
      <div className={styles.mainNav}>
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub Admin
        </Link>
      </div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4">
          <div className="text-2xl font-bold text-center mb-6">Admin</div>
          <ul>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <i className="fas fa-tachometer-alt mr-2"></i>
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <i className="fas fa-users mr-2"></i>
                Users
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <i className="fas fa-cogs mr-2"></i>
                Settings
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <i className="fas fa-chart-line mr-2"></i>
                Analytics
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-white p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">Admin</div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                <i className="fas fa-user-circle mr-2"></i> Profile
              </button>
            </div>
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
                Pending Orders
              </h3>
              <p className="text-4xl text-gray-900 mt-4">120</p>
              <p className="text-sm text-gray-500">To be processed</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Latest Activity
            </h3>
            <ul>
              <li className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">User John Doe signed up</span>
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
                    New product added: "Wireless Headphones"
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


