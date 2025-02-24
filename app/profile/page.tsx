"use client";
import Sidebar from "../components/sidebar/sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/layout/navbar";
import styles from "./page.module.css";
import Link from "next/link";
import type { User } from "../components/types/user";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await axios.get("/api/users/user");
      console.log(res.data);
      setUser(res.data.user);
    }
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .patch("/api/users/profile", user)
      .then((response) => {
        if (response.status === 200) {
          toast.success("User update success!");
        }
      })
      .catch((error) => toast.error(error));
  };
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout" + error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [name]: value,
        };
      } else {
        return prevUser;
      }
    });
  };
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar handleLogout={handleLogout} />
        <div className={styles.container}>
          <ToastContainer />
          <h1>Update your profile</h1>
          <form action="" onSubmit={handleUpdate} className={styles.form}>
            <div>
              <label htmlFor="fullname">Preferred Name/Username:</label>
              <input
                required
                type="text"
                name="username"
                id="fullname"
                value={user?.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={user?.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>
                Reset your password{" "}
                <Link href="/pwresetverify">
                  <button>here</button>
                </Link>{" "}
                .
              </p>
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  );
}
