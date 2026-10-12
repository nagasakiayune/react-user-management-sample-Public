import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./BaseButton.css";

type ButtonVariant = "primary" | "secondary" | "danger";

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
};

function BaseButton({
  label,
  variant = "primary",
  icon,
  className = "",
  type = "button",
  ...props
}: BaseButtonProps) {
  const buttonClassName = ["base-button", `base-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={buttonClassName} {...props}>
      {icon && <span className="base-button__icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export default BaseButton;
