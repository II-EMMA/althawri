"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { IoIosArrowDown } from "react-icons/io";
import CarCard from "@/app/components/CarCard";
import { useFilter } from "@/context/FilterContext";
import { CARDS_DATA } from "@/data/auctionsData";

export default function ShowCards() {
  const locale = useLocale();
  const t = useTranslations("Cards");
  const isRtl = locale === "ar";
  const { viewMode } = useFilter();

  const [perPage, setPerPage] = useState("15");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(true);

  const sectionRef = useRef(null);
  const dropdownRef = useRef(null);
  const transitionTimerRef = useRef(null);

  const options = ["15", "25", "35", "45"];
  const pageSize = Number(perPage) || 15;
  const totalItems = CARDS_DATA.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const shownUpToCurrentPage = Math.min(currentPage * pageSize, totalItems);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return CARDS_DATA.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize]);

  const scrollToSectionStart = useCallback(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl
      ? headerEl.getBoundingClientRect().height
      : 72;
    const offset = headerHeight + 16;

    const targetTop =
      sectionEl.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  }, []);

  const triggerSmoothSlice = (updateFn, shouldScroll = false) => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setIsFading(true);
    setCardsVisible(false);

    transitionTimerRef.current = setTimeout(() => {
      updateFn();

      requestAnimationFrame(() => {
        if (shouldScroll) {
          scrollToSectionStart();
        }
        requestAnimationFrame(() => {
          setIsFading(false);
          setCardsVisible(true);
        });
      });
    }, 180);
  };

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    triggerSmoothSlice(() => setCurrentPage(page), true);
  };

  const handlePerPageChange = (opt) => {
    setIsOpen(false);
    if (opt === perPage) return;
    triggerSmoothSlice(() => {
      setPerPage(opt);
      setCurrentPage(1);
    }, false);
  };

  const visiblePages = useMemo(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  const showLastPageBox = totalPages > 3 && !visiblePages.includes(totalPages);

  const renderCounterAndPages = () => (
    <div className="flex items-center sm:flex-nowrap flex-wrap gap-x-3 gap-y-4 justify-center">
      <p className="text-gray-700 text-sm font-bold">
        {t("showingCount", {
          current: String(shownUpToCurrentPage),
          total: String(totalItems),
        })}
      </p>

      <div className="flex items-center gap-1.5">
        {visiblePages.map((page) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`w-7 h-6 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? "bg-brand-green text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        {currentPage < totalPages && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-2 h-6 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Next
          </button>
        )}

        {showLastPageBox && (
          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            className="w-7 h-6 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            {totalPages}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-white rounded-md shadow-sm border border-gray-100 px-6 py-3 flex flex-col mt-5 w-full"
    >
      {/* Top Bar with Dropdown, Counter & Page Boxes */}
      <div className="flex flex-wrap justify-between items-center gap-3 relative mt-3">
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
                  onClick={() => handlePerPageChange(opt)}
                  className={`w-full py-1.5 text-center text-xs transition-colors cursor-pointer ${
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

        {/* Top Counter + Page Boxes */}
        {renderCounterAndPages()}
      </div>

      {/* Forced Grid Under md (< 768px), Dynamic viewMode From md (>= 768px) */}
      <div
        className={`grid grid-cols-1 gap-4 mt-6 md:hidden transition-opacity duration-300 ${
          isFading ? "opacity-40" : "opacity-100"
        }`}
      >
        {paginatedCards.map((car, idx) => (
          <div
            key={`${currentPage}-${pageSize}-${car.id}`}
            style={{ transitionDelay: `${Math.min(idx * 35, 280)}ms` }}
            className={`transition-all duration-300 ease-out ${
              cardsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <CarCard car={car} variant="sidebar" />
          </div>
        ))}
      </div>

      <div
        className={`hidden mt-6 transition-opacity duration-300 ${
          isFading ? "opacity-40" : "opacity-100"
        } ${
          viewMode === "list"
            ? "md:flex md:flex-col md:gap-3"
            : "md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4"
        }`}
      >
        {paginatedCards.map((car, idx) => (
          <div
            key={`${currentPage}-${pageSize}-${car.id}`}
            style={{ transitionDelay: `${Math.min(idx * 35, 280)}ms` }}
            className={`transition-all duration-300 ease-out ${
              cardsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>

      {/* Bottom Bar at the End of the Section */}
      <div className="my-6 pt-3 border-t border-gray-100 flex justify-start self-center">
        {renderCounterAndPages()}
      </div>
    </section>
  );
}
