import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface SmallCardsProps {
  title: string;
  value: number;
  percentage: number;
}

export default function SmallCards(props: SmallCardsProps) {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              {props.value}
            </span>
            <h3 className="text-base font-normal text-main-accent">
              {props.title}
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-accent-green text-base font-bold">
            {props.percentage > 0 ? (
              <>
                <span className="mr-1">{props.percentage}%</span>
                <AiOutlineArrowUp className="text-xl text-accent-green" />
              </>
            ) : (
              <>
                <span className="mr-1 text-main-accent">
                  {props.percentage}%
                </span>
                <AiOutlineArrowDown className="text-xl text-main-accent" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
