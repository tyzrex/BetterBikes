import { getDashboardData } from "@/api/dashboard";
import CardGrid from "./components/CardGrid";
import Customers from "./components/Customers";
import Transactions from "./components/Transactions";
import Table from "./components/reusables/Table";

export default async function Dashboard() {
  const data = await getDashboardData();

  return (
    <>
      <section
        id="main-content"
        className="h-full w-full bg-gray-50 relative overflow-y-auto"
      >
        <CardGrid />
        {/* <Customers /> */}
        <Table data={data} />
        <Transactions />
      </section>
    </>
  );
}
