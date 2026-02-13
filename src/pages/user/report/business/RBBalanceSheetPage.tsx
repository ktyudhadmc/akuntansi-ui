import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import RBBalanceSheet from "@modules/user/report/business/BalanceSheet/Table";

export default function RBCashFlowPage() {
  const pageTitle = "Neraca";
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
        <RBBalanceSheet />
      </div>
    </>
  );
}
