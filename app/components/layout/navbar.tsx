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
      router.replace("/");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to logout" + error);
    }
  };
const handleToggleMenu=() =>{
    setIsMobileMenuOpen(!isMobileMenuOpen);
}

  return (
    <nav className="main-nav">
      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub
        </Link>
        <button
          className="mobile-menu-toggle"
          onClick={handleToggleMenu}
        >
          &#9776;
        </button>
        <div
          className={`nav-links ${
            isMobileMenuOpen ? "mobile-menu flex items-center gap-4" : "flex items-center gap-4"
          }`}
        >
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
      {isMobileMenuOpen && (
        <div className="mobile-menu-content">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="mobile-menu-item">
                <DashboardIcon /> Dashboard
              </Link>
              <Link href="/createlisting" className="mobile-menu-item">
                <AddIcon /> Create Listing
              </Link>
              <button onClick={handleLogout} className="mobile-menu-item">
                <AccountCircleIcon /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="mobile-menu-item">
                <AddIcon /> Register
              </Link>
              <Link href="/login" className="mobile-menu-item">
                <AccountCircleIcon /> Login
              </Link>
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </nav>
  );
}
