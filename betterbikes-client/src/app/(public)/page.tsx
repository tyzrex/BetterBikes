import Featured from "./components/Featured/Featured";
import Hero from "./components/Hero/Hero";
import RentInfo from "./components/RentInfo/RentInfo";
import Search from "./components/Search/Search";
import FAQ from "./components/FAQ/FAQ";
import LogoCloud from "./components/LogoCloud/LogoCloud";
import { getFeaturedVehicles } from "@/api/home";

export default async function Home() {
  const featuredVehicles = await getFeaturedVehicles();

  return (
    <main className="max-w-layout">
      <Hero />
      <Search />
      <RentInfo />
      <Featured featuredVehicles={featuredVehicles} />
      <LogoCloud />
      <FAQ />
    </main>
  );
}
