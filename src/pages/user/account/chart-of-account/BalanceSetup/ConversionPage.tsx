import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import COABalanceConversion from "@modules/user/account/chart-of-account/Action/BalanceConversion";

export default function COABalanceConversionPage() {
  const pageTitle = "Konversi Saldo Awal";
  return (
    <>
      <PageMeta title={pageTitle} />

      <PageBreadcrumb
        pageTitle={pageTitle}
        breadcrumbs={[{ label: "Daftar Akun", path: ".." }]}
      />

      <COABalanceConversion />
    </>
  );
}
