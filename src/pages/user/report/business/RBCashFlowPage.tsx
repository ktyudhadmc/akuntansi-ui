import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RBCashFlow from "@modules/user/report/business/CashFlow/Table";

export default function RBCashFlowPage() {
  const pageTitle = "Arus Kas";
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
        <RBCashFlow />
      </div>
    </>
  );
}
