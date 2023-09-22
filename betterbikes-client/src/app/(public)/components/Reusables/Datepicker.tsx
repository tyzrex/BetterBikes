"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IDatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePickerWithPresets(props: IDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-transparent border-none px-2 h-full",
            !props.date && "text-gray-500"
          )}
        >
          {props.date ? (
            <span
              className="
            flex items-center gap-2 text-xl font-medium text-gray-400
            "
            >
              {format(props.date, "PPP")}
            </span>
          ) : (
            <span className="flex items-center gap-2 text-xl font-medium text-gray-400">
              Pick a date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full lg:w-[400px] flex-col space-y-2 p-2">
        {/* <Select
          onValueChange={(value) =>
            props.setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select> */}
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={props.date}
            onSelect={(day) => {
              props.setDate(day);
            }}
          />

          {/* onSelect={} */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
