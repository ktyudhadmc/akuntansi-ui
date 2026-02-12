import ChartPurchase from "./chart/ChartPurchase";
import ChartSale from "./chart/ChartSale";

export default function Dashboard() {
  return (
    <div>
      {/* <h1 className="text-gray-500 dark:text-gray-400">Dashboard, It Works!</h1> */}

      {/* <BarChartOne />
      <LineChartOne /> */}

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div>
          <ChartSale />
        </div>
        <div>
          <ChartPurchase />
        </div>
      </div>
    </div>
  );
}
