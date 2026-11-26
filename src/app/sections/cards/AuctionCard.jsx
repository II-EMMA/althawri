"use client";
import CarCard from "@/app/components/CarCard";
import { CARDS_DATA } from "@/data/auctionsData";
import { useTranslations } from "next-intl";

export default function AuctionCard({ dir }) {
  const t = useTranslations("AuctionCard");

  return (
    <section className="sm:flex hidden flex-col xl:ml-10 xl:mr-3 rounded-2xl xl:w-80 mx-auto xl:px-0 px-5 w-full shrink-0">
      <div
        className={`${dir ? "text-right" : "text-left"} p-4 bg-brand-secondary-purple rounded-t-xl`}
      >
        <p className="font-extrabold text-white text-base">{t("header")}</p>
      </div>
      <div
        className={`${dir ? "text-right" : "text-left"} p-4 bg-white border-x border-gray-100`}
      >
        <p className="font-extrabold font-gray-1 text-base">
          {t("recentlyAdded")}
        </p>
      </div>
      <div className="grid xl:grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-y-2 gap-5 bg-white p-2 rounded-b-xl border border-t-0 border-gray-100">
        {CARDS_DATA.slice(0, 4).map((car) => (
          <CarCard key={car.id} car={car} variant="sidebar" />
        ))}
      </div>
    </section>
  );
}
