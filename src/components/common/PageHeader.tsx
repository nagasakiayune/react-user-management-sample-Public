import type { ReactNode } from "react";
import "./PageHeader.css";

type PageHeaderProps = {
  title: string;
  actions?: ReactNode;
};

function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>

      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
  );
}

export default PageHeader;
