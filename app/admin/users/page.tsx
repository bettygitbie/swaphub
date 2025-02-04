"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Link from "next/link";
import styles from "../page.module.css";
import axios from "axios";
import { User } from "@/app/components/types/user";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await axios.get("/api/users/allusers");
    setUsers(response.data.users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    const confirmDelete = confirm(
      "DELETE ACTION! Deleting user will delete all items posted by user. Do you want to proceed?"
    );
    if (confirmDelete) {
      const response = await axios.delete(`/api/admin/deleteuser/${userId}`);
      console.log(response);
      if(response.status===200){
        fetchUsers();
      }else{
        console.log('error in deleting!')
      }
    } else console.log("You cancelled");
  };
  return (
    <>
      <div className={styles.mainNav}>
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub Admin
        </Link>
      </div>
      <div className="flex bg-gray-100">
        <Sidebar />
        <div>
          <h2 className="font-bold text-lg px-5">Users</h2>
          <table className="table-auto w-full mx-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th>Delete?</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b-2 border-gray-400" key={user.email}>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (<button>✅</button>):( <button
                      onClick={() => handleDelete(user._id)}
                      className="border bg-gray-400 p-1 rounded-md text-red-700 "
                    >
                      delete
                    </button>)}
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
