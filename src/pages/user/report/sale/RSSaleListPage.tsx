import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RSSaleList from "@modules/user/report/sale/SaleList/Table";

export default function RSSaleListPage() {
  const pageTitle = "Daftar Penjualan";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Penjualan", path: "/user/reports?tab=sales" }]}
      />

      <div className="space-y-6">
        <RSSaleList />
      </div>
    </>
  );
}
