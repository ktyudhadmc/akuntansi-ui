import { formatIDR } from "@helpers/currency";

interface Props {
  title: string;
  count: number;
  amount: number;
  variant?: "income" | "outcome" | "primary";
}

export default function TableHeaderCard({
  title,
  count,
  amount,
  variant = "primary",
}: Props) {
  const borderVariants = {
    income: "border-green-500",
    outcome: "border-red-500",
    primary: "border-brand-600",
  };

  const bgVariants = {
    income: "bg-green-100",
    outcome: "bg-red-100",
    primary: "bg-brand-100",
  };

  const countVariants = {
    income: "bg-green-500",
    outcome: "bg-red-500",
    primary: "bg-brand-500",
  };

  return (
    <div className={`border ${borderVariants[variant]} rounded-lg`}>
      <div
        className={`${bgVariants[variant]} px-4 py-2 rounded-t-lg flex justify-between`}
      >
        <span className="text-sm font-medium">{title}</span>

        <div
          className={`rounded-full ${countVariants[variant]} min-w-6 h-6 text-white px-2 flex items-center`}
        >
          {count}
        </div>
      </div>
      <div className="px-4 py-2">
        <span className="text-xs dark:text-gray-400">Total</span>
        <br />
        <span className="font-semibold text-xl dark:text-gray-400">
          {formatIDR(amount)}
        </span>
      </div>
    </div>
  );
}
