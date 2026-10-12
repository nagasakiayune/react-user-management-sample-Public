import type { InputHTMLAttributes } from "react";
import "./BaseCheckbox.css";

type BaseCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "onChange"
> & {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function BaseCheckbox({
  label,
  checked,
  onChange,
  id,
  className = "",
  ...props
}: BaseCheckboxProps) {
  const checkboxId = id ?? `checkbox-${label}`;

  return (
    <div className="base-checkbox">
      <input
        {...props}
        id={checkboxId}
        type="checkbox"
        className={`base-checkbox__input ${className}`.trim()}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />

      <label className="base-checkbox__label" htmlFor={checkboxId}>
        {label}
      </label>
    </div>
  );
}

export default BaseCheckbox;
