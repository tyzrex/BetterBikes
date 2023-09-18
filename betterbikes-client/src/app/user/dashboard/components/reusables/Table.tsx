import Link from "next/link";

export default function Table(props: any) {
  const { dashboardData } = props.data;
  return (
    <>
      <section className="my-10 relative  rounded-2xl ">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-slate-100 rounded-xl ">
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
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto dark:bg-gray-800 rounded-b-2xl">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-main-foreground dark:text-white">
                <th className="font-normal text-left pl-4">Vehicle</th>
                <th className="font-normal text-left pl-20">Type</th>
                <th className="font-normal text-left pl-12">Brand</th>
                <th className="font-normal text-left pl-20">Price</th>
                <th className="font-normal text-left pl-20">Listed On</th>
                <th className="font-normal text-left pl-16">Model</th>
                <th className="font-normal text-left pl-4">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {dashboardData.length === 0 ? (
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
              {dashboardData.map((listing: any, index: number) => (
                <tr
                  key={listing.vehicle_post_id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <img
                        src={listing.vehicle_image}
                        alt="car"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-contain object-center"
                      />
                      <div className="pl-4">
                        <p className="font-medium">{listing.vehicle_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-20">
                    <p className="text-sm font-medium leading-none">
                      {listing.vehicle_type}
                    </p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{listing.vehicle_brand}</p>
                    <p className="text-xs leading-3 text-gray-600 dark:text-gray-400 mt-2">
                      Model : {listing.vehicle_year}
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">Rs. {listing.vehicle_price}</p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">
                      {listing.created_at.split("T")[0]}
                    </p>
                  </td>
                  <td className="pl-16">
                    <p className="font-medium">{listing.vehicle_model}</p>
                  </td>
                  <td className="px-8 2xl:px-0"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
