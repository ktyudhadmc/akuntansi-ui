import { useSearchParams } from "react-router-dom";

import PageMeta from "@components/common/PageMeta";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import { TabUnderline } from "@components/ui/tabs";

export default function AssetPage() {
  const pageTitle = "Manajemen Aset";
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "pending";
  const tabs = [
    { value: "pending", label: "Aset Tertunda" },
    { value: "active", label: "Aset Aktif" },
    { value: "sold", label: "Dijual/Dilepas" },
    { value: "depreciation", label: "Penyusutan" },
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

          <h4>Halaman {activeTab}, It Works!</h4>
        </div>
      </div>
    </>
  );
}
