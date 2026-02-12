import DonutChartCard from "@components/charts/pie";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";

export default function ChartOperatingExpense() {
  const categories = ["Pendapatan", "Nilai HPP", "Pengeluaran"];
  const series = [900, 700, 850];
  const colors = ["#CC4802", "#FFB28C", "#FFD6C2"];
  const total = series.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-md font-semibold text-gray-800 dark:text-white/90">
          Beban Operasional
        </h3>
        <p className="mt-1 text-gray-500 text-theme-xs dark:text-gray-400">
          {dayjs().format("MMMM YYYY")}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center xl:flex-row mt-2">
        {/* Chart */}
        <DonutChartCard series={series} categories={categories} height={248} />

        {/* Custom Legend */}
        <div className="flex md:flex-row lg:flex-col flex-col gap-4">
          {series.map((value, i) => {
            const percentage = ((value / total) * 100).toFixed(0);

            return (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full items-start" />
                <GoDotFill style={{ color: colors[i] }} size={18} />
                <div>
                  <h5 className="mb-1 font-medium text-gray-800 text-sm dark:text-white/90">
                    {categories[i]}
                  </h5>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-700 text-sm dark:text-gray-300">
                      {percentage}%
                    </p>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
