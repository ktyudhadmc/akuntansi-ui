import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";

import useUserStore from "@store/useUserStore";
import { todayYMString } from "@helpers/index";

import Button from "@components/ui/button/Button";
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";

export default function TableAction() {

  const trialBalanceDate = useUserStore((state) => state.trialBalanceDate);
  const setTrialBalanceDate = useUserStore(
    (state) => state.setTrialBalanceDate,
  );

  const resetFilter = useUserStore((state) => state.resetTrialBalanceFilter);

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
   

    setTrialBalanceDate(state.date);
  };

  const onClear = () => {
    methods.reset({
     
      trialBalanceDate: todayYMString,
    });

    resetFilter();
  };

  

  return (
    <div>
      <div className="lg:flex items-end">
        {/* TABLE HEADER */}
        <Form {...methods} onSubmit={onSubmit}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-end">
         
            <Input
              label="Periode"
              name="date"
              type="month"
              defaultValue={trialBalanceDate}
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
