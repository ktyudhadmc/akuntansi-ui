import { useNavigate } from "react-router-dom";
import Button from "@components/ui/button/Button";

export default function ReportBusinessPage() {
  const navigate = useNavigate();
  const data = [
    {
      title: "Neraca",
      path: "balance-sheet",
      description:
        "Menampilkan apa yang dimiliki (aset), apa saja utangnya (liabilitas), dan apa yang sudah diinvestasikan ke perusahaan ini (ekuitas) padatanggal tertentu",
    },
    {
      title: "Laba rugi",
      path: "profit-loss",
      description:
        "Menampilkan semua pendapatan yang diperoleh dan biaya yang dikeluarkan dalam periode tertentu. Template laporan versi terkini bisa Anda custom sesuai kebutuhan.",
    },
    {
      title: "Arus kas",
      path: "cash-flow",
      description:
        "Menampilkan pergerakan uang masuk dan keluar dari transaksi dalam periode tertentu. Template laporan ini bisa Anda custom sesuai kebutuhan.",
    },
    {
      title: "Buku besar",
      path: "ledger",
      description:
        "Menampilkan semua transaksi berdasarkan akun dalam periode tertentu, termasuk kronologi pergerakan transaksinya selama periode berlangsung.",
    },
    {
      title: "Jurnal",
      path: "journal",
      description:
        "Menampilkan semua journal entry per transaksi dalam periode tertentu. Anda dapat melacak transaksi yang masuk ke masing-masing akun.",
    },
    {
      title: "Neraca saldo",
      path: "trial-balance",
      description:
        "Menampilkan saldo dari setiap akun, termasuk saldo awal, pergerakan, dan saldo akhir dalam periode tertentu.",
    },
  ];

  return (
    <div className="w-full grid md:grid-cols-2 gap-8">
      {data.map((item, index) => (
        <div key={index}>
          <h4 className="font-semibold dark:text-white">{item.title}</h4>
          <p className="text-theme-sm mb-4 text-gray-500 dark:text-gray-400">
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
      ))}
    </div>
  );
}
