import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import useUserStore from "@store/useUserStore";
import { todayYMDString, todayYMString } from "@helpers/index";

import Button from "@components/ui/button/Button";
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import { Dropdown, DropdownItem } from "@components/ui/dropdown";

// import useDownload from "@services/global/download/hooks/useDownload";

export default function TableFilter() {
  const saleListDate = useUserStore((state) => state.saleListDate);
  const setSaleListDate = useUserStore((state) => state.setSaleListDate);

  // const { loading: loadingDownload, trigger } = useDownload();
  const urlExports = [
    {
      label: "pdf",
      onClick: () => alert("pdf"),
    },
    {
      label: "csv",
      onClick: () => alert("csv"),
    },
    {
      label: "xlsx",
      onClick: () => alert("xlsx"),
    },
  ];

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  function toggleDropdown() {
    setIsOpenDropdown((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpenDropdown(false);
  }

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
    setSaleListDate(state.date);
  };

  const onClear = () => {
    methods.reset({
      start_date: todayYMDString,
      end_date: todayYMDString,
      date: todayYMString,
    });
  };

  return (
    <div>
      <div className="lg:flex items-end">
        <Form {...methods} onSubmit={onSubmit}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-end">
            <Input name="date" type="month" defaultValue={saleListDate} />
            <div className="flex gap-2 md:col-span-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onClear}
                disabled={!isValid}
              >
                <MdOutlineRefresh className="text-xl scale-x-[-1]" />
              </Button>

              <Button
                size="sm"
                className="lg:w-fit w-full"
                disabled={!isValid || isSubmitting}
              >
                Filter
              </Button>
            </div>
          </div>
        </Form>

        <div className="lg:mt-auto mt-4">
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              onClick={toggleDropdown}
              className="dropdown-toggle lg:w-auto w-full"
            >
              <span>Ekspor</span>
              <AiFillCaretDown
                className={` transition-transform duration-200 ${isOpenDropdown ? "rotate-180" : ""}`}
              />
            </Button>

            <Dropdown
              isOpen={isOpenDropdown}
              onClose={closeDropdown}
              className="absolute left-0 flex w-full flex-col rounded border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
            >
              <ul className="flex flex-col gap-1 border-gray-200 dark:border-gray-800">
                {urlExports.map((item, index) => (
                  <li key={index}>
                    <DropdownItem
                      onItemClick={closeDropdown}
                      onClick={item.onClick}
                      className=" !text-center !w-full !py-2 font-medium text-gray-700 rounded-lg group text-theme-xs uppercase hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      {item.label}
                    </DropdownItem>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
