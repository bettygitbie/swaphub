"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    const category = params.get("category");
    //console.log(category);
    try {
      const fetchItems = async () => {
        if (category) {
          const response = await axios.get(`/api/search?category=${category}`);
          console.log(response.data);
          setSearchResult(response.data);
        }
      };
      fetchItems();
    } catch (error) {
      console.log("unable to fetch", error);
    }
  }, [searchResult]);

  return (
    <div>
      <h1>Search Results</h1>
      {searchResult.map((result) => (
        <p key={result}>{result}</p>
      ))}
    </div>
  );
}
