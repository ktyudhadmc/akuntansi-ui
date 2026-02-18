import { useMediaQuery } from "@hooks/useMediaQuery";

export default function TableInformation() {
  const isSm = useMediaQuery("sm");
  return (
    <div>
      <div className="lg:flex items-end gap-4">
        <h4>Periode</h4>
        {isSm && <span>:</span>}
        <div className="overflow-x-auto">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium whitespace-nowrap">
            Dari 1 Januari sampai 31 Januari 2026
          </p>
        </div>
      </div>
    </div>
  );
}
