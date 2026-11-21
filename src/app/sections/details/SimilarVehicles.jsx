"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CARDS_DATA } from "@/data/auctionsData";
import CarCard from "@/app/components/CarCard";

export default function SimilarVehicles({ currentCarId }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("SimilarVehicles");

  const [showAll, setShowAll] = useState(false);

  const similarCars = CARDS_DATA.filter(
    (item) => String(item.id) !== String(currentCarId),
  );

  const visibleCars = showAll ? similarCars : similarCars.slice(0, 4);

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-12 space-y-6"
    >
      {/* Header Row: Title on start + Green "More" button on end */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 pb-1.5 border-b-2 border-brand-green inline-block">
          {t("title")}
        </h2>

        {similarCars.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-brand-green hover:opacity-90 text-white font-bold text-xs md:text-sm px-6 py-2 rounded-lg shadow-2xs transition-all cursor-pointer shrink-0"
          >
            {showAll ? t("less") : t("more")}
          </button>
        )}
      </div>

      {/* Similar Cars List */}
      {visibleCars.length === 0 ? (
        <p className="text-base font-gray-1 py-4">{t("noCars")}</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-4 bg-white  py-5 rounded-xl border border-t-0 border-gray-100">
          {visibleCars.map((car) => (
            <CarCard key={car.id} car={car} variant="sidebar" />
          ))}
        </div>
      )}
    </section>
  );
}
