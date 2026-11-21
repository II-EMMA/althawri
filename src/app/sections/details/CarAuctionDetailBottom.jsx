"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiAlertCircle } from "react-icons/fi";

const DEFAULT_BIDDERS = [
  { id: 1, amount: "45500", timestamp: "21:58:53 2026-11-20" },
  { id: 2, amount: "45000", timestamp: "21:58:46 2026-11-20" },
  { id: 3, amount: "44500", timestamp: "21:57:55 2026-11-20" },
  { id: 4, amount: "44000", timestamp: "21:57:35 2026-11-20" },
  { id: 5, amount: "43500", timestamp: "21:57:30 2026-11-20" },
  { id: 6, amount: "43000", timestamp: "21:56:51 2026-11-20" },
  { id: 7, amount: "42500", timestamp: "21:56:17 2026-11-20" },
  { id: 8, amount: "42000", timestamp: "21:56:14 2026-11-20" },
  { id: 9, amount: "41500", timestamp: "21:55:49 2026-11-20" },
];

export default function CarAuctionDetailBottom({ car, bidders = [] }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("CarAuctionDetail");

  const activeBidders =
    bidders && bidders.length > 0 ? bidders : DEFAULT_BIDDERS;

  const translateValue = (key, fallback = "-") => {
    if (!key) return fallback;
    return t.has(`specValues.${key}`) ? t(`specValues.${key}`) : fallback;
  };

  const translateBrand = (brandKey, fallback = "-") => {
    if (!brandKey) return fallback;
    return t.has(`specValues.brands.${brandKey}`)
      ? t(`specValues.brands.${brandKey}`)
      : fallback;
  };

  const rightSpecs = [
    { label: t("specs.serialNumber"), value: car?.serialNumber ?? "-" },
    {
      label: t("specs.brand"),
      value: translateBrand(car?.brandKey, car?.brand),
    },
    { label: t("specs.model"), value: car?.model ?? "-" },
    { label: t("specs.key"), value: car?.keyCount ?? "1" },
    {
      label: t("specs.registration"),
      value: translateValue(car?.registrationKey, car?.registration),
    },
    {
      label: t("specs.inspectionStatus"),
      value: translateValue(car?.inspectionStatusKey, car?.inspectionStatus),
    },
  ];

  const leftSpecs = [
    {
      label: t("specs.transmission"),
      value: translateValue(car?.transmissionKey, car?.transmission),
    },
    {
      label: t("specs.cylinders"),
      value: translateValue(car?.cylindersKey, car?.cylinders),
    },
    {
      label: t("specs.drivetrain"),
      value: translateValue(car?.drivetrainKey, car?.drivetrain),
    },
    {
      label: t("specs.fuelType"),
      value: translateValue(car?.fuelKey, car?.fuelType),
    },
    {
      label: t("specs.engineStatus"),
      value: translateValue(car?.engineStatusKey, car?.engineStatus),
    },
    { label: t("specs.vin"), value: car?.vin ?? "-" },
    {
      label: t("specs.registrationType"),
      value: translateValue(car?.registrationTypeKey, car?.registrationType),
    },
  ];

  const displaySpecs = isRtl
    ? [rightSpecs, leftSpecs]
    : [leftSpecs, rightSpecs];

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8"
    >
      {/* Specifications Two-Column Table */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2">
        {displaySpecs.map((columnItems, colIdx) => (
          <div key={colIdx} className="divide-y divide-gray-100">
            {columnItems.map((row, idx) => (
              <div
                key={row.label}
                className={`flex items-center justify-between py-3 px-3 text-xs md:text-sm ${
                  idx % 2 === 0 ? "bg-gray-50/80" : "bg-white"
                }`}
              >
                <span className="text-gray-500 font-medium">{row.label}</span>
                <span
                  dir={row.label === t("specs.vin") ? "ltr" : undefined}
                  className="text-gray-900 font-bold"
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Description / Notice */}
      <div className="space-y-3">
        <h2 className="text-base md:text-lg font-bold text-gray-900">
          {t("descriptionTitle")}
        </h2>
        <div className="bg-white rounded-xl border border-gray-200/80 p-4 md:p-5 flex items-start gap-3">
          <FiAlertCircle className="text-brand-green text-lg shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-gray-700 font-medium leading-relaxed">
            {t("descriptionNotice")}
          </p>
        </div>
      </div>

      {/* Latest Bidders */}
      <div className="flex justify-start ltr:justify-end">
        <div className="w-full lg:w-1/2 bg-white rounded-xl border border-gray-200/80 p-5 shadow-2xs">
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4">
            {t("latestBiddersTitle")}
          </h3>

          <div className="max-h-72 overflow-y-auto pe-2 py-1 [scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent] divide-y divide-gray-100">
            {activeBidders.map((bid, i) => (
              <div
                key={bid.id ?? i}
                className="flex items-center justify-between gap-4 py-2.5 px-2 text-xs md:text-sm"
              >
                <span className="font-bold text-gray-900 tabular-nums">
                  {bid.amount}
                </span>
                <span
                  dir="ltr"
                  className="text-gray-400 font-medium text-xs tabular-nums"
                >
                  {bid.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
