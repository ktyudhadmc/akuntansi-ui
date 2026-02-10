import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import SaleShow from "@modules/user/sale/Action/Show";

export default function SaleShowPage() {
  const pageTitle = "Detail Penjualan";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <SaleShow />
    </>
  );
}
