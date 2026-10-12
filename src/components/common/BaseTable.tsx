import type { ReactNode } from "react";
import "./BaseTable.css";

export type TableField<T> = {
  key: keyof T;
  label: string;
  render?: (item: T) => ReactNode;
};

type BaseTableProps<T extends { userId: string } | { id: string | number }> = {
  fields: TableField<T>[];
  items: T[];
  onRowClick?: (item: T) => void;
};

function BaseTable<T extends { userId: string } | { id: string | number }>({
  fields,
  items,
  onRowClick,
}: BaseTableProps<T>) {
  const getRowKey = (item: T): string | number => {
    if ("userId" in item) {
      return item.userId;
    }

    return item.id;
  };

  return (
    <div className="base-table-wrapper">
      <table className="base-table">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={String(field.key)} scope="col">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr
                key={getRowKey(item)}
                className={onRowClick ? "base-table__row--clickable" : ""}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {fields.map((field) => (
                  <td key={String(field.key)}>
                    {field.render
                      ? field.render(item)
                      : String(item[field.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="base-table__empty" colSpan={fields.length}>
                該当するユーザーがいません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BaseTable;
