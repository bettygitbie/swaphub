"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "./navbar.css";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/verifytoken");
        if (!response.ok) {
          setIsAuthenticated(false);
        }
        const data = await response.json();
        if (data.tokenData) setIsAuthenticated(true);
      } catch (error) {
        toast.error("Failed to fetch user data" + error);
      }
    }
    fetchToken();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout" + error);
    }
  };

  return (
    <nav className="main-nav">
      <div className="continer mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub
        </Link>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          &#9776;
        </button>
        <div className={`flex items-center gap-4 ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="outlined-button-signup">
                <DashboardIcon /> Dashboard
              </Link>
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
      <ToastContainer />
    </nav>
  );
}
