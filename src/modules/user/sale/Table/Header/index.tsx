import { useNavigate } from "react-router-dom";
import Button from "@components/ui/button/Button";

import FilterInput from "@components/form/input/FilterInput";
import Filter from "./Filter";
import { useDrawer } from "@hooks/useDrawer";
import { HiOutlineFilter, HiPlus } from "react-icons/hi";
import { useDebouncedCallback } from "@hooks/useDebounceCallback";
import useUserStore from "@store/useUserStore";

interface Props {
  setSearch: (param: string) => void;
}

export default function TableFilter({ setSearch }: Props) {
  const navigate = useNavigate();
  const { isExpanded, toggleDrawer, closeDrawer } = useDrawer();
  // const [isOpenDropown, setIsOpenDropdown] = useState(false);
  // function toggleDropdown() {
  //   setIsOpenDropdown(!isOpenDropown);
  // }

  // function closeDropdown() {
  //   setIsOpenDropdown(false);
  // }

  const saleDate = useUserStore((state) => state.saleDate);
  const setSaleDate = useUserStore((state) => state.setSaleDate);

  const debouncedSearch = useDebouncedCallback(setSearch, 500);

  return (
    <>
      <Filter onOpen={isExpanded} onClose={closeDrawer} />
      {/* Create */}
      <div className="flex lg:flex-row flex-col justify-between gap-2">
        {/* Button create with detail */}
        {/* <div className="relative">
          <Button size="sm" onClick={toggleDropdown}>
            <span>Buat pembelian baru</span>
            <AiFillCaretDown />
          </Button>

          <Dropdown isOpen={isOpenDropown} onClose={closeDropdown}>
            <DropdownItem onClick={() => navigate("create")}>
              Pembelian
            </DropdownItem>
            <DropdownItem>Pengiriman</DropdownItem>
            <DropdownItem>Pesanan</DropdownItem>
            <DropdownItem>Penawaran</DropdownItem>
          </Dropdown>
        </div> */}

        <div className="flex lg:flex-row flex-col gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate("create")}
            className="whitespace-nowrap"
          >
            <HiPlus />
            Buat penjualan baru
          </Button>

          <div className="flex gap-2">
            <div className="w-full">
              <FilterInput
                name="date"
                type="month"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
              />
            </div>
            <Button size="sm" variant="outline" onClick={toggleDrawer}>
              <HiOutlineFilter />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex lg:flex-row flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("import")}
          >
            Impor
          </Button>

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
