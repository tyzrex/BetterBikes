import Featured from "./components/Featured/Featured";
import Hero from "./components/Hero/Hero";
import RentInfo from "./components/RentInfo/RentInfo";
import Search from "./components/Search/Search";
import FAQ from "./components/FAQ/FAQ";
import LogoCloud from "./components/LogoCloud/LogoCloud";

export default function Home() {
  return (
    <main className="max-w-layout">
      <Hero />
      <Search />
      <RentInfo />
      <Featured />
      <LogoCloud />
      <FAQ />
    </main>
  );
}
