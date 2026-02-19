import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import debounce from "lodash/debounce";
import { MdOutlineRefresh } from "react-icons/md";

import { todayYMString } from "@helpers/index";
import useUserStore from "@store/useUserStore";

import Button from "@components/ui/button/Button";
import FilterInput from "@components/form/input/FilterInput";
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";

interface Props {
  setSearch: (param: string) => void;
}

export default function TableHeader({ setSearch }: Props) {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  const ledgerDate = useUserStore((state) => state.ledgerDate);
  const setLedgerDate = useUserStore((state) => state.setLedgerDate);
  const resetLedgerFilter = useUserStore((state) => state.resetLedgerFilter);

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
    setLedgerDate(state.start_date);
  };

  const onClear = () => {
    methods.reset({
      date: todayYMString,
    });

    resetLedgerFilter();
  };

  return (
    <>
      {/* Create */}
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <Form {...methods} onSubmit={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-4 lg:items-end">
            <Input type="month" name="date" defaultValue={ledgerDate} />
            <div className="flex gap-2 justify-end">
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
        <FilterInput
          withPrefixIcon
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </>
  );
}
