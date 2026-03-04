import { HiOutlineDocumentText } from "react-icons/hi";

interface Props {
  title: string;
  count: number;
  variant?: "success" | "warning" | "danger" | "primary";
}

export default function ProductHeaderCard({
  title,
  count,
  variant = "primary",
}: Props) {
  const borderVariants = {
    success: "border-green-500",
    warning: "border-yellow-500",
    danger: "border-red-500",
    primary: "border-brand-600",
  };

  const bgVariants = {
    success: "bg-green-100",
    warning: "bg-yellow-100",
    danger: "bg-red-100",
    primary: "bg-brand-100",
  };

  const countVariants = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    primary: "bg-brand-500",
  };

  return (
    <div className={`border ${borderVariants[variant]} rounded-lg`}>
      <div
        className={`${bgVariants[variant]} px-4 py-2 rounded-t-lg flex justify-between`}
      >
        <span className="text-sm font-medium">{title}</span>
        
        <button className={`${countVariants[variant]} rounded-full min-w-6 h-6 p-1 flex items-center`}>
          <HiOutlineDocumentText className="text-white" />
        </button>
      </div>
      <div className="px-4 py-2">
        <span className="text-xs dark:text-gray-400">Total</span>
        <br />
        <span className="font-semibold text-xl dark:text-gray-400">
          {count}
        </span>
      </div>
    </div>
  );
}
