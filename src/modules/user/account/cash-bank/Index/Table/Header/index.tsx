import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { AiFillCaretDown } from "react-icons/ai";
import { useCallback, useState } from "react";

import Button from "@components/ui/button/Button";
import SearchInput from "@components/form/input/SearchInput";
import { Dropdown, DropdownItem } from "@components/ui/dropdown";

interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableHeader({ setSearchCallback }: Props) {
  const navigate = useNavigate();
  const [isOpenDropown, setIsOpenDropdown] = useState(false);
  function toggleDropdown() {
    setIsOpenDropdown(!isOpenDropown);
  }

  function closeDropdown() {
    setIsOpenDropdown(false);
  }

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
        <div className="relative">
          <Button size="sm" onClick={toggleDropdown}>
            <span>Buat transaksi</span>
            <AiFillCaretDown />
          </Button>

          <Dropdown isOpen={isOpenDropown} onClose={closeDropdown}>
            {/* <div className=" px-2 pt-2 text-sm uppercase text-gray-400 font-light">
              Akun
            </div>
            <DropdownItem onItemClick={() => navigate("create")}>
              Buat akun baru
            </DropdownItem> */}

            {/* <span className=" px-2 pt-2 text-sm uppercase text-gray-400 font-light">
              Transaksi
            </span> */}

            <DropdownItem>Transfer uang</DropdownItem>
            <DropdownItem>Terima uang</DropdownItem>
            <DropdownItem>Kirim uang</DropdownItem>
          </Dropdown>
        </div>
        <div className="flex flex-row flex-col justify-between gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("import")}
          >
            Impor
          </Button>

          {/* Search */}
          <div className="w-full">
            <SearchInput
              placeholder="Cari"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
