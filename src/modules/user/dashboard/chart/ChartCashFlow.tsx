import dayjs from "dayjs";
import LineChart from "@components/charts/line";
import { formatCompactNumber } from "@helpers/currency";
import Badge from "@components/ui/badge/Badge";

export default function ChartCashFlow() {
  const startDate = dayjs().subtract(6, "day").format("DD MMM YYYY");
  const endDate = dayjs().format("DD MMM YYYY");

  const categories = Array.from({ length: 7 }).map((_, i) =>
    dayjs()
      .subtract(6 - i, "day")
      .format("DD MMM"),
  );

  const series = [
    {
      name: "Sales",
      data: [
        2000000000, 1900000000, 1700000000, 1600000000, 175000000, 1650000000,
        1100000000,
      ],
    },
  ];

  const data = series[0].data;

  const currentIncome = data[data.length - 1];
  const previousIncome = data[data.length - 2];
  const growthPercentage =
    previousIncome === 0
      ? 0
      : ((currentIncome - previousIncome) / previousIncome) * 100;

  const isMinus = growthPercentage < 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-4 mb-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-md font-semibold text-gray-800 dark:text-white/90">
            Arus Kas
          </h3>
          <p className="mt-1 text-gray-500 text-theme-xs dark:text-gray-400">
            {startDate} - {endDate}
          </p>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-0.5 sm:flex-col sm:items-start">
          <div className="flex flex-row-reverse items-center gap-3 sm:flex-row sm:gap-2">
            <h4 className="text-lg font-bold text-gray-800 dark:text-white/90">
              {formatCompactNumber(currentIncome)}
            </h4>

            <Badge
              variant="light"
              size="sm"
              color={isMinus ? "error" : "success"}
            >
              {growthPercentage.toFixed(2)}%
            </Badge>
          </div>
          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
            Total Pengeluaran
          </span>
        </div>
      </div>

      <LineChart categories={categories} series={series} height={196} />
    </div>
  );
}
