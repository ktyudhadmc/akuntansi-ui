import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import { TabUnderline } from "@components/ui/tabs";
import ProductShow from "@modules/user/product/Index/Action/Show";
import ProductTransaction from "@modules/user/product/Transactions";
import ProductUnit from "@modules/user/product/Unit";
import { useSearchParams } from "react-router-dom";

export default function ProductShowPage() {
  const pageTitle = "Detail Produk";

  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = [
    { value: "transaction", label: "Transaksi produk" },
    { value: "unit", label: "Pengaturan unit" },
  ];
  const activeTab = searchParams.get("tab") ?? "transaction";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="space-y-6">
            <ProductShow />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="space-y-6">
            {/* tabs */}
            <TabUnderline
              tabs={tabs}
              initialActive={activeTab}
              onChange={(e) => setSearchParams({ tab: e })}
            />

            {activeTab == "transaction" && <ProductTransaction />}
            {activeTab == "unit" && <ProductUnit />}
          </div>
        </div>
      </div>
    </>
  );
}
