import PageMeta from "@components/common/PageMeta";
import Dashboard from "@modules/user/dashboard";

export default function DashboardPage() {
  return (
    <>
      <div>
        <PageMeta
          title="Dashboard"
          description="Halaman dashboard dari Akuntansi "
        />
        <Dashboard />
      </div>
    </>
  );
}
