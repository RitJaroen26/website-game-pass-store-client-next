import Hero from "@/features/home/Hero";
import ServiceGuarantee from "@/features/home/ServiceGuarantee";
import HotDeals from "@/features/home/HotDeals";
import Stats from "@/features/home/Stats";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-20">
      <Hero />
      <ServiceGuarantee />
      <HotDeals />
      <Stats />
    </div>
  );
}
