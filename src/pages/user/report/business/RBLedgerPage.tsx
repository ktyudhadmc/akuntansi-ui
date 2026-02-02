import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import Ledger from "@modules/user/report/business/Ledger";

export default function ReportBusinessLedgerPage() {
  const pageTitle = "Buku Besar";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[
          { label: "Sekilas bisnis", path: "/user/reports?tab=business" },
        ]}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <Ledger />
        </div>
      </div>
    </>
  );
}
