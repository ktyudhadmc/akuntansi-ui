import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import UsageEdit from "@modules/user/inventory/usage/Action/Edit";

export default function InventoryUsageEditPage() {
  const pageTitle = "Ubah Pemakaian";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[
          { label: "Persediaan", path: "/user/inventories?tab=usage" },
        ]}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <UsageEdit />
        </div>
      </div>
    </>
  );
}
