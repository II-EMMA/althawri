"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { AiOutlineHome } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { LuHeadphones } from "react-icons/lu";

export default function ContactUsPage() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("ContactUs");

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
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
        <IoChevronBack
          className={`text-xs text-gray-400 ${isRtl ? "" : "rotate-180"}`}
        />
        <span className="text-gray-900 font-semibold">{t("title")}</span>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Right / First Column: Address Banner + Contact Details Card */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Location Banner */}
          <div className="bg-brand-green text-white rounded-xl p-4 shadow-sm flex items-center gap-1">
            <HiOutlineLocationMarker className="text-xl shrink-0" />
            <span className="text-sm font-bold leading-relaxed">
              {t("address")}
            </span>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 flex-1">
            <h2 className="font-bold text-gray-800 text-base mb-6 text-start">
              {t("contactDetails")}
            </h2>

            <div className="space-y-5">
              {/* Phone Numbers */}
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FiPhone className="text-brand-green text-base shrink-0" />
                <a
                  href="tel:0114111271"
                  dir="ltr"
                  className="hover:text-brand-green transition-colors font-medium"
                >
                  {t("phone")}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FaWhatsapp className="text-brand-green text-lg shrink-0" />
                <a
                  href="https://wa.me/966555074342"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="hover:text-brand-green transition-colors font-medium"
                >
                  {t("whatsapp")}
                </a>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <LuHeadphones className="text-brand-green text-base shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">
                  {t("workingHours")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Left / Second Column: Map */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden h-full min-h-[420px] lg:min-h-[480px]">
            <iframe
              title={t("address")}
              src="https://www.google.com/maps?q=Al+Hair+Road+Riyadh+Saudi+Arabia&output=embed"
              className="w-full h-full min-h-[420px] lg:min-h-[480px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
