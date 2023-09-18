import Navbar from "./dashboard/components/Navbar";
import Sidebar from "./dashboard/components/Sidebar";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex justify-center overflow-hidden pt-16 bg-gray-50">
        <Sidebar />
        <article className="ml-16 xl:ml-60 w-[82%] md:w-[90%] flex-center xl:w-full lg:px-6 px-2 bg-gray-50">
          {children}
        </article>
      </main>
    </>
  );
}
