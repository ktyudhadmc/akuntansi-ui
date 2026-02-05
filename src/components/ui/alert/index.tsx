import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

type AlertVariant = "info" | "warning" | "success" | "danger" | "primary";

interface AlertAction {
  label: string;
  href?: string; // external / normal link
  to?: string; // react-router link
  onClick?: () => void;
}

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: React.ReactNode;
  action?: AlertAction;
  className?: string;
}

const VARIANT_CONFIG: Record<
  AlertVariant,
  {
    defaultTitle: string;
    icon: React.ReactNode;
    container: string;
    iconColor: string;
    titleColor: string;
    textColor: string;
    actionColor: string;
  }
> = {
  info: {
    defaultTitle: "Informasi",
    icon: <AiOutlineInfoCircle size={22} />,
    container:
      "border-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/30",
    iconColor: "text-blue-500",
    titleColor: "text-gray-800 dark:text-white/90",
    textColor: "text-gray-600 dark:text-gray-400",
    actionColor: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    defaultTitle: "Perhatian",
    icon: <AiOutlineExclamationCircle size={22} />,
    container:
      "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 dark:border-yellow-500/30",
    iconColor: "text-yellow-500",
    titleColor: "text-gray-800 dark:text-white/90",
    textColor: "text-gray-600 dark:text-gray-400",
    actionColor: "text-yellow-600 dark:text-yellow-400",
  },
  success: {
    defaultTitle: "Berhasil",
    icon: <AiOutlineCheckCircle size={22} />,
    container:
      "border-success-500 bg-success-50 dark:bg-success-500/10 dark:border-success-500/30",
    iconColor: "text-success-500",
    titleColor: "text-gray-800 dark:text-white/90",
    textColor: "text-gray-600 dark:text-gray-400",
    actionColor: "text-success-600",
  },
  danger: {
    defaultTitle: "Error",
    icon: <AiOutlineCloseCircle size={22} />,
    container:
      "border-error-500 bg-error-50 dark:bg-error-500/15 dark:border-error-500/30",
    iconColor: "text-error-500",
    titleColor: "text-gray-800 dark:text-white/90",
    textColor: "text-gray-600 dark:text-gray-400",
    actionColor: "text-error-600",
  },
  primary: {
    defaultTitle: "Informasi",
    icon: <AiOutlineInfoCircle size={22} />,
    container:
      "border-brand-600 bg-brand-50 dark:bg-brand-600/10 dark:border-brand-600/30",
    iconColor: "text-brand-600",
    titleColor: "text-brand-600 dark:text-brand-500",
    textColor: "text-gray-600 dark:text-gray-400",
    actionColor: "text-brand-600",
  },
};

export default function Alert({
  variant = "info",
  title,
  message,
  action,
  className,
}: AlertProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div className={clsx("rounded-xl border p-4", config.container, className)}>
      <div className="flex items-start gap-3">
        <div className={clsx("-mt-0.5 shrink-0", config.iconColor)}>
          {config.icon}
        </div>

        <div className="flex-1">
          {(title || config.defaultTitle) && (
            <h4
              className={clsx("mb-1 text-sm font-semibold", config.titleColor)}
            >
              {title ?? config.defaultTitle}
            </h4>
          )}

          <div className={clsx("text-sm", config.textColor)}>{message}</div>

          {action && (
            <div className="mt-3">
              {action.to ? (
                <Link
                  to={action.to}
                  className={clsx(
                    "text-sm font-medium underline",
                    config.actionColor,
                  )}
                >
                  {action.label}
                </Link>
              ) : action.href ? (
                <a
                  href={action.href}
                  className={clsx(
                    "text-sm font-medium underline",
                    config.actionColor,
                  )}
                >
                  {action.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={action.onClick}
                  className={clsx(
                    "text-sm font-medium underline",
                    config.actionColor,
                  )}
                >
                  {action.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
