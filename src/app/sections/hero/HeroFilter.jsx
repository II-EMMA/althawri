import FilterForm from "@/app/components/FilterForm";
import { getTranslations } from "next-intl/server";

export default async function HeroFilter() {
  const t = await getTranslations("Filter");

  const labels = {
    city: t("city"),
    brand: t("brand"),
    model: t("model"),
    year: t("year"),
    condition: t("condition"),
    search: t("search"),
  };

  // جلب الترجمات الديناميكية من ملفات الـ JSON
  const filterData = {
    cities: [
      t("all"),
      t("cities.riyadh"),
      t("cities.jeddah"),
      t("cities.dammam"),
    ],
    brands: [
      t("all"),
      t("brands.honda"),
      t("brands.suzuki"),
      t("brands.toyota"),
      t("brands.nissan"),
      t("brands.gmc"),
    ],
    models: [
      t("all"),
      t("models.odyssey"),
      t("models.accord"),
      t("models.civic"),
      t("models.crosstour"),
    ],
    years: [
      t("all"),
      ...Array.from({ length: 44 }, (_, i) => String(2026 - i)),
    ],
    conditions: [
      t("all"),
      t("conditions.new"),
      t("conditions.used"),
      t("conditions.damaged"),
    ],
  };

  return (
    <section className="relative z-30 max-w-6xl mx-auto px-4 -mt-10 xl:block hidden">
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-center">
        <FilterForm filterData={filterData} labels={labels} />
      </div>
    </section>
  );
}
