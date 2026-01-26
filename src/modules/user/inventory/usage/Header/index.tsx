import HeaderCard from "./HeaderCard";

export default function Header() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <HeaderCard
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
      <HeaderCard title="Total stok opname" count={0} amount={0} />
    </div>
  );
}
