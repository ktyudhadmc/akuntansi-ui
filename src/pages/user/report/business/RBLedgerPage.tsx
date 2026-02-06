import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import Ledger from "@modules/user/report/business/Ledger/Table";

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

      <div className="space-y-6">
        <Ledger />
      </div>
    </>
  );
}
