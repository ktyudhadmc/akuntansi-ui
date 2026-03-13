import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";
import {
  // AiOutlineArrowDown,
  AiOutlineBarChart,
  // AiOutlinePercentage,
} from "react-icons/ai";

interface Props {
  expenseAmount: number;
  loading: boolean;
}
export default function PurchaseHeader({ loading, expenseAmount }: Props) {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {/* <CardStatistic
              title="Biaya Sebelum Pajak"
              value={formatIDRLocale(0, { withSymbol: true })}
              variant="danger"
              icon={<AiOutlineArrowDown />}
            />
            <CardStatistic
              title="Pajak"
              value={formatIDRLocale(0, { withSymbol: true })}
              variant="danger"
              icon={<AiOutlinePercentage />}
            /> */}
        <CardStatistic
          loading={loading}
          title="Total Biaya"
          value={formatIDRLocale(expenseAmount, { withSymbol: true })}
          variant="danger"
          icon={<AiOutlineBarChart />}
        />
      </div>
    </>
  );
}
