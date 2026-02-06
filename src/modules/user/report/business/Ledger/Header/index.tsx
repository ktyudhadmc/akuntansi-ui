import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";
import {
  AiOutlineClockCircle,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineWallet,
} from "react-icons/ai";

interface Props {
  startBalance: number;
  endBalance: number;
  credit: number;
  debit: number;
}

export default function RBLedgerHeader({
  startBalance,
  endBalance,
  credit,
  debit,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <CardStatistic
            title="Saldo awal"
            value={formatIDRLocale(startBalance, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineClockCircle />}
          />
          <CardStatistic
            title="Debit"
            value={formatIDRLocale(debit, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineArrowUp />}
          />
          <CardStatistic
            title="Kredit"
            value={formatIDRLocale(credit, { withSymbol: true })}
            variant="danger"
            icon={<AiOutlineArrowDown />}
          />
          <CardStatistic
            title="Saldo akhir"
            value={formatIDRLocale(endBalance, { withSymbol: true })}
            icon={<AiOutlineWallet />}
          />
        </div>
      </div>
    </div>
  );
}
