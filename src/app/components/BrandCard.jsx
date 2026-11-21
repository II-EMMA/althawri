"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function BrandCard({ brand }) {
  const cardRef = useRef(null);
  const bgRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(bgRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.25,
      ease: "back.out(1.7)",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.15,
      ease: "power2.in",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative p-4 flex items-center justify-center h-24 cursor-pointer"
    >
      {/* Background box that completely vanishes on leave */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-white rounded-xl border border-gray-200 shadow-md pointer-events-none"
        style={{ opacity: 0, visibility: "hidden", transform: "scale(0.9)" }}
      />

      {/* Logo Image */}
      <div className="relative w-21 h-21 flex items-center justify-center z-10">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
