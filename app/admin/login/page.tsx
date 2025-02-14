"use client";
import React, { useState } from "react";
import styles from "@/app/admin/page.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });
  const [showError, setShowError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/login", admin);
      console.log(response);
      if(response.data.success){
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setShowError(`Username or password incorrect!`);
    }
  };
  return (
    <>
      <div className={styles.mainNav}>
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub Admin
        </Link>
      </div>
      <div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {showError && <p className="text-red-600">{showError}</p>}
          <h1 className="font-bold ">Admin Login</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            className="border m-2"
            value={admin.username}
            onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="border m-2"
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
          <button className="border p-2 bg-custom-light-green rounded-md">Login</button>
        </form>
      </div>
    </>
  );
}
