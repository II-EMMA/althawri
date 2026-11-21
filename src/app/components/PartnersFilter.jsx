"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useFilter } from "@/context/FilterContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PARTNER_KEYS = [
  "all",
  "car_world",
  "local_bank",
  "tamwil_ariba",
  "seven_car",
  "aljabr",
];

export default function PartnersFilter() {
  const locale = useLocale();
  const t = useTranslations("Filter");
  const isRtl = locale === "ar";
  const { selectedPartner, setSelectedPartner } = useFilter();

  const scrollContainerRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setHasOverflow(el.scrollWidth > el.clientWidth + 1);
  }, []);

  useEffect(() => {
    checkOverflow();
    const el = scrollContainerRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);
    window.addEventListener("resize", checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow, isRtl, locale]);

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const amount = 180;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full bg-white rounded-md shadow-sm border border-gray-100 px-3 py-3 flex items-center gap-1.5"
    >
      {/* Left Arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label="Scroll Left"
          className="shrink-0 p-1 text-gray-500 hover:text-brand-green transition-colors cursor-pointer"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Horizontally Scrollable Partner Options */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex items-center gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PARTNER_KEYS.map((key) => {
          const isActive = selectedPartner === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPartner(key)}
              className={`whitespace-nowrap shrink-0 px-4 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-in-out active:scale-95 cursor-pointer ${
                isActive
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t(`partners.${key}`)}
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label="Scroll Right"
          className="shrink-0 p-1 text-gray-500 hover:text-brand-green transition-colors cursor-pointer"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
