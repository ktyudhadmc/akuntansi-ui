import { useNavigate } from "react-router-dom";
import Button from "@components/ui/button/Button";
import TableHeaderCard from "./HeaderCard";

import debounce from "lodash/debounce";
import { useCallback } from "react";
import SearchInput from "@components/form/input/SearchInput";
import { HiPlus } from "react-icons/hi";

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
      {/* card */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <TableHeaderCard
          title="Total saldo awal"
          count={0}
          amount={0}
          variant="income"
        />
        <TableHeaderCard
          title="Total pembelian"
          count={0}
          amount={0}
          variant="income"
        />

        <TableHeaderCard
          title="Total pemakaian"
          count={0}
          amount={0}
          variant="outcome"
        />
        <TableHeaderCard title="Total stok opname" count={0} amount={0} />
      </div>

      {/* Create */}
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <Button size="sm" variant="primary" onClick={() => navigate("create")}>
          <HiPlus />
          Tambah persediaan
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
