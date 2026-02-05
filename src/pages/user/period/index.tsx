import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Button from "@components/ui/button/Button";

export default function PeriodPage() {
  const pageTitle = "Daftar Kunci Periode & Tutup Buku";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <div className="lg:max-w-md mx-auto">
            <div className="mb-6">
              <h5 className="font-semibold text-lg mb-2 dark:text-white">
                Perbedaan Fungsi
              </h5>
              <p className="text-gray-500 dark:text-gray-400 text-theme-sm">
                Kunci periode memastikan transaksi yang berada dalam periode
                yang sudah dikunci tidak berubah.
              </p>
              <br />
              <p className="text-gray-500 dark:text-gray-400 text-theme-sm">
                Tutup buku meliputi penguncian periode dan peralihan keuntungan
                bersih/rugi periode sebelumnya menjadi modal awal periode
                berikutnya melalui jurnal penutup.
              </p>
            </div>
            <div className="mb-6">
              <h5 className="font-semibold text-lg mb-2 dark:text-white">
                Waktu untuk melakukan
              </h5>
              <div className="flex gap-4 mb-4">
                <AiOutlineCheckCircle className="text-4xl text-green-500" />
                <p className="text-gray-500 dark:text-gray-400 text-theme-sm">
                  Kunci periode dapat dilakukan saat transaksi dalam laporan
                  sudah ditinjau dan tidak ingin diubah.
                </p>
              </div>
              <div className="flex gap-4">
                <AiOutlineCheckCircle className="text-4xl text-green-500" />
                <p className="text-gray-500 dark:text-gray-400 text-theme-sm">
                  Tutup buku umumnya dilakukan pada akhir tahun, akhir periode
                  akuntansi, atau keduanya.
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <Button size="sm" className="w-full">
                Mulai kunci periode
              </Button>
              <Button size="sm" className="w-full" variant="outline">
                Mulai tutup buku
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
