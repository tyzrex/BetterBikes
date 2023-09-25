import Form from "./components/Form";

export default async function ListVehicle() {
  return (
    <article className="w-full max-w-[90%] mx-auto">
      <div className="">
        <div className="flex justify-between mx-auto">
          <div className="w-full">
            <section className="flex-between items-center mb-5 mx-auto w-full text-main-foreground rounded-md  ">
              <h1 className="text-[24px] md:text-[48px] font-semibold">
                List Your <span className="text-accent-1">Vehicle</span>
              </h1>

              <h1 className="text-[34px] hidden lg:block font-semibold text-gray-800 dark:text-accent-1">
                Card Preview
              </h1>
            </section>

            <Form />
          </div>
        </div>
      </div>
    </article>
  );
}
