import React from "react";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="continer mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl text-custom-green font-bold ml-16">
          SwapHub
        </Link>
        <div className="flex items-center gap-4">
          {/* <Link
            href="/createlisting"
            className="outlined-button-signup"
          >
            <AddIcon /> Create Listing
          </Link> */}
          <Link href="/signup" className="outlined-button-signup">
            <AddIcon /> Register
          </Link>
          <Link href="/login" className="outlined-button-login">
            <AccountCircleIcon /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
