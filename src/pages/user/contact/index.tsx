import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";

// import Button from "@components/ui/button/Button";
// import { MdPerson } from "react-icons/md";

import SupplierTable from "@modules/user/contact/supplier/Table";
// import useUserStore from "@store/useUserStore";
import CustomerTable from "@modules/user/contact/customer/Table";
import { useSearchParams } from "react-router-dom";
import { TabUnderline } from "@components/ui/tabs";
import { AiOutlineUser } from "react-icons/ai";

export default function ContactPage() {
  const pageTitle = "Kontak";

  const tabs = [
    { value: "customer", label: "Pelanggan", icon: <AiOutlineUser /> },
    { value: "supplier", label: "Supplier", icon: <AiOutlineUser /> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? tabs[0].value;

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {/* tabs */}
          <TabUnderline
            tabs={tabs}
            initialActive={activeTab}
            onChange={(e) => setSearchParams({ tab: e })}
          />

          {activeTab == "supplier" ? <SupplierTable /> : <CustomerTable />}
        </div>
      </div>
    </>
  );
}
