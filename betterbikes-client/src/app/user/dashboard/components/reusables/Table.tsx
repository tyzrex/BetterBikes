import Pagination from "@/app/components/Pagination/Pagination";
import Link from "next/link";
import { IDashboardData } from "@/app/user/interfaces/vehicle";
import Image from "next/image";
interface TableProps {
  data: IDashboardData;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Table(props: TableProps) {
  const data = props?.data?.dashboardData;

  const params = props.searchParams;

  return (
    <>
      <section className="my-10 relative  rounded-2xl ">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-white border-b border-b-gray-100 rounded-xl ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-main-foreground">
                My Vehicles
              </p>
            </div>
            <div>
              <button className="main-btn">
                <Link href="/user/listvehicle">New Listing</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto rounded-b-2xl">
          <table className="w-full whitespace-nowrap vehicle-table">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-main-foreground ">
                <th className="font-normal text-left px-4">Vehicle</th>
                <th className="font-normal text-left px-6">Type</th>
                <th className="font-normal text-left px-6">Brand</th>
                <th className="font-normal text-left px-6">Price</th>
                <th className="font-normal text-left px-6">Listed On</th>
                <th className="font-normal text-left px-6">Model</th>
                <th className="font-normal text-left px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data.vehiclePosts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="lg:text-center py-8 text-red-500 font-semibold"
                  >
                    No Listed Vehicles
                  </td>
                </tr>
              ) : (
                ""
              )}
              {data.vehiclePosts.map((listing: any) => (
                <tr
                  key={listing.vehicle_post_id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <td className="px-4 cursor-pointer ">
                    <Link
                      href={`/vehicle-detail/?id=${listing.vehicle_post_id}`}
                      prefetch={false}
                    >
                      <div className="flex items-center">
                        <Image
                          src={listing.vehicle_image}
                          alt="car"
                          height={48}
                          width={48}
                          className="w-12 h-12 rounded-full flex-shrink-0 object-contain object-center"
                        />
                        <div className="pl-6">
                          <p className="font-medium">{listing.vehicle_name}</p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6">
                    <p className="text-sm font-medium leading-none">
                      {listing.vehicle_type}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">{listing.vehicle_brand}</p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">Rs. {listing.vehicle_price}</p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">
                      {listing.created_at.split("T")[0]}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">{listing.vehicle_model}</p>
                  </td>
                  <td className="px-8 2xl:px-0"></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={Number(params?.page)}
            totalPages={data.pages}
            basePath={`/user/dashboard`}
            previousPage={data.previousPage}
            nextPage={data.nextPage}
          />
        </div>
      </section>
    </>
  );
}
