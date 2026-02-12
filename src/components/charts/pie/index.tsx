import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { formatCompactNumber } from "@helpers/currency";

interface Props {
  series: number[];
  categories: string[];
  height?: number;
  colors?: string[];
}

export default function DonutChartCard({
  series,
  categories,
  height = 248,
  colors = ["#CC4802", "#FFB28C", "#FFD6C2"],
}: Props) {
  const total = series.reduce((acc, curr) => acc + curr, 0);
  const options: ApexOptions = {
    colors,
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    states: {
      hover: {
        filter: { type: "none" },
      },
      //   active: {
      //     filter: { type: "none" },
      //     allowMultipleDataPointsSelection: false,
      //   },
    },
    labels: categories,
    legend: { show: false },
    tooltip: { enabled: false },
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "60%",
          labels: {
            show: true,

            name: { show: false },
            total: {
              show: true,
              showAlways: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              formatter: () => formatCompactNumber(total),
            },

            value: {
              show: true,
              fontSize: "22px",
              fontWeight: 700,
              color: "#111827",
            },
          },
        },
      },
    },
  };

  return (
    <div className="lg:max-w-60 min-w-32">
      <Chart options={options} series={series} type="donut" height={height} />
    </div>
  );
}
