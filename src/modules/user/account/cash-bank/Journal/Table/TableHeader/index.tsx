import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import debounce from "lodash/debounce";
import { MdOutlineRefresh } from "react-icons/md";

import { todayYMDString } from "@helpers/index";

import Button from "@components/ui/button/Button";
import SearchInput from "@components/form/input/SearchInput";
import Form from "@components/form/Form";
import DatePicker from "@components/form/date-picker";
import useUserStore from "@store/useUserStore";

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

  const startDate = useUserStore((state) => state.ledgerStartDate);
  const endDate = useUserStore((state) => state.ledgerEndDate);
  const setStartDate = useUserStore((state) => state.setLedgerStartDate);
  const setEndDate = useUserStore((state) => state.setLedgerEndDate);
  //   const resetLedgerFilter = useUserStore((state) => state.resetLedgerFilter);

  const methods = useForm<any>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<any> = async (state) => {
    setStartDate(state.start_date);
    setEndDate(state.end_date);
  };

  const onClear = () => {
    methods.reset({
      start_date: todayYMDString,
      end_date: todayYMDString,
    });

    setStartDate(todayYMDString);
    setEndDate(todayYMDString);
  };

  return (
    <>
      {/* Create */}
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <Form {...methods} onSubmit={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-4 lg:items-end">
            <DatePicker
              //   label="Tgl. mulai"
              placeholder="Tanggal mulai"
              id="start_date"
              name="start_date"
              defaultValue={startDate}
              required
            />

            <DatePicker
              //   label="Tgl. selesai"
              placeholder="Tanggal selesai"
              id="end_date"
              name="end_date"
              defaultValue={endDate}
              required
            />

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
        <SearchInput
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </>
  );
}
