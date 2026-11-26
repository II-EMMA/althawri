"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaList } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { TiThLargeOutline } from "react-icons/ti";
import { useFilter } from "@/context/FilterContext";

const SORT_IDS = [
  "current_price",
  "bids_count",
  "end_time",
  "year",
  "kilometers",
];

export default function HomeFilter() {
  const locale = useLocale();
  const t = useTranslations("Filter");
  const isRtl = locale === "ar";
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    viewMode,
    setViewMode,
    activeSort,
    setActiveSort,
    sortOrder,
    setSortOrder,
    handleReset,
  } = useFilter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full bg-white rounded-md shadow-sm border border-gray-100 px-4 py-3"
    >
      {/* ----------------- UNDER LG SCREEN LAYOUT (Reversed Order + Icons Hidden < md) ----------------- */}
      <div className="flex lg:hidden items-center justify-between gap-2">
        {/* First in DOM (Right in RTL / Left in LTR): Sort By Dropdown + Funnel + View Icons */}
        <div className="flex items-center gap-2.5">
          <div
            className={`hidden md:flex items-center gap-1.5 ${
              isRtl
                ? "pl-2 border-l border-gray-200"
                : "pr-2 border-r border-gray-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List View"
              className={`p-1 rounded transition-all duration-200 active:scale-90 cursor-pointer ${
                viewMode === "list"
                  ? "text-brand-green"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              <FaList className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              className={`p-1 rounded transition-all duration-200 active:scale-90 cursor-pointer ${
                viewMode === "grid"
                  ? "text-brand-green"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <TiThLargeOutline className="w-4 h-4" />
            </button>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsMobileSortOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-brand-green transition-colors cursor-pointer py-1"
            >
              <span>{t("sortBy")}</span>
              <IoMdArrowDropdown
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isMobileSortOpen ? "rotate-180" : ""
                }`}
              />
              <FiFilter className="w-4 h-4 text-brand-green" />
            </button>

            {isMobileSortOpen && (
              <div
                className={`absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1.5 z-40 ${
                  isRtl ? "start-0 text-right" : "start-0 text-left"
                }`}
              >
                {SORT_IDS.map((id) => {
                  const isActive = activeSort === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setActiveSort(id);
                        setIsMobileSortOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-brand-green/10 text-brand-green font-bold"
                          : "text-gray-700 hover:bg-gray-50 font-medium"
                      }`}
                    >
                      <span>{t(`sort.${id}`)}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Second in DOM (Left in RTL / Right in LTR): Sort Order Arrows + Reset */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSortOrder("asc")}
              aria-label="Sort Ascending"
              className={`w-7 h-7 rounded flex items-center justify-center transition-all duration-200 ease-in-out active:scale-90 cursor-pointer ${
                sortOrder === "asc"
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <IoMdArrowDropup className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setSortOrder("desc")}
              aria-label="Sort Descending"
              className={`w-7 h-7 rounded flex items-center justify-center transition-all duration-200 ease-in-out active:scale-90 cursor-pointer ${
                sortOrder === "desc"
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <IoMdArrowDropdown className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="group flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-brand-green transition-colors duration-200 active:scale-95 cursor-pointer"
          >
            <MdRefresh className="w-4 h-4 text-gray-700 group-hover:text-brand-green group-hover:-rotate-90 transition-all duration-300" />
            <span>{t("reset")}</span>
          </button>
        </div>
      </div>

      {/* ----------------- LG AND ABOVE DESKTOP LAYOUT (Unchanged) ----------------- */}
      <div className="hidden lg:flex flex-wrap items-center justify-between gap-4">
        {/* Right/Left Section: View Toggle + Sort By Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Grid / List View Switcher */}
          <div
            className={`flex items-center gap-2 ${
              isRtl
                ? "pl-2 border-l border-gray-200"
                : "pr-2 border-r border-gray-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              className={`p-1.5 rounded transition-all duration-200 active:scale-90 cursor-pointer ${
                viewMode === "grid"
                  ? "text-brand-green"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <TiThLargeOutline className="w-5 h-5 outline-none" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List View"
              className={`p-1.5 rounded transition-all duration-200 active:scale-90 cursor-pointer ${
                viewMode === "list"
                  ? "text-brand-green"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              <FaList className="w-5 h-5 outline-none" />
            </button>
          </div>

          {/* Sort Label */}
          <span
            className={`text-sm font-bold text-gray-700 ${isRtl ? "ml-1" : "mr-1"}`}
          >
            {t("sortBy")}
          </span>

          {/* Sort Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {SORT_IDS.map((id) => {
              const isActive = activeSort === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSort(id)}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-in-out active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-brand-green text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(`sort.${id}`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Left/Right Section: Asc/Desc Toggle + Reset Button */}
        <div
          className={`flex items-center gap-4 ${isRtl ? "mr-auto" : "ml-auto"}`}
        >
          {/* Ascending / Descending Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSortOrder("asc")}
              aria-label="Sort Ascending"
              className={`w-8 h-8 rounded flex items-center justify-center transition-all duration-200 ease-in-out active:scale-90 cursor-pointer ${
                sortOrder === "asc"
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <IoMdArrowDropup className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setSortOrder("desc")}
              aria-label="Sort Descending"
              className={`w-8 h-8 rounded flex items-center justify-center transition-all duration-200 ease-in-out active:scale-90 cursor-pointer ${
                sortOrder === "desc"
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <IoMdArrowDropdown className="w-5 h-5" />
            </button>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="group flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-brand-green transition-colors duration-200 active:scale-95 cursor-pointer"
          >
            <MdRefresh className="w-4 h-4 text-gray-700 group-hover:text-brand-green group-hover:-rotate-90 transition-all duration-300" />
            <span>{t("reset")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
