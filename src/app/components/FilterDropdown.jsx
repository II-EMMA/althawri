"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLocale } from "next-intl";
import gsap from "gsap";

export default function FilterDropdown({ label, options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const arrowRef = useRef(null);
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP animations for dropdown menu & arrow rotation
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        autoAlpha: 1,
        y: 0,
        scaleY: 1,
        duration: 0.25,
        ease: "power2.out",
        display: "block",
      });
      gsap.to(arrowRef.current, {
        rotate: 180,
        duration: 0.25,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        y: -8,
        scaleY: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = "none";
        },
      });
      gsap.to(arrowRef.current, {
        rotate: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="relative flex-1 min-w-[130px]"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-11 px-3.5 bg-white border border-gray-200 rounded-md flex items-center justify-between text-gray-700 text-xs font-semibold hover:border-gray-300 transition-colors"
      >
        <span
          className={`truncate flex-1 ${isRtl ? "text-right" : "text-left"}`}
        >
          {selected || label}
        </span>
        <div
          ref={arrowRef}
          className="text-gray-400 text-sm flex-shrink-0 ml-2"
        >
          <FiChevronDown />
        </div>
      </button>

      {/* Animated Options Menu */}
      <div
        ref={menuRef}
        style={{ display: "none", opacity: 0, transformOrigin: "top center" }}
        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-56 overflow-y-auto"
      >
        {options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-xs ${isRtl ? "text-right" : "text-left"} hover:bg-gray-50 transition-colors block border-b border-gray-50 last:border-none ${
              selected === option
                ? "font-bold text-brand-green bg-gray-50"
                : "text-gray-700 font-medium"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
