import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import debounce from "lodash/debounce";
import { MdOutlineRefresh } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

import { todayYMDString } from "@helpers/index";

import Button from "@components/ui/button/Button";
import SearchInput from "@components/form/input/SearchInput";
import Form from "@components/form/Form";
import DatePicker from "@components/form/date-picker";

interface Props {
  startDate: string;
  endDate: string;
  setSearch: (param: string) => void;
  setStartDate: (param: string) => void;
  setEndDate: (param: string) => void;
}

export default function TableHeader({
  startDate,
  endDate,
  setSearch,
  setStartDate,
  setEndDate,
}: Props) {
  // const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [], // make sure debounce isn't recreated on every render
  );

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

        {/* <div className="flex flex-row flex-col justify-between gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("../import")}
          >
            Impor
          </Button>
          <div className="w-full"> */}
        <SearchInput
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        {/* </div>
        </div> */}
      </div>
    </>
  );
}
