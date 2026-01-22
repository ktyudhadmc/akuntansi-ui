import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";

// import Button from "@components/ui/button/Button";
// import { MdPerson } from "react-icons/md";

import SupplierTable from "@modules/user/contact/supplier/Table";
// import useUserStore from "@store/useUserStore";
import CustomerTable from "@modules/user/contact/customer/Table";
import { useNavigate } from "react-router-dom";
import TabsNav from "@components/ui/tabs";

export default function ContactPage() {
  const pageTitle = "Kontak";

  const navigate = useNavigate();
  const activeTabContact =
    location.hash === "#supplier"
      ? "supplier"
      : location.hash === "#customer"
        ? "customer"
        : "customer";

  const tabs = [
    { value: "customer", label: "Pelanggan" },
    { value: "supplier", label: "Supplier" },
  ];

  // const activeTabContact = useUserStore((state) => state.activeTabContact);
  // const setActiveTabContact = useUserStore(
  //   (state) => state.setActiveTabContact
  // );

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {/* <div className="flex lg:flex-row flex-col lg:justify-between gap-4">
            <div className="flex items-start">
              <Button
                variant={activeTabContact == "customer" ? "primary" : "outline"}
                size="sm"
                className="rounded-r-none !ring-0 w-full transition"
                onClick={() => {
                  // setActiveTabContact("customer");
                  navigate("#customer");
                }}
              >
                <MdPerson /> Pelanggan
              </Button>
              <Button
                variant={activeTabContact == "supplier" ? "primary" : "outline"}
                size="sm"
                className="rounded-l-none !ring-0 w-full transition"
                onClick={() => {
                  // setActiveTabContact("supplier");
                  navigate("#supplier");
                }}
              >
                <MdPerson />
                Supplier
              </Button>
            </div>
          </div> */}

          <TabsNav
            tabs={tabs}
            initialActive={activeTabContact ?? "customer"}
            onChange={(e) => navigate(`#${e}`)}
          />

          {activeTabContact == "supplier" ? (
            <SupplierTable />
          ) : (
            <CustomerTable />
          )}
        </div>
      </div>
    </>
  );
}
