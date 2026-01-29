import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import COAClosingBookCreate from "@modules/user/account/closing-book/Action/Create";

export default function COAClosingBookCreatePage() {
  const pageTitle = "Tambah Tutup Buku";

  return (
    <>
      <PageMeta title={pageTitle} />

      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[
          { label: "Daftar Akun", path: "../.." },
          { label: "Tutup Buku", path: ".." },
        ]}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <COAClosingBookCreate />
        </div>
      </div>
    </>
  );
}
