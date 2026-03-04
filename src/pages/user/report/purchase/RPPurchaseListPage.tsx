import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RSPurchaseList from "@modules/user/report/purchase/PurchaseList/Table";

export default function RPPurchaseListPage() {
  const pageTitle = "Daftar Pembelian";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[
          { label: "Pembelian", path: "/user/reports?tab=purchases" },
        ]}
      />

      <div className="space-y-6">
        <RSPurchaseList />
      </div>
    </>
  );
}
