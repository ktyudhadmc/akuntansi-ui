import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import Button from "@components/ui/button/Button";

// import Card from "@components/ui/card";
import { useNavigate } from "react-router-dom";

export default function OthersPage() {
  const pageTitle = "Daftar Lainnya";

  const navigate = useNavigate();
  const data = [
    {
      title: "Satuan",
      path: "../products",
      description: "Berisi daftar satuan (unit) produk Anda.",
    },
    {
      title: "Kategori Produk",
      path: "../products",
      description: "Berisi daftar kategori produk Anda.",
    },
    {
      title: "Pajak",
      path: "../taxes",
      description:
        "Menampilkan tipe-tipe pajak yang Anda pakai untuk penjualan kepada pelanggan atau pembelian dari supplier.",
    },
    {
      title: "Daftar Kunci Periode & Tutup Buku",
      path: "../accounts/chart-of-account",
      description:
        "Menampilkan daftar periode yang dikunci dan buku yang sudah ditutup dalam satu tabel.",
    },
    {
      title: "Penghitungan ulang nilai persediaan",
      path: "../inventories",
      description:
        "Menampilkan status dan log penghitungan nilai persediaan yang disebabkan oleh perubahan data transaksi.",
    },
  ];

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
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
                  Lihat halaman
                </Button>
              </div>

              // <Card
              //   key={`card-other-page-${index}`}
              //   title={item.title}
              //   description={item.description}
              //   link={{ type: "internal", url: item.path, text: "Buka halaman" }}
              // />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
