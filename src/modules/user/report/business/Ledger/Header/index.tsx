import CardStatistic from "@components/ui/card/CardStatistic";
import { Tooltip } from "@components/ui/tooltip";
import { formatIDRLocale } from "@helpers/currency";
import {
  AiOutlineClockCircle,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineWallet,
  AiOutlineInfoCircle,
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
            title={"Debit"}
            loading={loading}
            value={formatIDRLocale(debit, { withSymbol: true })}
            variant={"success"}
            valueColor={isBalanced ? "default" : "danger"}
            icon={<AiOutlineArrowUp />}
            information={
              !isBalanced && (
                <Tooltip
                  text="Jumlah debit dan kredit tidak seimbang"
                  placement="top"
                >
                  <AiOutlineInfoCircle className="my-auto text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer rounded-full" />
                </Tooltip>
              )
            }
          />
          <CardStatistic
            title={"Kredit"}
            loading={loading}
            value={formatIDRLocale(credit, { withSymbol: true })}
            variant={"danger"}
            valueColor={isBalanced ? "default" : "danger"}
            icon={<AiOutlineArrowDown />}
            information={
              !isBalanced && (
                <Tooltip
                  text="Jumlah debit dan kredit tidak seimbang"
                  placement="top"
                >
                  <AiOutlineInfoCircle className="my-auto text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer rounded-full" />
                </Tooltip>
              )
            }
          />
          <CardStatistic
            title="Saldo akhir"
            loading={loading}
            value={formatIDRLocale(endBalance, { withSymbol: true })}
            valueColor={isBalanced ? "default" : "danger"}
            variant={"brand"}
            icon={<AiOutlineWallet />}
          />
        </div>
      </div>
    </div>
  );
}
