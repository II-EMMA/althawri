"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IoIosArrowDown } from "react-icons/io";
import CarCard from "@/app/components/CarCard";
import { useFilter } from "@/context/FilterContext";
import { CARDS_DATA } from "@/data/auctionsData";

export default function ShowCards() {
  const locale = useLocale();
  const t = useTranslations("Cards");
  const isRtl = locale === "ar";
  const { viewMode } = useFilter(); // Consumes viewMode ('grid' | 'list') from context

  const [perPage, setPerPage] = useState("15");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ["15", "25", "35", "45"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-white rounded-md shadow-sm border border-gray-100 px-6 py-3 flex flex-col mt-5 w-full"
    >
      {/* Top Bar with Dropdown & Item Counter */}
      <div className="flex justify-between items-center relative">
        {/* Dropdown Toggle */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex gap-x-1 items-center cursor-pointer select-none"
          >
            <p className="text-gray-700 text-sm font-bold">{t("show")}</p>
            <IoIosArrowDown
              className={`transition-transform duration-200 text-gray-600 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div
              className={`absolute top-full mt-1 w-16 bg-white border border-gray-200 rounded shadow-md z-50 overflow-hidden ${
                isRtl ? "right-0" : "left-0"
              }`}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setPerPage(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full py-1.5 text-center text-xs transition-colors ${
                    perPage === opt
                      ? "bg-brand-green/10 text-brand-green font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Counter Text */}
        <p className="text-gray-700 text-sm font-bold">
          {t("showingCount", { current: "155", total: "155" })}
        </p>
      </div>

      {/* Forced Grid Under md (< 768px), Dynamic viewMode From md (>= 768px) */}
      <div className="grid grid-cols-1 gap-4 mt-6 md:hidden">
        {CARDS_DATA.map((car) => (
          <CarCard key={car.id} car={car} variant="sidebar" />
        ))}
      </div>

      <div
        className={`hidden mt-6 ${
          viewMode === "list"
            ? "md:flex md:flex-col md:gap-3"
            : "md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4"
        }`}
      >
        {CARDS_DATA.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
