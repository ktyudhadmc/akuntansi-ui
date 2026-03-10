import { useCallback } from "react";
import {
  AiFillCaretDown,
  AiOutlineBook,
  AiOutlineDownload,
  AiOutlineFileExcel,
  AiOutlineSetting,
} from "react-icons/ai";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import Button from "@components/ui/button/Button";
import FilterInput from "@components/form/input/FilterInput";
import { Dropdown, DropdownItem } from "@components/ui/dropdown";
import { isEmpty } from "lodash";
import { useModal } from "@hooks/useModal";
import { useDropdown } from "@hooks/useDropdown";
import COABulkDelete from "../Action/BulkDelete";
import { useDebouncedCallback } from "@hooks/useDebounceCallback";

interface Props {
  setSearchCallback: (param: string) => void;
  selectedIds: (number | string)[];
}

export default function TableFilter({ setSearchCallback, selectedIds }: Props) {
  const navigate = useNavigate();
  const { isOpen: isOpenModal, closeModal, openModal } = useModal();

  const {
    isOpen: isOpenActionDropdown,
    toggleDropdown: openActionDropdown,
    closeDropdown: closeActionDropdown,
  } = useDropdown();

  const {
    isOpen: isOpenCrudDropdown,
    toggleDropdown: openCrudDropdown,
    closeDropdown: closeCrudDropdown,
  } = useDropdown();

  const handleNavigateCreate = useCallback(
    () => navigate("create"),
    [navigate],
  );
  const handleNavigateJournal = useCallback(
    () => navigate("/user/journals/create"),
    [navigate],
  );

  const debouncedSearch = useDebouncedCallback(setSearchCallback, 500);

  return (
    <>
      <COABulkDelete
        onOpen={isOpenModal}
        onClose={closeModal}
        selectedIds={selectedIds}
      />

      {/* Create */}
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <div className="flex lg:flex-row flex-col gap-4">
          <Button size="sm" onClick={handleNavigateCreate}>
            <HiPlus />
            <span>Buat akun baru</span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleNavigateJournal}>
            <HiPlus />
            <span>Buat jurnal umum</span>
          </Button>

          {!isEmpty(selectedIds) && (
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                onClick={openCrudDropdown}
                className="dropdown-toggle lg:w-auto w-full"
              >
                <span>Aksi</span>
                <AiFillCaretDown
                  className={` transition-transform duration-200 ${isOpenCrudDropdown ? "rotate-180" : ""}`}
                />
              </Button>

              <Dropdown
                isOpen={isOpenCrudDropdown}
                onClose={closeCrudDropdown}
                className="absolute left-0 flex flex-col rounded border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
              >
                <ul className="flex flex-col gap-1 border-gray-200 dark:border-gray-800">
                  {/* hanya boleh 1 id saja cmiww :V */}
                  {selectedIds.length === 1 && (
                    <li>
                      <DropdownItem
                        onItemClick={closeCrudDropdown}
                        onClick={() =>
                          navigate(`${selectedIds[0].toString()}/edit`)
                        }
                        className="flex !text-center !py-2 font-medium text-gray-700 rounded-lg group text-theme-xs capitalize hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <HiOutlinePencil className="my-auto" />
                        <span className="ml-2"> Ubah</span>
                      </DropdownItem>
                    </li>
                  )}

                  <li>
                    <DropdownItem
                      onItemClick={closeCrudDropdown}
                      onClick={openModal}
                      className="flex !text-center !py-2 font-medium text-gray-700 rounded-lg group text-theme-xs capitalize hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      <HiOutlineTrash className="my-auto" />
                      <span className="ml-2"> Hapus</span>
                    </DropdownItem>
                  </li>
                </ul>
              </Dropdown>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="relative">
            <Button
              size="sm"
              onClick={openActionDropdown}
              className="dropdown-toggle lg:w-auto w-full"
            >
              <span>Tindakan</span>
              <AiFillCaretDown />
            </Button>

            <Dropdown
              isOpen={isOpenActionDropdown}
              onClose={closeActionDropdown}
              className="lg:w-auto w-full"
            >
              <DropdownItem
                onItemClick={closeActionDropdown}
                className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AiOutlineSetting className="text-base" /> Pengaturan Akun
              </DropdownItem>

              <DropdownItem
                onItemClick={closeActionDropdown}
                onClick={() => navigate("balance-setup")}
                className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AiOutlineBook className="text-base" /> Atur saldo awal
              </DropdownItem>
              <hr className="my-1 mx-2 border-t dark:border-gray-400" />
              <DropdownItem
                onItemClick={closeActionDropdown}
                onClick={() => navigate("../../periods")}
                className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AiOutlineBook className="text-base" /> Tutup buku & kunci
                periode
              </DropdownItem>
              <hr className="my-1 mx-2 border-t dark:border-gray-400" />
              <DropdownItem
                onItemClick={closeActionDropdown}
                onClick={() => navigate("../../journals/import")}
                className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AiOutlineFileExcel className="text-base" /> Impor jurnal umum
              </DropdownItem>
              <DropdownItem
                onItemClick={closeActionDropdown}
                className="flex gap-2 w-full whitespace-nowrap items-center dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AiOutlineDownload className="text-base" /> Ekspor akun
              </DropdownItem>
            </Dropdown>
          </div>

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
