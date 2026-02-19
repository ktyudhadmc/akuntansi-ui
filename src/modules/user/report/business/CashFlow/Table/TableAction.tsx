import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";
import { todayYMString } from "@helpers/index";
import useUserStore from "@store/useUserStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";

export default function TableAction() {
  const cashFlowDate = useUserStore((state) => state.cashFlowDate);
  const setCashFlowDate = useUserStore((state) => state.setCashFlowDate);
  const resetCashFlowFilter = useUserStore(
    (state) => state.resetCashFlowFilter,
  );

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
    <div>
      <div className="lg:flex items-end">
        {/* TABLE HEADER */}
        <Form {...methods} onSubmit={onSubmit}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-end">
            <Input
              label="Periode"
              type="month"
              name="date"
              defaultValue={cashFlowDate}
            />

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
      </div>
    </div>
  );
}
