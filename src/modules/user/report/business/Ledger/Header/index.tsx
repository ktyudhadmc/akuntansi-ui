import Badge from "@components/ui/badge/Badge";
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
  loading?: boolean;
}

export default function RBLedgerHeader({
  startBalance,
  endBalance,
  credit,
  debit,
  loading,
}: Props) {
  const isBalanced = credit === debit;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4">
          <CardStatistic
            title="Saldo awal"
            loading={loading}
            value={formatIDRLocale(startBalance, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineClockCircle />}
          />
          <CardStatistic
            title={
              <div className="flex justify-between">
                <span>Debit</span>
                {!isBalanced && <Badge color="error">Tidak seimbang</Badge>}
              </div>
            }
            loading={loading}
            value={formatIDRLocale(debit, { withSymbol: true })}
            variant={isBalanced ? "success" : "danger"}
            icon={<AiOutlineArrowUp />}
          />
          <CardStatistic
            title={
              <div className="flex justify-between">
                <span>Kredit</span>
                {!isBalanced && <Badge color="error">Tidak seimbang</Badge>}
              </div>
            }
            loading={loading}
            value={formatIDRLocale(credit, { withSymbol: true })}
            variant={isBalanced ? "danger" : "danger"}
            icon={<AiOutlineArrowDown />}
          />
          <CardStatistic
            title="Saldo akhir"
            loading={loading}
            value={formatIDRLocale(endBalance, { withSymbol: true })}
            variant={isBalanced ? "brand" : "danger"}
            icon={<AiOutlineWallet />}
          />
        </div>
      </div>
    </div>
  );
}
