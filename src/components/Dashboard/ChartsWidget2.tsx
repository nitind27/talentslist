"use client";
import dynamic from "next/dynamic";
import "@/scss/main.module.scss";

import { useEffect, useState } from "react";
import { Booking_Revenue } from "@/api/Dashboard/Dashboard";
import Nofound from "../nofound/Nofound";

function getChartOptions(
  height: number,
  chartData: number[],
  categories: string[]
): ApexCharts.ApexOptions {
  const labelColor = "gray";
  const borderColor = "lightgray";
  const baseColor = "#0036E3";
  const secondaryColor = "gray";

  const maxDataValue = Math.max(...chartData);

  return {
    series: [
      {
        name: "Revenue",
        data: chartData,
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
        dataLabels: {
          position: "top", // Display data labels above bars
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return "$" + val; // Format data labels as dollars
      },
      offsetY: -20, // Adjust vertical offset of data labels
      style: {
        colors: ["#000"], // Color of data labels
        fontSize: "12px",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      tickAmount: 4, // Set this to ensure intervals of 30
      min: 0,
      max: Math.ceil(maxDataValue * 1.1),
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val;
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
            height: 500,
          },
          plotOptions: {
            bar: {
              columnWidth: "40%",
            },
          },
        },
      },
    ],
  };
}

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ChartsWidget2() {
  const [selectedInterval, setSelectedInterval] =
    useState<TimePeriod>("monthly");
  const [chartData, setChartData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchData = async (interval: TimePeriod) => {
    try {
      const response = await Booking_Revenue(interval);
      const data = response.data;
      console.log("Fetched Data:", data);
      setChartData(Object.values(data));
      setCategories(Object.keys(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedInterval);
  }, [selectedInterval]);

  const handleIntervalChange = (interval: TimePeriod) => {
    setSelectedInterval(interval);
  };

  const options = getChartOptions(500, chartData, categories);

  return (
    <div className="card" style={{ height: "446px" }}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold mb-1">Booking revenue</span>
        </h3>
        <div className="card-toolbar" data-kt-buttons="true">
          <button
            onClick={() => handleIntervalChange("daily")}
            className={`btn btn-sm px-4 me-1 ${
              selectedInterval === "daily"
                ? "bg-blue text-white"
                : "btn-color-muted"
            }`}
            id="kt_charts_widget_2_daily_btn"
          >
            Daily
          </button>
          <button
            onClick={() => handleIntervalChange("weekly")}
            className={`btn btn-sm px-4 me-1 ${
              selectedInterval === "weekly"
                ? "bg-blue text-white"
                : "btn-color-muted"
            }`}
            id="kt_charts_widget_2_weekly_btn"
          >
            Weekly
          </button>
          <button
            onClick={() => handleIntervalChange("monthly")}
            className={`btn btn-sm px-4 ${
              selectedInterval === "monthly"
                ? "bg-blue text-white"
                : "btn-color-muted"
            }`}
            id="kt_charts_widget_2_monthly_btn"
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="card-body p-2">
        {chartData.length === 0 ? (
          <>
            <Nofound />
          </>
        ) : (
          <div style={{ width: "100%", overflow: "hidden" }}>
            <ApexChart
              options={options}
              series={[{ name: "Booking", data: chartData }]}
              type="bar"
              height={350}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartsWidget2;

type TimePeriod = "daily" | "weekly" | "monthly";
