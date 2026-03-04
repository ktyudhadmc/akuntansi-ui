import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RPSupplierBalance from "@modules/user/report/purchase/SupplierBalance/Table";

export default function RPSupplierBalancePage() {
  const pageTitle = "Laporan Hutang Supplier";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[
          { label: "Penjualan", path: "/user/reports?tab=purchases" },
        ]}
      />

      <div className="space-y-6">
        <RPSupplierBalance />
      </div>
    </>
  );
}
