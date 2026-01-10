"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import "@/styles/components/search-bar/SearchBar.scss";
import SearchIcon from "@/assets/icons/SearchIcon";
import ClearIcon from "@/assets/icons/ClearIcon";

function SearchBar() {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const [query, setQuery] = useState(searchFromUrl);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    setQuery(searchFromUrl);
  }, [searchFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `/${locale}/?search=${encodeURIComponent(query.trim())}&t=${Date.now()}`
      );
    } else {
      router.push(`/${locale}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push(`/${locale}`);
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <div className="search-bar__input-wrapper">
          <SearchIcon className="search-bar__icon" />

          <input
            type="text"
            className="search-bar__input"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <button
              type="button"
              className="search-bar__clear"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        <button type="submit" className="search-bar__button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
