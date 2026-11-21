"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { FiX, FiChevronDown } from "react-icons/fi";
import CampanyLogo from "@/assets/images/white-logo.svg";
import gsap from "gsap";

function CountryFlagSvg({ code }) {
  switch (code) {
    case "+966": // Saudi Arabia
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="24" height="16" fill="#165B33" />
          <path
            d="M5 10.5h14M16 7.5l1.2 1-1.2 1"
            stroke="#fff"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case "+20": // Egypt
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="24" height="5.33" y="0" fill="#CE1126" />
          <rect width="24" height="5.34" y="5.33" fill="#FFFFFF" />
          <rect width="24" height="5.33" y="10.67" fill="#000000" />
          <circle cx="12" cy="8" r="1.5" fill="#C09300" />
        </svg>
      );
    case "+93": // Afghanistan
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="8" height="16" x="0" fill="#111111" />
          <rect width="8" height="16" x="8" fill="#B5121B" />
          <rect width="8" height="16" x="16" fill="#007A3D" />
          <circle
            cx="12"
            cy="8"
            r="2.2"
            stroke="#FFFFFF"
            strokeWidth="0.9"
            fill="none"
          />
        </svg>
      );
    case "+355": // Albania
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="24" height="16" fill="#E41E20" />
          <path d="M8 9.5L12 5l4 4.5-4 2z" fill="#111111" />
        </svg>
      );
    case "+213": // Algeria
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="12" height="16" x="0" fill="#006233" />
          <rect width="12" height="16" x="12" fill="#FFFFFF" />
          <circle
            cx="12.5"
            cy="8"
            r="3"
            stroke="#D21034"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );
    case "+971": // UAE
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="18" height="5.33" x="6" y="0" fill="#00732F" />
          <rect width="18" height="5.34" x="6" y="5.33" fill="#FFFFFF" />
          <rect width="18" height="5.33" x="6" y="10.67" fill="#000000" />
          <rect width="6" height="16" x="0" y="0" fill="#FF0000" />
        </svg>
      );
    case "+965": // Kuwait
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="24" height="5.33" y="0" fill="#007A3D" />
          <rect width="24" height="5.34" y="5.33" fill="#FFFFFF" />
          <rect width="24" height="5.33" y="10.67" fill="#CE1126" />
          <polygon points="0,0 7,5.33 7,10.67 0,16" fill="#000000" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-2xs"
        >
          <rect width="24" height="16" fill="#165B33" />
          <circle cx="12" cy="8" r="3" fill="#FFFFFF" />
        </svg>
      );
  }
}

const COUNTRIES = [
  {
    code: "+966",
    label: "+966 (المملكة العربية السعودية) Saudi Arabia",
  },
  {
    code: "+20",
    label: "+20 (مصر) Egypt",
  },
  {
    code: "+93",
    label: "+93 (افغانستان) Afghanistan",
  },
  {
    code: "+355",
    label: "Albania (Shqipëri) +355",
  },
  {
    code: "+213",
    label: "+213 (الجزائر) Algeria",
  },
  {
    code: "+971",
    label: "+971 (الإمارات) UAE",
  },
  {
    code: "+965",
    label: "+965 (الكويت) Kuwait",
  },
];

export default function LoginModal({ isOpen, onClose, onOpenRegister }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("LoginModal");

  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    isClosingRef.current = false;
    setError(false);
    setSentMessage(false);
    setDropdownOpen(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (backdropRef.current && modalRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setDropdownOpen(false);

    if (backdropRef.current && modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          isClosingRef.current = false;
          onClose();
        },
      });
    } else {
      isClosingRef.current = false;
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, "");
    if (!cleaned || cleaned.length < 7) {
      setError(true);
      setSentMessage(false);
      return;
    }
    setError(false);
    setSentMessage(true);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      dir={isRtl ? "rtl" : "ltr"}
      className="fixed inset-0 z-[100] bg-black/45 flex items-center justify-center p-4"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-4xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[350px]"
      >
        {/* 1st Div in DOM -> Right side in RTL: White Login Form */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(78, 70, 128, 0.72) 0%, rgba(102, 93, 154, 0.68) 100%)",
          }}
          className="md:col-span-5 text-white p-8 flex flex-col items-center justify-center text-center gap-6"
        >
          <div className="flex flex-col items-center gap-2">
            <Image
              src={CampanyLogo}
              alt="company logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="space-y-3 w-full max-w-[200px]">
            <p className="text-xs font-semibold text-white/95">
              {t("noAccount")}
            </p>
            <button
              type="button"
              onClick={() => {
                handleClose();
                if (onOpenRegister) onOpenRegister();
              }}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs py-2.5 px-6 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {t("registerNow")}
            </button>
          </div>
        </div>

        {/* 2nd Div in DOM -> Left side in RTL: Transparent Linear Purple Brand Panel */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white relative">
          {/* Top Bar: Close Button & Modal Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-800">
              {t("modalTitle")}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="text-gray-500 hover:text-gray-800 transition-colors p-1 cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Center Form Content */}
          <form
            onSubmit={handleSubmit}
            className="my-auto py-6 flex flex-col items-center text-center max-w-md w-full mx-auto"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-1.5">
              {t("welcome")}
            </h3>
            <p className="text-xs text-gray-500 mb-7">{t("subtitle")}</p>

            {/* Phone Input Row + Country Dropdown */}
            <div ref={dropdownRef} className="w-full relative">
              <div className="w-full flex items-center border border-gray-200 rounded-lg bg-white focus-within:border-brand-green transition-colors">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError(false);
                    if (sentMessage) setSentMessage(false);
                  }}
                  placeholder={t("phonePlaceholder")}
                  className={`flex-1 px-4 py-3 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none text-start rounded-s-lg ${isRtl ? "placeholder:text-right" : "placeholder:text-left"}`}
                />

                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  dir="ltr"
                  className="flex items-center gap-1.5 px-3 py-2.5 border-s border-gray-200 text-xs font-medium text-gray-700 bg-gray-50/50 hover:bg-gray-100/70 transition-colors shrink-0 rounded-e-lg cursor-pointer"
                >
                  <CountryFlagSvg code={selectedCountry.code} />
                  <span>{selectedCountry.code}</span>
                  <FiChevronDown className="text-[11px] text-gray-500" />
                </button>
              </div>

              {dropdownOpen && (
                <div
                  dir="ltr"
                  className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto text-left"
                >
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.code + country.label}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-gray-100 transition-colors cursor-pointer ${
                        selectedCountry.code === country.code &&
                        selectedCountry.label === country.label
                          ? "bg-gray-50 font-semibold text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      <CountryFlagSvg code={country.code} />
                      <span className="truncate">{country.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Validation Error / Status */}
              <div className="text-start mt-1.5 min-h-[18px]">
                {error && (
                  <p className="text-[11px] text-red-500 font-medium">
                    {t("invalidPhone")}
                  </p>
                )}
                {sentMessage && !error && (
                  <p className="text-[11px] text-brand-green font-medium">
                    {t("codeSent")}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 bg-[#59a9ff] hover:bg-[#5f96e6] text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {t("sendCode")}
            </button>
          </form>

          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}
