import "./globals.scss";

import type { Metadata } from "next";
import NextProgressBar from "nextjs-toploader";

import { Toaster } from "@/components/ui/toaster";

// import { Poppins } from "next/font/google";
import Toast from "./components/Toast/Toast";
import NextAuthProvider from "./provider/AuthProvider";
import NotificationProvider from "./provider/NotificationProvider";
import { SocketProvider } from "./provider/SocketProvider";

// import { getServerSession } from "next-auth";

// const poppins = Poppins({
//   weight: ["200", "300", "400", "500", "600", "700", "800"],
//   subsets: ["latin"],
// });

export const dynamic = "force-dynamic";

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
    <html lang="en">
      <body
      // className={poppins.className}
      >
        <NextAuthProvider>
          <SocketProvider>
            <NotificationProvider>
              <NextProgressBar color="#e73538" />
              {children}
              <Toast />
              <Toaster />
            </NotificationProvider>
          </SocketProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
