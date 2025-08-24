# ビルドとデプロイ

本プロジェクトは SvelteKit + Vite を用い、Vercel にデプロイされる構成。ローカル開発から本番公開までの流れと設定の要点をまとめる。

## 前提環境

- Node.js 18+ 推奨（Vite 5 / SvelteKit 2 のサポート範囲）
- パッケージマネージャ: npm（lockfile: package-lock.json）

## スクリプト（package.json）

- 開発サーバ: `npm run dev`
  - Vite の開発サーバを起動
- ビルド: `npm run build`
  - Vite による本番ビルド（SvelteKit）
- プレビュー: `npm run preview`
  - ビルド成果物のローカルプレビュー
- 型/構成チェック: `npm run check`, `npm run check:watch`
  - `svelte-kit sync` + `svelte-check`
- テスト: `npm run test`
  - Vitest 実行（jsdom 環境）
- Lint/Format: `npm run lint`, `npm run format`
  - ESLint + Prettier（Svelte 用プラグイン込み）

## SvelteKit / Vite 設定

- `svelte.config.js`
  - adapter: `@sveltejs/adapter-vercel`
  - preprocess: `vitePreprocess()` + `carbon-preprocess-svelte` の `optimizeImports`
- `vite.config.ts`
  - plugins: `sveltekit()`
  - test:
    - include: `src/**/*.{test,spec}.{js,ts}`
    - environment: `jsdom`
    - globals: `true`
    - setupFiles: `./src/setupTests.ts`
  - build.rollupOptions.external:
    - `['**/*.test.ts', '**/*.spec.ts']`（テストファイルを本番バンドル対象から除外）

## Vercel へのデプロイ

- 設定ファイル: `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install --include=dev",
  "framework": "sveltekit",
  "ignoreCommand": "! find . -name '*.test.ts' -o -name '*.spec.ts'"
}
```

- buildCommand
  - 本番ビルドは `npm run build`
- outputDirectory
  - `adapter-vercel` により `build` ディレクトリを生成
- installCommand
  - devDependencies も含めてインストール（テスト/ビルド時に必要なため）
- framework
  - `sveltekit` を明示
- ignoreCommand
  - ビルドスキップ条件のためのカスタムコマンド
  - 実運用に合わせた挙動の再確認/改善余地あり（要件に応じて `git diff` ベースの条件式に差し替え可）

### デプロイ手順（例）

1) Vercel プロジェクトを作成し、本リポジトリをリンク
2) Framework Preset は SvelteKit（自動検出される想定）
3) 環境変数が必要な場合は Vercel の Project Settings → Environment Variables に登録（本プロジェクトでは現状不要）
4) main ブランチへ push → 自動で Preview / Production が作成

### 分析（Analytics）

- `src/routes/+layout.ts` にて `@vercel/analytics` を注入
  - `mode: dev ? 'development' : 'production'` により環境に応じた動作

## ローカル開発フロー

1) 依存関係のインストール
   - `npm ci`（または `npm install`）
2) 開発サーバ起動
   - `npm run dev`
3) Lint/Format/テスト
   - `npm run lint`
   - `npm run format`
   - `npm run test`

## 本番ビルドの確認

- ローカルで本番ビルド
  - `npm run build`
- プレビュー
  - `npm run preview`
  - 出力ディレクトリは `build/`

## キャッシュ/レンダリング方針（現状）

- データは `static/` 配下の JSON を相対パスで取得（`/stores.json`, `/2023/stores.json`）
- SSR/CSR 双方に対応するが、サーバ側/クライアント側いずれでも `fetch` 可能な相対参照を利用
- API サーバがないため、再検証（revalidation）や ISR 等は未使用
  - 将来的に API 化する場合、SvelteKit の `load` と `formatStoreResponse` の境界で差し替え可能

## CI/CD / 品質ゲート（将来案）

- GitHub Actions などで以下を自動化
  - `npm ci`
  - `npm run lint` / `npm run test`
  - `npm run build`
- Vercel の Preview URL に対する Visual Regression/アクセス性チェック（Lighthouse CI 等）の導入

## トラブルシューティング

- Vercel の ignoreCommand の挙動
  - ビルドトリガの条件が要件に合わない場合は、`git diff` ベースの書式に変更推奨
- 画像/アセットのパス
  - ルート相対（例: `/stores/1.webp`）に統一すると、ルーティング変更の影響を受けにくい
- Date パース
  - `"YYYY-MM-DD HH:mm:ss"` は実行環境に依存して解釈される可能性
  - ISO 8601 形式への統一や `date-fns/parse` の利用を検討
