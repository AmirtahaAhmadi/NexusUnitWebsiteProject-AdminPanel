import { useEffect, useState } from "react";
import TinyChartStats from "@components/widgets/stats/TinyChartStats";

const ProfitLineChart = ({ info, myReserve }) => {
  const firstReserve = myReserve?.[0];

  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
     
    },
    grid: {
      borderColor: "#EBEBEB",
      strokeDashArray: 5,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { top: -30, bottom: -10 },
    },
    stroke: { width: 3 },
    colors: [info],

    series: [
      {
        data: [0, 20, 5, 30, 15, 45],
      },
    ],

    markers: {
      size: 2,
      colors: info,
      strokeColors: info,
      strokeWidth: 2,
      shape: "circle",
    },

    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "10px",
          fontFamily: "Vazirmatn, sans-serif",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: { show: false },

    tooltip: {
      x: { show: false },
    },
  };

  return firstReserve ? (
    <div dir="rtl"> 
      <TinyChartStats
        height={70}
        type="line"
        options={options}
        title={`دوره: ${firstReserve.courseName}`}
        stats={`مدرس: ${firstReserve.teacher}`}
        series={[
          {
            data: [0, 20, 5, 30, 15, 45],
          },
        ]}
      />
    </div>
  ) : null;
};

export default ProfitLineChart;