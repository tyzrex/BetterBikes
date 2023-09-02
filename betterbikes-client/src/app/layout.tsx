import "./globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});
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
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
