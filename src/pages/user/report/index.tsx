import { useSearchParams } from "react-router-dom";

import PageMeta from "@components/common/PageMeta";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import { TabUnderline } from "@components/ui/tabs";

import ReportBusinessPage from "./business";


export default function ReportPage() {
  const pageTitle = "Laporan";
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "business";
  const tabs = [
    { value: "business", label: "Sekilas bisnis" },
    { value: "sales", label: "Penjualan" },
    { value: "purchases", label: "Pembelian" },
    { value: "products", label: "Produk" },
    { value: "bank", label: "Bank" },
    { value: "production", label: "Produksi" },
  ];

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {/* tabs */}
          <TabUnderline
            tabs={tabs}
            initialActive={activeTab}
            onChange={(e) => setSearchParams({ tab: e })}
          />


          {activeTab != "business" && <h4>Halaman {activeTab}, It Works!</h4>}

          {activeTab == "business" && <ReportBusinessPage />}
        </div>
      </div>
    </>
  );
}
