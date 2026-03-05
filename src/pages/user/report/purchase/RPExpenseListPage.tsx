import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RPExpenseList from "@modules/user/report/purchase/ExpenseList/Table";

export default function RPExpenseListPage() {
  const pageTitle = "Daftar Pengeluaran";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[
          { label: "Pembelian", path: "/user/reports?tab=purchases" },
        ]}
      />
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">Halaman {pageTitle}, It Works!</div>
      </div> */}
      <RPExpenseList />
    </>
  );
}
