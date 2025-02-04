import React from "react";

interface SidebarProps {
  handleLogout: () => void;
}

export default function Sidebar({ handleLogout }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-custom-light-green text-custom-green p-6">
      <h1 className="text-2xl mb-4">
        <a href="/dashboard">Dashboard</a>
      </h1>
      <ul className="space-y-4">
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/createlisting">Create Listing</a>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}
