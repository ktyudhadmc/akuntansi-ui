import { useNavigate } from "react-router-dom";
import Button from "@components/ui/button/Button";

import { Dropdown, DropdownItem } from "@components/ui/dropdown";

import debounce from "lodash/debounce";
import { AiFillCaretDown } from "react-icons/ai";
import { useCallback, useState } from "react";
import SearchInput from "@components/form/input/SearchInput";
import Filter from "./Filter";
import { useDrawer } from "@hooks/useDrawer";
import { HiOutlineFilter } from "react-icons/hi";

interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableHeader({ setSearchCallback }: Props) {
  const navigate = useNavigate();
  const { isExpanded, toggleDrawer, closeDrawer } = useDrawer();
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
      <Filter onOpen={isExpanded} onClose={closeDrawer} />
      {/* Create */}
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <div className="relative">
          <Button size="sm" onClick={toggleDropdown}>
            <span>Buat pembelian baru</span>
            <AiFillCaretDown />
          </Button>

          <Dropdown isOpen={isOpenDropown} onClose={closeDropdown}>
            <div className=" px-2 pt-2 text-sm uppercase text-gray-400 font-light">
              Akun
            </div>
            <DropdownItem onItemClick={() => navigate("create")}>
              Buat akun baru
            </DropdownItem>

            <span className=" px-2 pt-2 text-sm uppercase text-gray-400 font-light">
              Transaksi
            </span>

            <DropdownItem>Transfer uang</DropdownItem>
            <DropdownItem>Terima uang</DropdownItem>
            <DropdownItem>Kirim uang</DropdownItem>
          </Dropdown>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="w-full">
            <SearchInput
              placeholder="Cari"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <Button size="sm" variant="outline" onClick={toggleDrawer}>
            <HiOutlineFilter />
          </Button>
        </div>
      </div>
    </>
  );
}
