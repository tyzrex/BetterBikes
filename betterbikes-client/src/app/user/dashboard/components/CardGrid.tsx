import SmallCards from "./reusables/SmallCards";
import { MdDirectionsBike } from "react-icons/md";

interface ICardGridProps {
  count: number;
  bookingCount: number;
}

export default function CardGrid(props: ICardGridProps) {
  return (
    <>
      <div className="">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <SmallCards
            title="Total Vehicles"
            value={props.count}
            percentage={13}
          />
          <SmallCards
            title="Booking Requests"
            value={props.bookingCount}
            percentage={13}
          />
          <SmallCards title="Total Income" value={100} percentage={-13} />
        </div>
      </div>
    </>
  );
}
