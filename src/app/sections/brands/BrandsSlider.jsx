"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import gsap from "gsap";

import Company1 from "@/assets/images/company-1.jpg";
import Company2 from "@/assets/images/company-2.jpg";
import Company3 from "@/assets/images/company-3.jpg";
import Company4 from "@/assets/images/company-4.jpg";
import Company5 from "@/assets/images/company-5.png";
import Company6 from "@/assets/images/company-6.jpg";
import Company7 from "@/assets/images/company-7.jpg";
import Company8 from "@/assets/images/company-8.jpg";
import Company9 from "@/assets/images/company-9.jpg";
import Company10 from "@/assets/images/company-10.jpg";
import Company11 from "@/assets/images/company-11.jpg";
import Company12 from "@/assets/images/company-12.jpg";
import Company13 from "@/assets/images/company-13.jpg";
import Company14 from "@/assets/images/company-14.jpg";
import Company15 from "@/assets/images/company-15.jpg";
import Company16 from "@/assets/images/company-16.jpg";
import Company17 from "@/assets/images/company-17.jpg";
import Company18 from "@/assets/images/company-18.jpg";
import Company19 from "@/assets/images/company-19.jpg";
import Company20 from "@/assets/images/company-20.jpg";

export default function BrandsSlider() {
  const t = useTranslations("Companies");
  const trackRef = useRef(null);
  const currentXRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  const companies = [
    Company1,
    Company2,
    Company3,
    Company4,
    Company5,
    Company6,
    Company7,
    Company8,
    Company9,
    Company10,
    Company11,
    Company12,
    Company13,
    Company14,
    Company15,
    Company16,
    Company17,
    Company18,
    Company19,
    Company20,
  ];

  const stepSize = 300; // Pixels per step

  const slideStep = (direction) => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2; // Half width because of duplicated array
    if (!totalWidth) return;

    let newX =
      direction === "left"
        ? currentXRef.current + stepSize
        : currentXRef.current - stepSize;

    // Seamless infinite loop boundary check
    if (newX > 0) {
      newX = -totalWidth;
    } else if (newX <= -totalWidth) {
      newX = 0;
    }

    currentXRef.current = newX;

    gsap.to(track, {
      x: newX,
      duration: 0.9,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Auto-step timer running continuously unless hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      slideStep("right");
    }, 1000); // Moves every 1 second automatically

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 bg-white my-5">
      {/* Title Div with green underline */}
      <div className="flex justify-end mb-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 pb-2 border-b-2 border-brand-green inline-block">
          {t("title")}
        </h2>
      </div>

      {/* Slider Container with Hover Trigger for Arrows */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group py-4 overflow-hidden"
      >
        {/* Left Arrow Button (Appears on Hover) */}
        <button
          onClick={() => slideStep("left")}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-gray-100 text-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-3 pointer-events-none"
          }`}
          aria-label="Previous"
        >
          <FiChevronLeft className="text-xl" />
        </button>

        {/* Companies Track Container */}
        <div dir="ltr" className="overflow-hidden px-12 py-2">
          <div
            ref={trackRef}
            className="flex flex-row items-center gap-8 w-max will-change-transform"
          >
            {/* Duplicated array so all 20 companies cycle through seamlessly without a dead end */}
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-36 h-20 flex items-center justify-center relative select-none"
              >
                <Image
                  src={company}
                  alt={`Company ${(index % companies.length) + 1}`}
                  fill
                  className="object-contain pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button (Appears on Hover) */}
        <button
          onClick={() => slideStep("right")}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-gray-100 text-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-3 pointer-events-none"
          }`}
          aria-label="Next"
        >
          <FiChevronRight className="text-xl" />
        </button>
      </div>
    </section>
  );
}
