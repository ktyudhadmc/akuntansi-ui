import { useCallback, useState } from "react";
import {
  AiFillCaretDown,
  AiOutlineBook,
  AiOutlineDownload,
  AiOutlineFileExcel,
  AiOutlineSetting,
} from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

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
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <div className="flex lg:flex-row flex-col gap-4">
          <Button size="sm" onClick={() => navigate("create")}>
            <HiPlus />
            <span>Buat akun baru</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/user/journals/create")}
          >
            <HiPlus />
            <span>Buat jurnal umum</span>
          </Button>
        </div>

        {/* Search */}
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="relative">
            <Button
              size="sm"
              onClick={toggleDropdown}
              className="lg:w-auto w-full"
            >
              <span>Tindakan</span>
              <AiFillCaretDown />
            </Button>

            <Dropdown
              isOpen={isOpenDropown}
              onClose={closeDropdown}
              className="lg:w-auto w-full"
            >
              <DropdownItem className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                <AiOutlineSetting className="text-base" /> Pengaturan Akun
              </DropdownItem>

              <DropdownItem
                className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                onClick={() => navigate("balance-setup")}
              >
                <AiOutlineBook className="text-base" /> Atur saldo awal
              </DropdownItem>
              <hr className="my-1 mx-2" />
              <DropdownItem
                className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                onClick={() => navigate("../../periods")}
              >
                <AiOutlineBook className="text-base" /> Tutup buku & kunci
                periode
              </DropdownItem>
              <hr className="my-1 mx-2" />
              <DropdownItem className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                <AiOutlineFileExcel className="text-base" /> Impor jurnal umum
              </DropdownItem>
              <DropdownItem className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                <AiOutlineDownload className="text-base" /> Ekspor akun
              </DropdownItem>
            </Dropdown>
          </div>

          <SearchInput
            placeholder="Cari"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
