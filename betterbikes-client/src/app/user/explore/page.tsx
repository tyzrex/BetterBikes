import VehicleCard from "@/app/(public)/components/Reusables/VehicleCards";
import Pagination from "@/app/components/Pagination/Pagination";
import { serverRequest } from "@/app/services/serverRequest";

import ExploreHero from "./hero";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const dynamic = "force-dynamic";

export default async function ExploreVehicles(props: Props) {
  const params = props.searchParams;
  const pageParam = params?.page ? `?page=${params?.page}` : "";
  const vehiclePosts = await serverRequest(
    `/vehiclepost/all-vehicles${pageParam}`,
    "GET"
  );

  if (!vehiclePosts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl">No Vehicles Found</h1>
      </div>
    );
  }

  return (
    <>
      <ExploreHero />

      <section className="grid grid-cols-5 gap-5 my-10">
        {vehiclePosts.featuredVehicles.vehicles.map((vehiclePost: any) => (
          <VehicleCard
            key={vehiclePost.vehicle_post_id}
            vehicleName={vehiclePost.vehicle_name}
            vehiclePrice={vehiclePost.vehicle_price}
            vehicleImage={vehiclePost.vehicle_image}
            buttonText="Book Now"
            postId={vehiclePost.vehicle_post_id}
            vehicleLocation="Kathmandu"
            type="card"
          />
        ))}
      </section>
      <Pagination
        basePath="/user/explore"
        totalPages={vehiclePosts.featuredVehicles.pages}
        key={vehiclePosts.featuredVehicles.pages}
        currentPage={Number(params?.page ?? 1)}
        previousPage={vehiclePosts.featuredVehicles.previousPage}
        nextPage={vehiclePosts.featuredVehicles.nextPage}
      />
    </>
  );
}
