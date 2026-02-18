import FilterInput from "@components/form/input/FilterInput";
import Button from "@components/ui/button/Button";
import { debounce } from "lodash";
import { useCallback } from "react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableAction({ setSearchCallback }: Props) {
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchCallback(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between gap-2">
      <Button
        size="sm"
        variant="primary"
        onClick={() => navigate("create?tab=customer")}
      >
        <HiPlus />
        Buat kontak pelanggan
      </Button>
      <div className="flex lg:flex-row flex-col gap-2">
        <Button size="sm" variant="outline">
          Impor
        </Button>

        <div className="w-full">
          <FilterInput
            withPrefixIcon
            placeholder="Cari"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
