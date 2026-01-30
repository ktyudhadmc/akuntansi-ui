import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import debounce from "lodash/debounce";

import SearchInput from "@components/form/input/SearchInput";
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
        <SearchInput
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </>
  );
}
