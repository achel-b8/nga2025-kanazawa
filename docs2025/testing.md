# テスト仕様（2025 仕様）

本ドキュメントは 2025 年度サイトのテスト戦略・体制・対象・配置・実行方針を定義する恒久仕様である。軽量で実用的なテストにより、UI 品質・アクセシビリティ・データ整合性・ルーティング健全性を担保する。

- 目的
  - 主要フロー（トップ → 一覧 → 詳細）とエラー動作の安定化
  - UI/アクセシビリティ要件の回帰防止
  - データモデル（stores.json, breweries.json, {year}/participations.json）の期待形状・派生表示の検証

- 方針
  - ユニット/コンポーネント/ルートの軽量テストを中心に据える（Vitest）
  - E2E は必要性に応じて導入（Playwright を想定）
  - パフォーマンス/アクセシビリティはプレビュー環境での手動計測（Lighthouse）を基本

## 1. スタック/前提

- ランナー: Vitest（`environment: 'jsdom'`）
- ライブラリ: `@testing-library/svelte`, `@testing-library/jest-dom`
- セットアップ: `src/setupTests.ts`（jest-dom の拡張等）
- フレームワーク: SvelteKit v2（プリレンダー可能な設計を前提）

## 2. 対象と粒度

- ルート（SvelteKit）
  - 出典: `docs2025/routing-and-pages.md`（ルート一覧/データ参照/404 ハンドリング）。本書ではテスト観点のみ記載する。
  - 出典: `docs2025/data-model-and-flow.md`（データ源と型）。取得先やスキーマの重複記載は行わない。
- コンポーネント
  - 表示仕様とアクセシビリティ属性（ロール/ラベル/フォーカス可視）
  - バッジ表示（初参加/継続回数）の派生ロジック
- ユーティリティ
  - 初参加/継続回数の算出（参加年集計）、時間表示等の最小ロジック

非対象（初期）
- 複雑なフィルタリング/検索
- ビルド時の画像最適化パイプライン

## 3. テスト配置/命名

- ディレクトリ
  - ルート: `src/routes/**/*.test.ts`
  - コンポーネント: `src/components/**/*.test.ts`
  - ユーティリティ: `src/lib/**/*.test.ts`
  - 共有モック: `tests/mocks/**/*.ts`
- 命名
  - `*.test.ts`（対象近傍配置を優先、必要に応じて `tests/` 併用）

## 4. ルートの基本検証（例）

- `/stores`（2025 一覧）
  - 正常系: ストア件数が表示され、各カードのリンクが `/stores/[id]` を指す
  - 空配列時: 空状態表示（「0件」相当）の確認
- `/stores/[storeId]`（2025 詳細）
  - 正常系: 店名/エリア/バッジ/SNS 表示（存在するデータのみ表示）
  - 異常系: 不正 ID で `error(404)` が発火し `+error.svelte` が表示
- `/`（トップ）
  - Hero/CTA の文言・リンク検証
  - フッターに `/2024`, `/2023` へのリンクが存在

メモ
- `load` の検証では相対 `fetch` を簡易モックする
- SSR/CSR 差異に依存しないテスト設計を優先

## 5. コンポーネントの基本検証（例）

- `StoreCard.svelte`
  - 店名/エリア/画像 `alt` の表示
  - バッジ文言（isFirstTimer/participationCount の props に基づく）
  - 詳細リンク遷移先の検証（`/stores/[id]`）
- `StoreList.svelte`
  - レンダリング件数、空状態表示
- `StoreDetail.svelte`
  - 住所/時間/SNS/酒蔵（単一）の表示有無（存在データに応じた分岐）
- `Header.svelte`
  - 現在地の `aria-current="page"`、フォーカス可視（`:focus-visible`）
- `Hero.svelte` / `CTA.svelte`
  - テキストとリンク（`href`）の検証
- Skip link（パターン）
  - `a[href="#main"]` が存在し、フォーカス時に可視化される

## 6. アクセシビリティ観点

- ロール/ラベル/名前で要素取得（`getByRole('link', { name: /参加店舗/ })` 等）
- フォーカス移動（`tab`）のシミュレーションは可能範囲で軽量に
- コントラスト/配色は設計で担保し、Lighthouse で手動確認

## 7. モック/スタブ方針

- ネットワーク: 相対 `fetch` を簡易モック（静的 JSON 前提）
- 日時/時刻: `"HH:mm"` 文字列を採用しているため、タイムゾーン依存のスタブは不要
- データモック: 小さな固定スニペット（`tests/mocks/storesMock.ts` 等）を使用

## 8. 失敗の扱い/回帰防止

- バグ再現テストを先に追加（レッド→修正→グリーン）
- スナップショットは最小限に留め、意味のある振る舞いを検証
- コンポーネントの public API（Props/表示契約）変更時は差分をテストで明確化

## 9. CI/実行

- 推奨コマンド
  - `npm ci && npm run test -- --run`
- 任意の計測
  - バンドル可視化やサイズ計測（rollup-plugin-visualizer, size-limit）を CI もしくはローカルで実施

## 10. E2E（任意）

- ツール: Playwright を想定
- シナリオ
  - トップ → 一覧 → 詳細の主要フロー
  - 不正 ID で 404 表示
- 実行
  - プレビュー環境（Vercel）に対して実行し、主要フローの健全性を確認

## 11. Lighthouse（手動）

- 指標: LCP/CLS/INP
- 目安: LCP ≤ 2.5s（4G/モバイル）
- タイミング: プレビュー環境で随時測定し、画像/JS サイズ調整に反映

## 12. 関連リンク

- `docs2025/architecture-overview.md`
- `docs2025/data-model-and-flow.md`
- `docs2025/components.md`
- `docs2025/build-and-deploy.md`
- `docs2025/conventions.md`
- `docs2025/routing-and-pages.md`
