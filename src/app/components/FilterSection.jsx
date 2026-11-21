import { getTranslations } from "next-intl/server";
import FilterForm from "./FilterForm";

export default async function FilterSection() {
  const t = await getTranslations("Filter");

  const labels = {
    city: t("city"),
    brand: t("brand"),
    model: t("model"),
    year: t("year"),
    condition: t("condition"),
    search: t("search"),
  };

  const filterData = {
    cities: [
      t("all"),
      t("cities.riyadh"),
      t("cities.jeddah"),
      t("cities.dammam"),
    ],
    brands: [
      t("all"),
      t("brands.suzuki"),
      t("brands.toyota"),
      t("brands.nissan"),
      t("brands.honda"),
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
    <section className="w-full max-w-6xl mx-auto px-4 -mt-12 relative z-30">
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100">
        <FilterForm filterData={filterData} labels={labels} />
      </div>
    </section>
  );
}
