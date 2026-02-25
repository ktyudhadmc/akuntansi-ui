import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import CBJournalShow from "@modules/user/account/cash-bank/Journal/Action/Show";

export default function CBJournalShowPage() {
  const pageTitle = "Transaksi Bank";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Kas & Bank", path: "/user/accounts/cash-bank" }]}
      />

      <CBJournalShow />
    </>
  );
}
