"use client";

import { acceptBookingRequest } from "@/api/booking";
import { FcAcceptDatabase } from "react-icons/fc";
import { TbTrashFilled } from "react-icons/tb";

interface Props {
  bookingId: string;
}
export default function ActionButtons(props: Props) {
  const handleAcceptBooking = async () => {
    try {
      await acceptBookingRequest(props.bookingId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <button
        onClick={handleAcceptBooking}
        className="bg-gray-100 text-gray-500 px-2 py-2 rounded-md mr-2 flex-center"
      >
        <FcAcceptDatabase className="inline-block " />
      </button>
      <button className="bg-red-500 text-white px-2 py-2 rounded-md flex-center">
        <TbTrashFilled className="inline-block " />
      </button>
    </div>
  );
}
