import ReactSelect from "react-select";
import type { SingleValue, MultiValue, OnChangeValue } from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import Label from "@components/form/Label";
import clsx from "clsx";
import "./index.css";

export interface OptionValue {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  id?: string;
  name: string;
  placeholder?: string;
  isMulti?: boolean;
  isRequired?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;

  value?: SingleValue<OptionValue> | MultiValue<OptionValue>;
  defaultValue?: any;

  textTransform?: string;
  selectTwoOptions: OptionValue[];
  onInputChange?: (inputValue: string) => void;
}

export default function SelectTwoRhf({
  label,
  id,
  name,
  placeholder,
  isMulti,
  isRequired,
  isSearchable = false,
  isClearable,
  value,
  defaultValue,
  selectTwoOptions,
  textTransform,
  ...restProps
}: Props) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col">
      {label && (
        <Label htmlFor={id}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{
          required: isRequired ? "Tidak boleh kosong" : false,
        }}
        defaultValue={defaultValue}
        render={({
          field,
          // fieldState
        }) => (
          <div>
            <ReactSelect<OptionValue, boolean>
              {...restProps}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              key={id}
              id={id}
              name={name}
              className={clsx(
                `${isMulti ? "basic-multi-select" : "basic-single"}`,
              )}
              classNamePrefix={`select-${label}`}
              placeholder={placeholder ?? `Pilih ${label}`}
              options={selectTwoOptions}
              isSearchable={isSearchable}
              isClearable={isClearable}
              isMulti={isMulti}
              value={
                isMulti
                  ? selectTwoOptions.filter((o) =>
                      Array.isArray(field.value)
                        ? field.value.includes(o.value)
                        : false,
                    )
                  : selectTwoOptions.find((o) => o.value === field.value) ||
                    null
              }
              onChange={(val: OnChangeValue<OptionValue, boolean>) => {
                field.onChange(
                  isMulti
                    ? ((val as MultiValue<OptionValue>)?.map((v) => v.value) ??
                        [])
                    : ((val as OptionValue | null)?.value ?? ""),
                );
              }}
              onBlur={field.onBlur}
              onInputChange={(inputValue, { action }) => {
                if (action === "input-change" && restProps.onInputChange) {
                  restProps.onInputChange(inputValue);
                }
              }}
              classNames={{
                control: () =>
                  clsx(
                    "!text-black dark:!bg-gray-900 dark:!border-gray-700 !text-white dark:!text-white dark:focus:!border-brand-800 dark:text-white/90",
                  ),
                menu: () => "dark:!bg-gray-700 !rounded-lg",
                menuList: () => "dark:!bg-gray-700 !rounded-lg !p-0",
                option: () =>
                  clsx(
                    "hover:!bg-brand-100 dark:!bg-gray-900 !cursor-pointer hover:dark:!bg-gray-700 dark:!text-white !text-sm",
                    textTransform ?? "capitalize",
                  ),
                singleValue: () =>
                  clsx("dark:!text-white", textTransform ?? "capitalize"),
                input: () => clsx("!text-black dark:!text-white"),
                placeholder: () => "dark:!text-gray-400 text-sm",
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "8px",
                  borderColor: "var(--color-gray-300)",
                  boxShadow: "var(--color-brand-600)",
                  "&:hover": {
                    borderColor: "var(--color-brand-600)",
                  },
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "5px", // Tambah ruang dalam elemen
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "var(--color-brand-400)" // selected
                    : state.isFocused
                      ? "var(--color-brand-100)" // hover / active
                      : "transparent",
                }),
                menuPortal: (base) => ({ ...base, zIndex: 100001 }),
              }}
            />

            {/* {fieldState.error && (
              <p className="mt-1 text-xs text-red-500">
                {fieldState.error.message}
              </p>
            )} */}
          </div>
        )}
      />
    </div>
  );
}
