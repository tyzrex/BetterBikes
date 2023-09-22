import { getVehicleDetail } from "@/api/vehicleDetail";
import NameNav from "./_component/name";
import { VehiclePost } from "@/app/user/interfaces/vehicle";
import VehicleDetail from "./_component/detail";
import Booking from "./_component/booking";

interface VehiclePage {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function VehiclePage(props: VehiclePage) {
  const { searchParams } = props;

  const { vehicleData }: VehiclePost = await getVehicleDetail(
    searchParams?.id as string
  );

  return (
    <main className="max-w-layout flex flex-col lg:flex-row lg:justify-between py-10">
      <section className="lg:w-[50%] xl:w-[58%] 2xl:w-[65%] w-full">
        <NameNav
          name={vehicleData.vehicle_name}
          location={"Kathmandu"}
          vehicleimage={vehicleData.vehicle_image}
        />
        <VehicleDetail
          vehicle_brand={vehicleData.vehicle_brand}
          vehicle_color={vehicleData.vehicle_color}
          vehicle_description={vehicleData.vehicle_description}
          vehicle_listing_type={vehicleData.vehicle_type}
          vehicle_type={vehicleData.vehicle_type}
          vehicle_features={vehicleData.vehicle_features}
        />
      </section>
      <section>
        <Booking price={vehicleData.vehicle_price} />
      </section>
    </main>
  );
}
