import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RBProfitLoss from "@modules/user/report/business/ProfitLoss/Table";

export default function RBTrialBalancePage() {
  const pageTitle = "Laba Rugi";
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
        <RBProfitLoss />
      </div>
    </>
  );
}
