import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import ProductHeader from "@modules/user/product/Header";

export default function ProductPage() {
  const pageTitle = "Produk";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <ProductHeader />

          <h4>Halaman Produk, It Works!</h4>
        </div>
      </div>
    </>
  );
}
