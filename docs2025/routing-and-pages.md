# ルーティングとページ設計（2025 仕様）

本ドキュメントは「日本酒ゴーアラウンド金沢 2025」のルーティング方針と各ページ仕様を定義する恒久仕様である。

- 前提
  - 2025 はドメイン直下 `/` をトップとする
  - `/2025` は提供するが、恒久リダイレクト（301）で `/` に一本化する（canonical は常に `/`）
  - 過年度（例: 2024/2023）は別ページとして存続（2025 ページ内に過年度の本文は載せない）
  - データは「マスター（/static/stores.json, /static/breweries.json）」と「年度参加（/static/{year}/participations.json）」を分離
  - SvelteKit v2 を前提。各公開ページはプリレンダー可能な設計（`export const prerender = true` を推奨）

## 1. ルート一覧

| ルート | 用途 | データ参照 | 備考 |
|---|---|---|---|
| `/` | 2025 トップ | `stores.json` + `breweries.json` + `/2025/participations.json` | 主要導線（開催概要/参加方法/店舗一覧導線/年度リンク） |
| `/stores` | 2025 参加店舗一覧 | `stores.json` + `breweries.json` + `/2025/participations.json` | SP ファーストのシンプルカード表示 |
| `/stores/[storeId]` | 2025 店舗詳細 | `stores.json` + `breweries.json` + `/2025/participations.json` | `storeId` の存在チェック、404 ハンドリング |
| `/2025` | 2025 トップのミラー | 同上 | 恒久 301 で `/` にリダイレクト（canonical は常に `/`） |
| `/{year}` | 年度トップ（2024/2023 等） | `stores.json` + `breweries.json` + `/{year}/participations.json` | 過年度の概要・年内導線 |
| `/{year}/stores` | 年度別店舗一覧 | `stores.json` + `breweries.json` + `/{year}/participations.json` | 2024/2023 の一覧 |
| `/{year}/stores/[storeId]` | 年度別店舗詳細 | `stores.json` + `breweries.json` + `/{year}/participations.json` | 2024/2023 の詳細 |

- サイト内リンクは `/`（正規 URL）を使用
- 2025 ページでは「初参加/継続回数」の指標のみ表示（過年度の本文は載せない）

## 2. 各ページの役割/要件

### `/`（2025 トップ）
- 目的
  - 開催概要、参加方法の導線、店舗一覧（`/stores`）への誘導
  - 年度リンク（2024/2023）をフッターに配置
- 構成（例）
  - Header（グローバルナビ）
  - Hero（メインビジュアル、キャッチコピー）
  - 概要/参加方法の簡潔なセクション（詳細ページは設けず、外部案内や PDF があればリンク）
  - CTA（店舗一覧へ）
  - Footer（年度リンク／運営情報／SNS）
- データ
  - 必須ではない（Hero 下に店舗ハイライト等を置く場合に「マスター＋参加情報」を参照）
- メタ
  - タイトル／ディスクリプション／OGP（`/static/ogp.png` を再利用可）
  - `link rel="canonical"` は `/`

### `/stores`（2025 店舗一覧）
- 目的
  - 2025 年度に参加する店舗の一覧を軽量に表示（SP ファースト）
- データ
  - `stores.json`（店舗マスター）
  - `breweries.json`（酒蔵マスター）
  - `/2025/participations.json`（当年度の参加情報）
- 表示
  - シンプルなカード（店名／エリア／バッジ：初参加 or 継続回数／サムネイル）
  - ソート／フィルタは最小限（必要性が出たら拡張）
- ナビゲーション
  - カードタップで `/stores/[storeId]` へ

### `/stores/[storeId]`（2025 店舗詳細）
- 目的
  - 店舗の詳細情報を表示
- データ
  - マスターから該当 Store を抽出、当年度の participation から `hours` と `brewery_id` を解決
- 表示
  - 画像、店名、エリア、住所、営業時間、SNS、酒蔵（単一）、（任意）地図リンク
  - 参加年の集計から「初参加/継続回数」のバッジを表示（過年度の本文は掲載しない）
- エラー
  - 不正/存在しない `storeId` は 404（`error(404)`）

### `/{year}` / `/{year}/stores` / `/{year}/stores/[storeId]`（過年度）
- 目的
  - 過年度（2024/2023）の情報をページとして閲覧可能にする
- データ
  - `stores.json` + `breweries.json` + `/{year}/participations.json`
- 表示
  - 2024/2023 の従来 UI を踏襲または軽量化版を提供
- 導線
  - 2025 側のフッターから遷移

## 3. レンダリング/データ取得方針

- 各ページはプリレンダー可能な設計（`export const prerender = true`）
- `+page.ts` の `load` で相対パス `fetch('/stores.json')`, `fetch('/breweries.json')`, `fetch('/{year}/participations.json')` を使用
- 2025 既定ルート（`/`, `/stores`, `/stores/[storeId]`）は `/2025/participations.json` を参照
- 年度付きルート（`/{year}/...`）は `params.year` で参照先を切り替え
- 404 は `error(404)` と `+error.svelte` で簡潔に表示

## 4. SEO/メタ/OGP 方針（出典）

出典は `docs2025/build-and-deploy.md`。canonical とリダイレクト（/2025→/）、OGP、sitemap/robots の詳細運用は build-and-deploy に集約。ここではページ実装上のメタ設定が必要なことのみを示す。

## 5. メタ管理（実装指針）

- `+layout.svelte`（または `+layout.ts`）で共通メタの土台を用意
- 各ページで `<svelte:head>` にてタイトル・ディスクリプション・OGP・canonical を設定
- 一貫性のため、メタ生成ユーティリティの導入を推奨

## 6. ナビゲーション/導線

- Header（グローバル）
  - Home（/）、参加店舗（/stores）、年度リンク（/2024, /2023）
- Footer
  - 年度リンク（/2024, /2023）、SNS、運営情報
- SP ファースト
  - ホバー依存最小化、タップ/フォーカスで明瞭に

## 7. エラー/特殊ページ

- 404（Not Found）
  - 不正な店舗 ID・存在しないルートは `error(404)` → `+error.svelte`
- 500（Error）
  - 例外時の簡潔なエラーページ（ノーJSで可）

## 8. アクセシビリティ/i18n

- a11y
  - コントラスト AA、フォーカス可視（`:focus-visible`）、skip link（`#main`）
- i18n
  - 日本語のみ（必要に応じて将来拡張）

## 9. リダイレクト設定（参考）

- Vercel の例（`vercel.json`）
  ```json
  {
    "redirects": [
      { "source": "/2025", "destination": "/", "permanent": true }
    ]
  }
