"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale } from "next-intl";
import gsap from "gsap";

import CarouselOne from "@/assets/images/carousel-1.jpg";
import CarouselTwo from "@/assets/images/carousel-2.jpg";
import CarouselThree from "@/assets/images/carousel-3.jpg";
import CarouselFour from "@/assets/images/carousel-4.jpg";

export default function Hero() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const slides = [CarouselOne, CarouselTwo, CarouselThree, CarouselFour];

  const [activeDot, setActiveDot] = useState(0);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const slidesRef = useRef([]);

  // Set initial position of slides when mounted or when locale changes
  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      if (!slide) return;
      if (index === currentIndexRef.current) {
        gsap.set(slide, { xPercent: 0, zIndex: 10, opacity: 1 });
      } else {
        const initialOffset = isRtl ? -100 : 100;
        gsap.set(slide, { xPercent: initialOffset, zIndex: 1, opacity: 1 });
      }
    });
  }, [isRtl]);

  const goToSlide = (nextIndex, directionOverride = null) => {
    if (isAnimatingRef.current || nextIndex === currentIndexRef.current) return;

    isAnimatingRef.current = true;
    const currentIndex = currentIndexRef.current;

    // Determine move direction
    let isNext = nextIndex > currentIndex;
    if (currentIndex === slides.length - 1 && nextIndex === 0) isNext = true;
    if (currentIndex === 0 && nextIndex === slides.length - 1) isNext = false;
    if (directionOverride === "next") isNext = true;
    if (directionOverride === "prev") isNext = false;

    // Adjust X transform percentages for LTR / RTL direction
    let enterFrom = isNext ? 100 : -100;
    let exitTo = isNext ? -100 : 100;

    if (isRtl) {
      enterFrom *= -1;
      exitTo *= -1;
    }

    const currentSlide = slidesRef.current[currentIndex];
    const nextSlide = slidesRef.current[nextIndex];

    // Position upcoming slide off-screen first
    gsap.set(nextSlide, { xPercent: enterFrom, zIndex: 20 });
    gsap.set(currentSlide, { zIndex: 10 });

    const timeline = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = nextIndex;
        setActiveDot(nextIndex);
        gsap.set(currentSlide, { zIndex: 1 });
        isAnimatingRef.current = false;
      },
    });

    timeline
      .to(currentSlide, {
        xPercent: exitTo,
        duration: 0.75,
        ease: "power2.inOut",
      })
      .to(
        nextSlide,
        {
          xPercent: 0,
          duration: 0.75,
          ease: "power2.inOut",
        },
        "<",
      );
  };

  const handleNext = () => {
    const nextIndex = (currentIndexRef.current + 1) % slides.length;
    goToSlide(nextIndex, "next");
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndexRef.current - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, "prev");
  };

  // Auto-play timer setup
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isRtl]);

  return (
    <section className="relative w-full h-56 sm:h-72 md:h-96 lg:h-115 overflow-hidden bg-gray-100 group z-20">
      {/* Slide Stack */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slidesRef.current[index] = el)}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <Image
              src={slide}
              alt={`Hero Banner ${index + 1}`}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Left Hover Navigation Arrow */}
      <button
        onClick={isRtl ? handleNext : handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 sm:p-3.5 rounded-full opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-30 flex items-center justify-center shadow-lg cursor-pointer"
        aria-label="Previous Slide"
      >
        <FiChevronLeft className="text-xl sm:text-2xl" />
      </button>

      {/* Right Hover Navigation Arrow */}
      <button
        onClick={isRtl ? handlePrev : handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 sm:p-3.5 rounded-full opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-30 flex items-center justify-center shadow-lg cursor-pointer"
        aria-label="Next Slide"
      >
        <FiChevronRight className="text-xl sm:text-2xl" />
      </button>
    </section>
  );
}
