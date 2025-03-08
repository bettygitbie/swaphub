"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import styles from "./page.module.css";
import Navbar from "../components/layout/navbar";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState("");
  //const [passwordError, setPasswordError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!emailRegex.test(user.email)) {
      setShowError("Please enter a valid email address.");
    } else {
      if(user.password.length < 8){
        setShowError("Password must be at least 8 characters long.");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        if (response.status === 200) {
          router.push("/login");
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        setShowError(error.response.data.message);
        toast.error("Signup failed", error.response.data.message);
        /* eslint-enable @typescript-eslint/no-explicit-any */
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.signupForm}>
          {showError ? <p style={{ color: "red" }}>{showError}</p> : ""}
          <ToastContainer />
          <h1 className={styles.h1}>
            {loading ? "Processing..." : "Create Account"}
          </h1>
          <label htmlFor="username">Username:</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            minLength={8}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <button
            className={styles.button}
            disabled={buttonDisabled}
            onClick={onSubmit}
          >
            {loading ? "Processing..." : "Signup"}
          </button>
          <div className={styles.footer}>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
