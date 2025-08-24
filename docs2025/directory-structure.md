# ディレクトリ構成（2025 仕様）

本ドキュメントは「日本酒ゴーアラウンド金沢 2025」Web サイトのディレクトリ構成規約と配置ポリシーを定義する。実装後も参照可能な恒久仕様として、マスター（店舗・酒蔵）と年度参加情報を分離した構成、およびアーカイブ運用を記述する。

- 対象: ディレクトリ規約、配置ポリシー、データ配置の標準化
- 非対象: ビルドスクリプトやランタイムの具体的な設定値（必要に応じ `build-and-deploy.md` を参照）

## 1. 目的と方針

- 2025 年度をゼロベース設計としつつ、過年度（2024/2023）の閲覧性を維持
- データは「マスター（Store/Brewery）＋年度参加（Participation）」に分離
- 年度参加情報は `/static/{year}/participations.json`、マスターは `/static/stores.json` `/static/breweries.json`
- 既存サイト資産は `/_archived/` 配下で保全（ビルド対象外）。将来的にコミット対象外化や別リポジトリ分離を許容

## 2. リポジトリの標準構成

```
/  (リポジトリルート)
├─ src/
│   ├─ routes/                   # SvelteKit ルーティング
│   │   ├─ +layout.svelte
│   │   ├─ +layout.ts
│   │   ├─ +page.svelte          # 2025 トップ（/）
│   │   ├─ +page.ts              # データ読み込み（stores/breweries + /2025/participations）
│   │   └─ stores/
│   │       ├─ +page.svelte      # 2025 店舗一覧（/stores）
│   │       ├─ +page.ts
│   │       └─ [storeId]/
│   │           ├─ +page.svelte  # 2025 店舗詳細（/stores/[storeId]）
│   │           └─ +page.ts
│   ├─ components/               # UI コンポーネント
│   ├─ lib/                      # 共有ユーティリティ
│   │   ├─ data/                 # 取得/変換/結合の最小ロジック
│   │   └─ utils/                # 派生値算出（例: 初参加/継続回数）
│   └─ types/                    # 型定義
├─ static/
│   ├─ stores.json               # 店舗マスター
│   ├─ breweries.json            # 酒蔵マスター
│   ├─ 2025/
│   │   └─ participations.json   # 2025 年度参加情報
│   ├─ 2024/
│   │   └─ participations.json   # 2024 年度参加情報（順次整備）
│   ├─ 2023/
│   │   └─ participations.json   # 2023 年度参加情報（順次整備）
│   ├─ stores/                   # 店舗画像（年度非依存）
│   │   └─ {storeId}.webp
│   └─ breweries/                # 酒蔵ロゴ等（年度非依存）
│       └─ {breweryId}.webp
├─ docs/                         # 既存ドキュメント（過年度の記録）
├─ docs2025/                     # 2025 仕様（本書含む）
├─ vercel.json                   # デプロイ設定（/2025 → / の 301 など）
├─ package.json
├─ svelte.config.js
├─ vite.config.ts
└─ tsconfig.json
```

補足:
- `/_archived/` は既存サイト一式を保全する領域（ビルド対象外）
- `/2025` は提供するが、恒久リダイレクト（301）で `/` に一本化（canonical は常に `/`）

## 3. データ配置の標準（出典）

出典は `docs2025/data-model-and-flow.md`。マスター/年度参加のファイル配置・スキーマ・画像パス規約はそちらに集約。本書ではディレクトリ構成の観点のみを扱う。

## 4. ルーティング関連の配置規約（出典）

出典は `docs2025/routing-and-pages.md`。ルート一覧・データ参照・プリレンダー方針はそちらを参照。本書は配置例の説明に留める。

## 5. UI コンポーネント/共有モジュールの配置

```
src/
├─ components/
│  ├─ Header.svelte
│  ├─ Hero.svelte
│  ├─ CTA.svelte
│  ├─ StoreList.svelte
│  ├─ StoreCard.svelte
│  └─ StoreDetail.svelte
├─ lib/
│  ├─ data/
│  │  └─ stores.ts                # マスター + 参加情報の結合/型変換
│  └─ utils/
│     └─ participation.ts         # 初参加/継続回数の算出
└─ types/
   └─ stores.d.ts                 # スキーマ型定義（Store/Brewery/Participation 等）
```

- デザイントークン（カラー等）は CSS 変数＋ `tailwind.config` の `theme.extend`（`conventions.md` を参照）
- daisyUI は必要箇所のみ限定導入（テーマ 1 種）

## 6. 命名/拡張子ルール（出典）

命名・拡張子・ID/スラッグの規約は `docs2025/conventions.md` の「7. 命名規約／ファイル規約」を出典とする。本書では例外は設けない。

## 7. アーカイブ構成と運用

- `/_archived/` に既存サイト資産（実装・設定・テスト・静的アセット）をそのまま保全
- ビルド対象外、復元可能性重視。中長期的にコミット対象外化や別リポジトリ保全も可

## 8. ビルド/出力

- `@sveltejs/adapter-vercel` を使用（Vercel）
- 出力やアダプタ設定は `build-and-deploy.md` に準拠
- 404/500 は `+error.svelte` を採用

## 9. 関連リンク

- `docs2025/data-model-and-flow.md`
- `docs2025/routing-and-pages.md`
- `docs2025/conventions.md`
- `docs2025/build-and-deploy.md`
