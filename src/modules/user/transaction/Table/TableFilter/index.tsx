import FilterInput from "@components/form/input/FilterInput";

import Button from "@components/ui/button/Button";

import useUserStore from "@store/useUserStore";

import { HiOutlineFilter } from "react-icons/hi";
import Filter from "./Filter";
import { useDrawer } from "@hooks/useDrawer";
import { useDebouncedCallback } from "@hooks/useDebounceCallback";

interface Props {
  setSearch: (param: string) => void;
}

export default function TableFilter({ setSearch }: Props) {
  const transactionDate = useUserStore((state) => state.transactionDate);
  const setTransactionDate = useUserStore((state) => state.setTransactionDate);

  const { isExpanded, toggleDrawer, closeDrawer } = useDrawer();
  const debouncedSearch = useDebouncedCallback(setSearch, 500);

  return (
    <>
      <Filter onOpen={isExpanded} onClose={closeDrawer} />

      <div className="flex lg:flex-row flex-col gap-2 justify-between">
        <div className="flex lg:flex-row flex-col gap-2">
          <FilterInput
            name="date"
            type="month"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />

          <Button size="sm" variant="outline" onClick={toggleDrawer}>
            <HiOutlineFilter />
          </Button>
        </div>

        <div>
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
