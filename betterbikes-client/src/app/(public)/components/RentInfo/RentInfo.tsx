import Image from "next/image";
import ScooterImage from "@/../public/assets/scooty.png";
import SmallCards from "../Reusables/SmallCards";
import { LuBike } from "react-icons/lu";
import { GiRoad } from "react-icons/gi";
import { FaRegHandPointer } from "react-icons/fa";
import { RiPhoneFindLine } from "react-icons/ri";

export default function RentInfo() {
  return (
    <section className="mt-16">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        <div className="w-full lg:w-1/2 flex-col-center mt-10 md:mt-2">
          <div className="flex-center">
            <Image
              src={ScooterImage}
              alt="Hero Image"
              className="lg:max-w-[600px] 
              "
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex-col-center md:items-start mt-10 md:mt-2">
          <div>
            <h1 className="text-5xl lg:text-6xl lg:leading-[1.2] font-semibold text-main-foreground text-center md:text-left">
              It&apos;s Really Easy to Rent
            </h1>
            <p className="text-lg text-main-light mt-5">
              We have a wide range of vehicles to choose from. You can choose
              from a wide range of scooters and bikes
            </p>

            <div
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-5 
            "
            >
              <SmallCards
                title="Choose Your Bike or Scooter"
                icon={<LuBike />}
              />
              <SmallCards title="Ride Freely and smoothly" icon={<GiRoad />} />
              <SmallCards
                title="Make online bookings"
                icon={<FaRegHandPointer />}
              />
              <SmallCards
                title="Find your perfect companion"
                icon={<RiPhoneFindLine />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
