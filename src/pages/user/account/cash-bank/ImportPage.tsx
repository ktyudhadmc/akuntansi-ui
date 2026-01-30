import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";

import CBImport from "@modules/user/account/cash-bank/Action/Import";

export default function CBImportPage() {
  const pageTitle = "Impor Rekening Koran";

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Kas & Bank", path: ".." }]}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <CBImport />
        </div>
      </div>
    </>
  );
}
