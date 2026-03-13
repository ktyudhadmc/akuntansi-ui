import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";
// import { todayYMString } from "@helpers/date";
import useUserStore from "@store/useUserStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HiDownload } from "react-icons/hi";
// import { MdOutlineRefresh } from "react-icons/md";

export default function TableFilter() {
  const balanceSheetDate = useUserStore((state) => state.balanceSheetDate);
  const setBalanceSheetDate = useUserStore(
    (state) => state.setBalanceSheetDate,
  );

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
    setBalanceSheetDate(state.date);
  };

  // const onClear = () => {
  //   methods.reset({
  //     date: todayYMString,
  //   });

  //   setBalanceSheetDate(todayYMString);
  // };

  return (
    <div>
      <div className="flex lg:flex-row flex-col lg:justify-between gap-2">
        {/* TABLE FILTER */}
        <Form {...methods} onSubmit={onSubmit}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 items-end">
            <Input type="month" name="date" defaultValue={balanceSheetDate} />

            <div className="flex gap-2 md:col-span-2">
              {/* <Button
                size="sm"
                variant="outline"
                onClick={onClear}
                disabled={!isValid}
              >
                <MdOutlineRefresh className="text-xl scale-x-[-1]" />
              </Button> */}

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

        <div>
          <Button size="sm" variant="outline" className="lg:w-fit w-full">
            <HiDownload /> Ekspor
          </Button>
        </div>
      </div>
    </div>
  );
}
