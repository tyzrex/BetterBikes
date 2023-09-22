import { FiShare } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { GoLocation } from "react-icons/go";
import Image from "next/image";

export default function NameNav({
  name,
  location,
  vehicleimage,
}: {
  name: string;
  location: string;
  vehicleimage: string;
}) {
  return (
    <>
      <div className="w-full flex items-center justify-between ">
        <h1 className="main-title-typography text-left font-semibold text-main-foreground  dark:text-accent-3">
          {" "}
          {name}{" "}
        </h1>

        <div className="flex justify-center items-center gap-4">
          <div className="border-[2px] border-gray-300 rounded-full p-2 text-gray-500 hover:border-black text-2xl hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
            <FiShare />
          </div>
          <div className="border-[2px] border-gray-300 rounded-full p-2 text-gray-500 hover:border-black text-2xl hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
            <AiOutlineHeart />
          </div>
          <div className="border-[2px] border-gray-300 rounded-full p-2 text-gray-500 hover:border-black text-2xl hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
            <RxCross2 />
          </div>
        </div>
      </div>

      <div
        className="my-10 flex-center border w-full rounded-3xl  max-h-[400px] overflow-hidden
      "
      >
        <Image src={vehicleimage} width={500} height={500} alt="vehicleimage" />
      </div>

      <h2 className="flex gap-2 items-start mb-5 font-medium text-gray-400">
        <GoLocation className="text-2xl text-gray-400" />
        Location : {location}
      </h2>
    </>
  );
}
