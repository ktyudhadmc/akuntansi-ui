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
    <div className="grid md:grid-cols-3 grid-cols-1  gap-4">
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
  );
}
