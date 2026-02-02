import clsx from "clsx";

type Variant = "success" | "danger" | "warning" | "brand";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
    success: "bg-success-500/10 text-success-500",
    danger: "bg-error-500/10 text-error-500",
    warning: "bg-warning-500/10 text-warning-500",
    brand: "bg-brand-600/10 text-brand-600",
};

export default function CardStatistic({
    title,
    value,
    icon,
    variant = "brand",
}: StatCardProps) {
    return (
        <article className="flex gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03]">
            <div
                className={clsx(
                    "inline-flex h-14 w-14 items-center justify-center rounded-xl",
                    variantStyles[variant],
                )}
            >
                {icon}
            </div>

            <div className="flex-1">
                <h3 className="text-title-xs mb-1 font-semibold text-gray-800 dark:text-white/90">
                    {value}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            </div>
        </article>
    );
}
