"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import BID from "@/assets/icons/bid.png";
import CheckFile from "@/assets/icons/check-file.svg";
import Currancy from "@/assets/icons/currancy.svg";
import Dollar from "@/assets/icons/dollar.png";
import { CiStar } from "react-icons/ci";
import { FiClock } from "react-icons/fi";
import GreenBorderBtn from "./GreenBorderBtn";
import { useFilter } from "@/context/FilterContext";
import Link from "next/link";

export default function CarCard({ car, variant = "default" }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Cards");
  const [isImageLoading, setIsImageLoading] = useState(true);
  // const filterContext = useFilter?.() || {};

  const { viewMode } = useFilter();
  const isList = variant !== "sidebar" && viewMode === "list";
  const isUrgent = Boolean(car?.isEndingSoon || car?.urgent);

  // Dynamic time formatter for localization (English: Day/Days, Arabic: يوم/أيام)
  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "";

    if (typeof timeLeft === "object" && timeLeft !== null) {
      const days = Number(timeLeft.days ?? 0);
      const dayLabel = days === 1 ? t("day") : t("days");
      return `${days} ${dayLabel} ${timeLeft.clock ?? ""}`.trim();
    }

    if (typeof timeLeft === "string") {
      return timeLeft.replace(/(\d+)\s*D\b/i, (_, count) => {
        const num = Number(count);
        const dayLabel = num === 1 ? t("day") : t("days");
        return `${num} ${dayLabel}`;
      });
    }

    return String(timeLeft);
  };

  return (
    <div
      dir={isList && isRtl ? "ltr" : "rtl"}
      className={`rounded-lg border p-4 shadow-sm flex transition-all duration-200 ${
        isUrgent
          ? "bg-brand-light-red animate-urgent-border border-red-300"
          : "bg-white border-gray-200"
      } ${
        isList
          ? "flex-row items-center justify-between w-full gap-6"
          : "flex-col justify-between"
      }`}
    >
      {/* ----------------- LIST VIEW LAYOUT (Exact Match to Screenshot) ----------------- */}
      {isList ? (
        <>
          {/* 1. Left Side: Pricing Box & View Details Button */}
          <div
            className={`${isUrgent ? "bg-white" : "bg-brand-white"} flex flex-col gap-3 shrink-0 w-48 px-3 pb-2`}
          >
            <div
              className={`${isUrgent ? "bg-white" : "bg-brand-white"}  rounded-md py-2.5 px-3 flex flex-col gap-2 text-center`}
            >
              <div>
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("currentPrice")}
                </span>
                <div className="flex items-center justify-center gap-1 text-sm font-bold text-brand-green">
                  {/* <Image src={Currancy} alt="currency" width={11} height={11} /> */}
                  <span>{t("currency")}</span>
                  <span>{car.currentPrice}</span>
                  <Image src={Dollar} alt="dollar" width={16} height={16} />
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-200" />

              <div>
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("minBid")}
                </span>
                <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-700">
                  <span>{car.minBid}</span>
                  <span>{t("currency")}</span>
                  {/* <Image src={Currancy} alt="currency" width={11} height={11} /> */}
                  <Image src={BID} alt="bid" width={16} height={16} />
                </div>
              </div>
            </div>
            <Link href={`/auctions/${car.id}`}>
              <GreenBorderBtn
                className={`w-full py-2.5 text-sm ${isUrgent ? "red" : ""}`}
              >
                {t("viewDetails")}
              </GreenBorderBtn>
            </Link>
          </div>

          {/* 2. Middle Section: Specs & Title Info */}
          <div className="flex-1 flex flex-col justify-between gap-4">
            {/* Title & Star */}
            <div className="flex items-center justify-end gap-3">
              <CiStar
                size={22}
                className="cursor-pointer text-gray-500 font-medium hover:text-amber-400 shrink-0"
              />
              <p className="text-base text-gray-900 font-bold line-clamp-1">
                {car.titleKey === "kiaTasman"
                  ? locale === "ar"
                    ? "كيا تاسمان أكس برو-تحت الضمان 2026"
                    : "Kia TASMAN X Pro Under-Warranty 2026"
                  : car.titleKey === "toyotaLandCruiser"
                    ? locale === "ar"
                      ? "تويوتا لاند كروزر 2023"
                      : "Toyota Land Cruiser 2023"
                    : locale === "ar"
                      ? "تويوتا اوربان كروزر 2025"
                      : "Toyota Urban Cruiser 2025"}
              </p>
            </div>

            {/* 6 Grid Specs */}
            <div
              dir={isRtl ? "rtl" : "ltr"}
              className={`grid grid-cols-3 grid-rows-2 grid-flow-col gap-x-8 gap-y-3 text-sm ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {/* Column 1: bidsCount (top) & timeLeft (bottom) */}
              <div>
                <span className="text-[12px] text-gray-500 font-medium block">
                  {t("bidsCount")}
                </span>
                <span className="font-bold text-gray-800 text-sm">
                  {car.bidsCount}
                </span>
              </div>

              <div>
                <span className="text-[12px] text-gray-500 font-medium block">
                  {t("timeLeft")}
                </span>
                <div
                  className={`flex items-center gap-1 font-bold text-sm ${
                    isUrgent ? "font-brand-red" : "font-brand-purple"
                  }`}
                >
                  <FiClock
                    className={`w-3.5 h-3.5 font-medium shrink-0 ${
                      isUrgent ? "font-brand-red" : "font-brand-purple"
                    }`}
                  />
                  <span className="truncate">
                    {formatTimeLeft(car.timeLeft)}
                  </span>
                </div>
              </div>

              {/* Column 2: model (top) & kilometers (bottom) */}
              <div>
                <span className="text-[12px] text-gray-500 font-medium block">
                  {t("model")}
                </span>
                <span
                  dir="ltr"
                  className={`font-bold text-gray-800 text-sm truncate block ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                >
                  {car.model}
                </span>
              </div>

              <div>
                <span className="text-[12px] text-gray-500 font-medium block">
                  {t("kilometers")}
                </span>
                <span className="font-bold text-gray-800 text-sm">
                  {car.kilometers}
                </span>
              </div>

              {/* Column 3: serialNumber (top) & condition (bottom) */}
              <div>
                <span className="text-[12px] text-gray-500 font-medium block">
                  {t("serialNumber")}
                </span>
                <span className="font-bold text-gray-800 text-sm">
                  {car.serialNumber}
                </span>
              </div>

              <div>
                <span className="text-[12px] text-gray-500 font-medium block">
                  {t("condition")}
                </span>
                <span className="font-bold text-gray-800 text-sm truncate block">
                  {t(`conditionsList.${car.conditionKey}`)}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Right Side: Image with City Badge & Check File Icon */}
          <div className="relative w-56 h-36 rounded-md overflow-hidden bg-gray-100 shrink-0">
            {isImageLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
                <div className="flex items-center">
                  <span className="w-5 aspect-square rounded-full bg-[#fe2c55] loader-dot-clockwise" />
                  <span className="w-5 aspect-square rounded-full bg-[#25f4ee] mix-blend-darken -ml-1.25 loader-dot-counter" />
                </div>
              </div>
            )}

            <Image
              src={car.image}
              alt="Car"
              fill
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              className={`object-cover transition-opacity duration-300 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* City Badge */}
            <div className="absolute top-2.5 right-2.5 z-20 rounded-full py-0.5 px-3 bg-brand-purple">
              <p className="text-white text-xs font-bold">
                {t(`cities.${car.cityKey}`)}
              </p>
            </div>

            {/* Check File Icon */}
            <div
              className={`${
                car.checkFile ? "absolute" : "hidden"
              } top-2.5 left-2.5 z-20 w-8 h-8 bg-white rounded-lg p-1 shadow-sm flex items-center justify-center`}
            >
              <Image src={CheckFile} alt="Check File" width={22} height={22} />
            </div>
          </div>
        </>
      ) : (
        /* ----------------- GRID / SIDEBAR VERTICAL CARD LAYOUT ----------------- */
        <>
          <div>
            <div className="relative w-full h-[196px] rounded-md overflow-hidden bg-gray-100">
              <Image src={car.image} alt="Car" fill className="object-cover" />

              <div
                className={`absolute top-2.5 rounded-full py-0.5 px-3 bg-brand-purple ${
                  isRtl ? "right-2.5" : "left-2.5"
                }`}
              >
                <p className="text-white text-xs font-bold">
                  {t(`cities.${car.cityKey}`)}
                </p>
              </div>

              <div
                className={`${
                  car.checkFile ? "absolute" : "hidden"
                } top-2.5 w-8 h-8 bg-white rounded-lg p-1 shadow-sm flex items-center justify-center ${
                  isRtl ? "left-2.5" : "right-2.5"
                }`}
              >
                <Image
                  src={CheckFile}
                  alt="Check File"
                  width={22}
                  height={22}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 pb-2 px-1">
              <p className="text-sm text-gray-800 font-bold line-clamp-1">
                {car.titleKey === "kiaTasman"
                  ? locale === "ar"
                    ? "كيا تاسمان أكس برو-تحت الضمان 2026"
                    : "Kia TASMAN X Pro Under-Warranty 2026"
                  : car.titleKey === "toyotaLandCruiser"
                    ? locale === "ar"
                      ? "تويوتا لاند كروزر 2023"
                      : "Toyota Land Cruiser 2023"
                    : locale === "ar"
                      ? "تويوتا اوربان كروزر 2025"
                      : "Toyota Urban Cruiser 2025"}
              </p>
              <CiStar
                size={22}
                className="cursor-pointer text-gray-500 font-medium shrink-0"
              />
            </div>

            <div
              className={`mx-1 my-1 ${isUrgent ? "bg-white" : "bg-brand-white"} border border-gray-100 rounded-md py-2 px-3 flex flex-row-reverse items-center justify-around text-center`}
            >
              <div className="flex flex-col items-center">
                <span className="text-[12px] text-gray-500 font-medium mb-0.5">
                  {t("minBid")}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                  <span>{car.minBid}</span>
                  <span>{t("currency")}</span>
                  {/* <Image src={Currancy} alt="currency" width={11} height={11} /> */}
                </div>
              </div>

              <Image src={BID} alt="bid" width={25} height={25} />

              <div className="flex flex-col items-center">
                <span className="text-[12px] text-gray-500 font-medium mb-0.5">
                  {t("currentPrice")}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-brand-green">
                  {/* <Image src={Currancy} alt="currency" width={11} height={11} /> */}
                  <span>{t("currency")}</span>
                  <span>{car.currentPrice}</span>
                  <Image src={Dollar} alt="dollar" width={16} height={16} />
                </div>
              </div>
            </div>

            <div className="px-1 py-1 grid grid-cols-3 gap-1.5 text-center text-sm mt-2">
              <div className="bg-gray-50/60 p-1.5 rounded border border-gray-100/50">
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("bidsCount")}
                </span>
                <span className="font-semibold text-gray-700">
                  {car.bidsCount}
                </span>
              </div>

              <div className="bg-gray-50/60 p-1.5 rounded border border-gray-100/50">
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("model")}
                </span>
                <span
                  dir="ltr"
                  className="font-semibold text-gray-700 truncate block"
                >
                  {car.model}
                </span>
              </div>

              <div className="bg-gray-50/60 p-1.5 rounded border border-gray-100/50">
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("serialNumber")}
                </span>
                <span className="font-semibold text-gray-700">
                  {car.serialNumber}
                </span>
              </div>

              <div className="bg-gray-50/60 p-1.5 rounded border border-gray-100/50 flex flex-col items-center justify-center">
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("timeLeft")}
                </span>
                <div
                  className={`flex items-center gap-1 font-semibold text-sm ${
                    isUrgent ? "font-brand-red" : "font-brand-purple"
                  }`}
                >
                  <FiClock
                    className={`w-3 h-3 font-medium shrink-0 ${
                      isUrgent ? "font-brand-red" : "font-brand-purple"
                    }`}
                  />
                  <span className="truncate">
                    {formatTimeLeft(car.timeLeft)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50/60 p-1.5 rounded border border-gray-100/50">
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("kilometers")}
                </span>
                <span className="font-semibold text-gray-700">
                  {car.kilometers}
                </span>
              </div>

              <div className="bg-gray-50/60 p-1.5 rounded border border-gray-100/50">
                <span className="text-[12px] text-gray-500 font-medium block mb-0.5">
                  {t("condition")}
                </span>
                <span className="font-semibold text-gray-700 truncate block">
                  {t(`conditionsList.${car.conditionKey}`)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Link href={`/auctions/${car.id}`}>
              <GreenBorderBtn
                className={`w-full py-2.5 text-sm ${isUrgent ? "red" : ""}`}
              >
                {t("viewDetails")}
              </GreenBorderBtn>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
