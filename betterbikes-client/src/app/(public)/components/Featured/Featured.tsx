import BikeImg from "@/../public/assets/whitemoto.webp";
import CardsSwiper from "../Slider/CardSlider";
export default function Featured() {
  const data = [
    {
      id: 1,
      name: "Bike",
      image: BikeImg,
    },
    {
      id: 2,
      name: "Scooter",
      image: BikeImg,
    },
    {
      id: 3,
      name: "Bike",
      image: BikeImg,
    },
    {
      id: 4,
      name: "Bike",
      image: BikeImg,
    },
    {
      id: 5,
      name: "Bike",
      image: BikeImg,
    },
  ];

  return (
    <section className="mt-20 md:mt-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl lg:text-6xl lg:leading-[1.2] font-semibold text-main-foreground my-5 md:my-0 text-center md:text-left">
          Choose From Our Featured Vehicles
        </h1>
        <p className="text-lg text-main-light mt-5">
          We have many vehicles to choose from. You can choose from a wide range
          of selection to find your perfect companion
        </p>
      </div>
      <div className="mt-10">
        <CardsSwiper data={data} />
      </div>
    </section>
  );
}
