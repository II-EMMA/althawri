"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

export default function AboutPage() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("AboutPage");

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-[65vh] bg-white py-6 md:py-8"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-5">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-500"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:font-brand-green transition-colors"
          >
            <AiOutlineHome className="md:text-base text-sm shrink-0" />
            <span className="leading-none">{t("home")}</span>
          </Link>

          {isRtl ? (
            <FiChevronLeft className="text-gray-400 shrink-0" />
          ) : (
            <FiChevronRight className="text-gray-400 shrink-0" />
          )}

          <span className="font-bold text-gray-900">{t("about")}</span>
        </nav>

        {/* Content Card */}
        <section className="bg-white rounded-xl border border-gray-200/90 shadow-2xs p-6 md:p-8">
          <p className="text-sm md:text-[15px] font-bold text-gray-800 leading-8 md:leading-9 text-start">
            {t("description")}
          </p>
        </section>
      </div>
    </main>
  );
}
