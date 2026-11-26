"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { AiOutlineHome } from "react-icons/ai";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Link } from "@/i18n/navigation";

export default function TermsAndConditionsPage() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("TermsAndConditions");

  const sections = [
    { titleKey: "section1Title", itemsKey: "section1Items" },
    { titleKey: "section2Title", itemsKey: "section2Items" },
    { titleKey: "section3Title", itemsKey: "section3Items" },
    { titleKey: "section4Title", itemsKey: "section4Items" },
    { titleKey: "section5Title", itemsKey: "section5Items" },
    { titleKey: "section6Title", itemsKey: "section6Items" },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50/50 py-8 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link
            href="/"
            className="hover:text-brand-green transition-colors inline-flex items-center gap-1"
          >
            <AiOutlineHome className="md:text-base text-sm" />
            <span>{t("home")}</span>
          </Link>
          {isRtl ? (
            <IoChevronBack className="text-xs text-gray-400" />
          ) : (
            <IoChevronForward className="text-xs text-gray-400" />
          )}
          <span className="text-gray-900 font-semibold">{t("pageTitle")}</span>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 md:p-10 space-y-8">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">
            {t("mainHeading")}
          </h1>

          {sections.map((sec, sIdx) => {
            const items = t.raw(sec.itemsKey) || [];
            return (
              <section key={sIdx} className="space-y-3 pt-2">
                <h2 className="text-base md:text-lg font-bold text-gray-900">
                  {t(sec.titleKey)}
                </h2>
                <div className="space-y-2 text-xs md:text-sm text-gray-800 leading-relaxed font-medium">
                  {items.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
