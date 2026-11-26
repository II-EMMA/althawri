import Hero from "../sections/hero/Hero";
import HeroFilter from "../sections/hero/HeroFilter";
import { setRequestLocale } from "next-intl/server";
import HomeFilter from "../sections/home/HomeFilter";
import { FilterProvider } from "@/context/FilterContext";
import StatusFilter from "../components/StatusFilter";
import PartnersFilter from "../components/PartnersFilter";
import ShowCards from "../sections/cards/ShowCards";
import AuctionCard from "../sections/cards/AuctionCard";
import BrowseBrands from "../sections/brands/BrowseBrands";
import BrandsSlider from "../sections/brands/BrandsSlider";
import PurchaseCycle from "../sections/brands/PurchaseCycle";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const isRtl = locale === "ar";
  setRequestLocale(locale);

  return (
    <main className="max-w-375 mx-auto">
      <Hero />

      <FilterProvider>
        <HeroFilter />

        <div className="flex xl:flex-row flex-col  mt-6">
          <AuctionCard dir={isRtl} />
          {/* <FilterSidebar /> */}
          <div className="flex-1 flex flex-col">
            <div className="w-full flex flex-col space-y-4">
              <HomeFilter locale={locale} />
              <StatusFilter />
              <PartnersFilter />
            </div>

            <ShowCards />
          </div>
        </div>
      </FilterProvider>
      <BrowseBrands />
      <BrandsSlider />
      <PurchaseCycle dir={isRtl} />
    </main>
  );
}
