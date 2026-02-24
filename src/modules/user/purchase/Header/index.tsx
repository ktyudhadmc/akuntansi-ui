import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";
import { AiOutlineArrowDown, AiOutlineBarChart, AiOutlinePercentage } from "react-icons/ai";

export default function PurchaseHeader() {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <CardStatistic
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
            />
            <CardStatistic
              title="Total Biaya"
              value={formatIDRLocale(0, { withSymbol: true })}
              variant="danger"
              icon={<AiOutlineBarChart />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
