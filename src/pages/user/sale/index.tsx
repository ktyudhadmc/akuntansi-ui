import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
// import { TabDefault } from "@components/ui/tabs";
import SaleHeader from "@modules/user/sale/Header";
import SaleTable from "@modules/user/sale/Table";

export default function SalePage() {
  const pageTitle = "Penjualan";

  // const tabs = [
  //   { value: "invoice", label: "Penagihan" },
  //   { value: "delivery", label: "Pengiriman" },
  //   { value: "order", label: "Pesanan" },
  //   { value: "quote", label: "Penawaran" },
  //   { value: "approval", label: "Membutuhkan Persetujuan" },
  // ];

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />
      <div className="space-y-6">
        {/* header */}
        <SaleHeader />

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="space-y-6">
            {/* tabs */}
            {/* <TabDefault
            tabs={tabs}
            initialActive="invoice"
            onChange={(e) => console.log(e)}
          /> */}

            {/* sale */}
            <SaleTable />
          </div>
        </div>
      </div>
    </>
  );
}
