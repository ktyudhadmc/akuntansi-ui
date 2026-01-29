import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import CreateAccount from "@modules/user/account/chart-of-account/Action/Create";

export default function COACreatePage() {
  const pageTitle = "Tambah Kas & Bank";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <CreateAccount />
        </div>
      </div>
    </>
  );
}
