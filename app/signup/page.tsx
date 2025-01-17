"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error.message);
    } finally {
      setLoading(false);
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
        />
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
          Signup
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
