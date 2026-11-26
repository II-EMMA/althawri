// import { notFound } from "next/navigation";
// import { CARDS_DATA } from "@/data/auctionsData";

// export default async function AuctionCarDetailPage({ params }) {
//   const { id } = await params;
//   const car = CARDS_DATA.find((item) => String(item.id) === String(id));

//   if (!car) {
//     notFound();
//   }

//   return <CarAuctionDetail car={car} />;
// }

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CARDS_DATA } from "@/data/auctionsData";
import CarAuctionDetail from "@/app/sections/details/CarAuctionDetail";
import CarAuctionDetailBottom from "@/app/sections/details/CarAuctionDetailBottom";
import SimilarVehicles from "@/app/sections/details/SimilarVehicles";
import { FilterProvider } from "@/context/FilterContext";

export function generateStaticParams() {
  const locales = ["ar", "en"];
  return locales.flatMap((locale) =>
    CARDS_DATA.map((car) => ({
      locale,
      id: String(car.id),
    })),
  );
}

async function CarDetailContent({ params }) {
  const { id } = await params;

  const car = CARDS_DATA.find((item) => String(item.id) === String(id));

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-4 md:px-8 px-4">
      {/* Top Header / Bid Box */}
      <CarAuctionDetail car={car} />

      {/* Specifications, Warning Notice & Bidders */}
      <CarAuctionDetailBottom car={car} bidders={car?.bidders ?? []} />
      <SimilarVehicles currentCarId={car?.id} />
    </main>
  );
}

export default function AuctionCarDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <CarDetailContent params={params} />
    </Suspense>
  );
}
