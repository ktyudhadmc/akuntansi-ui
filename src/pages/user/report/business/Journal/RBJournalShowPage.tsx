import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RBJournalShow from "@modules/user/report/business/Journal/Action/Show";

export default function ReportBusinessJournalPage() {
  const pageTitle = "Transaksi Jurnal Umum";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Jurnal Umum", path: "/user/reports/journal" }]}
      />

      <RBJournalShow />
    </>
  );
}
