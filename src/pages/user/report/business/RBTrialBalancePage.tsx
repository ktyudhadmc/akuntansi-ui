import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RBTrialBalance from "@modules/user/report/business/TrialBalance/Table";

export default function RBTrialBalancePage() {
  const pageTitle = "Neraca Saldo";
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
        {/* <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"></div>
      </div> */}
        <RBTrialBalance />
      </div>
    </>
  );
}
