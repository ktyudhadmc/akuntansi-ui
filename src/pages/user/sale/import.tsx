import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import ImportSale from "@modules/user/sale/Action/Import";

export default function ImportSalePage() {
  const pageTitle = "Impor Penjualan";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <ImportSale />
        </div>
      </div>
    </>
  );
}
