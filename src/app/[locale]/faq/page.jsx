"use client";

import React, { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { IoChevronBack } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

export default function FAQPage() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("FAQ");

  // State for active category tab on the right
  const [activeTab, setActiveTab] = useState("register");

  // State for accordion items (First item open by default: index 0)
  const [openIndex, setOpenIndex] = useState(0);

  const contentRefs = useRef([]);
  const listContainerRef = useRef(null);

  // Dynamic keys count for each category
  const categoryCounts = {
    register: 8,
    customers: 1,
    packages: 11,
    auctions: 16,
    vehicles: 12,
  };

  // Generate dynamic array of Q&As based on active tab from next-intl
  const currentFaqList = Array.from(
    { length: categoryCounts[activeTab] || 0 },
    (_, i) => ({
      q: t(`${activeTab}.q${i + 1}`),
      a: t(`${activeTab}.a${i + 1}`),
    }),
  );

  const categories = [
    { id: "register", label: t("categories.register") },
    { id: "customers", label: t("categories.customers") },
    { id: "packages", label: t("categories.packages") },
    { id: "auctions", label: t("categories.auctions") },
    { id: "vehicles", label: t("categories.vehicles") },
  ];

  // Handle Tab Change with Fade Animation
  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;

    if (listContainerRef.current) {
      gsap.to(listContainerRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          setActiveTab(tabId);
          setOpenIndex(0); // Open first item by default on tab switch
          gsap.fromTo(
            listContainerRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          );
        },
      });
    } else {
      setActiveTab(tabId);
      setOpenIndex(0);
    }
  };

  const toggleAccordion = (index) => {
    const el = contentRefs.current[index];
    if (!el) return;

    if (openIndex === index) {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => setOpenIndex(null),
      });
    } else {
      if (openIndex !== null && contentRefs.current[openIndex]) {
        gsap.to(contentRefs.current[openIndex], {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
      setOpenIndex(index);
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
      );
    }
  };

  return (
    <div
      dir={isRtl ? "rtl" : "trl"}
      className="min-h-screen bg-gray-50/50 py-8 px-6 md:px-16"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 max-w-7xl mx-auto">
        <Link
          href="/"
          className="hover:text-brand-green transition-colors inline-flex items-center gap-1"
        >
          <AiOutlineHome className="md:text-base text-sm shrink-0" />
          <span className="leading-none">{t("home")}</span>
        </Link>
        <IoChevronBack className="text-xs text-gray-400" />
        <span className="text-gray-900 font-semibold">{t("title")}</span>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Categories Tabs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden p-2 flex flex-col gap-1">
            {categories.map((cat) => {
              const isSelected = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`cursor-pointer w-full py-3.5 px-4 rounded-lg text-center font-bold text-sm transition-all ${
                    isSelected
                      ? "bg-brand-green text-white shadow-sm"
                      : "font-gray-1 hover:text-brand-green"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Bottom Container: Additional Info / Quick Guide */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 text-center">
            <h3 className="font-bold text-gray-800 text-sm mb-3">
              {!isRtl && "?"} {t("guideTitle")}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {!isRtl && "."} {t("guideText")}
            </p>
          </div>
        </div>

        {/* Right Side: FAQ Accordions with Fade Animation */}
        <div ref={listContainerRef} className="lg:col-span-8 space-y-4">
          {currentFaqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex items-center ${!isRtl && "flex-row-reverse"} justify-between gap-x-4 p-5 text-right bg-white hover:bg-gray-50/50 transition-colors`}
                >
                  <span
                    className={`${!isRtl && "text-end"} font-bold font-gray-1 text-sm md:text-base`}
                  >
                    {!isRtl && "?"} {item.q}
                  </span>
                  <div
                    className={`cursor-pointer sm:w-7 sm:h-7 w-5 h-5 rounded-full flex items-center justify-center border border-brand-green transition-colors shrink-0 ${
                      isOpen
                        ? "bg-brand-green/10 font-brand-green"
                        : "bg-gray-100 font-brand-green"
                    }`}
                  >
                    {isOpen ? (
                      <FiMinus className="sm:text-sm text-xs" />
                    ) : (
                      <FiPlus className="sm:text-sm text-xs" />
                    )}
                  </div>
                </button>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{
                    height: isOpen ? "auto" : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                  }}
                >
                  <div className="pt-2 pb-5 text-start">
                    <div
                      className={`${!isRtl && "text-end"} mx-5 pt-3 border-t border-gray-300 text-gray-600 text-sm leading-relaxed`}
                    >
                      {!isRtl && "."} {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
