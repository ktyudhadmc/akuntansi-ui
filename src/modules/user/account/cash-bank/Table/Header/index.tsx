// import { useNavigate } from "react-router-dom";
import Button from "@components/ui/button/Button";
// import TableHeaderCard from "./HeaderCard";
import { Dropdown, DropdownItem } from "@components/ui/dropdown";

import debounce from "lodash/debounce";
import { AiFillCaretDown, AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineClockCircle, AiOutlineWallet } from "react-icons/ai";
import { useCallback, useState } from "react";
import SearchInput from "@components/form/input/SearchInput";
import CardStatistic from "@components/ui/card/CardStatistic";
import { formatIDRLocale } from "@helpers/currency";


interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableHeader({ setSearchCallback }: Props) {
  // const navigate = useNavigate();
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
      {/* card */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {/* <TableHeaderCard
          title="Pemasukan 30 hari mendatang"
          count={0}
          amount={0}
          variant="income"
        />

        <TableHeaderCard
          title="Pengeluaran 30 hari mendatang"
          count={0}
          amount={0}
          variant="outcome"
        />
        <TableHeaderCard title="Saldo kas & bank" count={0} amount={0} />
        <TableHeaderCard title="Saldo kartu kredit" count={0} amount={0} /> */}

        <CardStatistic
          title="Pemasukan"
          value={formatIDRLocale(0, { withSymbol: true })}
          variant="success"
          icon={<AiOutlineArrowUp />}
        />

        <CardStatistic
          title="Pengeluaran"
          value={formatIDRLocale(0, { withSymbol: true })}
          variant="danger"
          icon={<AiOutlineArrowDown />}
        />

        <CardStatistic
          title="Saldo kas & bank"
          value={formatIDRLocale(0, { withSymbol: true })}
          variant="warning"
          icon={<AiOutlineClockCircle />}
        />

        <CardStatistic
          title="Saldo kartu kredit"
          value={formatIDRLocale(0, { withSymbol: true })}
          variant="brand"
          icon={<AiOutlineWallet />}
        />
      </div>

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

        {/* Search */}
        <SearchInput
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </>
  );
}
