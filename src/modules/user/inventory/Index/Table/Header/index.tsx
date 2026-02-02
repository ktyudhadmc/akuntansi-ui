import { useCallback } from "react";
import debounce from "lodash/debounce";

import { formatMonthValue, parseMonthValue } from "@helpers/index";
import { sourceTypeOptions } from "@modules/user/inventory/options.constants";

import SearchInput from "@components/form/input/SearchInput";
import Select from "@components/form/default/Select";
// import DatePicker from "@components/form/default/DatePicker";

interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableHeader({ setSearchCallback }: Props) {
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
        {/* <DatePicker
          mode="month"
          id="period_date"
          name="period_date"
          defaultValue={new Date()}
          onChange={(e) => console.log(e)}
          required
        /> */}
        <div className="flex md:flex-row flex-col gap-4">
          <SearchInput
            type="month"
            defaultValue={formatMonthValue()}
            onChange={(e) => {
              console.log(parseMonthValue(e.target.value));
            }}
          />

          <Select
            placeholder="--- Semua Sumber Persediaan ---"
            options={sourceTypeOptions}
            onChange={(e) => console.log(e)}
          />
        </div>

        {/* Search */}
        <SearchInput
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </>
  );
}
