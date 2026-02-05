import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import { TabUnderline } from "@components/ui/tabs";
import { useTabs } from "@hooks/useTabs";
import CBBankStatementTable from "@modules/user/account/cash-bank/BankStatement/Table/index";
import CBShow from "@modules/user/account/cash-bank/Index/Action/Show";
import CBShowJournalTable from "@modules/user/account/cash-bank/Journal/Table";

export default function CBShowPage() {
  const pageTitle = "Kas & Bank";

  const tabs = [
    { value: "journal", label: "Transaksi Jurnal" },
    { value: "bank-statement", label: "Rekening Koran" },
    // { value: "reconcile", label: "Rekonsiliasi" },
    // { value: "cash_coding", label: "Pemetaan Kas" },
  ];

  const { activeTab, setTab, tabs: tabItems } = useTabs(tabs, "journal");
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 lg:mb-8 mb-6">
        <div className="space-y-6">
          {/* detail akun */}
          <CBShow />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {/* tabs */}
          <TabUnderline
            tabs={[...tabItems]}
            initialActive={activeTab}
            onChange={setTab}
          />

          {activeTab == "journal" && <CBShowJournalTable />}
          {activeTab == "bank-statement" && <CBBankStatementTable />}
        </div>
      </div>
    </>
  );
}
