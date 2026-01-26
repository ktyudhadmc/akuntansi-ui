import debounce from "lodash/debounce";
import { useCallback } from "react";
import SearchInput from "@components/form/input/SearchInput";
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
          defaultDate={new Date()}
          onChange={(e) => console.log(e)}
          required
        /> */}
        <SearchInput
          type="month"
          onChange={(e) => {
            const value = e.target.value;
            const [year, month] = value.split("-");

            console.log({
              year: Number(year),
              month: Number(month),
            });
          }}
        />
        {/* Search */}
        <SearchInput
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </>
  );
}
