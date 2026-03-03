import Button from "@components/ui/button/Button";
import useDownload from "@services/global/download/hooks/useDownload";
import Spinner from "@components/Reusable/Spinner";

export default function ReportProductionPage() {
  const { loading: loadingDownload, trigger } = useDownload();
  const data = [
    {
      type: "download",
      title: "Harga Pokok Produksi (COGM)",
      onClick: () => trigger({ url: "/reports/cogm", mode: "download" }),
      description:
        "Memberikan laporan berformat PDF yang berisi total biaya (komponen, tenaga kerja, overhead, dsb.) yang dikeluarkan untuk menghasilkan barang jadi.",
    },
  ] as const;

  return (
    <div className="w-full grid md:grid-cols-2 gap-8">
      {data.map((item, index) => (
        <div
          key={`card-${index}`}
          className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
        >
          <div>
            <h4 className="mb-1 text-theme-xl font-medium text-gray-800 dark:text-white/90">
              {item.title}
            </h4>

            <p className="text-sm text-gray-500 dark:text-gray-400  mb-4">
              {item.description}
            </p>

            <Button
              size="sm"
              variant="outline"
              onClick={item.onClick}
              disabled={loadingDownload}
            >
              {loadingDownload ? <Spinner /> : "Ekspor laporan"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
