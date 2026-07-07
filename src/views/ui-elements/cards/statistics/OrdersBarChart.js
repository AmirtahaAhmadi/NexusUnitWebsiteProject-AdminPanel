// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components

// ** Custom Components
import TinyChartStats from "@components/widgets/stats/TinyChartStats";

const OrdersBarChart = ({ warning, myCourses = [] }) => {
  const totalCourses = myCourses.length;

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 5
      }
    },
    colors: [warning],
    xaxis: {
      categories: ["دوره‌ها"]
    },
    yaxis: {
      show: false
    },
    dataLabels: {
      enabled: false
    }
  };

  return (
    <TinyChartStats
      height={70}
      type="bar"
      title="دوره‌های من"
      stats={`${totalCourses} دوره`}
      options={options}
      series={[
        {
          name: "دوره‌ها",
          data: [totalCourses]
        }
      ]}
    />
  );
};

export default OrdersBarChart;

