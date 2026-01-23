import SearchInput from "@components/form/input/SearchInput";
import Select from "@components/form/default/Select";
import Button from "@components/ui/button/Button";

import { useDrawer } from "@hooks/useDrawer";
import { debounce } from "lodash";
import { useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
// import Filter from "./Filter";

import { categoryOptions } from "@modules/user/product/Action/select-options.constants";
import Unit from "@modules/user/product/Action/Unit";

interface Props {
  setSearchCallback: (param: string) => void;
  setCategoryCallback: (param: string) => void;
}

export default function TableHeader({
  setSearchCallback,
  setCategoryCallback,
}: Props) {
  const navigate = useNavigate();
  const { isExpanded, toggleDrawer, closeDrawer } = useDrawer();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchCallback(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  const debouncedCategory = useCallback(
    debounce((value: string) => {
      setCategoryCallback(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  return (
    <>
      {/* <Filter onOpen={isExpanded} onClose={closeDrawer} /> */}
      <Unit onOpen={isExpanded} onClose={closeDrawer} />

      <div className="flex lg:flex-row flex-col lg:justify-between gap-2">
        <div className="flex lg:flex-row flex-col gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate("create")}
          >
            <HiPlus />
            Tambah material baru
          </Button>

          <Button size="sm" variant="outline" onClick={toggleDrawer}>
            Atur satuan material
          </Button>
        </div>

        <div className="flex lg:flex-row flex-col gap-2">
          <Button size="sm" variant="outline">
            Impor
          </Button>

          <Select
            placeholder="--- Semua Kategori ---"
            options={categoryOptions}
            onChange={(e) => debouncedCategory(e)}
          />

          <div className="flex gap-2">
            <div className="w-full">
              <SearchInput
                placeholder="Cari"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>

            {/* <Button size="sm" variant="outline" onClick={toggleDrawer}>
              <HiOutlineFilter />
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}
