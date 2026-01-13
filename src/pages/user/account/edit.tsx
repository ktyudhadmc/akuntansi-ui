import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import EditAccount from "@modules/user/account/Action/Edit";

export default function EditAccountPage() {
  const pageTitle = "Kas & Bank";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} showBreadCrumb={false} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <EditAccount />
        </div>
      </div>
    </>
  );
}
