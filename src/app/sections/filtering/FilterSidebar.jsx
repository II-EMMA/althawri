"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiPlus, FiMinus, FiCheck } from "react-icons/fi";
import gsap from "gsap";
import GreenBtn from "@/app/components/GreenBtn";
import { IoClose } from "react-icons/io5";

export default function FilterSidebar() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("FilterSidebar");
  const [openSection, setOpenSection] = useState("saleType");
  const [selected, setSelected] = useState({ saleType: ["شراء مباشر"] });

  // Price Range State
  const MIN = 0;
  const MAX = 250;
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);

  const trackRef = useRef(null);
  const rangeRef = useRef(null);
  const minHandleRef = useRef(null);
  const maxHandleRef = useRef(null);

  const percent = (value) => ((value - MIN) / (MAX - MIN)) * 100;
  const valueFromX = (x, trackWidth) =>
    Math.round((x / trackWidth) * (MAX - MIN) + MIN);

  useEffect(() => {
    const updateVisuals = () => {
      if (!trackRef.current) return;
      const minPercent = percent(minPrice);
      const maxPercent = percent(maxPrice);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
      if (minHandleRef.current) {
        minHandleRef.current.style.left = `${minPercent}%`;
      }
      if (maxHandleRef.current) {
        maxHandleRef.current.style.left = `${maxPercent}%`;
      }
    };
    updateVisuals();
  }, [minPrice, maxPrice]);

  const makeDraggable = (ref, isMin) => {
    const handle = ref.current;
    const track = trackRef.current;
    if (!handle || !track) return;

    const onMove = (e) => {
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const trackWidth = rect.width;
      const value = Math.min(MAX, Math.max(MIN, valueFromX(x, trackWidth)));

      if (isMin) {
        setMinPrice(Math.min(value, maxPrice - 1));
      } else {
        setMaxPrice(Math.max(value, minPrice + 1));
      }
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    handle.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    });
  };

  useEffect(() => {
    makeDraggable(minHandleRef, true);
    makeDraggable(maxHandleRef, false);
  }, []);

  const toggleAccordion = (sectionKey, contentRef) => {
    if (openSection === sectionKey) {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      setOpenSection(null);
    } else {
      setOpenSection(sectionKey);
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
  };

  const toggleOption = (category, item) => {
    setSelected((prev) => {
      const list = prev[category] || [];
      if (list.includes(item)) {
        return { ...prev, [category]: list.filter((i) => i !== item) };
      } else {
        return { ...prev, [category]: [...list, item] };
      }
    });
  };

  const clearSection = (category) => {
    setSelected((prev) => ({ ...prev, [category]: [] }));
  };

  return (
    <aside
      dir={isRtl ? "rtl" : "ltr"}
      className="lg:block hidden w-52.75 mx-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-right"
    >
      {/* 1. نوع البيع */}
      <FilterSection
        title={t("brand")}
        sectionKey="saleType"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("saleType")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.all")}
            checked={selected.saleType?.includes("الكل")}
            onChange={() => toggleOption("saleType", "الكل")}
          />
          <CheckboxItem
            label={t("options.auction")}
            checked={selected.saleType?.includes("مزاد")}
            onChange={() => toggleOption("saleType", "مزاد")}
          />
          <CheckboxItem
            label={t("options.directBuy")}
            checked={selected.saleType?.includes("شراء مباشر")}
            onChange={() => toggleOption("saleType", "شراء مباشر")}
          />
          <CheckboxItem
            label={t("options.both")}
            checked={selected.saleType?.includes("كلاهما")}
            onChange={() => toggleOption("saleType", "كلاهما")}
          />
        </div>
      </FilterSection>

      {/* 2. المدينة */}
      <FilterSection
        title={t("city")}
        sectionKey="city"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("city")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.riyadh")}
            checked={selected.city?.includes("الرياض")}
            onChange={() => toggleOption("city", "الرياض")}
          />
          <CheckboxItem
            label={t("options.jeddah")}
            checked={selected.city?.includes("جدة")}
            onChange={() => toggleOption("city", "جدة")}
          />
        </div>
      </FilterSection>

      {/* 3. الماركة */}
      <FilterSection
        title={t("style")}
        sectionKey="style"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("style")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.gmc")}
            checked={selected.style?.includes("جي أم سي")}
            onChange={() => toggleOption("style", "جي أم سي")}
          />
          <CheckboxItem
            label={t("options.foton")}
            checked={selected.style?.includes("فوتون")}
            onChange={() => toggleOption("style", "فوتون")}
          />
          <CheckboxItem
            label={t("options.saic")}
            checked={selected.style?.includes("سايك موتور")}
            onChange={() => toggleOption("style", "سايك موتور")}
          />
          <CheckboxItem
            label={t("options.byd")}
            checked={selected.style?.includes("بي واي دي")}
            onChange={() => toggleOption("style", "بي واي دي")}
          />
          <CheckboxItem
            label={t("options.faw")}
            checked={selected.style?.includes("فاوي")}
            onChange={() => toggleOption("style", "فاوي")}
          />
          <CheckboxItem
            label={t("options.jينيور")}
            checked={selected.style?.includes("جينور")}
            onChange={() => toggleOption("style", "جينور")}
          />
        </div>
      </FilterSection>

      {/* 4. الشكل */}
      <FilterSection
        title={t("shape")}
        sectionKey="shape"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("shape")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.mpv")}
            checked={selected.shape?.includes("ام بي في")}
            onChange={() => toggleOption("shape", "ام بي في")}
          />
          <CheckboxItem
            label={t("options.fridge")}
            checked={selected.shape?.includes("ثلاجه")}
            onChange={() => toggleOption("shape", "ثلاجه")}
          />
          <CheckboxItem
            label={t("options.singleCab")}
            checked={selected.shape?.includes("بكب غمارة")}
            onChange={() => toggleOption("shape", "بكب غمارة")}
          />
          <CheckboxItem
            label={t("options.doubleCab")}
            checked={selected.shape?.includes("بكب غمارتين")}
            onChange={() => toggleOption("shape", "بكب غمارتين")}
          />
          <CheckboxItem
            label={t("options.bus")}
            checked={selected.shape?.includes("باص")}
            onChange={() => toggleOption("shape", "باص")}
          />
          <CheckboxItem
            label={t("options.pickup")}
            checked={selected.shape?.includes("بكب")}
            onChange={() => toggleOption("shape", "بكب")}
          />
        </div>
      </FilterSection>

      {/* 5. سنة الصنع */}
      <FilterSection
        title={t("year")}
        sectionKey="year"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("year")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label="2026"
            checked={selected.year?.includes("2026")}
            onChange={() => toggleOption("year", "2026")}
          />
          <CheckboxItem
            label="2025"
            checked={selected.year?.includes("2025")}
            onChange={() => toggleOption("year", "2025")}
          />
          <CheckboxItem
            label="2024"
            checked={selected.year?.includes("2024")}
            onChange={() => toggleOption("year", "2024")}
          />
          <CheckboxItem
            label="2023"
            checked={selected.year?.includes("2023")}
            onChange={() => toggleOption("year", "2023")}
          />
          <CheckboxItem
            label="2022"
            checked={selected.year?.includes("2022")}
            onChange={() => toggleOption("year", "2022")}
          />
          <CheckboxItem
            label="2021"
            checked={selected.year?.includes("2021")}
            onChange={() => toggleOption("year", "2021")}
          />
        </div>
      </FilterSection>

      {/* 6. حالة السيارة */}
      <FilterSection
        title={t("case")}
        sectionKey="case"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("case")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.damaged")}
            checked={selected.case?.includes("مصدوم")}
            onChange={() => toggleOption("case", "مصدوم")}
          />
          <CheckboxItem
            label={t("options.fire")}
            checked={selected.case?.includes("حريق")}
            onChange={() => toggleOption("case", "حريق")}
          />
          <CheckboxItem
            label={t("options.flooded")}
            checked={selected.case?.includes("غرقان")}
            onChange={() => toggleOption("case", "غرقان")}
          />
          <CheckboxItem
            label={t("options.used")}
            checked={selected.case?.includes("مستعمل")}
            onChange={() => toggleOption("case", "مستعمل")}
          />
          <CheckboxItem
            label={t("options.towed")}
            checked={selected.case?.includes("مسحوب")}
            onChange={() => toggleOption("case", "مسحوب")}
          />
        </div>
      </FilterSection>

      {/* 7. السعر (بالالاف) */}
      <FilterSection
        title={t("priceRange")}
        sectionKey="price"
        openSection={openSection}
        onToggle={toggleAccordion}
      >
        <div className="py-6 px-2">
          <div
            ref={trackRef}
            className="relative w-full h-1.5 bg-[#F0F0F0] rounded-full mb-6"
          >
            <div
              ref={rangeRef}
              className="absolute top-0 h-full bg-brand-green mt-0.5 rounded-full transition-all duration-150"
            />

            {/* Min Handle */}
            <div
              ref={minHandleRef}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-green rounded-full cursor-pointer z-10 shadow-sm"
              onMouseEnter={() => gsap.to(minHandleRef.current, { scale: 1.2 })}
              onMouseLeave={() => gsap.to(minHandleRef.current, { scale: 1 })}
            >
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-semibold whitespace-nowrap">
                {minPrice} الف
              </div>
            </div>

            {/* Max Handle */}
            <div
              ref={maxHandleRef}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-green rounded-full cursor-pointer z-10 shadow-sm -ml-1"
              onMouseEnter={() => gsap.to(maxHandleRef.current, { scale: 1.2 })}
              onMouseLeave={() => gsap.to(maxHandleRef.current, { scale: 1 })}
            >
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-semibold whitespace-nowrap">
                {maxPrice} الف
              </div>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* 8. اللون الخارجي */}
      <FilterSection
        title={t("extColor")}
        sectionKey="extColor"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("extColor")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.beige")}
            checked={selected.extColor?.includes("بيج")}
            onChange={() => toggleOption("extColor", "بيج")}
          />
          <CheckboxItem
            label={t("options.black")}
            checked={selected.extColor?.includes("أسود")}
            onChange={() => toggleOption("extColor", "أسود")}
          />
          <CheckboxItem
            label={t("options.red")}
            checked={selected.extColor?.includes("أحمر")}
            onChange={() => toggleOption("extColor", "أحمر")}
          />
          <CheckboxItem
            label={t("options.brown")}
            checked={selected.extColor?.includes("بني")}
            onChange={() => toggleOption("extColor", "بني")}
          />
          <CheckboxItem
            label={t("options.burgundy")}
            checked={selected.extColor?.includes("Burgundy")}
            onChange={() => toggleOption("extColor", "Burgundy")}
          />
          <CheckboxItem
            label={t("options.charcoal")}
            checked={selected.extColor?.includes("فحم")}
            onChange={() => toggleOption("extColor", "فحم")}
          />
        </div>
      </FilterSection>

      {/* 9. نوع الجير */}
      <FilterSection
        title={t("transmission")}
        sectionKey="transmission"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("transmission")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.automatic")}
            checked={selected.transmission?.includes("اوتوماتيك")}
            onChange={() => toggleOption("transmission", "اوتوماتيك")}
          />
          <CheckboxItem
            label={t("options.manual")}
            checked={selected.transmission?.includes("عادي")}
            onChange={() => toggleOption("transmission", "عادي")}
          />
        </div>
      </FilterSection>

      {/* 10. عدد الاسطوانات */}
      <FilterSection
        title={t("cylinders")}
        sectionKey="cylinders"
        openSection={openSection}
        onToggle={toggleAccordion}
        onClear={() => clearSection("cylinders")}
      >
        <div className="max-h-48 overflow-y-auto pl-2 pr-1 space-y-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <CheckboxItem
            label={t("options.cyl2")}
            checked={selected.cylinders?.includes("2 اسطوانة")}
            onChange={() => toggleOption("cylinders", "2 اسطوانة")}
          />
          <CheckboxItem
            label={t("options.cyl3")}
            checked={selected.cylinders?.includes("3 اسطوانة")}
            onChange={() => toggleOption("cylinders", "3 اسطوانة")}
          />
          <CheckboxItem
            label={t("options.cyl4")}
            checked={selected.cylinders?.includes("4 اسطوانة")}
            onChange={() => toggleOption("cylinders", "4 اسطوانة")}
          />
          <CheckboxItem
            label={t("options.cyl5")}
            checked={selected.cylinders?.includes("5 اسطوانة")}
            onChange={() => toggleOption("cylinders", "5 اسطوانة")}
          />
          <CheckboxItem
            label={t("options.cyl6")}
            checked={selected.cylinders?.includes("6 اسطوانة")}
            onChange={() => toggleOption("cylinders", "6 اسطوانة")}
          />
          <CheckboxItem
            label={t("options.cyl8")}
            checked={selected.cylinders?.includes("8 اسطوانة")}
            onChange={() => toggleOption("cylinders", "8 اسطوانة")}
          />
        </div>
      </FilterSection>

      {/* Search Submit Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <GreenBtn className="w-full py-3 text-sm">{t("searchButton")}</GreenBtn>
      </div>
    </aside>
  );
}

function FilterSection({
  title,
  sectionKey,
  openSection,
  onToggle,
  onClear,
  children,
}) {
  const contentRef = useRef(null);
  const isOpen = openSection === sectionKey;
  const t = useTranslations("FilterSidebar");

  return (
    <div className="border-b border-gray-100 last:border-none">
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => onToggle(sectionKey, contentRef)}
          className="w-full flex items-center gap-x-1 text-gray-700 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            {isOpen ? (
              <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                <FiMinus className="text-xs" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                <FiPlus className="text-xs" />
              </div>
            )}
          </div>
          <span
            className={
              isOpen
                ? "text-brand-green font-bold text-sm"
                : "font-bold font-gray-1 text-sm"
            }
          >
            {title}
          </span>
        </button>
        {isOpen && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="flex gap-x-0.5 items-center px-1.5 flex-row-reverse cursor-pointer hover:opacity-80 transition-opacity shrink-0"
          >
            <IoClose className="text-gray-400" />
            <p className="text-xs text-gray-400 font-semibold">{t("clear")}</p>
          </button>
        )}
      </div>

      <div
        ref={contentRef}
        style={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-1.5">
      <span className="text-sm font-gray-1 font-semibold group-hover:text-black">
        {label}
      </span>
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${
          checked
            ? "bg-brand-green border-brand-green text-white"
            : "border-gray-300 bg-white group-hover:border-brand-green"
        }`}
      >
        {checked && <FiCheck className="text-[10px] stroke-[3]" />}
      </div>
    </label>
  );
}
