import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { AiFillCaretDown } from "react-icons/ai";
import { useCallback, useState } from "react";

import Button from "@components/ui/button/Button";
import FilterInput from "@components/form/input/FilterInput";
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
          <Button
            size="sm"
            onClick={toggleDropdown}
            className="dropdown-toggle lg:w-auto w-full"
          >
            <span>Buat Transaksi</span>
            <AiFillCaretDown
              className={` transition-transform duration-200 ${isOpenDropown ? "rotate-180" : ""}`}
            />
          </Button>

          <Dropdown
            isOpen={isOpenDropown}
            onClose={closeDropdown}
            className="lg:w-auto w-full"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              onClick={() => navigate("transfer")}
              className="w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Transfer uang
            </DropdownItem>

            <DropdownItem className=" w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
              Terima uang
            </DropdownItem>

            <DropdownItem className=" w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
              Kirim uang
            </DropdownItem>
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
            <FilterInput
              withPrefixIcon
              placeholder="Cari"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
