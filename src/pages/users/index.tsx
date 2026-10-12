import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import BaseButton from "../../components/common/BaseButton";
import BaseCheckbox from "../../components/common/BaseCheckbox";
import BaseInput from "../../components/common/BaseInput";
import BaseSelect from "../../components/common/BaseSelect";
import BaseTable from "../../components/common/BaseTable";
import BasePagination from "../../components/common/BasePagination";
import PlusIcon from "../../components/icons/PlusIcon";
import SearchIcon from "../../components/icons/SearchIcon";
import { usersMock } from "../../mock/users";
import type { User } from "../../types/user";
import type { TableField } from "../../components/common/BaseTable";
import type { SelectOption } from "../../components/common/BaseSelect";
import "./index.css";

const departments: SelectOption[] = [
  { value: "", label: "すべての部署" },
  { value: "1", label: "人事部" },
  { value: "2", label: "営業部" },
  { value: "3", label: "総務部" },
  { value: "4", label: "開発部" },
];

const pageSizeOptions: SelectOption[] = [
  { value: "10", label: "10件" },
  { value: "20", label: "20件" },
  { value: "50", label: "50件" },
  { value: "100", label: "100件" },
];

const departmentLabels: Record<string, string> = {
  "1": "人事部",
  "2": "営業部",
  "3": "総務部",
  "4": "開発部",
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) {
    return "-";
  }

  if (!/^\d{8}$/.test(dateString)) {
    return "-";
  }

  return `${dateString.slice(0, 4)}/${dateString.slice(4, 6)}/${dateString.slice(6, 8)}`;
};

function UserIndexPage() {
  const [searchName, setSearchName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isRetired, setIsRetired] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [pageSize, setPageSize] = useState("20");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    let result = usersMock;

    const keyword = searchName.trim().toLowerCase();

    if (keyword) {
      result = result.filter((user) => {
        const fullName = `${user.lastName}${user.firstName}`.toLowerCase();
        const fullNameWithSpace =
          `${user.lastName} ${user.firstName}`.toLowerCase();
        const fullNameKana =
          `${user.lastNameKana}${user.firstNameKana}`.toLowerCase();
        const fullNameKanaWithSpace =
          `${user.lastNameKana} ${user.firstNameKana}`.toLowerCase();

        return (
          fullName.includes(keyword) ||
          fullNameWithSpace.includes(keyword) ||
          fullNameKana.includes(keyword) ||
          fullNameKanaWithSpace.includes(keyword)
        );
      });
    }

    if (!isActive && !isRetired) {
      return [];
    }

    if (isActive !== isRetired) {
      result = result.filter((user) =>
        isActive ? user.isActive : !user.isActive,
      );
    }

    if (selectedDepartment) {
      result = result.filter((user) => user.department === selectedDepartment);
    }

    return result;
  }, [searchName, isActive, isRetired, selectedDepartment]);

  const totalCount = filteredUsers.length;
  const numericPageSize = Number(pageSize);
  const totalPages = Math.ceil(totalCount / numericPageSize);

  const startIndex =
    totalCount === 0 ? 0 : (currentPage - 1) * numericPageSize + 1;

  const endIndex = Math.min(currentPage * numericPageSize, totalCount);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * numericPageSize;

    return filteredUsers.slice(start, start + numericPageSize);
  }, [filteredUsers, currentPage, numericPageSize]);

  const fields: TableField<User>[] = [
    {
      key: "userId",
      label: "ユーザーID",
    },
    {
      key: "lastName",
      label: "名前",
      render: (user) => (
        <Link className="user-link" to={`/users/${user.userId}`}>
          {user.lastName} {user.firstName}
        </Link>
      ),
    },
    {
      key: "email",
      label: "メールアドレス",
    },
    {
      key: "department",
      label: "所属部署",
      render: (user) => departmentLabels[user.department] ?? "-",
    },
    {
      key: "joinDate",
      label: "入社日",
      render: (user) => formatDate(user.joinDate),
    },
    {
      key: "isActive",
      label: "在籍状況",
      render: (user) => (
        <span
          className={`status-badge ${
            user.isActive ? "status-active" : "status-retired"
          }`}
        >
          {user.isActive ? "在籍" : "退職"}
        </span>
      ),
    },
    {
      key: "retireDate",
      label: "退職日",
      render: (user) => formatDate(user.retireDate),
    },
  ];

  const clearFilters = () => {
    setSearchName("");
    setIsActive(true);
    setIsRetired(false);
    setSelectedDepartment("");
    setCurrentPage(1);
  };

  return (
    <div className="user-index">
      <div className="user-index__header">
        <PageHeader title="ユーザー一覧" />

        <Link to="/users/new" className="user-index__register-link">
          <BaseButton label="新規ユーザー登録" icon={<PlusIcon />} />
        </Link>
      </div>

      <section className="filter-section">
        <div className="filter-item filter-name">
          <label className="filter-label" htmlFor="search-name">
            名前で検索
          </label>

          <BaseInput
            id="search-name"
            value={searchName}
            onChange={(value) => {
              setSearchName(value);
              setCurrentPage(1);
            }}
            placeholder="名前を入力してください"
            icon={<SearchIcon />}
            aria-label="名前で検索"
          />
        </div>

        <div className="filter-item filter-employment">
          <span className="filter-label">在籍状況</span>

          <div className="checkbox-group">
            <BaseCheckbox
              label="在籍"
              checked={isActive}
              onChange={(checked) => {
                setIsActive(checked);
                setCurrentPage(1);
              }}
            />

            <BaseCheckbox
              label="退職"
              checked={isRetired}
              onChange={(checked) => {
                setIsRetired(checked);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="filter-item filter-department">
          <label className="filter-label" htmlFor="department">
            所属部署
          </label>

          <BaseSelect
            id="department"
            options={departments}
            value={selectedDepartment}
            onChange={(value) => {
              setSelectedDepartment(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="filter-actions">
          <BaseButton
            label="クリア"
            variant="secondary"
            onClick={clearFilters}
          />
        </div>
      </section>

      <section className="table-section">
        <div className="table-header">
          <div className="table-header-left">
            <span className="table-header-left__count">
              全 {totalCount} 件中 {startIndex} - {endIndex} 件を表示
            </span>

            <div className="table-page-size">
              <BaseSelect
                options={pageSizeOptions}
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
                aria-label="1ページあたりの表示件数"
              />
            </div>
          </div>

          <div className="table-header-right">
            <BasePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />

            {totalPages > 0 && (
              <span className="table-header-right__page-info">
                / {totalPages} ページ
              </span>
            )}
          </div>
        </div>

        <BaseTable fields={fields} items={paginatedUsers} />
      </section>
    </div>
  );
}

export default UserIndexPage;
