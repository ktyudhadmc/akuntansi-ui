import type React from "react";
import { type MaskOptions, useMask } from "@react-input/mask";
import { useFormContext } from "react-hook-form";

interface CheckboxProps {
  label?: string;
  className?: string;
  id?: string;
  value?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  maskOptions?: MaskOptions;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  name,
  value,
  className = "",
  disabled = false,
  required = false,
  maskOptions,
  ...restProps
}) => {
  const { register, watch } = useFormContext();
  const inputRef = useMask(maskOptions);
  // const checked = watch(name);

  const selectedValues = watch(name) || [];
  const checked = value ? selectedValues.includes(value) : selectedValues;

  // useEffect(
  //   () => () => {
  //     unregister(name);
  //   },
  //   [name, unregister]
  // );

  return (
    <label
      className={`flex items-center space-x-3 group cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <div className="relative w-5 h-5">
        <input
          ref={inputRef as any}
          {...restProps}
          {...(name &&
            register(name, {
              required: required && {
                value: true,
                message: "Tidak Boleh Kosong",
              },
            }))}
          id={id}
          value={value}
          type="checkbox"
          className={`w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60 
          ${className}`}
          disabled={disabled}
        />
        {checked && (
          <svg
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {disabled && (
          <svg
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="#E4E7EC"
              strokeWidth="2.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
