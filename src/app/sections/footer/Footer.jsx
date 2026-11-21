"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FiPhone } from "react-icons/fi";
import WhiteLogo from "@/assets/images/white-logo.svg";
import GooglePlayStore from "@/assets/images/google-play-store.png";
import AppleStore from "@/assets/images/apple-store.png";
import MasterCard from "@/assets/images/master-card.svg";

import {
  FaTiktok,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaApplePay,
  FaPaypal,
  FaAmazonPay,
  FaSnapchat,
} from "react-icons/fa";

import Image from "next/image";
import { LuHeadphones } from "react-icons/lu";
import { RiVisaLine } from "react-icons/ri";

export default function Footer() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Footer");

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full bg-[#2b2b2b] text-gray-200 mt-auto"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1 (Right in RTL): Brand Info + Store Badges */}
          <div className="lg:col-span-5 space-y-5 text-start">
            <div className="flex items-center gap-3">
              <Image src={WhiteLogo} alt="company logo" />
            </div>

            <p className="text-xs text-white opacity-95 leading-7">
              {t("description")}
            </p>

            {/* Store Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://play.google.com/store/apps/details?id=com.althawrimotor.app&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Play Store"
              >
                <Image src={GooglePlayStore} alt="google play store" />
              </a>
              <a
                href="https://apps.apple.com/sa/app/mootery/id6587562278"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apple Store"
              >
                <Image src={AppleStore} alt="apple store" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <h3 className="font-bold text-white text-sm">
              {t("quickLinksTitle")}
            </h3>
            <ul className="space-y-2.5 text-xs text-white opacity-95">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/auctions"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("quickLinks.cars")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <h3 className="font-bold text-white text-sm">
              {t("companyTitle")}
            </h3>
            <ul className="space-y-2.5 text-xs text-white opacity-95">
              <li>
                <Link
                  href="/about"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("companyLinks.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("companyLinks.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("companyLinks.faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("companyLinks.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("companyLinks.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 (Left in RTL): Contact Info + Social Icons */}
          <div className="lg:col-span-3 space-y-4 text-start">
            <h3 className="font-bold text-white text-sm">
              {t("contactTitle")}
            </h3>

            <div className="space-y-3 text-xs text-white opacity-95">
              <div className="flex items-center justify-end lg:justify-start gap-1">
                <FiPhone className="text-white opacity-95 text-sm shrink-0" />
                <a
                  href="tel:0114111271"
                  dir="ltr"
                  className="hover:text-brand-green transition-colors"
                >
                  {t("phone")}
                </a>
              </div>

              <div className="flex items-center justify-end lg:justify-start gap-1">
                <LuHeadphones className="text-white opacity-95 text-sm shrink-0" />
                <span dir="ltr">{t("faxOrAlt")}</span>
              </div>

              <div className="flex items-start justify-end lg:justify-start gap-1">
                <span className="leading-relaxed">{t("address")}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-end lg:justify-start gap-5 pt-2 text-white">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCAEnvNnTTJe2afkQVofoEXQ"
                aria-label="YouTube"
                className="hover:text-brand-green transition-colors text-lg"
              >
                <FaYoutube />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/Mooterysa"
                aria-label="Instagram"
                className="hover:text-brand-green transition-colors text-lg"
              >
                <FaInstagram />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/Mooterysa"
                aria-label="Twitter"
                className="hover:text-brand-green transition-colors text-lg"
              >
                <FaTwitter />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.snapchat.com/@mootry0?locale=ar"
                aria-label="Snapchat"
                className="hover:text-brand-green transition-colors text-lg"
              >
                <FaSnapchat />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@al.thury?_t=8kgAl1xikQH&_r=1"
                aria-label="TikTok"
                className="hover:text-brand-green transition-colors text-lg"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Icons */}
      <div className="bg-[#242424] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white opacity-95">
          <div className="flex items-center gap-3 text-white text-xl">
            <FaPaypal title="PayPal" size={40} />
            <FaAmazonPay title="amazon pay" size={40} className="mt-2.25" />
            <FaApplePay title="Apple Pay" size={50} />
            <RiVisaLine title="Visa" size={50} />
            <Image src={MasterCard} alt="Master card" size={50} />
          </div>
          <p className="text-center sm:text-start">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
