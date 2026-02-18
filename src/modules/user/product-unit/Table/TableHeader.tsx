import FilterInput from "@components/form/input/FilterInput";
import Button from "@components/ui/button/Button";

import { debounce } from "lodash";
import { useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import ProductUnitCreate from "../Action/Create";
import { useModal } from "@hooks/useModal";

interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableHeader({ setSearchCallback }: Props) {
  const { isOpen, closeModal, toggleModal } = useModal();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchCallback(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  return (
    <>
      <ProductUnitCreate onOpen={isOpen} onClose={closeModal} />

      <div className="flex lg:flex-row flex-col lg:justify-between gap-2">
        <Button size="sm" onClick={toggleModal}>
          <HiPlus /> Tambah satuan
        </Button>
        <div className="flex lg:flex-row flex-col gap-2">
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
