import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import Journal from "@modules/user/report/business/Journal";

export default function ReportBusinessJournalPage() {
  const pageTitle = "Jurnal";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[
          { label: "Business", path: "/user/reports?tab=business" },
        ]}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <Journal />
        </div>
      </div>
    </>
  );
}
