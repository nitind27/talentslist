"use client";
import dynamic from "next/dynamic";
import '@/scss/main.module.scss';
import { useEffect, useState } from "react";

// Dynamically import react-apexcharts to prevent server-side rendering
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  className: string;
  profileData: {
    progress: number;
    profileComplete: {
      [key: string]: { points: number; is_filled: boolean };
    };
  };
};

const CustomerSupportChart = ({ className, profileData }: Props) => {
  const [chartData, setChartData] = useState(profileData);

  // Function to generate chart options with dynamic height
  function getChartOptions(height: number): ApexCharts.ApexOptions {
    return {
      labels: Object.keys(chartData.profileComplete),
      colors: Object.values(chartData.profileComplete).map(item => item.is_filled ? "#0036E3" : "#E4E6EF"),
      legend: {
        show: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      chart: {
        animations: {
          enabled: true,
          easing: "easeinout" as const,
          speed: 500,
        },
        toolbar: {
          show: false,
        },
        height: height, // Dynamically set the height
      },
      tooltip: {
        enabled: true,
        style: {
          // fontSize: "12px",
        },
      },
      dataLabels: {
        enabled: false,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45,
        },
      },
    };
  }

  const series = Object.values(chartData.profileComplete).map(item => item.points);

  return (
    <>
      <div className={`circle d-md-flex ${className}`}>
        <div className="position-relative d-flex flex-center h-175px w-175px mb-7">
          <div className="position-absolute translate-middle start-50 top-50 d-flex flex-column flex-center">
            <div
              style={{
                textAlign: "center",
                fontSize: "29px",
                fontWeight: "bold",
              }}
            >
              {chartData.progress}%
            </div>
            <div style={{ textAlign: "center", color: "lightgray" }}>Total</div>
          </div>
          <Chart
            options={getChartOptions(500)}
            series={series}
            type="donut"
            height={210}
            width={500}
          />
        </div>
        <div className="d-flex flex-column justify-content-center flex-row-fluid mx-11  mb-5">
          {Object.entries(chartData.profileComplete).map(([label, { points, is_filled }]) => (
            <DataItem key={label} label={label} percentage={points} isFilled={is_filled} />
          ))}
        </div>
      </div>
    </>
  );
};

type DataItemProps = {
  label: string;
  percentage: number;
  isFilled: boolean;
};

const DataItem = ({ label, percentage, isFilled }: DataItemProps) => (
  <div className="d-flex fs-6 fw-semibold align-items-center mb-3">
    <div
      className={`bullet me-3 ${isFilled ? "text-new bg-blue" : "text-muted"}`}
    ></div>
    <div className="text-gray-300">{label}</div>
    <div className="ms-auto fw-bold text-gray-700">{percentage}%</div>
  </div>
);

export default CustomerSupportChart;
