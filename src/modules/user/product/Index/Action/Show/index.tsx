import { AiFillCaretDown } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import { Dropdown, DropdownItem } from "@components/ui/dropdown";
import { useDropdown } from "@hooks/useDropdown";
import useGetProduct from "@services/user/product/index/hooks/useGet";

import { formatIDRLocale } from "@helpers/currency";
import { MdOutlineSell, MdOutlineShoppingCart } from "react-icons/md";
import { HiChevronLeft } from "react-icons/hi";
import useGoBack from "@hooks/useGoBack";

export default function ProductShow() {
  const goBack = useGoBack();
  const navigate = useNavigate();
  const params = useParams();
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

  const { data, loading } = useGetProduct(params.id as string);

  const INFO_ITEMS = [
    {
      icon: <MdOutlineShoppingCart size={24} className="text-brand-600" />,
      title: "Info Pembelian",
      fields: [
        {
          label: "Harga beli satuan",
          value: formatIDRLocale(0, { withSymbol: true }),
        },
        { label: "Akun pembelian", value: "Beban Pokok Pendapatan" },
        { label: "Pajak beli", value: "-" },
      ],
    },
    {
      icon: <MdOutlineSell size={24} className="text-brand-600" />,
      title: "Info Penjualan",
      fields: [
        {
          label: "Harga jual satuan",
          value: formatIDRLocale(0, { withSymbol: true }),
        },
        { label: "Akun penjualan", value: "Pendapatan" },
        { label: "Pajak jual", value: "-" },
      ],
    },
  ];

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-2 lg:justify-between lg:items-center">
        <div className="lg:w-48 w-full">
          <Skeleton isLoading={loading} height="1.2rem" width="50%">
            <span className="text-gray-500 text-theme-sm dark:text-gray-400">
              {data?.code}
            </span>
          </Skeleton>
          <Skeleton isLoading={loading} height="1.7rem">
            <h5 className="dark:text-white font-semibold text-lg">
              {data?.name}
            </h5>
          </Skeleton>
        </div>

        <div className="flex lg:flex-row flex-col gap-4">
          <Button
            onClick={goBack}
            size="sm"
            variant="outline"
            className="group items-center !gap-0 overflow-hidden"
          >
            <HiChevronLeft className="shrink-0 mx-auto" size={20} />

            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[100px]">
              Kembali
            </span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="lg:w-auto w-full"
            onClick={() => navigate(`edit`)}
          >
            Ubah
          </Button>

          <div className="relative">
            <Button
              size="sm"
              onClick={toggleDropdown}
              className="dropdown-toggle lg:w-auto w-full"
            >
              <span>Tindakan</span>
              <AiFillCaretDown
                className={` transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>

            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="absolute right-0 lg:w-auto w-full  flex flex-col rounded border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
            >
              <ul className="flex flex-col gap-1 border-gray-200 dark:border-gray-800 w-fit w-full">
                <li>
                  <DropdownItem
                    onItemClick={closeDropdown}
                    onClick={() => alert("tes")}
                    className="flex !py-2 font-medium text-gray-700 rounded-lg group text-theme-xs capitalize hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <span className="ml-2 line-clamp-2 min-w-40 max-w-xs">
                      Lihat tingkat pemenuhan pemasanan
                    </span>
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    onItemClick={closeDropdown}
                    onClick={() => alert("tes")}
                    className="flex !text-center !py-2 font-medium text-gray-700 rounded-lg group text-theme-xs capitalize hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <span className="ml-2"> Arsipkan</span>
                  </DropdownItem>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* <hr className="border dark:border-gray-800" /> */}

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {INFO_ITEMS.map(({ icon, title, fields }) => (
          <div
            key={title}
            className="p-5 border border-gray-200 lg:rounded-2xl rounded-xl dark:border-gray-800 lg:p-6"
          >
            <div className="flex items-center mb-6 gap-4">
              {icon}
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {title}
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              {fields.map(({ label, value }) => (
                <div key={label}>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
