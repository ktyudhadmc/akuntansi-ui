import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import PurchaseShow from "@modules/user/purchase/Action/Show";

export default function PurchaseShowPage() {
  const pageTitle = "Detail Pembelian";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <PurchaseShow />
    </>
  );
}
