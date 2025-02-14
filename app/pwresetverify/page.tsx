"use client";
import React, { useState } from "react";
import Navbar from "../components/layout/navbar";
import styles from "./page.module.css";
import axios from "axios";

function Passwordreset() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/pwresetverify", { email });
      if (response.data.message) {
        setMessage(
          "If you provided an email on file, a password reset link has been sent to your email address."
        );
      } else {
        setShowError('An error occurred while sending the email.')
      }
    } catch (error) {
      setShowError('Error sending the password reset email'+ error)
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
       
        <form onSubmit={handleSubmit} className={styles.passwordForm}>
        {message && <p className="text-green-500">{message}</p>}
        {showError && <p className="text-red-500">{showError}</p>}
          <h1>Enter your email:</h1>
          <input
            type="email"
            className={styles.input}
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.button}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Passwordreset;
