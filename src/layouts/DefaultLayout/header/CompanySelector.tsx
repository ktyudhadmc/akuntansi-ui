import Select from "@components/form/default/Select";
import useMapInputOptions from "@hooks/useMapInputOptions";
import useGetAllCompany from "@services/global/company/hooks/useGetAll";

import { setStorageCompany } from "@helpers/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Skeleton from "@components/Skeleton/Skeleton";

export default function CompanySelector() {
  const navigate = useNavigate();

  const { data, loading } = useGetAllCompany();
  const companyOptions = useMapInputOptions(data);

  const handleSelectCompany = (companyId: string) => {
    setStorageCompany(companyId);
    toast.success("Berhasil memilih perusahaan");
    navigate("/user/dashboard");
  };

  return (
    <Skeleton isLoading={loading}>
      <Select
        className="w-xs"
        options={companyOptions}
        onChange={(e) => handleSelectCompany(e)}
      />
    </Skeleton>
  );
}
