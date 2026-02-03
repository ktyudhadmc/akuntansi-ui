import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
// import { TabDefault } from "@components/ui/tabs";
import PurchaseHeader from "@modules/user/purchase/Header";
import PurchaseTable from "@modules/user/purchase/Table";

export default function PurchasePage() {
  const pageTitle = "Pembelian";

  // const tabs = [
  //   { value: "purchase", label: "Pembelian" },
  //   { value: "delivery", label: "Pengiriman" },
  //   { value: "order", label: "Pesanan" },
  //   { value: "quote", label: "Penawaran" },
  //   { value: "request", label: "Permintaan" },
  //   { value: "approval", label: "Membutuhkan Persetujuan" },
  // ];

  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {/* header */}
          <PurchaseHeader />

          {/* tabs */}
          {/* <TabDefault
            tabs={tabs}
            initialActive="order"
            onChange={(e) => console.log(e)}
          /> */}

          {/* purchase */}
          <PurchaseTable />
        </div>
      </div>
    </>
  );
}
