# アーキテクチャ概要

本プロジェクトは「日本酒ゴーアラウンド金沢（2023/2024）公式サイト」を SvelteKit v2 を用いて構築したフロントエンドアプリケーションです。Vite をビルドツールに採用し、TypeScript による型安全を担保、UI は Carbon Components Svelte を利用しています。ホスティング/デプロイは Vercel を前提とし、`@sveltejs/adapter-vercel` を使用しています。

- リポジトリ名: `nga2023-kanazawa`
- 公開URL: https://nga-kanazawa.com/
- 主要機能:
  - トップページ（開催概要、各種リンク、店舗一覧への導線）
  - 参加店舗一覧（カードUI）
  - 店舗詳細（動的ルーティング `/stores/[storeId]`）
  - 2023年向けの一覧/詳細ページ（`/2023/*`）

## 技術スタック

- フレームワーク/ビルド
  - SvelteKit: `@sveltejs/kit ^2.20.3`
  - Vite: `vite ^5.4.17`
  - TypeScript: `typescript ^5.8.2`
  - アダプタ: `@sveltejs/adapter-vercel ^5.6.3`
  - プリプロセス: `@sveltejs/vite-plugin-svelte`, `carbon-preprocess-svelte`（`optimizeImports`）
- UI/コンポーネント
  - Carbon Components Svelte: `carbon-components-svelte ^0.88.4`
  - Carbon Icons Svelte: `carbon-icons-svelte ^13.3.0`
- テスト
  - Vitest: `vitest ^1.6.1`
  - Testing Library: `@testing-library/svelte ^5.2.7`, `@testing-library/jest-dom ^6.6.3`
  - DOM環境: `jsdom ^26.0.0`
- 開発体験
  - ESLint（`eslint`, `@typescript-eslint/*`, `eslint-plugin-svelte`, `eslint-config-prettier`）
  - Prettier（`prettier`, `prettier-plugin-svelte`）
- データ/ユーティリティ
  - 日時: `date-fns ^3.6.0`
  - Cookieユーティリティ: `cookie ^1.0.2`（現状使用箇所は見当たらず）
- アナリティクス
  - `@vercel/analytics ^1.5.0`（`src/routes/+layout.ts` で環境に応じて `inject`）

## ディレクトリと主要ファイル（概要）

- `src/routes/`
  - `+layout.svelte`: Carbon の Theme/グリッドを適用し、共通 Header を配置
  - `+layout.ts`: `@vercel/analytics` を `dev/production` 切替で inject
  - `+page.ts`: `/stores.json` を fetch して整形、トップへ渡す
  - `+page.svelte`: 告知・導線・TopStoreList の描画
  - `stores/+page.ts`: `/stores.json` を fetch して一覧へ渡す
  - `stores/+page.svelte`: Grid レイアウトで `StoreCard` 一覧表示
  - `stores/[storeId]/+page.ts`: `storeId` 検証と該当店舗抽出（404対応）
  - `stores/[storeId]/+page.svelte`: 詳細表示（画像/住所/電話/SNS/時間/補足）
  - `2023/*`: 2023年データを用いた一覧/詳細（構造はほぼ同一）
- `src/components/`
  - `Header.svelte`: Carbon Header/SideNav。Home、参加店舗、2023年メニュー、外部リンク
  - `TopStoreList.svelte`: 店舗/蔵元/時間の簡易リスト（詳細へのリンクあり）
  - `StoreCard.svelte`: 店舗カード。クリックで `./stores/{id}` へ遷移
  - `BusinessTimeCell.svelte`: 営業時間表示（休憩をまたぐ表示に対応）
  - `SnsUrls.svelte`: SNS アイコンリンク集（X/Facebook/Instagram/Website）
- `src/lib/`
  - `formatStoreResponse.ts`: JSON の日時文字列を `Date`/`Date | null` へ正規化
