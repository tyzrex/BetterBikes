import Form from "./components/Form";

export default function ListVehicle() {
  return (
    <main className="max-w-layout py-10">
      <div className="">
        <div className="flex justify-between mx-auto">
          <div className="lg:w-[60%] w-full">
            <section className=" mb-5 mx-auto w-full text-main-foreground rounded-md  ">
              <h1 className="text-[24px] md:text-[48px] font-semibold">
                List Your <span className="text-accent-1">Vehicle</span>
              </h1>
            </section>

            <Form />
          </div>

          <div className="max-w-[40%] hidden lg:block ">
            <div className="grid w-full sticky top-10">
              <h1 className="text-[24px] mb-10 font-semibold text-gray-800 dark:text-accent-1">
                Preview
              </h1>
              {/* <VehicleCard
                vehicleName={data.vehicleName}
                vehicleImage={file.preview}
                vehiclePrice={data.pricePerDay}
                key={data.vehicleName}
                postId={1}
                vehicleLocation="Kathmandu"
                buttonText="Rent Now"
                type="preview"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
