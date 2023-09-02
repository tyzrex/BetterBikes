import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import HeroImage from "@/../public/assets/whitemoto.webp";
import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div
          className="
            w-full md:w-1/2 flex-col-center md:items-start mt-10 md:mt-2
        "
        >
          <div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl lg:leading-[1.2] font-semibold text-main-foreground text-center md:text-left">
              Better Bikes For Your Better Journey
            </h1>
          </div>
          <div className="mt-10 flex items-center gap-10">
            <Link href="#" className="relative">
              <button className="main-btn">Book a Ride</button>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-main-accent text-white py-2 font-semibold px-3 text-xs rounded-full">
                <span>
                  10% <br /> OFF
                </span>
              </div>
            </Link>
            <Link href="#">
              <button>
                About Us
                <BsArrowUpRight className="inline-block ml-2" />
              </button>
            </Link>
          </div>
        </div>

        <div
          className="
            w-full md:w-1/2
        "
        >
          <div className="flex justify-center items-center">
            <Image src={HeroImage} alt="Hero Image" />
          </div>
        </div>
      </div>
    </section>
  );
}
