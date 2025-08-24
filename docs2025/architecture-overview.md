# アーキテクチャ概要（2025 仕様）

本ドキュメントは「日本酒ゴーアラウンド金沢 2025」Web サイトのアーキテクチャ仕様（設計原則・URL/データ設計・品質基準・運用方針）を定義する。

- リポジトリ: `nga2023-kanazawa` ※フォーク予定
- 公開 URL: https://www.nga-kanazawa.com/
- 対象: 2025 年度サイト（ゼロベース設計）
- 過年度: 2024/2023 ページは存続（2025 ページ内に過年度の本文は掲載しない）

## 1. ゴール

- ゴール
  - 2025 年度の UI/設計/データ方針の確定
  - ルーティングとデータ配置規約の標準化
  - デザインシステム（カラートークン、タイポ、レイアウト）の定義
  - パフォーマンス/品質目標の明確化と達成手段の提示
  - アーカイブ運用（既存資産は `_archived/` に保全、最終的にコミット対象外化/リポジトリ分離可能）

## 2. コア原則

- フレームワーク: SvelteKit v2 + Vite + TypeScript
- レンダリング: プリレンダーを基本とし、静的配信を前提（各ページで `export const prerender = true` を推奨）
- データ: 静的 JSON（API サーバーなし）
- 参照方法: SvelteKit の file-based routing と `load` での相対 `fetch`
- 年度別標準: 参加情報は `/static/{year}/participations.json`
- アクセシビリティ: コントラスト AA、キーボード操作、`:focus-visible`、skip link を標準採用

## 3. URL/情報設計

- 2025（最新年度）
  - ルートトップ: `/`
  - 店舗一覧: `/stores`
  - 店舗詳細: `/stores/[storeId]`
  - `/2025` は提供するが、恒久リダイレクト（301）で `/` に一本化。canonical は常に `/`
  - 2025 ページ内に過年度の本文は掲載しない（表示は「初参加/継続回数」バッジに限定）
- 過年度
  - 年トップ: `/{year}`
  - 店舗一覧: `/{year}/stores`
  - 店舗詳細: `/{year}/stores/[storeId]`
- 導線
  - フッター等に年度リンク（/2024, /2023）を配置

## 4. データモデル/配置（出典）

本節の出典は `docs2025/data-model-and-flow.md`。スキーマ（Store/Brewery/Participation）、ファイル配置、派生指標（初参加/継続回数）の算出、取得フローは同ドキュメントに集約する。本書では「マスター＋年度参加に分離し、静的 JSON を参照する」高レベル方針のみを定義する。

## 5. デザインシステム（出典）

本節の出典は `docs2025/conventions.md`。カラートークン、タイポグラフィ、レイアウト、UI 方針/アクセシビリティの詳細は conventions に集約し、本書は参照のみとする。

## 6. パフォーマンス/品質（出典）

目標値・運用チェックリストは `docs2025/build-and-deploy.md` に集約する。本書では「静的優先・プリレンダー・ノーJS志向」の高レベル方針のみを保持する。

## 7. 依存/スタック

- SvelteKit / Vite / TypeScript
- Tailwind CSS + `@tailwindcss/typography`
- 必要に応じて daisyUI（限定導入）
- テスト: Vitest（E2E は必要性に応じて Playwright）
- デプロイ: Vercel（`@sveltejs/adapter-vercel`）
- アナリティクス: 任意（未導入を基本）

## 8. アーカイブ運用

- 既存サイト一式は `/_archived/` 配下に保全
- `_archived` はビルド対象外とし、最終的にコミット対象外化や別リポジトリ分離も可能
- 年度ページ（/2024, /2023）は存続
- データ配置は「マスター＋年度参加情報」構成に標準化

## 9. 関連仕様

- `docs2025/directory-structure.md`
  - ルート構成とディレクトリ規約、静的アセット配置（`/static/stores.json`, `/static/breweries.json`, `/static/{year}/participations.json`）
- `docs2025/routing-and-pages.md`
  - ルーティング表、/2025→/ の 301、canonical、sitemap/robots 方針、データ参照（マスター＋参加情報）
- `docs2025/data-model-and-flow.md`
  - マスター/参加情報のスキーマと読み込み方針、Web 型、ID 規約、編集フロー
- `docs2025/components.md`
  - 主要コンポーネントの責務/Props/a11y 要件（バッジは派生値を受け取る設計を推奨）
- `docs2025/conventions.md`
  - デザイン/命名/実装規約、ベース CSS/a11y の必須項目
- `docs2025/testing.md`
  - ルート/コンポーネント/ユーティリティのテスト方針（マスター＋参加情報前提）
- `docs2025/build-and-deploy.md`
  - ビルド/デプロイ、キャッシュ/ヘッダ、リダイレクト/SEO 運用（participations.json を考慮）
- `docs2025/archive-plan.md`
  - アーカイブ保全/切り出し運用の標準プロセス
