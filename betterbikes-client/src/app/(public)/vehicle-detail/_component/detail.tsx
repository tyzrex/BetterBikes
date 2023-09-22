import { IoIosColorPalette } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import { AiFillCar } from "react-icons/ai";
import { MdOutlineMergeType } from "react-icons/md";
import { TbBike } from "react-icons/tb";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import classNames from "classnames";

interface IPost {
  vehicle_color: string;
  vehicle_brand: string;
  vehicle_type: string;
  vehicle_listing_type: string;
  vehicle_description: string;
  vehicle_features: string[];
}

export default function VehicleDetail(post: IPost) {
  const smallCardCss = classNames(
    "px-2 py-5 border border-gray-300  gap-2 flex justify-center items-center rounded-xl "
  );
  return (
    <>
      <div className="flex flex-col text-main-foreground">
        <div className="grid content-center grid-cols-1 md:grid-cols-2 gap-5">
          <div className={smallCardCss}>
            <IoIosColorPalette className="text-2xl" />
            <h1>Color: {post.vehicle_color}</h1>
          </div>
          <div className={smallCardCss}>
            <SiBrandfolder className="text-2xl" />
            <h1>Brand: {post.vehicle_brand}</h1>
          </div>
          <div className={smallCardCss}>
            <TbBike className="text-2xl" />
            <h1>Vehicle Type: {post.vehicle_type}</h1>
          </div>
          <div className=" px-2 py-5 border border-gray-300 gap-2 flex justify-center items-center rounded-xl ">
            <MdOutlineMergeType className="text-2xl" />
            <h1>Listing Type: {post.vehicle_listing_type}</h1>
          </div>
        </div>
        <div className="mt-5 dark:text-accent-3">
          <h1 className="main-subtitle-typography my-5">Description</h1>
          <h1 className="mt-2">{post.vehicle_description}</h1>
        </div>
        <div className="mt-5 dark:text-accent-3">
          <h1 className="main-subtitle-typography my-6">Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {post.vehicle_features ? (
              post.vehicle_features.map((feature: string, index) => (
                <div key={index} className="w-full">
                  <div className={smallCardCss}>
                    <MdOutlineFeaturedPlayList className="text-2xl" />
                    <h1> {feature}</h1>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full  mb-4">
                <div className={smallCardCss}>
                  <MdOutlineFeaturedPlayList className="text-2xl" />
                  <h1> No Features Listed</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
