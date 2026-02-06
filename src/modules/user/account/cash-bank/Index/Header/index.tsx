import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineClockCircle,
  AiOutlineWallet,
} from "react-icons/ai";

export default function CBHeader() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <CardStatistic
            title="Pemasukan"
            value={formatIDRLocale(0, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineArrowUp />}
          />

          <CardStatistic
            title="Pengeluaran"
            value={formatIDRLocale(0, { withSymbol: true })}
            variant="danger"
            icon={<AiOutlineArrowDown />}
          />

          <CardStatistic
            title="Saldo kas & bank"
            value={formatIDRLocale(0, { withSymbol: true })}
            variant="warning"
            icon={<AiOutlineClockCircle />}
          />

          <CardStatistic
            title="Saldo kartu kredit"
            value={formatIDRLocale(0, { withSymbol: true })}
            variant="brand"
            icon={<AiOutlineWallet />}
          />
        </div>
      </div>
    </div>
  );
}
