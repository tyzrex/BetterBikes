import { getDashboardData } from "@/api/dashboard";
import CardGrid from "./components/CardGrid";
import Customers from "./components/Customers";
import Transactions from "./components/Transactions";
import Table from "./components/reusables/Table";
import { Session, getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IDashboardData } from "../interfaces/vehicle";

interface ISearchProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Dashboard({ searchParams }: ISearchProps) {
  const params = searchParams;
  const session = await getServerSession(options);

  const data: IDashboardData = await getDashboardData(
    params ?? {},
    session as Session
  );
  return (
    <>
      <section
        id="main-content"
        className="h-full w-full bg-gray-50 relative overflow-y-auto"
      >
        <CardGrid
          count={data.dashboardData.vehiclesCount}
          bookingCount={data.dashboardData.bookingCount}
        />
        {/* <Customers /> */}
        <Table data={data} searchParams={params} />
        {/* <Transactions /> */}
      </section>
    </>
  );
}
