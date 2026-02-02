import { useNavigate } from "react-router-dom";
import Button from "@components/ui/button/Button";

interface Props {
  title: string;
  description?: string;
  link?: {
    /**
     * URL tujuan.
     * - Untuk "internal", harus kompatibel dengan navigate()
     * - Untuk "external", berupa URL lengkap
     */
    type: "internal" | "external";
    url: string;
    text: string;
  };
}

export default function Card({ title, description, link }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      {/* Content */}
      <div>
        <h4 className="mb-1 lg:text-theme-xl text-lg font-medium text-gray-800 dark:text-white/90">
          {title}
        </h4>

        {description && (
          <p className="lg:text-sm text-theme-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {/* Action (always bottom) */}
      {link && (
        <div className="mt-auto pt-4">
          {link.type === "external" && (
            <a
              href={link.url}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
            >
              {link.text}
            </a>
          )}

          {link.type === "internal" && (
            <Button
              size="xs"
              className="inline-flex gap-2"
              variant="primary"
              onClick={() => navigate(link.url)}
            >
              {link.text}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
