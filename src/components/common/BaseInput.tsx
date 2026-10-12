import type { InputHTMLAttributes, ReactNode } from "react";
import "./BaseInput.css";

type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
};

function BaseInput({
  label,
  value,
  onChange,
  icon,
  id,
  className = "",
  ...props
}: BaseInputProps) {
  const inputId = id ?? (label ? `input-${label}` : undefined);

  return (
    <div className="base-input">
      {label && (
        <label className="base-input__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className="base-input__wrapper">
        <input
          {...props}
          id={inputId}
          className={`base-input__field ${icon ? "base-input__field--with-icon" : ""} ${className}`.trim()}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        {icon && <span className="base-input__icon">{icon}</span>}
      </div>
    </div>
  );
}

export default BaseInput;
