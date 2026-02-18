import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import debounce from "lodash/debounce";

import FilterInput from "@components/form/input/FilterInput";
import Button from "@components/ui/button/Button";

interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableHeader({ setSearchCallback }: Props) {
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchCallback(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between gap-4">
        {/* Create */}
        <Button size="sm" variant="primary" onClick={() => navigate("create")}>
          <HiPlus />
          Buat pajak baru
        </Button>

        {/* Search */}
        <FilterInput
          withPrefixIcon
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </>
  );
}