- `src/types/stores.d.ts`: `RawStore` と内部用 `Store` の型、`Stores` ラッパー
- `static/`
  - 画像や OGP、QRコード、JSON データ（`/stores.json`（2024）、`/2023/stores.json`）
  - 店舗画像は `/static/stores/{id}.webp`（2024）/ `/static/2023/stores/{id}.webp`（2023）
- `tests/` および `src/**/*.test.ts`: ルート/コンポーネントのテスト群（Vitest）
- ルート設定/ビルド構成
  - `svelte.config.js`: `adapter-vercel` 採用、`vitePreprocess` と `optimizeImports`
  - `vite.config.ts`: `sveltekit()` プラグイン、Vitest 設定（`jsdom`、`setupFiles`）
  - `tsconfig.json`: `.svelte-kit/tsconfig.json` を拡張、`strict` 有効
  - `vercel.json`: Vercel 用ビルド/出力/インストール設定

詳細は以下のドキュメントも参照:
- [directory-structure.md](./directory-structure.md)
- [routing-and-pages.md](./routing-and-pages.md)
- [data-model-and-flow.md](./data-model-and-flow.md)
- [components.md](./components.md)
- [testing.md](./testing.md)
- [build-and-deploy.md](./build-and-deploy.md)
- [conventions.md](./conventions.md)

## データ取得とフローの要点

- データソースは `static` 配下の JSON（`/stores.json`, `/2023/stores.json`）
- 各ページの `+page.ts` の `load` で `fetch` し、`formatStoreResponse` で日時を `Date` に正規化
- 表示側では `BusinessTimeCell` が `date-fns` を使って `HH:mm` 表示
- API サーバーは介在せず、SvelteKit のファイルベースルーティングと静的ファイルで完結

将来的な拡張の方向性:
- データの API 化（CMS/Headless/シート等）とキャッシュ戦略（ISR/エッジキャッシュ）
- 年度別のデータ構造の統一（`/static/{year}/stores.json` を標準化）
- 型バリデーション（Zod 等）による JSON スキーマ検証
- 画像最適化と `Image` コンポーネント化、アクセシビリティの強化

## レンダリング/ナビゲーション

- SvelteKit の `load` は SSR/CSR 双方で動作可能（相対パス fetch を採用）
- 一覧→詳細は、`StoreCard` のカードクリック（`goto('./stores/' + store.id)`）または一覧表のリンクで遷移
- 動的ルート `/stores/[storeId]` では数値検証し、該当がなければ 404 を投げる

## テスト戦略の概要

- テストランナー: Vitest（`environment: 'jsdom'`）
- セットアップ: `src/setupTests.ts` で `@testing-library/jest-dom` 読み込み、`ResizeObserver` をスタブ
- カバレッジ対象の代表:
  - ルート（`src/routes/**/*.test.ts`）
  - コンポーネント（`src/components/**/*.test.ts`）
- Vite ビルド時はテストファイルを external（バンドル対象外）設定

## ビルド/デプロイ

- `npm run build` → Vercel が `adapter-vercel` で出力（`vercel.json` にて `outputDirectory: "build"` 指定）
- `vercel.json` の `ignoreCommand` は、テストファイルの変更だけでは本番ビルドをスキップしないような意図を持つ設定（シェルの否定演算子を利用）
- `installCommand: "npm install --include=dev"` により devDependencies も含めてインストール

## パフォーマンス/アクセシビリティ（現状とメモ）

- 画像は WebP を採用（`ImageLoader` を利用しローディング UI 提供）
- UI は Carbon をベースに統一（Theme: `g10`）
- OGP 画像や favicon を `static` に配置
- 改善アイデア:
  - `ImageLoader` の `height/width` と実寸の見直し、遅延読み込み最適化
  - インライン `style` の外出し（CSS/クラス化）
  - タイムゾーンの明示的な取り扱い（`Date` 生成時のローカル/UTC差異に注意）

## 既知の課題（README 記載/コード内 TODO）

- README 所感: Carbon は導入容易だが機能/デザイン面で不満があり将来的に見直し意向
- TODO コメント:
  - 画像の軽量化/スタイル外出し
  - Header の色変更の配置見直し（スタイルの責務整理）


