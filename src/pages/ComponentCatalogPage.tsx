import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import BaseButton from "../components/common/BaseButton";
import BaseCheckbox from "../components/common/BaseCheckbox";
import BaseInput from "../components/common/BaseInput";
import BasePagination from "../components/common/BasePagination";
import BaseSelect from "../components/common/BaseSelect";
import BaseTable from "../components/common/BaseTable";
import ConfirmDialog from "../components/common/ConfirmDialog";
import PlusIcon from "../components/icons/PlusIcon";
import SearchIcon from "../components/icons/SearchIcon";
import type { TableField } from "../components/common/BaseTable";
import type { SelectOption } from "../components/common/BaseSelect";
import "./ComponentCatalogPage.css";

type User = {
  id: number;
  name: string;
  email: string;
};

function ComponentCatalogPage() {
  // BaseCheckboxの状態管理
  const [isActive, setIsActive] = useState(true);
  const [isRetired, setIsRetired] = useState(false);

  // BaseInputの状態管理
  const [userName, setUserName] = useState("");
  const [searchText, setSearchText] = useState("");

  // BaseSelectの状態管理
  const [role, setRole] = useState("");

  // BasePaginationの状態管理
  const [page, setPage] = useState(1);

  // ConfirmDialogの表示状態
  const [showDialog, setShowDialog] = useState(false);

  // BaseTableのテーブル定義
  const fields: TableField<User>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "名前" },
    { key: "email", label: "メールアドレス" },
  ];

  // BaseTableのテーブルデータ
  const usersMock: User[] = [
    {
      id: 1,
      name: "山田太郎",
      email: "taro.yamada@example.com",
    },
    {
      id: 2,
      name: "鈴木花子",
      email: "hanako.suzuki@example.com",
    },
    {
      id: 3,
      name: "佐藤次郎",
      email: "jiro.sato@example.com",
    },
  ];

  // BaseSelectの選択肢
  const roleOptions: SelectOption[] = [
    { value: "admin", label: "管理者" },
    { value: "editor", label: "編集者" },
    { value: "viewer", label: "閲覧者" },
  ];

  const handleSave = () => {
    window.alert("保存");
  };

  const handleConfirm = () => {
    setShowDialog(false);
    window.alert("戻る");
  };

  return (
    <div className="catalog-page">
      {/* PageHeader */}
      <PageHeader
        title="コンポーネントカタログ"
        actions={
          <span className="catalog-page__description">
            プロジェクトで使用している共通コンポーネントの一覧です。
          </span>
        }
      />

      {/* BaseButton */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">1. BaseButton</h2>

          <div className="button-group">
            <span className="button-label">デフォルト</span>
            <BaseButton
              label="キャンセル"
              variant="secondary"
              onClick={() => window.alert("キャンセル")}
            />
            <BaseButton label="保存" onClick={handleSave} />
          </div>

          <div className="button-group">
            <span className="button-label">アイコン付き</span>
            <BaseButton
              label="追加"
              variant="secondary"
              icon={<PlusIcon />}
              onClick={() => window.alert("追加")}
            />
            <BaseButton
              label="検索"
              icon={<SearchIcon />}
              onClick={() => window.alert("検索")}
            />
          </div>
        </div>
      </section>

      {/* BaseCheckbox */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">2. BaseCheckbox</h2>

          <div className="checkbox-group">
            <BaseCheckbox
              label="在籍"
              checked={isActive}
              onChange={setIsActive}
            />
            <BaseCheckbox
              label="退職"
              checked={isRetired}
              onChange={setIsRetired}
            />
          </div>
        </div>
      </section>

      {/* BaseInput */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">3. BaseInput</h2>

          <div className="input-group">
            <BaseInput
              label="ユーザー名"
              placeholder="ユーザー名を入力してください"
              value={userName}
              onChange={setUserName}
            />
          </div>

          <div className="input-group">
            <BaseInput
              label="アイコン付き"
              placeholder="検索キーワードを入力してください"
              value={searchText}
              onChange={setSearchText}
              icon={<SearchIcon />}
            />
          </div>
        </div>
      </section>

      {/* BasePagination */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">4. BasePagination</h2>

          <BasePagination
            currentPage={page}
            totalPages={5}
            onChange={setPage}
          />
        </div>
      </section>

      {/* BaseSelect */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">5. BaseSelect</h2>

          <div className="select-group">
            <BaseSelect
              label="役割"
              options={roleOptions}
              value={role}
              onChange={setRole}
              placeholder="役割を選択してください"
            />
          </div>
        </div>
      </section>

      {/* BaseTable */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">6. BaseTable</h2>

          <BaseTable fields={fields} items={usersMock} />
        </div>
      </section>

      {/* ConfirmDialog */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">7. ConfirmDialog</h2>

          <div className="dialog-trigger">
            <BaseButton
              label="確認ダイアログ表示"
              onClick={() => setShowDialog(true)}
            />

            <ConfirmDialog
              isOpen={showDialog}
              title="確認"
              message="保存せずに戻りますか？"
              confirmLabel="戻る"
              cancelLabel="キャンセル"
              onConfirm={handleConfirm}
              onCancel={() => setShowDialog(false)}
            />
          </div>
        </div>
      </section>

      {/* PageHeader */}
      <section className="catalog-selection">
        <div className="catalog-items">
          <h2 className="catalog-items__title">8. PageHeader</h2>

          <div className="page-header-preview">
            <PageHeader
              title="ページタイトル"
              actions={
                <span className="catalog-page__description">
                  このページの説明を記載します。
                </span>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ComponentCatalogPage;
