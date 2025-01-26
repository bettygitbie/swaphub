"use client";
import { useState } from "react";
import User from "@/models/UserModel";
import Sidebar from "../components/sidebar/sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/layout/navbar";
import styles from './page.module.css'

export default function Profile() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error: any) {
      console.error("Failed to logout", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar handleLogout={handleLogout} />
        <div className={styles.container}>
          <h1>Update your profile</h1>
          <form action="" className={styles.form}>
            <div>
              <label htmlFor="fullname">Full Name:</label>
              <input
                required
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Update your name..."
              />
            </div>
            <div>
              <label htmlFor="price">Email:</label>
              <input
                required
                type="text"
                name="price"
                id="price"
                placeholder="Update your email..."
              />
            </div>
            <div>
              <label htmlFor="price">Password:</label>
              <input
                required
                type="text"
                name="price"
                id="price"
                placeholder="Update your password..."
              />
            </div>
            <button>Update</button>
          </form>
        </div>
      </div>
    </>
  );
}
