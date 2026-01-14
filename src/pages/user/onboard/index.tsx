import PageMeta from "@components/common/PageMeta";
import OnBoard from "@modules/user/onboard";

export default function OnBoardPage() {
  return (
    <>
      <div>
        <PageMeta title="Daftar Perusahaan" />
        <OnBoard />
      </div>
    </>
  );
}
