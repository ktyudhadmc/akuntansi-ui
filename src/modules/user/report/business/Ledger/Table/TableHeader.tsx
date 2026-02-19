import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";

import useUserStore from "@store/useUserStore";
import { todayYMDString, todayYMString } from "@helpers/index";

// import DatePicker from "@components/form/date-picker";
import Button from "@components/ui/button/Button";
import Form from "@components/form/Form";

import FilterInput from "@components/form/input/FilterInput";
import { useCallback } from "react";
import { debounce } from "lodash";
import Input from "@components/form/input/InputField";

interface Props {
  setSearch: (params: string) => void;
}

export default function TableHeader({ setSearch }: Props) {
  // const startDate = useUserStore((state) => state.ledgerStartDate);
  // const endDate = useUserStore((state) => state.ledgerEndDate);
  const ledgerDate = useUserStore((state) => state.ledgerDate);

  // const setStartDate = useUserStore((state) => state.setLedgerStartDate);
  // const setEndDate = useUserStore((state) => state.setLedgerEndDate);
  const setLedgerDate = useUserStore((state) => state.setLedgerDate);

  const resetLedgerFilter = useUserStore((state) => state.resetLedgerFilter);

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
    // setStartDate(state.start_date);
    // setEndDate(state.end_date);

    setLedgerDate(state.date);
  };

  const onClear = () => {
    methods.reset({
      start_date: todayYMDString,
      end_date: todayYMDString,
      date: todayYMString,
    });

    resetLedgerFilter();
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  return (
    <div>
      <div className="lg:flex items-end">
        {/* TABLE HEADER */}
        <Form {...methods} onSubmit={onSubmit}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-end">
            {/* <DatePicker
              label="Tgl. mulai"
              placeholder="Pilih tanggal"
              id="start_date"
              name="start_date"
              defaultValue={startDate}
            />

            <DatePicker
              label="Tgl. selesai"
              placeholder="Pilih tanggal"
              id="end_date"
              name="end_date"
              defaultValue={endDate}
            /> */}

            <Input name="date" type="month" defaultValue={ledgerDate} />
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
          <FilterInput
            withPrefixIcon
            placeholder="Cari"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
