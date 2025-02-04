import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await axios.get("/api/admin/logout");
    if (response.data.success) router.push("/admin/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold text-center mb-6">Admin</div>
      <ul>
        <li className="mb-4">
          <a
            href="/admin/dashboard"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <i className="fas fa-tachometer-alt mr-2"></i>
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a
            href="/admin/users"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <i className="fas fa-users mr-2"></i>
            Users
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <i className="fas fa-chart-line mr-2"></i>
            Analytics
          </a>
        </li>
        <li className="mb-4">
          <button
            className="flex ml-2 items-center text-gray-300 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
