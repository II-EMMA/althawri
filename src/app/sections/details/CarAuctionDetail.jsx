"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FiChevronRight,
  FiChevronLeft,
  FiShare2,
  FiFileText,
  FiStar,
  FiMinus,
  FiPlus,
  FiMapPin,
  FiClock,
  FiImage,
} from "react-icons/fi";
import {
  FaCar,
  FaCarSide,
  FaMapMarkedAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import gsap from "gsap";
import CarImageLightbox from "./CarImageLightbox";
import Currancy from "@/assets/icons/currancy.svg";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { AiOutlineHome } from "react-icons/ai";

export default function CarAuctionDetail({ car }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("CarDetail");
  const tCars = useTranslations("Cars");

  const basePrice = Number(car.currentPrice) || 0;
  const stepValue = Number(car.minBid) || 500;
  const initialBids = Number(car.bidsCount) || 0;

  const [currentPrice, setCurrentPrice] = useState(basePrice);
  const [bidsCount, setBidsCount] = useState(initialBids);
  const [bidAmount, setBidAmount] = useState(stepValue * 5);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bidFeedback, setBidFeedback] = useState("");

  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const priceRef = useRef(null);

  const carTitle = tCars.has(car.titleKey) ? tCars(car.titleKey) : car.model;
  const cityLabel = tCars.has(car.cityKey) ? tCars(car.cityKey) : car.cityKey;
  const conditionLabel = tCars.has(car.conditionKey)
    ? tCars(car.conditionKey)
    : car.conditionKey;

  const vatRate = car.vatRate ?? 0.15;
  const vatAmount = Number((bidAmount * vatRate).toFixed(2));
  const totalAmount = Number((currentPrice + bidAmount + vatAmount).toFixed(2));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gsap-stagger", {
        opacity: 0,
        y: 14,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "transform",
      });

      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: "0%" },
          {
            width: `${car.progressPercent ?? 95}%`,
            duration: 0.85,
            ease: "power2.out",
            delay: 0.15,
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [car.id, car.progressPercent]);

  const animatePriceChange = () => {
    if (!priceRef.current) return;
    gsap.fromTo(
      priceRef.current,
      { scale: 1.08, color: "#16a34a" },
      { scale: 1, color: "", duration: 0.35, ease: "power2.out" },
    );
  };

  const handleDecreaseBid = () => {
    setBidAmount((prev) => Math.max(stepValue, prev - stepValue));
  };

  const handleIncreaseBid = () => {
    setBidAmount((prev) => prev + stepValue);
  };

  const handlePlaceBid = () => {
    setCurrentPrice((prev) => prev + bidAmount);
    setBidsCount((prev) => prev + 1);
    setBidFeedback(t("bidSuccess"));
    animatePriceChange();
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setBidFeedback(t("linkCopied"));
      } catch {
        setBidFeedback("");
      }
    }
  };

  const slots = car.gallerySlots || [0, 1, 2, 3];

  return (
    <section
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="max-w-7xl mx-auto  pb-6 text-gray-900"
    >
      {/* Breadcrumb */}
      <nav className="gsap-stagger flex items-center justify-start gap-1.5 text-sm text-gray-600 mb-5 py-4">
        <Link
          href="/"
          className="hover:text-brand-green transition-colors flex items-center gap-1"
        >
          <AiOutlineHome className="text-base" />
          <span>{t("home")}</span>
        </Link>
        {isRtl ? (
          <FiChevronLeft className="text-gray-400 shrink-0" />
        ) : (
          <FiChevronRight className="text-gray-400 shrink-0" />
        )}
        <Link
          href="/auctions"
          className="hover:text-brand-green transition-colors font-medium"
        >
          {t("auctions")}
        </Link>
        {isRtl ? (
          <FiChevronLeft className="text-gray-400 shrink-0" />
        ) : (
          <FiChevronRight className="text-gray-400 shrink-0" />
        )}
        <span className="font-bold text-gray-950">{carTitle}</span>
      </nav>

      {/* Main 2-Side Grid (In RTL: 1st = Right [Image + 4 Boxes], 2nd = Left [Bar + Timer/Bids + 2 Sub-Columns]) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT SIDE (6 cols in RTL): Car Image + 4 Boxes Underneath */}
        <div className="gsap-stagger lg:col-span-6 flex flex-col gap-3">
          <div
            onClick={() => {
              setSelectedSlot(null);
              setLightboxOpen(true);
            }}
            className="group relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 cursor-pointer shadow-xs"
          >
            <Image
              src={car.image}
              alt={carTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
            />

            {/* City Badge */}
            <span className="absolute top-3 start-3 bg-brand-purple text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
              {cityLabel}
            </span>

            {/* Next Arrow Overlay */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSlot(null);
                setLightboxOpen(true);
              }}
              aria-label="Open image gallery"
              className="absolute top-1/2 -translate-y-1/2 end-3 w-8 h-8 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 cursor-pointer"
            >
              {isRtl ? <FiChevronLeft /> : <FiChevronRight />}
            </button>
          </div>

          {/* 4 Placeholder Boxes Underneath */}
          <div className="grid grid-cols-4 gap-2.5">
            {slots.map((slotIndex) => {
              const isSelected = selectedSlot === slotIndex;
              return (
                <button
                  key={slotIndex}
                  type="button"
                  onClick={() => setSelectedSlot(slotIndex)}
                  className={`aspect-[16/10] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? "border-brand-green bg-brand-green/5 text-brand-green"
                      : "border-gray-300 bg-gray-50/80 hover:border-brand-green/60 text-gray-500"
                  }`}
                >
                  <FiImage className="text-base" />
                  <span className="text-[10px] font-semibold">
                    {t("imageBox")} {slotIndex + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEFT SIDE (6 cols in RTL): Progress Bar -> Timer & Bids -> Two Containers Underneath */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* 1. Progress Bar */}
          <div className="gsap-stagger flex items-center gap-3">
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-brand-purple rounded-full"
                style={{ width: `${car.progressPercent ?? 95}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-950 shrink-0">
              %{car.progressPercent ?? 95}
            </span>
          </div>

          {/* 2. Under the bar: Countdown Timer & Bids Count */}
          <div className="gsap-stagger flex justify-between items-center space-y-1.5 text-start">
            <p className="text-xs sm:text-sm font-semibold font-brand-purple">
              {t("auctionEndsIn")}{" "}
              <span className="font-bold font-brand-purple">
                {car.timeLeft}
              </span>
            </p>
            <p className="text-xs sm:text-sm font-bold flex items-center gap-x-1">
              <span className="font-brand-red">{t("bidsCountLabel")} :</span>
              <span className="font-brand-green">
                {bidsCount} {t("bidsUnit")}
              </span>
            </p>
          </div>

          {/* 3. Two Containers Under Them (In RTL: 1st = Right [Title + Bid], 2nd = Left [Icons + Specs + Mojaz + Inspection]) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start pt-1">
            {/* Container 1 (Right in RTL): Title, Price Breakdown, Stepper, Bid Button */}
            <div className="gsap-stagger sm:col-span-6 flex flex-col gap-3 text-gray-900">
              <h1 className="text-lg sm:text-xl font-bold text-gray-950">
                {carTitle}
              </h1>

              <div className="space-y-7 mt-6.5 text-xs sm:text-sm border-b border-gray-200 pb-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-700 font-medium">
                    {t("currentPrice")} :
                  </span>
                  <span
                    ref={priceRef}
                    className="font-bold text-gray-950 text-sm sm:text-base"
                  >
                    {currentPrice.toFixed(2)}
                  </span>
                  <Image
                    src={Currancy}
                    alt="Currancy Icon"
                    className="w-4.25 h-4.25"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-700 font-medium">
                    {t("bidIncrement")} :
                  </span>
                  <span className="font-bold text-gray-900">
                    {stepValue.toFixed(2)}
                  </span>
                  <Image
                    src={Currancy}
                    alt="Currancy Icon"
                    className="w-4.25 h-4.25"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-700 font-medium">
                    {t("vatAmount")} :
                  </span>
                  <span className="font-bold text-gray-900">
                    {vatAmount.toFixed(2)}
                  </span>
                  <Image
                    src={Currancy}
                    alt="Currancy Icon"
                    className="w-4.25 h-4.25"
                  />
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-gray-800 font-semibold">
                    {t("total")} :
                  </span>
                  <span className="font-extrabold text-gray-950">
                    {totalAmount.toFixed(2)}
                  </span>
                  <Image
                    src={Currancy}
                    alt="Currancy Icon"
                    className="w-4.25 h-4.25"
                  />
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between gap-4 mt-1 py-2">
                <button
                  type="button"
                  onClick={handleIncreaseBid}
                  aria-label="Increase bid"
                  className="w-14 h-9.5 rounded-md bg-gray-100 hover:bg-gray-200 font-brand-green border border-brand-green flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FiPlus className="text-sm" />
                </button>

                <span className="font-bold text-sm text-gray-950 select-none bg-white border border-gray-300 w-full rounded-lg text-center py-2.5">
                  {bidAmount}
                </span>
                <button
                  type="button"
                  onClick={handleDecreaseBid}
                  aria-label="Decrease bid"
                  className="w-14 h-9.5 rounded-md bg-gray-100 hover:bg-gray-200 font-brand-purple border border-brand-purple flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FiMinus className="text-sm" />
                </button>
              </div>

              {/* Bid Button */}
              <button
                type="button"
                onClick={handlePlaceBid}
                className="w-full py-2.5 px-4 rounded-lg bg-brand-purple hover:opacity-95 text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
              >
                {t("bidNow")}
              </button>

              {bidFeedback && (
                <p className="text-xs font-semibold text-brand-green text-center">
                  {bidFeedback}
                </p>
              )}
            </div>

            {/* Container 2 (Left in RTL): Action Icons, Specs, Mojaz Report, Inspection */}
            <aside className="gsap-stagger sm:col-span-6 flex flex-col gap-4 text-gray-900">
              {/* Top Action Icons */}
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFavorite((prev) => !prev)}
                  aria-label={t("favorite")}
                  className={`p-2 rounded-lg  transition-colors cursor-pointer ${
                    isFavorite
                      ? " bg-brand-green/10 text-brand-green"
                      : " text-gray-800 hover:text-brand-green"
                  }`}
                >
                  <FiStar className="text-2xl" />
                </button>
                <Link
                  href="/contact"
                  aria-label={t("report")}
                  className="p-2 rounded-lg  text-gray-800 hover:text-brand-green transition-colors"
                >
                  <TfiHeadphoneAlt className="text-2xl" />
                </Link>
              </div>

              {/* Vehicle Specs List */}
              <div className="space-y-3.5 border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2 ">
                  <FaCar className="text-2xl text-gray-800 shrink-0" />
                  <div>
                    <p className="text-xs font-gray-1 font-medium">
                      {t("model")}
                    </p>
                    <p className="text-sm font-bold text-gray-950">
                      {car.model}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ">
                  <GiSteeringWheel className="text-2xl text-gray-800 shrink-0" />
                  <div>
                    <p className="text-xs font-gray-1 font-medium">
                      {t("condition")}
                    </p>
                    <p className="text-sm font-bold text-gray-950">
                      {conditionLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ">
                  <span className="w-7 h-7 rounded bg-red-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    7
                  </span>
                  <div>
                    <p className="text-xs font-gray-1 font-medium">
                      {t("company")}
                    </p>
                    <p className="text-sm font-bold text-gray-950">
                      {t(car.companyNameKey || "sevenCar")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ">
                  <FaTachometerAlt className="text-2xl text-gray-800 shrink-0" />
                  <div>
                    <p className="text-xs font-gray-1 font-medium">
                      {t("kilometers")}
                    </p>
                    <p className="text-sm font-bold text-gray-950">
                      {car.kilometers}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mojaz Report Box */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-brand-purple hover:bg-brand-green/5 transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-gray-950">
                  {t("buyMojazReport")}
                </span>
                <span className="bg-red-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded">
                  موجز
                </span>
              </button>

              {/* Inspection Info & Map Button */}
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <FaMapMarkedAlt className="text-3xl text-gray-800 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-950">
                      {t("inspection")}
                    </p>
                    <p className="text-xs font-gray-1 leading-relaxed">
                      {t("inspectionNote")}
                    </p>
                    <p className="text-xs font-bold text-gray-900">
                      {t("cityLabel")} : {cityLabel}
                    </p>
                  </div>
                </div>

                {/* <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-800 hover:border-brand-green hover:text-brand-green text-xs sm:text-sm font-bold text-gray-950 transition-colors"
                >
                  <FiMapPin className="text-sm" />
                  <span>{t("inspectionOnMap")}</span>
                </Link> */}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Image Popup Modal */}
      <CarImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={car.image}
        title={carTitle}
      />
    </section>
  );
}
