"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import gsap from "gsap";

export default function CarImageLightbox({
  isOpen,
  onClose,
  image,
  title,
  onPrev,
  onNext,
  hasMultiple = false,
}) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("CarDetail");

  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    isClosingRef.current = false;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (backdropRef.current && contentRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.94, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (backdropRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.94,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          isClosingRef.current = false;
          onClose();
        },
      });
    } else {
      isClosingRef.current = false;
      onClose();
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      dir={isRtl ? "rtl" : "ltr"}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4"
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl flex flex-col items-start gap-2.5"
      >
        {/* Close button matching screenshot */}
        <button
          type="button"
          onClick={handleClose}
          className="inline-flex items-center gap-1.5 bg-[#e53935] hover:bg-[#c62828] text-white text-xs font-bold px-3.5 py-1.5 rounded-md shadow-md transition-colors cursor-pointer"
        >
          <FiX className="text-sm" />
          <span>{t("close")}</span>
        </button>

        {/* Main Image Container */}
        <div className="relative w-full aspect-[16/10] bg-black/40 rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous image"
                className="absolute top-1/2 -translate-y-1/2 start-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                {isRtl ? <FiChevronRight /> : <FiChevronLeft />}
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                className="absolute top-1/2 -translate-y-1/2 end-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                {isRtl ? <FiChevronLeft /> : <FiChevronRight />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
