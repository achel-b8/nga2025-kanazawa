# コーディング規約とガイドライン

本ドキュメントは、本リポジトリにおけるコーディング規約、Lint/Format 設定、命名規則、設計・実装上の指針をまとめたもの。

## Lint / Format

- ESLint（.eslintrc.cjs）
  - extends: `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:svelte/recommended`, `prettier`
  - parser: `@typescript-eslint/parser`
  - env: `browser`, `es2017`, `node`
  - Svelte ファイルは `svelte-eslint-parser`（`overrides.files: ['*.svelte']`）
- Prettier（.prettierrc）
  - `useTabs: true`
  - `singleQuote: true`
  - `trailingComma: 'none'`
  - `printWidth: 100`
  - plugins: `prettier-plugin-svelte`
  - Svelte 用パーサのオーバーライド
- Ignore（.eslintignore / .prettierignore）
  - `node_modules`, `.svelte-kit`, `build`, `package` など生成物を除外

推奨フロー:
- 保存時にフォーマッタ（Prettier）を走らせる設定を IDE で有効化
- コミット前に `npm run lint` / `npm run format` を実行

## TypeScript / 命名規則

- 型/インターフェース: `PascalCase`（例: `RawStore`, `Store`, `SnsUrls`）
- 変数/関数/プロパティ: `camelCase`（例: `formatStoreResponse`, `additionalNotes`）
- コンポーネント（Svelte ファイル）: `PascalCase.svelte`（例: `TopStoreList.svelte`）
- ユーティリティ/ライブラリ（.ts）: `camelCase.ts`（例: `formatStoreResponse.ts`）
- テストファイル: 対象ファイルと同階層に `*.test.ts` を基本とする

型の基本方針:
- JSON 受領形（Raw）と内部表現（整形済み）を分離
  - 例: `RawStore`（文字列日時）→ `Store`（`Date` に正規化）

## インポート/モジュール解決

- SvelteKit のエイリアスを活用
  - `$lib`（例: `$lib/formatStoreResponse`）
  - `./$types`（ルートの `PageLoad` 型など）
- 相対パスとエイリアスの混在は可だが、一貫性を優先
  - lib/共通ロジックは `$lib` を推奨
  - ルーティング固有型は `./$types` を使用

## ルーティング / データロード

- `+page.ts` の `load` は `PageLoad` 型で注釈し、`satisfies PageLoad` を併用
- データ取得は相対パスで `static/` を参照（例: `/stores.json`）
- 動的ルートの検証
  - `params.storeId` は数値チェック（NaN → 404）
  - 該当データなし → 404
- 日時は `formatStoreResponse` で `Date` に正規化してから UI に渡す

## 日時/タイムゾーンの扱い

- 現在の JSON は `"YYYY-MM-DD HH:mm:ss"` 形式（ISO 8601 ではない）
- `new Date('YYYY-MM-DD HH:mm:ss')` の解釈は実行環境依存となり得る
  - 将来的には ISO 8601（例: `2024-10-01T16:00:00+09:00`）や `date-fns/parse` での明示パースを推奨
- 表示は `date-fns/format(..., 'HH:mm')` を使用（`BusinessTimeCell`）

## コンポーネント設計

- 単一責務を意識して分割
  - 時間表示: `BusinessTimeCell`
  - SNS 表示: `SnsUrls`
  - カード: `StoreCard`
  - テーブル/一覧: `TopStoreList`
- Props は厳格な型で注釈
- アクセシビリティ/UX
  - 画像には `alt` を付与
  - アイコンリンクに `aria-label` を検討
  - `target="_blank"` の外部リンクは `rel="noopener noreferrer"` を推奨
- スタイル
  - 可能な限りインライン `style` を避け、クラスへ外出し
  - Carbon のグリッド/テーマ（`g10`）を基本に合わせる

## アセット参照ポリシー

- `static/` 配下はサイトルート直下で参照可能
- 参照パスはルート相対（`/stores/1.webp` 等）に統一すると保守性が高い
  - 現在一部に `./stores/...` の相対参照があるため、リファクタ候補

## テスト規約

- フレームワーク: Vitest + Testing Library（jsdom）
- 設定: `vite.config.ts` → `environment: 'jsdom'`, `setupFiles: './src/setupTests.ts'`
- 配置: 対象と同階層に `*.test.ts`
- 指針:
  - ユーザ視点のクエリ（`getByRole` など）を優先
  - スナップショットは最小限
  - `fetch` は `vi.fn()` 等でモック
  - `ResizeObserver` はセットアップでスタブ済み

## コミット/ブランチ（任意の推奨）

- ブランチ: `feature/xxx`, `fix/xxx`, `docs/xxx` など接頭辞で分類
- コミットメッセージ: `feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`, `test: ...`, `build: ...`
- PR では変更範囲/スクショ（UI変更時）/テスト結果を記載

## 将来の整備候補

- Pre-commit フック（lint-staged + husky）で `lint`/`format` を自動化
- JSON スキーマバリデーション（Zod）
- 年度別データ構造の厳格化（`/static/{year}/stores.json` に統一）
- ルート相対参照への統一
- 画像最適化と LCP 改善（`loading='lazy'`、実寸幅/高さの見直し、CDN 設定 等）
