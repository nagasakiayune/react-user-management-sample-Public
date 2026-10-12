import type { User } from "../types/user";

// 苗字のパーツ定義
const lastNames = [
  { kanji: "佐藤", kana: "サトウ", romaji: "sato" },
  { kanji: "鈴木", kana: "スズキ", romaji: "suzuki" },
  { kanji: "高橋", kana: "タカハシ", romaji: "takahashi" },
  { kanji: "田中", kana: "タナカ", romaji: "tanaka" },
  { kanji: "伊藤", kana: "イトウ", romaji: "ito" },
  { kanji: "渡辺", kana: "ワタナベ", romaji: "watanabe" },
  { kanji: "山本", kana: "ヤマモト", romaji: "yamamoto" },
  { kanji: "中村", kana: "ナカムラ", romaji: "nakamura" },
  { kanji: "小林", kana: "コバヤシ", romaji: "kobayashi" },
  { kanji: "加藤", kana: "カトウ", romaji: "kato" },
];

// 名前のパーツ定義
const firstNames = [
  { kanji: "太郎", kana: "タロウ", romaji: "taro" },
  { kanji: "花子", kana: "ハナコ", romaji: "hanako" },
  { kanji: "健", kana: "ケン", romaji: "ken" },
  { kanji: "美咲", kana: "ミサキ", romaji: "misaki" },
  { kanji: "翔", kana: "ショウ", romaji: "sho" },
  { kanji: "愛", kana: "アイ", romaji: "ai" },
  { kanji: "蓮", kana: "レン", romaji: "ren" },
  { kanji: "優奈", kana: "ユウナ", romaji: "yuna" },
  { kanji: "誠", kana: "マコト", romaji: "makoto" },
  { kanji: "彩", kana: "アヤ", romaji: "aya" },
];

// 入社日を固定値で生成
const createJoinDate = (index: number): string => {
  const year = 2018 + (index % 7);
  const month = (index % 12) + 1;
  const day = 10;

  return `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
};

// モックデータを生成
export const usersMock: User[] = lastNames.flatMap((lastName, lastIndex) =>
  firstNames.map((firstName, firstIndex) => {
    const index = lastIndex * firstNames.length + firstIndex;
    const departmentIndex = Math.floor(index / 25) + 1;
    const indexWithinDepartment = index % 25;
    const isActive = indexWithinDepartment < 20;
    const userId = `U${String(index + 1).padStart(4, "0")}`;

    return {
      userId,
      lastName: lastName.kanji,
      firstName: firstName.kanji,
      lastNameKana: lastName.kana,
      firstNameKana: firstName.kana,
      email: `${lastName.romaji}.${firstName.romaji}@example.com`,
      department: String(departmentIndex),
      joinDate: createJoinDate(index),
      isActive,
      retireDate: isActive ? null : "20240331",
    };
  }),
);

// 部署別件数を集計
export const departmentSummary = usersMock.reduce<
  Record<string, { total: number; active: number; retired: number }>
>((summary, user) => {
  const department = user.department;

  if (!summary[department]) {
    summary[department] = {
      total: 0,
      active: 0,
      retired: 0,
    };
  }

  summary[department].total++;

  if (user.isActive) {
    summary[department].active++;
  } else {
    summary[department].retired++;
  }

  return summary;
}, {});

// データ検証
const userIds = usersMock.map((user) => user.userId);
const names = usersMock.map((user) => `${user.lastName}${user.firstName}`);

console.assert(usersMock.length === 100, "ユーザー数が100件ではありません");
console.assert(
  new Set(userIds).size === userIds.length,
  "ユーザーIDが重複しています",
);
console.assert(new Set(names).size === names.length, "氏名が重複しています");
