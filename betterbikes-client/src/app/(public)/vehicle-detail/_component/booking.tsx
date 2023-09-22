"use client";

import { useState } from "react";
import { z } from "zod";
import { DatePickerWithPresets } from "../../components/Reusables/Datepicker";
import { Calendar } from "@/components/ui/calendar";
import { PostRequest } from "@/app/services/httpRequest";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const bookingFormSchema = z.object({
  checkIn: z.string().nonempty("Please select a check-in date to continue"),
  checkOut: z.string().nonempty("Please select a check-out date to continue"),
  vehicle_post_id: z.string().nonempty("Please select a vehicle to continue"),
  total_price: z.number(),
});

type BookingSchema = z.infer<typeof bookingFormSchema>;

interface IBookingForm {
  price: number;
}

export default function Booking(props: IBookingForm) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [errors, setErrors] = useState<{ checkIn?: string; checkOut?: string }>(
    {}
  );
  const vehicleId = useSearchParams().get("id");

  const validateForm = (data: BookingSchema) => {
    const validation = bookingFormSchema.safeParse(data);

    if (validation.success === false) {
      setErrors(
        validation.error.flatten().fieldErrors as {
          checkIn?: string;
          checkOut?: string;
        }
      );
      return false;
    }
    setErrors({});
    return true;
  };
  const { toast } = useToast();

  const calculateTotalPrice = () => {
    if (endDate && startDate) {
      return (
        Math.floor(
          endDate.getTime() - startDate.getTime() === 0
            ? 1
            : (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        ) * props.price
      );
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: BookingSchema = {
      checkIn: startDate ? startDate.toISOString() : "",
      checkOut: endDate ? endDate.toISOString() : "",
      vehicle_post_id: vehicleId ? vehicleId : "",
      total_price: calculateTotalPrice(),
    };

    if (validateForm(formData)) {
      // Perform the actual submission here
      try {
        const response = await PostRequest("/vehicle/book-vehicle", formData);
        if (response.status === 200) {
          console.log(response);
          toast({
            title: "Success",
            description: "Booking Successful",
            className: "bg-[#5cb85c] text-white",
          });
        }
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.data.message,
          variant: "destructive",
        });
        console.log(err);
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex-col-center gap-5 h-full">
          <div
            className=" mt-5 lg:mt-0 
          w-full "
          >
            <Calendar
              //make it full width and add a border

              mode="single"
              selected={new Date()}
              className="rounded-3xl border p-3 md:p-7"
            />
          </div>
          <div className="xl:flex-1 pb-5 w-full lg:w-[400px] xl:w-[450px] mx-auto dark:bg-gray-900 dark:border-0 border px-10 py-6 lg:px-8 lg:py-10 rounded-3xl">
            <div>
              <h1 className="text-3xl font-semibold text-black mb-3 dark:text-accent-3">
                Rs. {props.price}
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5 my-5 border-b border-b-gray-200">
                <div>
                  <div className="flex flex-col items-start gap-3 ">
                    <label className="text-gray-500 font-bold w-1/3">
                      Start Date
                    </label>
                    <div className="border w-full h-[60px] rounded-xl text-main-foreground">
                      <DatePickerWithPresets
                        date={startDate}
                        setDate={setStartDate}
                      />
                    </div>
                  </div>
                  {errors.checkIn && (
                    <p className="text-red-500 mt-1">{errors.checkIn}</p>
                  )}
                </div>

                <div className="w-full mb-5">
                  <div className="flex flex-col items-start gap-3 ">
                    <label className="text-gray-500 font-bold w-1/3">
                      End Date
                    </label>
                    <div className="border w-full h-[60px] rounded-xl text-main-foreground">
                      <DatePickerWithPresets
                        date={endDate}
                        setDate={setEndDate}
                      />
                    </div>
                  </div>
                  {errors.checkOut && (
                    <p className="text-red-500 mt-1">{errors.checkOut}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="border-b ">
                  <h1 className="text-[24px] mt-5 font-semibold text-black mb-3 dark:text-accent-1">
                    Duration Details
                  </h1>
                  <h1 className="text-[18px] mt-5 font-semibold text-gray-500 mb-3 dark:text-accent-3">
                    Number of days:{" "}
                    <span className="text-main-accent">
                      {endDate && startDate
                        ? Math.floor(
                            (endDate.getTime() - startDate.getTime()) /
                              (1000 * 3600 * 24)
                          )
                        : 0}
                    </span>
                  </h1>
                </div>

                <div>
                  <h1 className="text-[24px] mt-5 font-semibold text-black mb-3 dark:text-accent-1">
                    Pricing Details
                  </h1>
                  <h1 className="text-[18px] flex justify-between items-center mt-5 font-semibold text-gray-500 mb-3 dark:text-accent-3">
                    <div>
                      <p>Price per day:</p>
                    </div>{" "}
                    <span className="text-black dark:text-gray-500">
                      Rs.{props.price}
                    </span>{" "}
                  </h1>
                  <h1 className="text-[18px] flex justify-between items-center mt-5 font-semibold text-gray-500 mb-3 dark:text-accent-3">
                    <span> Total Price:</span>{" "}
                    <span className="text-black dark:text-gray-500">
                      Rs.
                      {calculateTotalPrice()}
                    </span>{" "}
                  </h1>
                </div>
              </div>

              <button
                //   onClick={handleBooking}
                type="submit"
                className="accent-btn w-full rounded-sm"
              >
                Rent Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
