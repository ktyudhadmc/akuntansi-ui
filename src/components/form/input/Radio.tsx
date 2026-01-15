import { useFormContext, useWatch } from "react-hook-form";

interface RadioProps {
  id?: string; // Unique ID for the radio button
  name: string; // Radio group name
  value: string; // Value of the radio button
  label: string; // Label for the radio button
  className?: string; // Optional additional classes
  disabled?: boolean; // Optional disabled state for the radio button
  required?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  value,
  label,
  className = "",
  disabled = false,
  required = false,
  ...restProps
}) => {
  const { register, control } = useFormContext();
  const selectedValue = useWatch({ control, name });
  const checked = selectedValue === value;

  return (
    <label
      htmlFor={id}
      className={`relative flex cursor-pointer  select-none items-center gap-3 text-sm font-medium ${
        disabled
          ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
          : "text-gray-700 dark:text-gray-400"
      } ${className}`}
    >
      <input
        {...restProps}
        {...(name &&
          register(name, {
            required: required && {
              value: true,
              message: "Tidak Boleh Kosong",
            },
          }))}
        id={id}
        name={name}
        type="radio"
        value={value}
        className="sr-only"
        disabled={disabled} // Disable input
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${
          checked
            ? "border-brand-500 bg-brand-500"
            : "bg-transparent border-gray-300 dark:border-gray-700"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full bg-white ${
            checked ? "block" : "hidden"
          }`}
        />
      </span>

      {label}
    </label>
  );
};

export default Radio;
