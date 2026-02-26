import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RSSaleByCustomer from "@modules/user/report/sale/SaleByCustomer/Table";

export default function RSSaleByCustomerPage() {
  const pageTitle = "Penjualan Per Pelanggan";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Penjualan", path: "/user/reports?tab=sales" }]}
      />

      <div className="space-y-6">
        <RSSaleByCustomer />
      </div>
    </>
  );
}
