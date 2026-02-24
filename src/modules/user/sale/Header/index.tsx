import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";
import { AiOutlineArrowUp } from "react-icons/ai";

interface Props {
  loading: boolean;
  income: number;
}

export default function SaleHeader({ loading, income }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <CardStatistic
            loading={loading}
            title="Pemasukan"
            value={formatIDRLocale(income, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineArrowUp />}
          />
        </div>
      </div>
    </div>
  );
}
