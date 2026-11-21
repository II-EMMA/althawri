import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FiChevronLeft } from "react-icons/fi";

import SignUp from "@/assets/images/sign-up.png";
import Money from "@/assets/images/money.png";
import Hands from "@/assets/images/hands.png";
import Cash from "@/assets/images/cash.png";
import Car from "@/assets/images/car.png";

export default async function PurchaseCycle({ dir }) {
  const t = await getTranslations("PurchaseCycle");

  const steps = [
    { title: t("step1"), icon: SignUp },
    { title: t("step2"), icon: Money },
    { title: t("step3"), icon: Hands },
    { title: t("step4"), icon: Cash },
    { title: t("step5"), icon: Car },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-15 text-center bg-white my-8">
      {/* Title with green underline */}
      <div className="flex justify-center mb-16">
        <h2 className="text-xl font-bold font-gray-1 pb-2 border-b-2 border-brand-green inline-block">
          {t("title")}
        </h2>
      </div>

      {/* Steps Flow Container using Grid for precise dead-center spacing */}
      <div
        dir={dir ? "rtl" : "ltr"}
        className="hidden lg:grid grid-cols-9 items-center w-full"
      >
        {steps.map((step, index) => (
          <div key={index} className="contents">
            {/* Step Card */}
            <div className="col-span-1 flex flex-col items-center group">
              <div className="w-28 h-28 rounded-full flex items-center justify-center p-4 mb-4 bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                <div className="relative w-12 h-12">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-sm font-semibold font-gray-1 max-w-[150px]">
                {step.title}
              </span>
            </div>

            {/* Centered Arrow in the Gap Column */}
            {index < steps.length - 1 && (
              <div className="col-span-1 flex items-center justify-center text-brand-purple pb-10">
                <FiChevronLeft className="text-2xl font-bold" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Stack View */}
      <div className="flex lg:hidden flex-col items-center gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div className="w-28 h-28 rounded-full flex items-center justify-center p-4 mb-4 bg-white shadow-lg">
              <div className="relative w-12 h-12">
                <Image
                  src={step.icon}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-sm font-semibold font-gray-1">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
