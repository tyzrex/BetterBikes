"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import VehicleCard from "../Reusables/VehicleCards";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import CardLoader from "../Reusables/CardLoader";

const pagination = {
  renderBullet: function (_index: number, className: string) {
    return (
      '<span class="' +
      className +
      ' !transition-all !duration-500 !bg-accent-2 "></span>'
    );
  },
};

export default function CardsSwiper({ data }: any) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <div>
        <Swiper
          modules={[Pagination, Navigation]}
          onSwiper={setSwiper}
          spaceBetween={50}
          slidesPerView={5}
          pagination={pagination}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            390: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            660: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            990: {
              slidesPerView: 4,
              spaceBetween: 20,
            },

            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="relative h-auto "
        >
          {data && swiper ? (
            data?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index} className="mb-10">
                  <VehicleCard
                    key={index}
                    vehicleName={item.name}
                    vehicleImage={item.image}
                    vehicleLocation="Kathmandu"
                    vehicleRating="4.5"
                    vehiclePrice={item.price}
                    buttonText="Book"
                    postId={item.id}
                  />
                </SwiperSlide>
              );
            })
          ) : (
            <div className="flex items-center justify-center xl:justify-between">
              <div className="xl:hidden h-60 flex-center w-full">
                <span className="loader"></span>
              </div>

              {Array(5)
                .fill(0)
                .map((_, index: number) => (
                  <div
                    className="hidden  xl:block h-full w-full all-transition "
                    key={index}
                  >
                    <CardLoader />
                  </div>
                ))}
            </div>
          )}
          {/* <div
            className="button-prev absolute top-1/3 left-0 z-10 px-1 py-3 bg-accent-2 cursor-pointer 
          "
            onClick={() => swiper?.slidePrev()}
          >
            <AiOutlineLeft className="text-3xl text-white" />
          </div>
          <div
            className="button-next absolute top-1/3 right-0 z-10 px-1 py-3 bg-accent-2 cursor-pointer"
            onClick={() => swiper?.slideNext()}
          >
            <AiOutlineRight className="text-3xl text-white" />
          </div> */}
        </Swiper>
      </div>
    </>
  );
}
