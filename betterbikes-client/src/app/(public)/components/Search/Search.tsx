"use client";

import { FcCalendar, FcList, FcPlanner } from "react-icons/fc";
import { TbLocation } from "react-icons/tb";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

interface Data {
  location: string;
  checkIn: string;
  checkOut: string;
  vehicleType: string;
  listingType: string;
}

interface SearchData {
  // Define the structure of searchData here
  // For example, if it's an array of objects, you can use an interface for those objects.
}

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export default function Search() {
  const [vehicleChoice, setVehicleChoice] = useState<string>("Bike");
  const [datePicker, setDatePicker] = useState<boolean>(false);
  const [data, setData] = useState<Data>({
    location: "",
    checkIn: "",
    checkOut: "",
    vehicleType: "Car",
    listingType: "All",
  });

  const [searchData, setSearchData] = useState<SearchData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDatePicker = () => {
    setDatePicker(!datePicker);
    handleDate();
  };

  const selectionRange: SelectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const convertDate = (date: Date): string => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = `0${newDate.getMonth() + 1}`.slice(-2);
    const day = newDate.getDate();
    return `${year}-${month}-${day}`;
  };

  const handleDate = () => {
    setData((prevData) => ({
      ...prevData,
      checkIn: convertDate(selectionRange.startDate),
      checkOut: convertDate(selectionRange.endDate),
    }));
  };
  return (
    <>
      <div className="mt-10 bg-gray-100 dark:glass p-8 md:p-10 lg:p-12 xl:p-0 xl:pl-12">
        <div>
          <div className="items-center grid content-center md:grid-cols-2 xl:grid-cols-5 gap-6 md:gap-5 ">
            <div>
              <div className="flex gap-3 items-center">
                <TbLocation className="text-3xl text-yellow-500" />
                <label className="text-gray-800 dark:text-accent-3 text-xl md:text-[21px] font-bold">
                  {" "}
                  Location
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Preferred Location"
                  className="w-full border-none text-gray-500 bg-transparent rounded-lg p-2  placeholder:text-gray-400 text-xl md:text-[21px] font-medium py focus:outline-none"
                  onChange={handleChange}
                  id="location"
                  name="location"
                />
              </div>
            </div>

            <div>
              <div className="flex gap-3 items-center">
                <FcCalendar className="text-3xl text-gray-500" />
                <label className="text-gray-800 dark:text-accent-3 text-xl md:text-[21px] font-bold">
                  {" "}
                  Check In
                </label>
              </div>
              <input
                type="text"
                readOnly={true}
                value={data.checkIn}
                placeholder="Pick a date"
                className="w-full border-none text-gray-500 bg-transparent rounded-lg p-2  placeholder:text-gray-400 text-xl md:text-[21px] font-medium py focus:outline-none"
                name="checkIn"
              />
            </div>

            <div>
              <div className="flex gap-3 items-center">
                <FcPlanner className="text-3xl text-gray-500" />
                <label className="text-gray-800 dark:text-accent-3 text-xl md:text-[21px] font-bold">
                  {" "}
                  Check Out
                </label>
              </div>
              <input
                type="text"
                readOnly={true}
                value={data.checkOut}
                placeholder="Pick a date"
                className="w-full border-none text-gray-500 bg-transparent rounded-lg p-2  placeholder:text-gray-400 text-xl md:text-[21px] font-medium py focus:outline-none"
                id="checkOut"
                name="checkOut"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                <FcList className="text-3xl text-gray-500" />
                <label className="text-gray-800 dark:text-accent-3 text-xl md:text-[21px] font-bold">
                  {" "}
                  Vehicle Type
                </label>
              </div>
              <select
                id="hs-select-label"
                //   onChange={handleChange}
                className="w-full border-none text-gray-500 bg-transparent rounded-lg p-1  placeholder:text-gray-400 text-xl md:text-[21px] font-medium py focus:outline-none"
                name="vehicleType"
              >
                <option>{vehicleChoice}</option>
              </select>
            </div>

            <div className="hidden  xl:flex-center relative overflow-hidden">
              <div className="bg-gray-100 h-full w-1/3 -skew-x-12 absolute -left-10"></div>
              <div className="bg-main-foreground  p-8 md:p-10 lg:p-12 w-full h-full flex-center">
                <Link href="#">
                  <button className="p-2 ml-10 text-main-foreground bg-gray-100 rounded-full">
                    <AiOutlineSearch className="text-4xl" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:absolute xl:hidden md:right-[15%] flex items-center justify-center -translate-y-1/2">
        <Link
          //   to={`/search?location=${data.location}&vehicleType=${data.vehicleType}`}
          href={"#"}
          //   onClick={searchVehicle}
        >
          <button className="accent-btn">Search</button>
        </Link>
      </div>
    </>
  );
}
