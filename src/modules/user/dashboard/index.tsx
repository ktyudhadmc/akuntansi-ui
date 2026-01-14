// import Button from "@components/ui/button/Button";
// import { useSetCurrentCompany } from "@services/auth/hooks/useSetCurrentCompany";
// import { useUnsetCurrentCompany } from "@services/auth/hooks/useUnsetCurrentCompany";
// import useGlobalStore from "@store/useStore";

export default function Dashboard() {
  // const { setCompany } = useSetCurrentCompany();
  // const { unsetCompany } = useUnsetCurrentCompany();
  // const currentCompany = useGlobalStore((state) => state.currentCompany);
  // const isSelectCompany = useGlobalStore((state) => state.isSelectCompany);

  return (
    <div>
      <h1 className="text-gray-500 dark:text-gray-400">Dashboard, It Works!</h1>
      {/* <p>{currentCompany?.id}</p>
      <p>{currentCompany?.code}</p>
      <p>{currentCompany?.name}</p>
      <p>{currentCompany?.email}</p>
      <p>{currentCompany?.phone}</p>
      <p>{currentCompany?.address}</p>

      <p>select: {isSelectCompany? "true": "false"}</p>
      <Button onClick={() => setCompany("1")}>Company 1</Button>
      <Button onClick={() => unsetCompany()} variant="outline">
        Unset
      </Button> */}
    </div>
  );
}
