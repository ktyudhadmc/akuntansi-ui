import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import ProfileMetaCard from "@modules/user/profile/ProfileMetaCard";
import ProfileInfoCard from "@modules/user/profile/ProfileInfoCard";
// import ProfileAddressCard from "@modules/user/profile/ProfileAddressCard";

export default function ProfilePage() {
  const pageTitle = "Profil";
  return (
    <>
      <PageMeta title={pageTitle} />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profil
        </h3>
        <div className="space-y-6">
          <ProfileMetaCard />
          <ProfileInfoCard />
          {/* <ProfileAddressCard /> */}
        </div>
      </div>
    </>
  );
}
