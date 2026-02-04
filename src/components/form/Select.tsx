import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

import Label from "@components/form/Label";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  id?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  options: Option[];
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  // onChange: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  required,
  disabled,
  options,
  placeholder = "Pilih Opsi",
  // onChange,
  className = "",
  value,
  defaultValue,
  ...restProps
}) => {
  // Manage the selected value
  // const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setSelectedValue(value);
  //   // onChange(value); // Trigger parent handler
  // };

  const baseClass =
    "h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:outline-hidden";

  const enabledClass =
    "bg-transparent border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800";

  const disabledClass =
    "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";

  const { register, unregister } = useFormContext();

  useEffect(
    () => () => {
      unregister(name);
    },
    [name, unregister],
  );

  return (
    <div>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-error-500">*</span>}
        </Label>
      )}
      <select
        className={clsx(
          baseClass,
          disabled ? disabledClass : enabledClass,
          className,
        )}
        {...restProps}
        name={name}
        {...(name &&
          register(name, {
            required: required && {
              value: true,
              message: "Tidak Boleh Kosong",
            },
          }))}
        key={id}
        id={id}
        value={value ?? undefined}
        defaultValue={defaultValue ?? undefined}
        required={required}
        disabled={disabled}
        // onChange={handleChange}
      >
        {/* Placeholder option */}
        <option
          value=""
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option
            key={`select-item-${option.value}`}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
