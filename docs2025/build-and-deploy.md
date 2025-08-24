# ビルド／デプロイ仕様（2025 仕様）

本ドキュメントは 2025 年度サイトのビルド／デプロイ運用を定義する恒久仕様である。SvelteKit v2 + Vercel を前提に、プリレンダーと静的アセットの最適化、リダイレクト/メタ運用を規定する。

- 対象
  - ビルド環境（ローカル／CI）の前提
  - デプロイ先（Vercel）と基本設定
  - リダイレクト、キャッシュ、静的アセット、SEO メタの取り扱い
- 非対象
  - アプリケーションのルーティング/データ仕様（`routing-and-pages.md`, `data-model-and-flow.md` を参照）

---

## 1. ビルド環境

- フレームワーク
  - SvelteKit v2 + Vite
  - Adapter: `@sveltejs/adapter-vercel`
- Node バージョン
  - Node 18 以上（20 推奨）
- TypeScript
  - `strict` を基本とする
- レンダリング方針
  - 各公開ページはプリレンダー可能な設計（各ページで `export const prerender = true` を推奨）

標準コマンド（例）:
```
npm ci
npm run build
```

---

## 2. デプロイ環境（Vercel）

- ホスティング: Vercel プロジェクトを用いる
- デプロイ種別
  - プレビュー: Pull Request／ブランチ毎に自動デプロイ
  - 本番: 既定ブランチ（例: `main`）へのマージで自動デプロイ
- 環境変数
  - 当面は不要（静的 JSON のみ）。必要時に追加

### リダイレクト（/2025 → /）
- `/2025` は恒久 301 で `/` に一本化する
- `vercel.json` の例:
```json
{
  "redirects": [
    { "source": "/2025", "destination": "/", "permanent": true }
  ]
}
```

---

## 3. 静的アセットとキャッシュ

- 配置規約（出典）
  - 出典は `docs2025/data-model-and-flow.md`。ファイル配置・スキーマの定義はそちらに集約し、本書ではキャッシュ戦略のみを扱う。
- キャッシュ方針
  - JSON（更新反映を優先）:
    - `Cache-Control: public, max-age=300, must-revalidate`
  - 画像（不変命名を前提）:
    - `Cache-Control: public, max-age=31536000, immutable`
- `vercel.json` の headers 例:
```json
{
  "headers": [
    {
      "source": "/stores.json",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=300, must-revalidate" }
      ]
    },
    {
      "source": "/breweries.json",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=300, must-revalidate" }
      ]
    },
    {
      "source": "/(\\d{4})/participations.json",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=300, must-revalidate" }
      ]
    },
    {
      "source": "/stores/:all*",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/breweries/:all*",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```
- 画像の差し替え時はファイル名を変更し、キャッシュの無害化（cache bust）を徹底する

---

## 4. SEO／メタ

- canonical
  - 正規 URL は常に `/`
  - `/2025` は 301 で `/` に一本化
- OGP
  - `og:title`, `og:description`, `og:image` をトップ／主要ページで設定
  - `og:image` は適切な寸法と容量の画像を配備（当面 `/static/ogp.png` を許容）
- sitemap / robots
  - `sitemap.xml`: `/`, `/stores`, `/stores/[id]`, `/2024`, `/2023` を掲載
  - `robots.txt`: `User-agent: *` / `Allow: /`（プレビュー環境のインデックス制御は環境側で実施）

---

## 5. ルーティング／エラーハンドリング（出典）

詳細は `docs2025/routing-and-pages.md` を出典とする。本書ではビルド観点の補足のみを扱う。

---

## 6. CI／PR 運用（推奨）

- 最小実行
  - `npm ci`
  - `npm run build`
  - `npm run test -- --run`（軽量ユニット）
- 計測（任意）
  - バンドル可視化やサイズ計測（例: rollup-plugin-visualizer, size-limit）を導入し、初回 JS 80–120KB（gzip）目標の監視を行う
- プレビュー確認
  - Vercel の Preview URL で UI、Lighthouse、メタ/リダイレクト確認を実施

---

## 7. リリースチェックリスト

- ルーティング
  - `/`, `/stores`, `/stores/[id]` が 200 を返す
  - `/2025` → `/` の 301 が機能（Location ヘッダ確認）
  - `/2024`, `/2023` への導線リンクに断絶なし
- データ
  - `/stores.json`, `/breweries.json`, `/2025/participations.json` が取得できる
  - バッジ（初参加／継続回数）の表示が正しい
- 画像
  - 主要画像が適切サイズで表示（CLS 発生なし）
- SEO
  - タイトル／ディスクリプション／OGP／canonical の設定
  - `sitemap.xml`/`robots.txt` の配備
- パフォーマンス
  - モバイル LCP ≤ 2.5s（4G）を目安に確認
  - 初回 JS バンドルが目標値（80–120KB gzip）に収まっていること

## 8. 関連リンク

- `docs2025/routing-and-pages.md`
- `docs2025/data-model-and-flow.md`
- `docs2025/conventions.md`
