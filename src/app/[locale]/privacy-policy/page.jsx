"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

export default function PrivacyPolicyPage() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("PrivacyPolicyPage");

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50/50 py-6 md:py-8"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-5">
        {/* Breadcrumb with Hover Brand Green */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-500"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-brand-green transition-colors"
          >
            <AiOutlineHome className="md:text-base text-sm shrink-0" />
            <span className="leading-none">{t("home")}</span>
          </Link>

          {isRtl ? (
            <FiChevronLeft className="text-gray-400 shrink-0" />
          ) : (
            <FiChevronRight className="text-gray-400 shrink-0" />
          )}

          <span className="font-bold text-gray-900">{t("title")}</span>
        </nav>

        {/* Content Card */}
        <section className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6 md:p-10 space-y-6 text-gray-800 text-xs md:text-sm leading-relaxed text-justify">
          {/* Introductory Paragraphs */}
          <div className="space-y-4">
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
            <p>{t("intro3")}</p>
            <p>{t("intro4")}</p>
            <p>{t("intro5")}</p>
          </div>

          {/* 1- Definitions */}
          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s1Title")}
            </h2>
            <p>{t("s1Text")}</p>
          </div>

          {/* 2- Scope */}
          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s2Title")}
            </h2>
            <p>{t("s2Text")}</p>
          </div>

          {/* 3- Disclaimer */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s3Title")}
            </h2>
            <p>{t("s3Text1")}</p>
            <p>{t("s3Text2")}</p>
            <p>{t("s3Text3")}</p>
            <p>{t("s3Text4")}</p>
            <p>{t("s3Text5")}</p>
          </div>

          {/* 4- Online Payment */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s4Title")}
            </h2>
            <p>{t("s4Text1")}</p>
            <p>{t("s4Text2")}</p>
          </div>

          {/* 5- How We Use Information */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s5Title")}
            </h2>
            <p>{t("s5Text1")}</p>
            <p>{t("s5Text2")}</p>
            <ul className="list-disc ps-5 space-y-1 text-gray-700">
              <li>{t("s5Bullet1")}</li>
              <li>{t("s5Bullet2")}</li>
              <li>{t("s5Bullet3")}</li>
              <li>{t("s5Bullet4")}</li>
            </ul>
          </div>

          {/* 6- Information Collection */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s6Title")}
            </h2>
            <p>{t("s6Text1")}</p>
            <p>{t("s6Text2")}</p>
          </div>

          {/* 7- Information Exchange */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s7Title")}
            </h2>
            <p>{t("s7Text1")}</p>
            <ul className="list-disc ps-5 space-y-1 text-gray-700">
              <li>{t("s7Bullet1")}</li>
              <li>{t("s7Bullet2")}</li>
              <li>{t("s7Bullet3")}</li>
            </ul>
            <p>{t("s7Text2")}</p>
            <p>{t("s7Text3")}</p>
            <ul className="list-disc ps-5 space-y-1 text-gray-700">
              <li>{t("s7Bullet4")}</li>
              <li>{t("s7Bullet5")}</li>
              <li>{t("s7Bullet6")}</li>
              <li>{t("s7Bullet7")}</li>
              <li>{t("s7Bullet8")}</li>
            </ul>
            <p>{t("s7Text4")}</p>
          </div>

          {/* 8- Marketing Uses */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s8Title")}
            </h2>
            <p>{t("s8Text1")}</p>
            <p>{t("s8Text2")}</p>
          </div>

          {/* 9- Dealing with Others */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s9Title")}
            </h2>
            <p>{t("s9Text1")}</p>
            <p>{t("s9Text2")}</p>
          </div>

          {/* 10- Data Security */}
          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s10Title")}
            </h2>
            <p>{t("s10Text")}</p>
          </div>

          {/* 11- Copyright & Trademarks */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s11Title")}
            </h2>
            <p>{t("s11Text1")}</p>
            <p>{t("s11Text2")}</p>
            <p>{t("s11Text3")}</p>
          </div>

          {/* 12- Amendments */}
          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s12Title")}
            </h2>
            <p>{t("s12Text")}</p>
          </div>

          {/* 13- Inquiries */}
          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s13Title")}
            </h2>
            <p>{t("s13Text")}</p>
          </div>

          {/* 14- Applicable Law & Jurisdiction */}
          <div className="space-y-2 pt-2">
            <h2 className="font-bold text-gray-900 text-sm md:text-base">
              {t("s14Title")}
            </h2>
            <p>{t("s14Text")}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
