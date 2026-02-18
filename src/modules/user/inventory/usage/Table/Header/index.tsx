import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import debounce from "lodash/debounce";

import { formatMonthValue, parseMonthValue } from "@helpers/index";

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
      {/* Create */}
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <Button
          size="sm"
          variant="primary"
          onClick={() => navigate("usages/create")}
        >
          <HiPlus />
          Buat pemakaian
        </Button>
        <div className="flex gap-4">
          <FilterInput
            type="month"
            defaultValue={formatMonthValue()}
            onChange={(e) => {
              console.log(parseMonthValue(e.target.value));
            }}
          />
          {/* Search */}
          <FilterInput
            withPrefixIcon
            placeholder="Cari"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
