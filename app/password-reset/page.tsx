"use client";
import React, { useState, useEffect, Suspense } from "react";
import Navbar from "../components/layout/navbar";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

function Pwreset() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired reset token");
    }
  }, [token]);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      try {
        const response = await axios.post("/api/users/reset-password", {
          token,
          password,
        });
    
        if (response.data.success) {
          setSuccess(
            "Password reset successful. You can now login with your new password."
          );
          setError("");
        }
      } catch (error) {
        if(error)
         setError("Error resetting password. Please try again!");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form
          action=""
          onSubmit={handlePasswordChange}
          className={styles.passwordForm}
        >
          <h1 className={styles.h1}>Reset Password</h1>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <label htmlFor="password">
            New Password:
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Confirm Password:
            <input
              className={styles.input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className={styles.button} type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}

//export default Pwreset;
export default function PasswordResetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Pwreset />
    </Suspense>
  );
}
