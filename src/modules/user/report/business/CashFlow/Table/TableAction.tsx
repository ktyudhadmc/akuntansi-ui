import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import { Dropdown, DropdownItem } from "@components/ui/dropdown";
import { todayYMString } from "@helpers/index";
import { useDropdown } from "@hooks/useDropdown";
import useDownload from "@services/global/download/hooks/useDownload";
import useUserStore from "@store/useUserStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AiFillCaretDown } from "react-icons/ai";
import { MdOutlineRefresh } from "react-icons/md";

export default function TableAction() {
  const { loading: loadingDownload, trigger } = useDownload();
  const urlExports = [
    {
      label: "pdf",
      onClick: () =>
        trigger({ url: "/reports/cash-flow", mode: "download", type: "pdf" }),
    },
    {
      label: "csv",
      onClick: () =>
        trigger({ url: "/reports/cash-flow", mode: "download", type: "csv" }),
    },
    {
      label: "xlsx",
      onClick: () =>
        trigger({
          url: "/reports/cash-flow",
          mode: "download",
          type: "xlsx",
        }),
    },
  ];

  const cashFlowDate = useUserStore((state) => state.cashFlowDate);
  const setCashFlowDate = useUserStore((state) => state.setCashFlowDate);
  const resetCashFlowFilter = useUserStore(
    (state) => state.resetCashFlowFilter,
  );

  const {
    isOpen: isOpenDropdown,
    closeDropdown,
    toggleDropdown,
  } = useDropdown();

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
    setCashFlowDate(state.date);
  };

  const onClear = () => {
    methods.reset({
      date: todayYMString,
    });

    resetCashFlowFilter();
  };

  return (
    <div className="flex items-end lg:flex-row flex-col lg:justify-between justify-normal gap-2">
      {/* TABLE HEADER */}
      <Form {...methods} onSubmit={onSubmit}>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 items-end">
          <Input type="month" name="date" defaultValue={cashFlowDate} />

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

      <div className="relative lg:w-fit w-full">
        <Button
          size="sm"
          variant="outline"
          onClick={toggleDropdown}
          className="dropdown-toggle lg:w-auto w-full"
          disabled={loadingDownload}
        >
          {loadingDownload ? (
            <Spinner />
          ) : (
            <>
              <span>Ekspor</span>
              <AiFillCaretDown
                className={` transition-transform duration-200 ${isOpenDropdown ? "rotate-180" : ""}`}
              />
            </>
          )}
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
  );
}
