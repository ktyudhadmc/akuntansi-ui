import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import TabsNav from "@components/ui/tabs";
import AdjustmentTable from "@modules/user/inventory/adjustment/Table";
import InventoryTable from "@modules/user/inventory/Index/Table";
import { useSearchParams } from "react-router-dom";

export default function InventoryPage() {
  const pageTitle = "Persediaan";

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "stock";
  const tabs = [
    { value: "stock", label: "Persediaan" },
    { value: "usage", label: "Pemakaian" },
    { value: "adjustment", label: "Penyesuaian" },
  ];

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {/* tabs */}
          <TabsNav
            tabs={tabs}
            initialActive={activeTab}
            onChange={(e) => setSearchParams({ tab: e })}
          />

          {activeTab != "stock" && <h4>Halaman {activeTab}, It Works!</h4>}
          {activeTab == "stock" && <InventoryTable />}
          {activeTab == "adjustment" && <AdjustmentTable />}
        </div>
      </div>
    </>
  );
}
