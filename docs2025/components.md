# コンポーネント設計（2025 仕様）

本ドキュメントは 2025 年度サイトの主要 UI コンポーネント群の責務・API・表示仕様を定義する恒久仕様である。

- 方針
  - SP ファースト、軽量・ノーJS志向（必要最小限のみインタラクション）
  - Tailwind ユーティリティ中心、トークンは CSS 変数＋ `tailwind.config` の `theme.extend` で管理
  - daisyUI は未導入で開始。必要箇所が出た場合のみ限定導入（テーマ 1 種）
  - 2025 ページ内では過年度の本文は載せず、「初参加/継続回数」バッジのみ表示
  - サイト内リンクは正規 URL `/` を使用（`/2025` は恒久 301 で `/` に一本化／canonical は常に `/`）

## 1. カラートークン（出典）

本節の出典は `docs2025/conventions.md` の「1. デザイントークン」。色名・CSS 変数・Tailwind マッピングの定義はそちらに集約する。本書は参照のみ。

## 2. コンポーネント一覧と責務

### Header.svelte
- 目的: グローバルナビゲーション（SP は簡易メニュー）
- 構成: ロゴ/サイト名、メニュー（Home /stores /2024 /2023）
- 仕様:
  - SP: ハンバーガー開閉 or 水平スクロール可能タブのいずれか（ノーJSで可能な実装を優先）
  - フォーカス可視化、`aria-expanded`、`aria-current="page"` を適切に付与
  - サイト内リンクは `/` を使用（`/2025` へはリンクしない）
- Props（案）:
  - `activePath?: string` 現在のパス（メニュー強調用）

### SkipLink（パターン）
- 目的: キーボード操作で主要コンテンツへスキップ（`#main`）
- 実装: ドキュメント先頭に `a[href="#main"]` を設置。`:focus-visible` で表示（スタイルは conventions を参照）
- Props: なし

### Hero.svelte
- 目的: メインビジュアルとキャッチコピー
- 仕様:
  - 画像は `picture` で AVIF→WebP→JPEG、`srcset` 構成
  - タイトル、サブタイトル、CTA（任意）
  - 装飾画像の場合は `alt=""`（装飾でない場合は適切な代替テキスト）
- Props（案）:
  - `title: string`
  - `subtitle?: string`
  - `imageSrcs: { avif?: string; webp?: string; jpg?: string }`
  - `cta?: { label: string; href: string }`

### CTA.svelte
- 目的: 一次導線（例: 店舗一覧へ）
- 仕様:
  - バリアントは最小（`primary` のみ）。タップ領域は十分に
  - フォーカスリングの可視化（`:focus-visible`）
- Props（案）:
  - `label: string`
  - `href: string`
  - `variant?: 'primary'`

### StoreList.svelte
- 目的: 2025 店舗一覧の表示
- 仕様:
  - 単純な 1〜2 カラム（画面幅に応じ自動）
  - フィルタ/ソートは当面無し（必要なら将来拡張）
  - 空状態（0 件）表示あり
- Props（案）:
  - `items: { store: Store; brewery?: Brewery; hours: Hours[]; isFirstTimer: boolean; participationCount: number }[]`

### StoreCard.svelte
- 目的: 一覧の各店舗カード
- 表示:
  - サムネイル（遅延読込）、店名、エリア、バッジ（初参加 or 継続 N 回目）
- Props（受け取り）
  - `store: Store`
  - `isFirstTimer: boolean`
  - `participationCount: number`
  - `hours: Hours[]`
  - `brewery?: Brewery`
- ナビゲーション:
  - カード全体タップで `/stores/[storeId]`

### StoreDetail.svelte
- 目的: 店舗詳細の表示
- セクション:
  - 画像、店名/エリア、住所、営業時間、SNS、酒蔵（単一）、（任意）地図リンク
- バッジ:
  - 初参加 or 継続回数（コンテナで算出した派生値を受け取り表示）
- 表示ルール:
  - 住所/SNS は存在する場合のみ表示
- Props（案）:
  - `store: Store`
  - `brewery?: Brewery`
  - `hours: Hours[]`
  - `isFirstTimer: boolean`
  - `participationCount: number`

### BusinessTimeCell.svelte（軽量方針）
- 目的: 営業時間の整形表示（シンプルな区間配列）
- 入力は `"HH:mm"` の文字列配列（跨ぎ等は将来検討）
- Props（案）:
  - `hours?: { open: string; close: string }[]`

### SnsUrls.svelte（軽量方針）
- 目的: SNS リンクの列挙（存在キーのみ）
- アイコン:
  - まずはテキストリンク（軽量）。要望があれば小さな SVG を内包（X/Instagram/Website）
- Props（案）:
  - `sns: Web`

### Footer.svelte
- 目的: 年度リンクと著作権/運営情報、SNS
- 導線: `/2024`, `/2023` へのリンク
- Props: なし想定

## 3. アクセシビリティ指針（出典）

本節の出典は `docs2025/conventions.md` の「5. アクセシビリティ（a11y）」および「12. ベース CSS」。アクセシビリティ要件・スタイル指針は conventions に集約し、ここでは参照のみとする。

## 4. レスポンシブ/レイアウト（出典）

本節の出典は `docs2025/conventions.md` の「2. タイポグラフィ」「3. レイアウト／スペーシング」。詳細は conventions に集約し、ここでは参照のみとする。

## 5. ローディング/エラー表示

- ローディング:
  - 一覧: 簡易スケルトン（灰背景のブロック数個）
  - 詳細: タイトル/画像枠のスケルトン
- エラー:
  - 404: 「ページが見つかりません」（ルートの `+error.svelte` に委譲）
  - 500: 「エラーが発生しました」最小構成
- いずれもノーJSで表現可能な範囲を優先

## 6. スタイル規約（出典）

本節の出典は `docs2025/conventions.md` の各節（1, 2, 3, 5, 6, 12）。スタイルと UI 方針の詳細は conventions に集約し、ここでは参照のみとする。

## 7. コンポーネント API（型イメージ）

```ts
// 型は data-model-and-flow.md の定義に準拠

// StoreCard.svelte
export interface StoreCardProps {
  store: Store;
  isFirstTimer: boolean;
  participationCount: number;
  hours: Hours[];
  brewery?: Brewery;
}

// StoreList.svelte
export interface StoreListItem {
  store: Store;
  brewery?: Brewery;
  hours: Hours[];
  isFirstTimer: boolean;
  participationCount: number;
}
export interface StoreListProps {
  items: StoreListItem[];
}

// StoreDetail.svelte
export interface StoreDetailProps {
  store: Store;
  brewery?: Brewery;
  hours: Hours[];
  isFirstTimer: boolean;
  participationCount: number;
}

## 8. 関連リンク

- `docs2025/architecture-overview.md`
- `docs2025/data-model-and-flow.md`
- `docs2025/routing-and-pages.md`
- `docs2025/conventions.md`
