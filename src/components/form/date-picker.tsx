import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "@assets/icons";

import type { Hook } from "@def/option";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  defaultValue?: any;
  onChange?: (value: string) => void;

  mode?: "single" | "multiple" | "range" | "time";
  // defaultDate?: DateOption | null;
  onFlatpickrChange?: Hook | Hook[];
  disabled?: boolean;
}

export default function DatePicker({
  id,
  label,
  name,
  placeholder,
  required = false,
  disabled = false,
  defaultValue,
  mode = "single",
}: Props) {
  const { control } = useFormContext();
  const fpRef = useRef<flatpickr.Instance | null>(null);

  return (
    <div>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-error-500">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "Tidak boleh kosong" : false,
        }}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          const inputRef = useRef<HTMLInputElement>(null);

          useEffect(() => {
            if (!inputRef.current) return;

            fpRef.current = flatpickr(inputRef.current, {
              mode,
              static: true,
              dateFormat: "Y-m-d",
              defaultDate: field.value,
              onChange: (_, dateStr) => {
                field.onChange(dateStr);
              },
            });

            return () => {
              fpRef.current?.destroy();
            };
          }, []);

          // sync RHF → flatpickr
          useEffect(() => {
            if (fpRef.current && field.value) {
              fpRef.current.setDate(field.value, false);
            }
          }, [field.value]);

          return (
            <>
              <div className="relative">
                <input
                  ref={inputRef}
                  id={id}
                  value={field.value || ""}
                  disabled={disabled}
                  readOnly
                  placeholder={placeholder ?? "Pilih Tanggal"}
                  className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs
          placeholder:text-gray-400 focus:outline-hidden focus:ring-3
          bg-transparent text-gray-800 border-gray-300
          focus:border-brand-300 focus:ring-brand-500/20
          dark:text-white/90 dark:bg-gray-900
          dark:border-gray-700 dark:placeholder:text-white/30
          dark:focus:border-brand-800`}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <CalenderIcon className="size-6" />
                </span>
              </div>

              {fieldState.error && (
                <p className="text-xs text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
