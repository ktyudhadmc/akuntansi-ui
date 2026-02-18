import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import PeriodLockPreview from "@modules/user/period/actions/period/Action/Preview";

export default function PeriodLockPreviewPage() {
  const pageTitle = "Kunci Periode - Kertas Kerja Neraca Saldo";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="space-y-6">
        <PeriodLockPreview />
      </div>
    </>
  );
}
