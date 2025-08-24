# ルーティングとページ

SvelteKit のファイルベースルーティングで構築されている。トップ、一覧、詳細、年度別（2023）のページを提供する。

## 全体像

- レイアウト
  - `src/routes/+layout.svelte`: Carbon の Theme/グリッド適用と共通ヘッダー配置
  - `src/routes/+layout.ts`: `@vercel/analytics` を開発/本番でモード切替して inject
- ルート
  - `/`: トップページ（開催概要、リンク、店舗簡易リスト）
  - `/stores`: 2024年の参加店舗一覧（カード）
  - `/stores/[storeId]`: 2024年の店舗詳細（動的ルート）
  - `/2023/stores`, `/2023/stores/[storeId]`: 2023年の一覧/詳細（同構造）

## レイアウト

- `+layout.svelte`
  - Carbon Theme: `g10`
  - 共通ヘッダー `src/components/Header.svelte` を表示
  - `<slot />` で子ページを描画
- `+layout.ts`
  - `import { dev } from '$app/environment'`
  - `import { inject } from '@vercel/analytics'`
  - `inject({ mode: dev ? 'development' : 'production' })` で Vercel Analytics を注入

## トップページ `/`

- `src/routes/+page.ts`
  - `fetch('/stores.json')` で 2024データを取得
  - `formatStoreResponse` で日時文字列を `Date` に整形
  - `return { stores }` を `+page.svelte` へ渡す
- `src/routes/+page.svelte`
  - 告知（終了トースト）、開催説明、各種リンク（LINE, Instagram, Google マイマップ）
  - メインビジュアル画像（`ImageLoader`）
  - 地図画像（`map640.png` → `map1920.png` へのリンク）
  - `TopStoreList` に `stores` を渡して簡易表形式で表示（店舗/蔵元/開催時間）

Meta/OG:
- `<svelte:head>` にてページタイトル/OG タイトルを設定

## 一覧ページ `/stores`

- `src/routes/stores/+page.ts`
  - トップと同様に `/stores.json` を取得 → `formatStoreResponse` → `stores` を返す
- `src/routes/stores/+page.svelte`
  - Grid で `StoreCard` を並べて表示
  - 各カードは `on:click={() => goto('./stores/' + store.id)}` で詳細へ遷移

Meta/OG:
- `<svelte:head>` にて一覧ページ専用のタイトル/OG タイトルを設定

## 詳細ページ `/stores/[storeId]`

- `src/routes/stores/[storeId]/+page.ts`
  - `params.storeId` を数値検証し、NaN の場合は `error(404, 'Not found')`
  - `/stores.json` から該当 `id` の店舗を抽出。見つからなければ 404
  - `formatStoreResponse` で 1件の `store` を `Date` 正規化して返す
- `src/routes/stores/[storeId]/+page.svelte`
  - 画像（`/stores/{id}.webp`）、住所・電話、SNS、開催時間、補足事項を表示
  - 開催時間は `BusinessTimeCell` で `HH:mm` 表示（休憩時間帯にも対応）

Meta/OG:
- `<svelte:head>` にて `data.store.name` を用いたタイトル/OG タイトルを設定

## 2023年のページ `/2023/*`

- 一覧: `src/routes/2023/stores/+page.ts`
  - `fetch('/2023/stores.json')` → `formatStoreResponse` → `stores`
- 詳細: `src/routes/2023/stores/[storeId]/+page.ts` / `+page.svelte`
  - 2024年の詳細と同様の構造（数値検証、抽出、404、表示）

画像/データ:
- JSON: `/2023/stores.json`
- 画像: `/2023/stores/{id}.webp`

## ナビゲーション/ヘッダー

- `src/components/Header.svelte`
  - Carbon の `Header` と `SideNav`
  - ルートリンク: Home（`/`）、参加店舗（`/stores`）
  - 外部リンク: Google マイマップ、Instagram
  - 2023年メニュー: `/2023/stores` と 2023年向け Google マイマップ
  - `$page.url.pathname` による `isSelected` 制御

## エラーハンドリング

- 動的ルートでの `storeId` バリデーション
  - 非数値 → 404
  - 該当店舗なし → 404
- 画像などの読み込みエラー時
  - `ImageLoader` の `<svelte:fragment slot="error">` でメッセージ表示

## SEO/OG/アナリティクス

- 各ページで `<svelte:head>` を用いて `title` と `og:title` を設定
- `@vercel/analytics` により PV/イベント計測が可能（自動注入）

## アセット参照ポリシー（現状）

- 画像/JSON は `static/` 直下に配置され、ルート相対で参照（例: `/stores.json`, `/stores/1.webp`）
- 一部 `./` からの相対参照あり（`StoreCard` の `src="./stores/{store.id}.webp"`、`goto('./stores/' + id)`）
  - ルーティングの観点では、ルート相対の方が一貫性が高い（将来リファクタ候補）

## 将来拡張/変更の指針

- データソースを API/CMS に変更する場合
  - `+page.ts` の `fetch` 先切替と、`formatStoreResponse` の整形仕様維持で影響を局所化
- 年度別パスの標準化
  - 例: `/[year]/stores` を基本とし、`/stores` は最新年へのエイリアスにする など
