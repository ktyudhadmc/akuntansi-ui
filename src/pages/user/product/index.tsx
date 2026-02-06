import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import ProductHeader from "@modules/user/product/Header";
import ProductTable from "@modules/user/product/Table";

export default function ProductPage() {
  const pageTitle = "Material";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="space-y-6">
        <ProductHeader />
        
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="space-y-6">
            {/* <h4>Halaman Produk, It Works!</h4> */}
            <ProductTable />
          </div>
        </div>
      </div>
    </>
  );
}
