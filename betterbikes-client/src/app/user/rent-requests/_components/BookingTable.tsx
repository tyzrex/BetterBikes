import Pagination from "@/app/components/Pagination/Pagination";
import Link from "next/link";
import { BookingRequest, IBookingData } from "@/app/user/interfaces/vehicle";
import Image from "next/image";
import { convertToLocalTime } from "@/lib/localTime";
import ActionButtons from "./actions";
interface TableProps {
  data: IBookingData;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BookingTable(props: TableProps) {
  const data = props?.data?.dashboardData;
  const params = props.searchParams;

  return (
    <>
      <section className="relative rounded-2xl ">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-white border-b border-b-gray-100 rounded-xl ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-main-foreground">
                Rent Requests
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
                <th className="font-normal text-left px-6">Start Date</th>
                <th className="font-normal text-left px-6">End Date</th>
                <th className="font-normal text-left px-6">Status</th>
                <th className="font-normal text-left px-6">Model</th>
                <th className="font-normal text-left px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data.bookingRequests.length === 0 ? (
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
              {data.bookingRequests.map((listing: BookingRequest) => (
                <tr
                  key={listing.vehicle_post_id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <td className="px-4 cursor-pointer ">
                    <Link
                      href={`/vehicle-detail/?id=${listing.vehicle_post_id}`}
                      prefetch={false}
                    >
                      <div className="flex flex-col xl:flex-row items-center">
                        <Image
                          src={listing.vehicle_post.vehicle_image}
                          alt="car"
                          height={48}
                          width={48}
                          className="w-12 h-12 rounded-full flex-shrink-0 object-contain object-center"
                        />
                        <div className="xl:pl-6">
                          <p className="font-medium">
                            {listing.vehicle_post.vehicle_name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6">
                    <p className="text-sm font-medium leading-none">
                      {listing.vehicle_post.vehicle_type}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">
                      {listing.vehicle_post.vehicle_brand}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">
                      Rs. {listing.vehicle_post.vehicle_price}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">
                      {convertToLocalTime(listing.start_date)}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">
                      {convertToLocalTime(listing.end_date)}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">
                      {listing.status === "pending" ? (
                        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
                          Pending
                        </span>
                      ) : listing.status === "accepted" ? (
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                          Accepted
                        </span>
                      ) : (
                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                          Rejected
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="px-6">
                    <p className="font-medium">
                      {listing.vehicle_post.vehicle_number}
                    </p>
                  </td>
                  <td className="px-8 2xl:px-0">
                    <ActionButtons bookingId={listing.booking_id} />
                  </td>
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
