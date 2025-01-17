"use client";
import { useState } from "react";
import { CATEGORIES } from "../components/types/categories";
import { Category } from "../components/types/categories";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/layout/navbar";

export default function CreateListing() {
  const router = useRouter();
  const [error, setError] = useState<string | null>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    image: null as File | null,
    category: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting form", formData);
    const { title, description, price, location, image, category } = formData;
    if (!title || !description || !price) {
      setError("Please fill in required fields");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("description", description);
    formDataToSend.append("price", price.toString());
    formDataToSend.append("location", location);
    formDataToSend.append("category", category);
    if (image) {
      formDataToSend.append("image", image);
    }
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(
        "/api/items/createlisting",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Item created :", response.data);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Failed to create listing", error);
    }
  };

  const handleLogout = async () =>{
    try {
        await axios.get("/api/users/logout");
        router.push("/");
    } catch (error: any) {
      console.error("Failed to logout", error);  
    }
  }

  return (
    <>
    <Navbar />
    <div className="flex">
      <Sidebar handleLogout={handleLogout} />
      <div className={styles.container}>
        <h1>Create a new listing</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form action="" onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              required
              type="text"
              name="title"
              id="title"
              placeholder="Enter item title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              required
              placeholder="Describe your item"
              name="description"
              id="description"
              cols={30}
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              required
              type="number"
              name="price"
              id="price"
              placeholder="0.0"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter item location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              required
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create Listing</button>
        </form>
      </div>
    </div>
    </>
  );
}
