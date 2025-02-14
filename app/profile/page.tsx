"use client";
import Sidebar from "../components/sidebar/sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer,toast } from "react-toastify";
import Navbar from "../components/layout/navbar";
import styles from './page.module.css'
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const handleUpdate = async () =>{
    await axios.post('/api/users/profile')
      .then()
      .catch()
  }
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout"+ error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar handleLogout={handleLogout} />
        <div className={styles.container}>
          <ToastContainer />
          <h1>Update your profile</h1>
          <form action="" className={styles.form}>
            <div>
              <label htmlFor="fullname">Full Name:</label>
              <input
                required
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Update your name..."
              />
            </div>
            <div>
              <label htmlFor="price">Email:</label>
              <input
                required
                type="text"
                name="price"
                id="price"
                placeholder="Update your email..."
              />
            </div>
           <div><p>Reset your password <Link href='/pwresetverify'>here</Link> .</p></div>
            <button onClick={handleUpdate}>Update</button>
          </form>
        </div>
      </div>
    </>
  );
}
