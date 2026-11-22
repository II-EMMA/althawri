import { setRequestLocale } from "next-intl/server";
import Hero from "@/app/sections/hero/Hero";
import HomeFilter from "@/app/sections/home/HomeFilter";
import { FilterProvider } from "@/context/FilterContext";

import ShowCards from "@/app/sections/cards/ShowCards";

import FilterSidebar from "@/app/sections/filtering/FilterSidebar";

export default async function AuctionPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="max-w-375 mx-auto">
      <Hero />

      <FilterProvider>
        <div className="flex my-6 flex-row-reverse">
          <FilterSidebar />
          <div className="flex-1 flex flex-col">
            <div className="w-full flex flex-col space-y-4">
              <HomeFilter locale={locale} />
            </div>

            <ShowCards />
          </div>
        </div>
      </FilterProvider>
    </main>
  );
}
