import type React from "react";
import { useCallback, useEffect, useState, type FC } from "react";
import { useFormContext } from "react-hook-form";
import { type MaskOptions, useMask } from "@react-input/mask";

import Label from "@components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@assets/icons";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;

  label?: string;
  required?: boolean;
  withShowPassword?: boolean;
  leftIcon?: React.ReactNode;

  maskOptions?: MaskOptions;
}

const Input: FC<InputProps> = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  required = false,
  withShowPassword = false,
  leftIcon,
  hint,
  maskOptions,
  ...restProps
}) => {
  /** REGISTER FORM */
  const { register, unregister } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<
    "text" | "number" | "email" | "password" | "date" | "time" | string
  >(type);

  const inputRef = useMask(maskOptions);

  useEffect(
    () => () => {
      unregister(name);
    },
    [name, unregister],
  );

  const onSwitchPasswordType = useCallback(() => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
    setShowPassword((prev) => !prev);
    return;
  }, [inputType, setShowPassword]);

  const hasLeftIcon = !!leftIcon;

  /** STYLING */
  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${hasLeftIcon ? "pl-[62px]" : ""} ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

  return (
    <div>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-error-500">*</span>}
        </Label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute top-1/2 left-0 -translate-y-1/2 border-r border-gray-200 px-3.5 py-1 text-gray-500 dark:border-gray-800 dark:text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          ref={inputRef as any}
          {...restProps}
          type={type}
          {...(name &&
            register(name, {
              required: required && {
                value: true,
                message: "Tidak Boleh Kosong",
              },
            }))}
          id={id}
          key={id}
          name={name}
          placeholder={placeholder}
          value={value}
          // onChange={onChange}
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          disabled={disabled}
          className={inputClasses}
        />
        {withShowPassword && (
          <span
            onClick={() => onSwitchPasswordType()}
            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
          >
            {showPassword ? (
              <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
            ) : (
              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
            )}
          </span>
        )}

        {hint && (
          <p
            className={`mt-1.5 text-xs ${
              error
                ? "text-error-500"
                : success
                  ? "text-success-500"
                  : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
