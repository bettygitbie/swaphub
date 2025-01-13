"use client"
import React from "react";
import "./searchBar.css";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
    query: string;
    onQueryChange: (query: string) => void;
    onSearch: () => void;
    }
 
export default function SearchBar({query, onQueryChange, onSearch}:SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto flex gap-2">
      <form className="relative flex-1" onSubmit={onSearch}>
        <Search className="absolute left-3 top-3 text-gray-400"/>
        <input
          type="text"
          placeholder="Search for anything..."
          value={query}
          className="pl-10 h-12 w-full rounded-lg focus:outline-none text-black"
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </form>
    </div>
  );
}
