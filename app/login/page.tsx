"use client";
import React, { useEffect, useState } from "react";
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
  const [error,setError] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try { 
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      router.push("/dashboard");
    } catch (error: any) {
      setError(`Email or password incorrect!`)
      //console.error("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
   <Navbar />
    <div className={styles.container}>
      <form className={styles.loginForm}>
        {error ? <p style={{color:'red'}}>{error}</p> : ""}
        <h1 className={styles.h1}>{loading ? "Processing..." : "Login"}</h1>

        <label htmlFor="email">Email:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
        <button className={styles.button} onClick={onSubmit}>
          Login
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
