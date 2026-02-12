import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useFormContext } from "react-hook-form";
import Label from "@components/form/Label";
import clsx from "clsx";
import "./index.css";

export interface OptionValue {
  label: string;
  value: string | number;
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
  isLoading?: boolean;
  value?: any;
  defaultValue?: any;
  textTransform?: string;
  selectTwoOptions: {
    label: string;
    value: string | number;
  }[];
  onInputChange?: (inputValue: string) => void;
}

export default function SelectTwo({
  label,
  id,
  name,
  placeholder,
  isMulti,
  isRequired,
  isSearchable = false,
  isClearable,
  isLoading = false,
  value,
  defaultValue,
  selectTwoOptions,
  textTransform,
  ...restProps
}: Props) {
  const { register, unregister, setValue } = useFormContext();
  const [selectedValue, setSelectedValue] = useState<null | OptionValue>(null);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
      setValue(name, value); // Sinkronkan nilai awal dengan react-hook-form
    }
  }, [value, name, setValue]);

  useEffect(() => {
    if (!selectedValue && defaultValue) {
      setSelectedValue(defaultValue);
      setValue(name, defaultValue.value); // Pastikan juga react-hook-form mendapatkan nilai awal
    }
  }, [defaultValue, selectedValue, setValue, name]);

  useEffect(
    () => () => {
      unregister(name);
    },
    [name, unregister],
  );

  return (
    <div className="flex flex-col">
      {label && (
        <Label htmlFor={id}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}

      <ReactSelect
        {...restProps}
        key={id}
        id={id}
        name={name}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        className={clsx(`${isMulti ? "basic-multi-select" : "basic-single"}`)}
        classNamePrefix={`select-${label}`}
        placeholder={placeholder ?? `Pilih ${label}`}
        {...(name &&
          register(name, {
            required: isRequired && {
              value: false,
              message: "Tidak Boleh Kosong",
            },
          }))}
        options={[
          // {
          //   label: `Pilih ${label}`,
          //   value: "",
          // },
          ...selectTwoOptions,
        ]}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        isLoading={isLoading}
        defaultValue={selectedValue ?? defaultValue}
        required={isRequired}
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
              ? "var(--color-brand-600)" // selected
              : state.isFocused
                ? "var(--color-brand-600)" // hover / active
                : "transparent",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 100001 }),
        }}
        onChange={(e: any) => {
          // Ambil hanya nilai value jika multi-select, jika single-select, ambil langsung value
          const selectedValues = isMulti
            ? e.map((item: any) => item.value)
            : e
              ? e.value
              : null;
          setSelectedValue(selectedValues);
          setValue(name, selectedValues);
        }}
        onInputChange={(inputValue, { action }) => {
          if (action === "input-change" && restProps.onInputChange) {
            restProps.onInputChange(inputValue);
          }
        }}
      />
    </div>
  );
}
