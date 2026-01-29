import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import COAClosingBook from "@modules/user/account/closing-book/Table";

export default function COAClosingBookPage() {
  const pageTitle = "Daftar Kunci Periode & Tutup Buku";

  return (
    <>
      <PageMeta title={pageTitle} />

      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Daftar Akun", path: ".." }]}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <COAClosingBook />
        </div>
      </div>
    </>
  );
}
