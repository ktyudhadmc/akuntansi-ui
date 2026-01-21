import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import CreatePurchase from "@modules/user/purchase/Action/Create";

export default function CreatePurchasePage() {
  const pageTitle = "Buat Pembelian";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <CreatePurchase />
        </div>
      </div>
    </>
  );
}
