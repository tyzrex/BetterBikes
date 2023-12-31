import { getServerSession, Session } from "next-auth";

import { getDashboardData } from "@/api/dashboard";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { IDashboardData } from "../interfaces/vehicle";
import CardGrid from "./components/CardGrid";
import Charts from "./components/Charts";
import Table from "./components/reusables/Table";

interface ISearchProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

//  borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],

export default async function Dashboard({ searchParams }: ISearchProps) {
  const params = searchParams;
  const session = await getServerSession(options);

  const data: IDashboardData = await getDashboardData(
    params ?? {},
    session as Session
  );

  const vehicleChartData = {
    labels: ["Bike", "Scooter"],
    datasets: [
      {
        label: "Vehicles",
        data: [
          data?.dashboardData?.vehicleData.bike ?? 0,
          data?.dashboardData?.vehicleData.scooter ?? 0,
        ],
        backgroundColor: ["#1F8ED1", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const bookingChartData = {
    labels: ["Accepted", "Pending", "Rejected"],
    datasets: [
      {
        label: "Vehicles",
        data: [
          data.dashboardData.bookingData.accepted ?? 0,
          data.dashboardData.bookingData.pending ?? 0,
          data.dashboardData.bookingData.rejected ?? 0,
        ],
        backgroundColor: ["#36ae7c", "rgba(255, 206, 86, 1)", "#e73538"],
        borderWidth: 1,
      },
    ],
  };

  const earningChartData = {
    labels: ["Accepted", "Pending"],
    datasets: [
      {
        label: "Vehicles",
        data: [
          data.dashboardData.earningsData.accepted ?? 0,
          data.dashboardData.earningsData.pending ?? 0,
        ],
        backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <section
        id="main-content"
        className="h-full w-full bg-gray-50 relative overflow-y-auto"
      >
        <CardGrid
          count={data.dashboardData.vehiclesCount}
          bookingCount={data.dashboardData.bookingCount}
          earning={data.dashboardData.earnings}
        />
        {/* <Customers /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 ">
          <Charts data={vehicleChartData} title={"Total Vehicles"} />
          <Charts data={bookingChartData} title={"Booking Requests"} />
          <div className="md:col-span-2 lg:col-span-1">
            <Charts data={earningChartData} title={"Financial Overview"} />
          </div>
        </div>
        <Table data={data} searchParams={params} />

        {/* <Transactions /> */}
      </section>
    </>
  );
}
