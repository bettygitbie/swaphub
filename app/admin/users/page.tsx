"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Link from "next/link";
import styles from "../page.module.css";
import axios from "axios";
import { Item } from "@/app/components/types/item";

export default function Users() {
  const [users, setUsers] = useState<Item[]>([]);

  const fetchUsers = async () => {
    const response = await axios.get("/api/users/allusers");
    setUsers(response.data.users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className={styles.mainNav}>
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub Admin
        </Link>
      </div>
      <div className="flex bg-gray-200">
        <Sidebar />
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
            </thead>
            <tbody>
              {users.map((user) => (
              <tr className="" key={user.email}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes':'No'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
