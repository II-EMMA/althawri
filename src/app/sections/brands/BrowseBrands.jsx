import { getTranslations } from "next-intl/server";
import JmcLogoWebp from "@/assets/images/jmc-logo.webp";
import FotonLogo from "@/assets/images/foton-logo.png";
import SaicLogo from "@/assets/images/saic-logo.jpg";
import BydLogo from "@/assets/images/byd-logo.jpg";
import CarOneLogo from "@/assets/images/car-1-logo.jpg";
import CarTwoLogo from "@/assets/images/car-2-logo.jpg";
import MiniLogo from "@/assets/images/mini-logo.jpg";
import DfmLogo from "@/assets/images/dfm-logo.png";
import ToyotaLogo from "@/assets/images/toyota-logo.png";
import NissanLogo from "@/assets/images/nissan-logo.png";
import HyundaiLogo from "@/assets/images/hyundai-logo.png";
import LexusLogo from "@/assets/images/lexus-logo.png";
import ChanganLogo from "@/assets/images/changan-logo.png";
import KnLogo from "@/assets/images/kn-logo.webp";
import BmwLogo from "@/assets/images/bmw-logo.png";
import PeugeotLogo from "@/assets/images/peugeot-logo.png";
import GeelyLogo from "@/assets/images/geely-logo.png";
import HondaLogo from "@/assets/images/honda-logo.png";
import SuzukiLogo from "@/assets/images/suzuki-logo.png";
import MazdaLogo from "@/assets/images/mazda-logo.png";
import ChevroletLogo from "@/assets/images/chevrolet-logo.png";
import FordLogo from "@/assets/images/ford-logo.png";
import MitsubishiLogo from "@/assets/images/mitsubishi-logo.png";
import AuoiLogo from "@/assets/images/auoi-logo.png";
import GmcLogo from "@/assets/images/gmc-logo.png";
import LandRoverLogo from "@/assets/images/land-rover-logo.png";
import BrandCard from "@/app/components/BrandCard";

export default async function BrowseBrands() {
  const t = await getTranslations("Brands");

  const brands = [
    { name: "DFM", logo: DfmLogo },
    { name: "CarOne", logo: CarOneLogo },
    { name: "Mini", logo: MiniLogo },
    { name: "CarTwo", logo: CarTwoLogo },
    { name: "Kn", logo: KnLogo },
    { name: "BYD", logo: BydLogo },
    { name: "SAIC", logo: SaicLogo },
    { name: "Foton", logo: FotonLogo },
    { name: "JMC", logo: JmcLogoWebp },
    { name: "Geely", logo: GeelyLogo },
    { name: "Peugeot", logo: PeugeotLogo },
    { name: "BMW", logo: BmwLogo },
    { name: "KN", logo: KnLogo },
    { name: "Changan", logo: ChanganLogo },
    { name: "Lexus", logo: LexusLogo },
    { name: "Hyundai", logo: HyundaiLogo },
    { name: "Nissan", logo: NissanLogo },
    { name: "Toyota", logo: ToyotaLogo },
    { name: "Land Rover", logo: LandRoverLogo },
    { name: "GMC", logo: GmcLogo },
    { name: "Audi", logo: AuoiLogo },
    { name: "Mitsubishi", logo: MitsubishiLogo },
    { name: "Ford", logo: FordLogo },
    { name: "Chevrolet", logo: ChevroletLogo },
    { name: "Mazda", logo: MazdaLogo },
    { name: "Suzuki", logo: SuzukiLogo },
    { name: "Honda", logo: HondaLogo },
  ];

  return (
    <section className="my-8 max-w-7xl mx-auto py-14 bg-white">
      {/* Title Div with green underline */}
      <div className="flex justify-end mb-10 px-10">
        <h2 className="text-xl font-bold text-gray-800 pb-2 border-b-2 border-brand-green inline-block">
          {t("title")}
        </h2>
      </div>

      {/* Logos Grid Div */}
      <div className="px-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 items-center">
        {brands.map((brand, index) => (
          <BrandCard key={index} brand={brand} />
        ))}
      </div>
    </section>
  );
}
