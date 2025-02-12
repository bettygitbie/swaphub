"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";
import Navbar from "../components/layout/navbar";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!emailRegex.test(user.email)) {
      setShowError("Please enter a valid email address.");
      setUser({ email: "", password: "" });
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        toast.success(response.data.message);
        router.push("/dashboard");
      } catch (error: any) {
        setShowError(error.response.data.message);
        if (error.response) {
          toast.error(error.response.data.message || "Something went wrong");
        } 
      } finally {
        setUser({ email: "", password: "" });
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.loginForm}>
          {showError ? <p style={{ color: "red" }}>{showError}</p> : ""}
          <ToastContainer />
          <h1 className={styles.h1}>{loading ? "Processing..." : "Login"}</h1>

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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button className={styles.button} disabled={buttonDisabled} onClick={onSubmit}>
            {loading? "Processing..." : "Login"}
          </button>
          <div className={styles.footer}>
            <p>
              Don't have an account? <Link href="/signup">Register</Link>
            </p>
            <p>
              <Link href="/pwresetverify">Forgot password?</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
