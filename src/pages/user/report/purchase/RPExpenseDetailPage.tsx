import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RPExpenseDetail from "@modules/user/report/purchase/ExpenseDetail/Table";

export default function RPExpenseDetailPage() {
  const pageTitle = "Rincian Pembelian";
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
        <RPExpenseDetail />
      </div>
    </>
  );
}
