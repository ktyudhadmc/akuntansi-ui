import { useCallback } from "react";
import { isEmpty } from "lodash";
import debounce from "lodash/debounce";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdOutlineRefresh } from "react-icons/md";
import { HiTrash } from "react-icons/hi";

import { todayYMString } from "@helpers/index";
import { useModal } from "@hooks/useModal";

import Button from "@components/ui/button/Button";
import FilterInput from "@components/form/input/FilterInput";
import Input from "@components/form/input/InputField";
import Form from "@components/form/Form";

import BankStatementBulkDelete from "../../Action/BulkDelete";

interface Props {
  date: string;
  setSearch: (param: string) => void;
  setDate: (param: string) => void;
  selectedIds: (number | string)[];
}

export default function TableHeader({
  date,
  setSearch,
  setDate,
  selectedIds,
}: Props) {
  const { openModal, isOpen, closeModal } = useModal();

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
    setDate(state.date);
  };

  const onClear = () => {
    methods.reset({
      date: todayYMString,
    });

    setDate(todayYMString);
  };

  return (
    <>
      <BankStatementBulkDelete
        onOpen={isOpen}
        onClose={closeModal}
        selectedIds={selectedIds}
      />

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

              {!isEmpty(selectedIds) && (
                <Button onClick={openModal} size="sm" variant="outline">
                  <HiTrash />
                </Button>
              )}
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
