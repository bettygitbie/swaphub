import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Item } from "../types/item";

interface ItemCardProps {
  item: Item;
  updateItem: (item: Item) => void;
  fetchItems: () => void;
}

function ItemCard({ item, updateItem, fetchItems }: ItemCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState({ ...item });

  const statusClass = item.status === 'available'? "text-green-500" :"text-red-500";

  // Toggle between view mode and edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditItem({ ...item }); // Reset to original item state
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditItem((prevItem: typeof item) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleDelete = async (id: string) => {
    const response = await axios.delete("/api/items/deleteitem");
    router.push("/dashboard");
    fetchItems();
    //setItems((items) => items.filter((item) => item._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/items/${editItem._id}`, editItem); 
      updateItem(response.data);
      fetchItems();
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      {isEditing ? (
        // Edit form
        <form onSubmit={handleSubmit} className="">
          <div className="">
            <label>Name:</label>
            <input
            className="border p-1"
              type="text"
              name="title"
              value={editItem.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
             className="border p-1"
              type="text"
              name="description"
              value={editItem.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
             className="border p-1"
              type="number"
              name="price"
              value={editItem.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={editItem.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button className="border rounded-lg p-2 bg-[var(--secondary)]" type="submit">Save</button>
            <button className="border rounded-lg p-2 bg-[var(--secondary)]"  type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // Display item
        <div>
          <div key={item._id} className="bg-white shadow-lg overflow-hidden">
            <img
              src={`/api/images/${item.image}`}
              alt="image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-700">
                {item.description.substring(0, 100)}...
              </p>
              <p className="text-lg">{item.price}</p>
              <p className={statusClass}>{item.status}</p>
            </div>
            <div className="text-sm text-gray-400">
              <button onClick={handleEdit} className="float-left ml-3">
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="float-right mr-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemCard;
