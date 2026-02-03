import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function PurchaseHeader() {
  return (
    <>
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
      </div>
    </>
  );
}
