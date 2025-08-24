# データモデルとフロー

本サイトのデータは `static/` 配下の JSON を直接取得してレンダリングに用いる。取得後、日時文字列などをアプリ内部用の型に正規化してから UI に渡す。

- データソース
  - 2024: `/stores.json`（`static/stores.json`）
  - 2023: `/2023/stores.json`（`static/2023/stores.json`）
- 正規化
  - `src/lib/formatStoreResponse.ts` にて日時文字列を `Date` または `Date|null` に変換
- 利用
  - 各ページの `+page.ts` が `fetch` → 正規化 → `+page.svelte` に渡す
  - 表示は `BusinessTimeCell` で `HH:mm` 形式に整形（`date-fns`）

## 型定義

`src/types/stores.d.ts` より抜粋。

```ts
export interface SnsUrls {
  twitterUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  websiteUrl: string | null;
}

export interface Kuramoto {
  name: string;
  startTime: string | null;     // Raw: string|null
  endTime: string | null;       // Raw: string|null
  snsUrls: SnsUrls;
}

export interface RawStore {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  salesStartTime: string;       // Raw: string
  salesBreakStartTime: string | null;
  salesBreakEndTime: string | null;
  salesEndTime: string;         // Raw: string
  seat: string | null;
  appetizer: string | null;
  appetizerPrice: number | null;
  timeLimit: string | null;
  additionalNotes: string | null;
  mapUrl: string;
  snsUrls: SnsUrls;
  kuramoto: Kuramoto;
}

export interface FormattedFields {
  salesStartTime: Date;
  salesBreakStartTime: Date | null;
  salesBreakEndTime: Date | null;
  salesEndTime: Date;
  kuramotoStartTime: Date | null;
  kuramotoEndTime: Date | null;
}

export type Store = Omit<RawStore, keyof FormattedFields> & FormattedFields;
export interface RawStores { stores: RawStore[]; }
export interface Stores { stores: Store[]; }
```

- `RawStore` は JSON 生データ
- `Store` は内部表現（日時は `Date` 型に変換）
- `Stores` はページ間での受け渡し用ラッパー

## JSON スキーマ（例）

`static/stores.json`（2024）例（抜粋）:

```json
{
  "id": 1,
  "name": "神鮮 和さび",
  "salesStartTime": "2024-10-01 16:00:00",
  "salesBreakStartTime": null,
  "salesBreakEndTime": null,
  "salesEndTime": "2024-10-01 22:00:00",
  "appetizer": "梅煮物、めぎすのつみれ、味噌豆腐",
  "appetizerPrice": 1000,
  "snsUrls": { "facebookUrl": "https://...", "instagramUrl": "https://..." },
  "kuramoto": {
    "name": "帆波（富山）",
    "startTime": null,
    "endTime": null,
    "snsUrls": { "facebookUrl": "https://...", "websiteUrl": "https://..." }
  }
}
```

2023 も同様の構造（`static/2023/stores.json`）。

## 正規化（formatStoreResponse）

`src/lib/formatStoreResponse.ts`

```ts
export const formatStoreResponse = (rawStores: RawStore[]): Store[] => {
  return rawStores.map((raw) => format(raw));
};

const convertToDate = (rawDate: string | null): Date | null => {
  return rawDate ? new Date(rawDate) : null;
};

const format = (rawStore: RawStore): Store => {
  return {
    ...rawStore,
    salesStartTime: new Date(rawStore.salesStartTime),
    salesBreakStartTime: convertToDate(rawStore.salesBreakStartTime),
    salesBreakEndTime: convertToDate(rawStore.salesBreakEndTime),
    salesEndTime: new Date(rawStore.salesEndTime),
    kuramotoStartTime: convertToDate(rawStore.kuramoto.startTime),
    kuramotoEndTime: convertToDate(rawStore.kuramoto.endTime)
  };
};
```

- 役割: 日時文字列を `Date`/`Date|null` に変換
- 変換対象:
  - `salesStartTime`, `salesEndTime`
  - `salesBreakStartTime`, `salesBreakEndTime`
  - `kuramoto.startTime`, `kuramoto.endTime` → `kuramotoStartTime`, `kuramotoEndTime`

注意点（Date パース）:
- 現状の文字列は `"YYYY-MM-DD HH:mm:ss"` 形式で、ISO 8601 ではない
- `new Date('2024-10-01 16:00:00')` の解釈は実行環境に依存し得る（ブラウザ/Node の差異）
  - 一般的にはローカルタイムとしてパースされる実装が多いが、仕様上は保証されない
- 将来の堅牢化案:
  - ISO 形式へ統一（例: `"2024-10-01T16:00:00"` または `"2024-10-01T16:00:00+09:00"`）
  - `date-fns/parse` などで明示的にパースする
  - Zod 等で JSON スキーマバリデーションを追加

## データフロー

1. `+page.ts` の `load` で `fetch`（例: `/stores.json`）
2. `response.json()` → `RawStores`
3. `formatStoreResponse(json.stores)` で `Store[]` へ正規化
4. ページへ `props` として渡す（`return { stores }` など）
5. `+page.svelte` や子コンポーネントが受け取り描画
   - `BusinessTimeCell` が `date-fns` の `format(HH:mm)` で表示

簡易シーケンス:
- Route Load → Fetch(JSON) → Map to Store[] → Page Props → Components Render

## 表示ロジック（BusinessTimeCell）

`src/components/BusinessTimeCell.svelte`

- Props:
  - `salesStartTime: Date`
  - `salesEndTime: Date`
  - `salesBreakStartTime: Date | null`
  - `salesBreakEndTime: Date | null`
  - `additionalNotes: string | null = null`
- ロジック:
  - 休憩時間（break）の有無で表示を分岐
  - `date-fns` で `HH:mm` 表示
  - 補足事項があれば改行して付与

## エラーハンドリング

- `/stores/[storeId]` の `+page.ts`:
  - `storeId` が数値でない → `error(404, 'Not found')`
  - 該当 ID が見つからない → `error(404, 'Not found')`
- 画像の読み込みエラー:
  - `ImageLoader` の `slot="error"` でメッセージ表示

## 将来の改善案

- 日時の厳密なパースとタイムゾーン明示
  - ISO 8601 での保存とパース、または `date-fns/parse` の利用
- データバリデーション
  - Zod を利用し JSON 受領時にスキーマチェック
- データ取得の API 化とキャッシュ戦略
  - SSG/ISR、Edge キャッシュ、Revalidation の採用
- 例外ケースの UX 改善
  - 該当なし/読み込み失敗時の UI を整備
