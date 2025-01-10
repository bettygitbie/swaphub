"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import User from "@/models/UserModel";
import axios from "axios";
import { useRouter } from "next/navigation";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import "./navbar.css";


export default function Navbar() {
const router = useRouter();
  const [user, setUser] = useState<typeof User | null>(null);
  useEffect(() => { 
    async function fetchUser() {
      try {
        const response = await axios.get("/api/users/user");
        console.log(response.data);
        setUser(response.data.user);
      } catch (error: any) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetchUser();
  }, [])

   const handleLogout = async () => {
      try {
          await axios.get("/api/users/logout");
          router.push("/");
      } catch (error: any) {
        console.error("Failed to logout", error);  
      }
    }

  return (
    <nav className="border-b bg-background">
      <div className="continer mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub
        </Link>
        <div className="flex items-center gap-4">
        {user && <Link
          href="/createlisting"
          className="outlined-button-signup"
        >
          <AddIcon /> Create Listing
        </Link>}
         { !user && <Link href="/signup" className="outlined-button-signup">
            <AddIcon /> Register
          </Link>}
          {user ? (<button onClick={handleLogout} className="outlined-button-login">
            <AccountCircleIcon /> Logout
          </button>) :(<Link href="/login" className="outlined-button-login">
            <AccountCircleIcon /> Login
          </Link>)}
        </div>
      </div>
    </nav>
  );
}
