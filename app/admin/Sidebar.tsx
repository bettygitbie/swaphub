import * as React from "react";

export default function Sidebar() {

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
          <a
            href="#"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
