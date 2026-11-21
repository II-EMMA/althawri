"use client";

import Link from "next/link";
import FilterDropdown from "./FilterDropdown";
import GreenBtn from "./GreenBtn";
import { useFilter } from "@/context/FilterContext";

export default function FilterForm({ filterData, labels }) {
  // Pull filter states and setters from global context
  const {
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
  } = useFilter();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Submitting Filters:", {
      city: selectedCity,
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      condition: selectedCondition,
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row items-center gap-2.5 w-full"
    >
      <Link href="/auctions">
        <GreenBtn type="submit" className="py-2.5 px-15">
          {labels.search}
        </GreenBtn>
      </Link>

      {/* Dropdown Fields wired to global context */}
      <FilterDropdown
        label={labels.condition}
        options={filterData.conditions}
        selected={selectedCondition}
        onSelect={setSelectedCondition}
      />

      <FilterDropdown
        label={labels.year}
        options={filterData.years}
        selected={selectedYear}
        onSelect={setSelectedYear}
      />

      <FilterDropdown
        label={labels.model}
        options={filterData.models}
        selected={selectedModel}
        onSelect={setSelectedModel}
      />

      <FilterDropdown
        label={labels.brand}
        options={filterData.brands}
        selected={selectedBrand}
        onSelect={setSelectedBrand}
      />

      <FilterDropdown
        label={labels.city}
        options={filterData.cities}
        selected={selectedCity}
        onSelect={setSelectedCity}
      />
    </form>
  );
}
