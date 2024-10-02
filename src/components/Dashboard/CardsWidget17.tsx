"use client";
import { FC, useEffect, useRef } from "react";

type CountData = {
  request: number;
  upcoming: number;
  active: number;
  pending: number;
};

type Props = {
  className: string;
  chartSize?: number;
  chartLine?: number;
  chartRotate?: number;
  countData?: CountData;
};

const CardsWidget17: FC<Props> = ({
  className,
  chartSize = 85,
  chartLine = 25,
  chartRotate = 145,
  countData,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (countData) {
      const total = countData.request + countData.upcoming + countData.active;
      const requestPercent = (countData.request / total) * 100;
      const upcomingPercent = (countData.upcoming / total) * 100;
      const activePercent = (countData.active / total) * 100;

      refreshChart(requestPercent, upcomingPercent, activePercent);
    }
  }, [countData]);

  const refreshChart = (
    requestPercent: number,
    upcomingPercent: number,
    activePercent: number
  ) => {
    if (!chartRef.current) {
      return;
    }

    setTimeout(() => {
      initChart(
        chartSize,
        chartLine,
        chartRotate,
        requestPercent,
        upcomingPercent,
        activePercent
      );
    }, 10);
  };

  const initChart = (
    chartSize: number,
    chartLine: number,
    chartRotate: number,
    requestPercent: number,
    upcomingPercent: number,
    activePercent: number
  ) => {
    const el = document.getElementById("kt_card_widget_17_chart");
    if (!el) {
      return;
    }
    el.innerHTML = "";

    const options = {
      size: chartSize,
      lineWidth: chartLine,
      rotate: chartRotate,
    };

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // Increase the canvas size by a factor of 2
    canvas.width = canvas.height = options.size * 2;
    canvas.style.width = `${options.size}px`;
    canvas.style.height = `${options.size}px`;

    el.appendChild(canvas);

    ctx.translate(options.size, options.size);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    const radius = (options.size * 2 - options.lineWidth) / 2;

    const drawCircle = (color: string, lineWidth: number, percent: number) => {
      percent = Math.min(Math.max(0, percent || 1), 1);

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    drawCircle("#E4E6EF", options.lineWidth, requestPercent / 100);
    drawCircle("#0036E3", options.lineWidth, upcomingPercent / 100);
    drawCircle("#09CBCB", options.lineWidth, activePercent / 100);
  };

  return (
    <div className={`card card-flush ${className}`}>
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-1 fw-bold ms-1 lh-1 ls-n2">
              <span className="pt-1 fw-semibold fs-1">
                {countData?.pending}
              </span>
            </span>
          </div>
          <span className="text-gray-300 pt-1 fw-semibold fs-6">
            All Bookings
          </span>
        </div>
      </div>

      <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
        <div className="d-flex flex-center me-5 pt-2">
          <div
            id="kt_card_widget_17_chart"
            ref={chartRef}
            style={{ minWidth: chartSize + "px", minHeight: chartSize + "px" }}
            data-kt-size={chartSize}
            data-kt-line={chartLine}
          ></div>
        </div>

        <div className="d-flex flex-column content-justify-center flex-row-fluid">
          <div className="d-flex fw-semibold align-items-center">
            <div className="bullet w-8px h-3px rounded-2 bg-skyblue me-3"></div>
            <div className="text-gray-300 flex-grow-1 me-4">Request</div>
            <div className="fw-bolder text-gray-700 text-xxl-end">
              {countData?.pending || 0}
            </div>
          </div>
          <div className="d-flex fw-semibold align-items-center my-3">
            <div className="bullet w-8px h-3px rounded-2 bg-blue me-3"></div>
            <div className="text-gray-300 flex-grow-1 me-4">Upcoming </div>
            <div className="fw-bolder text-gray-700 text-xxl-end">
              {countData?.upcoming || 0}
            </div>
          </div>
          <div className="d-flex fw-semibold align-items-center">
            <div
              className="bullet w-8px h-3px rounded-2 me-3"
              style={{ backgroundColor: "#E4E6EF" }}
            ></div>
            <div className="text-gray-300 flex-grow-1 me-4">Active</div>
            <div className=" fw-bolder text-gray-700 text-xxl-end">
              {countData?.active || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardsWidget17 };
