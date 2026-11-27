"use client";

import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import WorldIcon from "@/assets/icons/world-icon.png";
import Logo from "@/assets/images/logo.svg";
import GreenBtn from "@/app/components/GreenBtn";
import LoginModal from "./LoginModal";
import { useState } from "react";
import RegisterModal from "./RegisterModal";

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => setToggle((prev) => !prev);
  const closeMenu = () => setToggle(false);

  const targetLocale = locale === "en" ? "ar" : "en";
  const localeLabel = locale === "en" ? "عربي" : "En";

  const isActive = (path) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      <header className="sticky top-0 z-50 shadow-sm w-full flex justify-between items-center px-4 sm:px-8 py-3 bg-brand-white border-b border-gray-100">
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className={`flex items-center justify-center menu ${
                toggle ? "opened" : ""
              }`}
            >
              <svg width="40" height="40" viewBox="0 0 100 100">
                <path
                  className="line line1 "
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path className="line line2 " d="M 20,50 H 80" />
                <path
                  className="line line3 "
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
              </svg>
            </button>
          </div>
          <Link
            href={pathname}
            locale={targetLocale}
            className="inline-flex items-center gap-x-1.5 leading-none cursor-pointer"
          >
            <Image
              src={WorldIcon}
              width={20}
              height={20}
              alt="World Icon"
              className="object-contain shrink-0"
            />
            <span className="text-gray-1 text-base font-medium leading-none">
              {localeLabel}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-x-2.5">
            <GreenBtn
              className="px-5 py-2.5 cursor-pointer"
              onClick={() => setIsRegisterOpen(true)}
            >
              {t("register")}
            </GreenBtn>
            <GreenBtn
              className="px-5 py-2.5 cursor-pointer"
              onClick={() => setIsLoginOpen(true)}
            >
              {t("login")}
            </GreenBtn>

            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-48 bg-white font-gray-2 text-xs font-semibold ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 ltr:text-left rtl:text-right placeholder:font-gray-2"
              />
              <FiSearch className="absolute ltr:left-3 rtl:right-3 text-gray-500 text-base pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center xl:gap-x-8 gap-x-2">
          <nav className="hidden lg:flex items-center gap-x-6">
            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors ${
                isActive("/contact")
                  ? "py-2.5 px-5 bg-brand-green text-white rounded-full font-bold text-center"
                  : "font-gray-1 hover:text-brand-green"
              }`}
            >
              {t("contactUs")}
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-semibold transition-colors ${
                isActive("/faq")
                  ? "py-2.5 px-5 bg-brand-green text-white rounded-full font-bold text-center"
                  : "font-gray-1 hover:text-brand-green"
              }`}
            >
              {t("faq")}
            </Link>
            <Link
              href="/auctions"
              className={`text-sm font-semibold transition-colors ${
                isActive("/auctions")
                  ? "py-2.5 px-5 bg-brand-green text-white rounded-full font-bold text-center"
                  : "font-gray-1 hover:text-brand-green"
              }`}
            >
              {t("auctions")}
            </Link>
          </nav>

          <div className="flex items-center gap-x-2">
            <Link href="/">
              <Image
                src={Logo}
                alt="Mootery Auctions Logo"
                width={140}
                height={40}
                className="h-10 w-auto object-contain cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Smooth Slide-Out Drawer Under lg */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          toggle
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
        />

        <aside
          dir={locale === "ar" ? "rtl" : "ltr"}
          className={`fixed top-0 bottom-0 start-0 w-72 max-w-[85vw] bg-white shadow-xl flex flex-col justify-between p-5 overflow-y-auto transition-transform duration-300 ease-out ${
            toggle
              ? "translate-x-0"
              : locale === "ar"
                ? "translate-x-full"
                : "-translate-x-full"
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <Link href="/" onClick={closeMenu}>
                <Image
                  src={Logo}
                  alt="Mootery Auctions Logo"
                  width={130}
                  height={38}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              {/* <button
                type="button"
                onClick={closeMenu}
                aria-label="Close Menu"
                className="text-gray-600 hover:text-gray-900 text-lg font-bold px-2 py-1 rounded cursor-pointer"
              >
                ✕
              </button> */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-label="Toggle Menu"
                  className={`flex items-center justify-center menu ${
                    toggle ? "opened" : ""
                  }`}
                >
                  <svg width="40" height="40" viewBox="0 0 100 100">
                    <path
                      className="line line1 "
                      d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                    />
                    <path className="line line2 " d="M 20,50 H 80" />
                    <path
                      className="line line3 "
                      d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <nav className="flex flex-col space-y-5">
              <Link
                href="/auctions"
                onClick={closeMenu}
                className={`text-sm font-semibold transition-colors ${
                  isActive("/auctions")
                    ? "text-brand-green font-bold"
                    : "font-gray-1 hover:text-brand-green"
                }`}
              >
                {t("auctions")}
              </Link>
              <div className="block w-full h-px bg-gray-200" />
              <Link
                href="/faq"
                onClick={closeMenu}
                className={`text-sm font-semibold transition-colors ${
                  isActive("/faq")
                    ? "text-brand-green font-bold"
                    : "font-gray-1 hover:text-brand-green"
                }`}
              >
                {t("faq")}
              </Link>
              <div className="block w-full h-px bg-gray-100" />
              <Link
                href="/contact"
                onClick={closeMenu}
                className={`text-sm font-semibold transition-colors ${
                  isActive("/contact")
                    ? "text-brand-green font-bold"
                    : "font-gray-1 hover:text-brand-green"
                }`}
              >
                {t("contactUs")}
              </Link>
              <div className="block w-full h-px bg-gray-200" />
            </nav>

            <div className="relative flex items-center mt-8">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full bg-white font-gray-2 text-xs font-semibold ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-green ltr:text-left rtl:text-right placeholder:font-gray-2"
              />
              <FiSearch className="absolute ltr:left-3 rtl:right-3 text-gray-500 text-base pointer-events-none" />
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <GreenBtn
                className="w-full py-2.5 text-sm cursor-pointer"
                onClick={() => {
                  closeMenu();
                  setIsLoginOpen(true);
                }}
              >
                {t("login")}
              </GreenBtn>
              <GreenBtn
                className="w-full py-2.5 text-sm cursor-pointer"
                onClick={() => {
                  closeMenu();
                  setIsRegisterOpen(true);
                }}
              >
                {t("register")}
              </GreenBtn>
            </div>
          </div>
        </aside>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </>
  );
}
