import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import CreateCustomer from "@modules/user/contact/customer/Action/Create";
import CreateContact from "@modules/user/contact/supplier/Action/Create";
// import useUserStore from "@store/useUserStore";

export default function CreateContactPage() {
  const pageTitle = "Kontak";

  const activeTabContact =
    location.hash === "#supplier"
      ? "supplier"
      : location.hash === "#customer"
      ? "customer"
      : "karyawan";

  // const activeTabContact = useUserStore((state) => state.activeTabContact);
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {activeTabContact == "supplier" ? (
            <CreateContact />
          ) : (
            <CreateCustomer />
          )}
        </div>
      </div>
    </>
  );
}
