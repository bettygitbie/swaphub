"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import User from "@/models/UserModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getTokenData } from "@/helpers/getTokenData";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import "./navbar.css";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  useEffect(() => {
    
    async function fetchToken() {
      try {
        const response = await fetch("/api/verifytoken");
        if(!response.ok){
          setIsAuthenticated(false)
        }
        const data = await response.json()
        if (data.tokenData) setIsAuthenticated(true);
      } catch (error: any) {
        console.log("Failed to fetch user data", error);
      }
    }
    fetchToken();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      setIsAuthenticated(false);
      router.push("/");
    } catch (error: any) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <nav className="main-nav">
      <div className="continer mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/createlisting" className="outlined-button-signup">
                <AddIcon /> Create Listing
              </Link>
              <button onClick={handleLogout} className="outlined-button-login">
                <AccountCircleIcon /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="outlined-button-signup">
                <AddIcon /> Register
              </Link>
              <Link href="/login" className="outlined-button-login">
                <AccountCircleIcon /> Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
