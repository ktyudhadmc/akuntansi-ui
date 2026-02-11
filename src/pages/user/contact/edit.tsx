import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import EditCustomer from "@modules/user/contact/customer/Action/Edit";
import EditSupplier from "@modules/user/contact/supplier/Action/Edit";
import { useSearchParams } from "react-router-dom";

export default function EditContactPage() {
  const pageTitle = "Ubah Kontak";

  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {activeTab == "supplier" ? <EditSupplier /> : <EditCustomer />}
        </div>
      </div>
    </>
  );
}
