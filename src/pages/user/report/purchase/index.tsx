import { useNavigate } from "react-router-dom";
import Button from "@components/ui/button/Button";

export default function ReportPurchasePage() {
  const navigate = useNavigate();
  const data = [
    {
      title: "Daftar pembelian",
      path: "purchases-list",
      description:
        "Menampilkan transaksi pembelian secara kronologis berdasarkan tipenya dalam periode tertentu. Template laporan ini bisa Anda custom sesuai kebutuhan.",
    },
    {
      title: "Pembelian per supplier",
      path: "purchase-by-supplier",
      description:
        "Menampilkan semua transaksi pembelian dari setiap supplier dalam periode tertentu.",
    },
    {
      title: "Utang supplier",
      path: "supplier-balance",
      description:
        "Menampilkan semua faktur yang belum dibayar dan saldo memo debit supplier pada tanggal tertentu.",
    },
    {
      title: "Daftar pengeluaran",
      path: "expenses-list",
      description:
        "Menampilkan semua transaksi pengeluaran dalam periode tertentu.",
    },
    {
      title: "Detail pengeluaran",
      path: "expenses-detail",
      description:
        "Menampilkan semua transaksi pengeluaran berdasarkan akun dalam periode tertentu.",
    },
  ];

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
              onClick={() => navigate(item.path)}
            >
              Lihat laporan
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
