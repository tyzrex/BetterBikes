import type { Metadata } from "next";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BreadCrumbs from "./components/Reusables/BreadCrumb";

export const metadata: Metadata = {
  title: "BetterBikes - Rent a Two Wheeler Vehicle Online",
  description:
    "Betterbikes is a platform to rent two wheeler vehicles online. We have a wide range of vehicles to choose from. You can choose from a wide range of scooters and bikes",
  keywords: "Bikes, Scooters, Rent, Two Wheeler, Vehicles, Online",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {/* <BreadCrumbs /> */}
      {children}
      <Footer />
    </div>
  );
}
