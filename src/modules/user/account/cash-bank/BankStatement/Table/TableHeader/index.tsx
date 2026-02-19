import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import debounce from "lodash/debounce";
import { MdOutlineRefresh } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

import { todayYMString } from "@helpers/index";

import Button from "@components/ui/button/Button";
import FilterInput from "@components/form/input/FilterInput";
import Form from "@components/form/Form";

import Input from "@components/form/input/InputField";

interface Props {
  date: string;
  setSearch: (param: string) => void;
  setDate: (param: string) => void;
}

export default function TableHeader({ date, setSearch, setDate }: Props) {
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
    setDate(state.start_date);
  };

  const onClear = () => {
    methods.reset({
      date: todayYMString,
    });

    setDate(todayYMString);
  };

  return (
    <>
      {/* Create */}
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        <Form {...methods} onSubmit={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-4 lg:items-end">
            <Input type="month" name="date" defaultValue={date} />

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
        <FilterInput
          withPrefixIcon
          placeholder="Cari"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        {/* </div>
        </div> */}
      </div>
    </>
  );
}
