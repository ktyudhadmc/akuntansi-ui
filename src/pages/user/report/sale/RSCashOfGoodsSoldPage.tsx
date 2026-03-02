import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RSCashOfGoodsSold from "@modules/user/report/sale/CashOfGoodsSold/Table";

export default function RSCashOfGoodsSoldPage() {
  const pageTitle = "Beban Pokok Penjualan";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Penjualan", path: "/user/reports?tab=sales" }]}
      />

      <div className="space-y-6">
        <RSCashOfGoodsSold />
      </div>
    </>
  );
}
