"use client";

import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiChevronUp } from "react-icons/fi";

export default function FloatingActionButtons({
  whatsappUrl = "https://api.whatsapp.com/send?phone=+966555074342",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 px-4 sm:px-6 z-40 flex justify-between w-full items-center gap-2.5 sm:gap-3 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-purple text-white shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
      >
        <FiChevronUp className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-brand-green text-white shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
      >
        <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
}
