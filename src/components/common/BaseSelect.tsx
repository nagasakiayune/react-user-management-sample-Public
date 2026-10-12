import type { SelectHTMLAttributes } from "react";
import "./BaseSelect.css";

export type SelectOption = {
  value: string;
  label: string;
};

type BaseSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
> & {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function BaseSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  id,
  className = "",
  ...props
}: BaseSelectProps) {
  const selectId = id ?? (label ? `select-${label}` : undefined);

  return (
    <div className="base-select">
      {label && (
        <label className="base-select__label" htmlFor={selectId}>
          {label}
        </label>
      )}

      <select
        {...props}
        id={selectId}
        className={`base-select__field ${className}`.trim()}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BaseSelect;
