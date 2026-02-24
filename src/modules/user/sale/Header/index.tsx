import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";
import {
  AiOutlineArrowUp,
  AiOutlinePercentage,
  AiOutlineBarChart,
} from "react-icons/ai";

interface Props {
  loading: boolean;
  grossRevenue: number;
  taxAmount: number;
  revenueIncludingTax: number;
}

export default function SaleHeader({
  loading,
  grossRevenue,
  taxAmount,
  revenueIncludingTax,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <CardStatistic
            loading={loading}
            title="Pendapatan Kotor"
            value={formatIDRLocale(grossRevenue, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineArrowUp />}
          />
          <CardStatistic
            loading={loading}
            title="Pajak"
            value={formatIDRLocale(taxAmount, { withSymbol: true })}
            variant="success"
            icon={<AiOutlinePercentage />}
          />
          <CardStatistic
            loading={loading}
            title="Total Pendapatan"
            value={formatIDRLocale(revenueIncludingTax, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineBarChart />}
          />
        </div>
      </div>
    </div>
  );
}
