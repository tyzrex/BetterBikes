import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BetterBikes - Rent a Two Wheeler Vehicle Online",
  description:
    "Betterbikes is a platform to rent two wheeler vehicles online. We have a wide range of vehicles to choose from. You can choose from a wide range of scooters and bikes",
  keywords: "Bikes, Scooters, Rent, Two Wheeler, Vehicles, Online",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="lg:ml-14">
        <header>
          <Navbar />
        </header>
        {children}

        <footer className="bg-white ">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
