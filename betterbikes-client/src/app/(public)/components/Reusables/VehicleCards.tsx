import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsBookmarkCheckFill } from "react-icons/bs";
import NoPreview from "@/../public/assets/img_placeholder.png";

interface Props {
  vehicleImage: any;
  vehiclePrice: string;
  vehicleName: string;
  vehicleLocation: string;
  buttonText: string;
  postId: number;
  vehicleRating?: string;
  type?: string;
}

export default function VehicleCard(props: Props) {
  return (
    <section>
      <div
        className={`bg-gray-100 relative flex w-full max-w-lg group sm:max-w-[260px] cursor-pointer flex-col overflow-hidden py-4 transition-all duration-500 ease-in-out hover:border-gray-400 border-b-4 border-b-main-foreground hover:border-b-4 hover:border-b-main-accent hover:shadow-lg hover:bg-gray-200  text-main-foreground gap-2 ${
          props.type === "preview" ? "min-w-[300px]" : "" // Add your minimum width class here
        }`}
      >
        <div className="h-full w-full">
          <div className="relative w-full">
            <Image
              src={
                props?.vehicleImage
                  ? props.type === "preview"
                    ? URL.createObjectURL(props.vehicleImage)
                    : props.vehicleImage
                  : NoPreview
              }
              quality={100}
              height={250}
              width={250}
              className="mb-2 h-[250px] w-full object-contain rounded-t-xl transition-transform duration-500 ease-in-out"
              alt=""
            />
          </div>
          <div className="p-2 flex items-center justify-between md:items-start pb-2 px-4">
            <div className="mb-2">
              <p
                className="text-md font-semibold
                group-hover:text-main-accent color-transition cursor-pointer
              "
              >
                {props.vehicleName}
              </p>
              <p className="text-sm text-gray-500 color-transition">
                {props.vehicleLocation}
              </p>
              <p className="text-sm text-gray-500  color-transition">
                Price: Rs. {props.vehiclePrice}
              </p>
            </div>
          </div>
          <div className="px-4 w-full">
            <Link prefetch={false} href={`/vehicle-detail?id=${props.postId}`}>
              <button className="bg-main-foreground text-white w-full py-2 flex-center group-hover:bg-main-accent color-transition hover:bg-white z-1 hover:text-main-foreground">
                <span>Book now</span>
                <BsBookmarkCheckFill className="inline-block ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
