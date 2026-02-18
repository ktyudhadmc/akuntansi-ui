import { debounce } from "lodash";
import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";

import { todayYMString } from "@helpers/index";
// import DatePicker from "@components/form/default/DatePicker";
import Form from "@components/form/Form";
import FilterInput from "@components/form/input/FilterInput";
import Button from "@components/ui/button/Button";
import useUserStore from "@store/useUserStore";
import Input from "@components/form/input/InputField";


interface Props {
  setSearch: (params: string) => void;
}

export default function TableHeader({ setSearch }: Props) {
  // const startDate = useUserStore((state) => state.startDate);
  // const endDate = useUserStore((state) => state.endDate);

  // const setStartDate = useUserStore((state) => state.setStartDate);
  // const setEndDate = useUserStore((state) => state.setEndDate);


  const journalDate = useUserStore((state) => state.journalDate);
  const setJournalDate = useUserStore((state) => state.setJournalDate);
  const resetJournalFilter = useUserStore((state) => state.resetJournalFilter);

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
    // setStartDate(state.start_date);
    // setEndDate(state.end_date);
    setJournalDate(state.date);
  };

  const onClear = () => {
    methods.reset({
      date: todayYMString,
    });

    resetJournalFilter();
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

  return (
    <>
      <div>
        <div className="lg:flex items-end">
          {/* TABLE HEADER */}
          <Form {...methods} onSubmit={onSubmit}>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-end">
              <Input label="Periode" type="month" name="date" defaultValue={journalDate ?? ''} />

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
      {/* <div className="flex lg:flex-row flex-col justify-between gap-4">
        <div className="flex gap-2">
          <div className="w-full">
            <DatePicker
              label="Tgl. mulai"
              id="start_date"
              name="start_date"
              mode="single"
              maxDate={endDate ?? todayYMDString}
              defaultDate={startDate ?? todayYMDString}
              onChange={(e) => setStartDate(formatDateAsYMD(e[0]))}
            />
          </div>

          <div className="w-full">
            <DatePicker
              label="Tgl. selesai"
              id="end_date"
              name="end_date"
              mode="single"
              minDate={startDate ?? todayYMDString}
              disabled={!startDate}
              defaultDate={endDate ?? todayYMDString}
              onChange={(e) => setEndDate(formatDateAsYMD(e[0]))}
            />
          </div>
        </div>
      </div> */}
    </>
  );
}
