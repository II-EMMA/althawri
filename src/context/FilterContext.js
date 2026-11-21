"use client";

import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext(undefined);

export function FilterProvider({ children }) {
  const [viewMode, setViewMode] = useState("list");
  const [activeSort, setActiveSort] = useState("bids_count");
  const [sortOrder, setSortOrder] = useState("asc");

  // Existing Dropdowns
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  // New Filters State
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState("all");

  const handleReset = () => {
    setViewMode("list");
    setActiveSort("bids_count");
    setSortOrder("asc");
    setSelectedCity(null);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setSelectedCondition(null);
    setSelectedStatus("all");
    setSelectedPartner("all");
  };

  const value = {
    viewMode,
    setViewMode,
    activeSort,
    setActiveSort,
    sortOrder,
    setSortOrder,
    selectedCity,
    setSelectedCity,
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    selectedYear,
    setSelectedYear,
    selectedCondition,
    setSelectedCondition,
    selectedStatus,
    setSelectedStatus,
    selectedPartner,
    setSelectedPartner,
    handleReset,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

// In FilterContext.jsx
export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    return { viewMode: "grid" };
  }
  return context;
}
