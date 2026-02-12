import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { formatCompactNumber } from "@helpers/currency";

interface LineChartProps {
  series: ApexAxisChartSeries;
  categories: string[];
  height?: number;
  colors?: string[];
}

export default function LineChart({
  series,
  categories,
  height = 310,
  // colors = ["#465FFF", "#9CB9FF"],
  // colors = ["var(--color-brand-700)", "var(--color-brand-300)"],
  colors = ["#CC4802", "#FFB28C"],
}: LineChartProps) {
  const options: ApexOptions = {
    legend: { show: false },
    colors,
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "category",
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (value: number) => formatCompactNumber(value),
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px] xl:min-w-full">
        <Chart options={options} series={series} type="area" height={height} />
      </div>
    </div>
  );
}
