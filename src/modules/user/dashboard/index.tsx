import ChartOperatingExpense from "./chart/ChartOperatingExpense";
import ChartProfitLoss from "./chart/ChartProfitLoss";
import ChartPurchase from "./chart/ChartPurchase";
import ChartSale from "./chart/ChartSale";
import ChartCashFlow from "./chart/ChartCashFlow";

export default function Dashboard() {
  return (
    <div className="space-y-6">
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

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        <ChartProfitLoss />
        <ChartCashFlow />
        <ChartOperatingExpense />
      </div>
    </div>
  );
}
