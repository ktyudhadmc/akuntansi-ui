import CardStatistic from "@components/ui/card/CardStatistic";
// import HeaderCard from "./HeaderCard";
import { formatIDRLocale } from "@helpers/currency";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";

export default function InventoryHeader() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      {/* <HeaderCard
        title="Total saldo awal"
        count={0}
        amount={0}
        variant="income"
      />
      <HeaderCard
        title="Total pembelian"
        count={0}
        amount={0}
        variant="income"
      />

      <HeaderCard
        title="Total pemakaian"
        count={0}
        amount={0}
        variant="outcome"
      />
      <HeaderCard title="Total stok opname" count={0} amount={0} /> */}
      <CardStatistic
        title="Total saldo awal"
        value={formatIDRLocale(0, { withSymbol: true })}
        variant="success"
        icon={<AiOutlineArrowUp />}
      />

      <CardStatistic
        title="Total pembelian"
        value={formatIDRLocale(0, { withSymbol: true })}
        variant="success"
        icon={<AiOutlineArrowUp />}
      />
      <CardStatistic
        title="Total pemakaian"
        value={formatIDRLocale(0, { withSymbol: true })}
        variant="danger"
        icon={<AiOutlineArrowDown />}
      />
      <CardStatistic
        title="Total stok opname"
        value={formatIDRLocale(0, { withSymbol: true })}
        icon={<MdOutlineInventory />}
      />
    </div>
  );
}
