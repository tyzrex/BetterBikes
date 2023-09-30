"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({ data, className, title }: any) {
  return (
    <div
      className={
        "w-full  h-[400px] bg-white p-8 rounded-lg shadow-md" + className
      }
    >
      <h2 className="text-xl font-bold text-gray-900">
        {title ? title : "Chart"}
      </h2>
      <Doughnut
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          cutout: 100,
          radius: 110,
          plugins: {
            legend: {
              align: "start",
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}
