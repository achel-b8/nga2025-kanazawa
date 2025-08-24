# ディレクトリ構成

本プロジェクトの配置と各ディレクトリ/ファイルの役割をまとめる。

## ルート直下

```
.eslintignore
.eslintrc.cjs
.gitignore
.npmrc
.prettierignore
.prettierrc
LICENSE
package-lock.json
package.json
README.md
svelte.config.js
tsconfig.json
vercel.json
vite.config.ts
```

- package.json: 依存関係とスクリプト
  - dev/build/preview、型チェック（svelte-check）、lint/format、test（vitest）
- svelte.config.js: SvelteKit 設定
  - adapter: vercel、preprocess: vitePreprocess + carbon-preprocess（optimizeImports）
- vite.config.ts: Vite/Vitest 設定
  - plugins: sveltekit()
  - test: jsdom 環境、setupFiles: `src/setupTests.ts`
  - build: *.test.ts/*.spec.ts を external 扱い（バンドル対象外）
- tsconfig.json: TypeScript 設定（`.svelte-kit/tsconfig.json` を extends、strict 有効）
- vercel.json: Vercel 用のビルド/出力/インストール/フレームワーク設定
- ESLint/Prettier 各種: コーディング規約と整形ルール
- README.md: プロジェクト概要とメモ

## src/

```
src/
  app.d.ts
  app.html
  index.test.ts
  setupTests.ts
  components/
    BusinessTimeCell.svelte
    BusinessTimeCell.test.ts
    Header.svelte
    SnsUrls.svelte
    StoreCard.svelte
    StoreCard.test.ts
    TopStoreList.svelte
    TopStoreList.test.ts
  lib/
    formatStoreResponse.ts
  routes/
    +layout.svelte
    +layout.ts
    +page.svelte
    +page.ts
    layout.test.ts
    page.test.ts
    2023/
      page.test.ts
      stores/
        +page.svelte
        +page.ts
        page.test.ts
        [storeId]/
          +page.svelte
          +page.ts
          page.test.ts
    stores/
      +page.svelte
      +page.ts
      page.test.ts
      [storeId]/
        +page.svelte
        +page.ts
        page.test.ts
  types/
    stores.d.ts
```

- app.html: HTML テンプレート（SvelteKit）
- setupTests.ts: Vitest セットアップ（`@testing-library/jest-dom` の取込、`ResizeObserver` のスタブ）
- components/: UI コンポーネント群
  - Header: Carbon Header/SideNav。ナビゲーションや外部リンク
  - TopStoreList: 店舗/蔵元/時間の一覧（詳細ページへのリンク付き）
  - StoreCard: 一覧カード（クリックで `./stores/{id}` に遷移）
  - BusinessTimeCell: 開催時間の表示（休憩時間帯の分割表示に対応）
  - SnsUrls: SNS アイコンリンク（X/Facebook/Instagram/Website）
  - 各 .test.ts: コンポーネントのユニット/UI テスト
- lib/
  - formatStoreResponse.ts: JSON の日時文字列を `Date`/`Date|null` に正規化するユーティリティ
- routes/: SvelteKit のファイルベースルーティング
  - ルート構成は下記「ルーティング概要」を参照（`+page.ts` は `load`、`+page.svelte` は表示）
  - `+layout.svelte`: Carbon Theme/グリッド適用、共通 `Header` 配置
  - `+layout.ts`: `@vercel/analytics` の inject（dev/production 切替）
  - tests: 代表的なルートについて *.test.ts が併設
- types/
  - stores.d.ts: `RawStore`（JSON 受領形）と `Store`（アプリ内部形）の型定義、`Stores` ラッパー

## static/

```
static/
  favicon.ico
  mainVisual.webp
  mainVisual2024.jpg
  map640.png
  map1920.png
  ogp.png
  stores.json                 # 2024年データ
  2023/
    stores.json               # 2023年データ
    stores/
      1.webp ... 9.webp
  qr/
    instagram.webp
    lineOfficial.webp
    lineOpenChat.webp
  stores/
    1.webp ... 9.webp         # 2024年の店舗画像
```

- SvelteKit の `static` はサイトルートにそのまま公開される（例: `/stores.json`, `/stores/1.webp`）
- 2023年/2024年で JSON と画像を分離配置

## tests/

```
tests/
  setupTests.ts
  mocks/
    storesMock.ts
```

- tests/setupTests.ts: Vitest セットアップ（`src/setupTests.ts` と同様の内容）
  - 備考: セットアップファイルが `src/` と `tests/` の2箇所に重複して存在。現在は Vite 設定で `src/setupTests.ts` が使用される想定（統一の余地あり）。
- mocks/storesMock.ts: データモック

## ルーティング概要（簡易）

- `/`
  - `src/routes/+page.ts`: `/stores.json` を fetch → 日時正規化 → `+page.svelte` へ
  - `src/routes/+page.svelte`: 告知コンテンツ、`TopStoreList` を表示
- `/stores`
  - `stores/+page.ts`: `/stores.json` を fetch → 日時正規化
  - `stores/+page.svelte`: `StoreCard` をグリッド表示
- `/stores/[storeId]`
  - `stores/[storeId]/+page.ts`: `storeId` の数値検証 → 抽出/404 → 日時正規化
  - `stores/[storeId]/+page.svelte`: 詳細表示
- `/2023/stores`, `/2023/stores/[storeId]`
  - 2024年と同構造で `/2023/stores.json` を使用

## テストの配置ポリシー（現状）

- ルート直下や各ディレクトリに `.test.ts` を併設（ページ/レイアウト/コンポーネント）
- `vite.config.ts` で `environment: 'jsdom'`, `setupFiles: ['./src/setupTests.ts']` を指定
- ビルド時は `.test.ts`/`.spec.ts` を external にしてバンドルから除外

## 備考/整理アイデア

- `src/setupTests.ts` と `tests/setupTests.ts` の重複は 1 箇所に統一可能
- 年度別データの配置は現在 `static/` に直置き（将来は `/static/{year}/stores.json` の命名統一や API 化を検討）
- 画像やインライン `style` の外出し/最適化は別タスク候補
