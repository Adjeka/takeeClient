import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { IFavourite } from "../models/favourite.interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  favourites: IFavourite[];
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Количество добавлений в избранное каждого животного",
    },
  },
};

export const Chart = ({ favourites }: Props) => {
  const labelsString = Array.from(new Set(favourites.map((favourite) => favourite.animal.nickname)));
  const data = {
    labels: labelsString,
    datasets: [
      {
        label: "Количество добавлений в избранное",
        data: labelsString.map((label) =>
          favourites.filter((favourite) => favourite.animal.nickname === label).reduce((count) => count + 1, 0)
        ),
        backgroundColor: "#f3968f",
      },
    ],
  };

  return (
    <div style={{ margin:"20px auto", width: "60%", height: "650px" }}>
      <Bar  options={options} data={data}/>
    </div>
  );
};