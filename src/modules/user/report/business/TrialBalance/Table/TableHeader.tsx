import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";

import useUserStore from "@store/useUserStore";
import { todayYMDString } from "@helpers/index";

import DatePicker from "@components/form/date-picker";
import Button from "@components/ui/button/Button";
import Form from "@components/form/Form";

import SearchInput from "@components/form/input/SearchInput";
import { useCallback } from "react";
import { debounce } from "lodash";

interface Props {
  setSearch: (params: string) => void;
}

export default function TableHeader({ setSearch }: Props) {
  const startDate = useUserStore((state) => state.trialBalanceStartDate);
  const endDate = useUserStore((state) => state.trialBalanceEndDate);

  const setStartDate = useUserStore((state) => state.setTrialBalanceStartDate);
  const setEndDate = useUserStore((state) => state.setTrialBalanceEndDate);

  const resetFilter = useUserStore((state) => state.resetTrialBalanceFilter);

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

    resetFilter();
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
            <DatePicker
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

        <div className="lg:mt-auto mt-4">
          <SearchInput
            placeholder="Cari"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
