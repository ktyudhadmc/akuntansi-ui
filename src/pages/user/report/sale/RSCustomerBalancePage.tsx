import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RSCustomerBalance from "@modules/user/report/sale/CustomerBalance/Table";

export default function RSCustomerBalancePage() {
  const pageTitle = "Piutang Pelanggan";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Penjualan", path: "/user/reports?tab=sales" }]}
      />

      <div className="space-y-6">
        <RSCustomerBalance />
      </div>
    </>
  );
}
