import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RPPurchaseBySupplier from "@modules/user/report/purchase/PurchaseBySupplier/Table";

export default function RPPurchaseBySupplierPage() {
  const pageTitle = "Pembelian Per Supplier";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Penjualan", path: "/user/reports?tab=sales" }]}
      />

      <div className="space-y-6">
        <RPPurchaseBySupplier />
      </div>
    </>
  );
}
