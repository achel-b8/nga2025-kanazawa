# 実装規約／デザイン・コード規約（2025 仕様）

本ドキュメントは 2025 年度サイトの実装規約（デザイン、UI、アクセシビリティ、命名、画像方針など）を定義する恒久仕様である。

- 対象
  - カラートークン／タイポグラフィ／レイアウト
  - Tailwind ユーティリティの使い方
  - 画像最適化・アクセシビリティ
  - 命名規約／ディレクトリ・ファイル規約
  - メタ/SEO/サイトマップの運用方針
- 非対象
  - 具体的なビルド/デプロイ手順（`build-and-deploy.md` を参照）

---

## 1. デザイントークン

- **Kanazawa Palette v2**
  - **brand.primary**: `#7A2814`（ベンガラ）
  - **brand.primaryTint**: `#F2E4E0`（ベンガラ薪色）
  - **brand.accent**: `#B48945`（金・文字不可）
  - **brand.accentBg**: `#EFE6D7`（帯・まとまり用の背景）
  - **support.indigo**: `#1E3A56`（加賀藍: リンク/Secondary）
  - **support.moss**: `#2F5D50`（苔: 成功/タグ）
  - **neutral.bg**: `#F5F2EC`（全ページの地）
  - **neutral.surface**: `#FFFDF9`（カード/ヘッダー面）
  - **neutral.border**: `#EAE6DD`（1pxボーダー）
  - **neutral.text**: `#121212`（本文）
  - **neutral.muted**: `#666666`（副文）
  - **neutral.subtle**: `#999999`（補足）

- CSS 変数（Kanazawa Palette v2）
  ```css
  :root {
    /* ブランドカラー */
    --brand-primary: #7A2814;     /* ベンガラ */
    --brand-primary-tint: #F2E4E0; /* ベンガラ薪色 */
    --brand-accent: #B48945;      /* 金（文字不可） */
    --brand-accent-bg: #EFE6D7;   /* 帯・まとまり用の背景 */
    
    /* サポートカラー */
    --support-indigo: #1E3A56;    /* 加賀藍: リンク/Secondary */
    --support-moss: #2F5D50;      /* 苔: 成功/タグ */
    
    /* ニュートラルカラー */
    --neutral-bg: #F5F2EC;        /* 全ページの地 */
    --neutral-surface: #FFFDF9;   /* カード/ヘッダー面 */
    --neutral-border: #EAE6DD;    /* 1pxボーダー */
    --neutral-text: #121212;      /* 本文 */
    --neutral-muted: #666666;     /* 副文 */
    --neutral-subtle: #999999;    /* 補足 */
  }
  ```

- Tailwind マッピング（`theme.extend.colors`）
  ```ts
  // tailwind.config.(c)js の例
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)'
      }
    }
  }
  ```

- **役割ルール**
  - **背景**: `neutral.bg` を全ページ最背面
  - **面**: カード/ヘッダー/フッターは `neutral.surface`、境界は `neutral.border`
  - **帯**: セクションのまとまりに `brand.accentBg`、その上に白面を載せる
  - **本文**: 常に `neutral.text`、**金（brand.accent）は本文に使わない**
  - **リンク/Secondary**: `support.indigo`
  - **Primary CTA**: `brand.primary` × 白文字

---

## 2. タイポグラフィ

- フォント: `system-ui`（軽量・高可読）
  - 推奨スタック: `system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"`
- サイズ/見出し
  - 見出し: `text-2xl`〜`text-4xl` でページ内の一貫性を確保
  - 本文: `text-base`（16px 基準）、注釈は `text-sm`
- 行間
  - 本文: `leading-relaxed`、見出し: `leading-tight`
- 文字色
  - `text-[color:var(--color-text)]` もしくは `text-text`

---

## 3. レイアウト／スペーシング

- ブレークポイント（Tailwind 既定）
  - `sm:640 / md:768 / lg:1024`
- コンテナ幅
  - `max-w-screen-md` または `max-w-screen-lg` を基準に中央寄せ
- 余白スケール
  - Tailwind 既定（`p-4`, `p-6`, `p-8` など）で統一
- SP ファースト
  - タップ余白は 44px 以上を目安

---

## 4. 画像方針

- 形式: AVIF/WebP 優先、JPEG はフォールバック
- 配置: `/static/stores/{id}.webp`, `/static/breweries/{id}.webp`（年度非依存）
- `<picture>` の例（Hero 等）
  ```html
  <picture>
    <source type="image/avif" srcset="/2025/hero@1x.avif 1x, /2025/hero@2x.avif 2x" />
    <source type="image/webp" srcset="/2025/hero@1x.webp 1x, /2025/hero@2x.webp 2x" />
    <img src="/2025/hero.jpg" alt="" width="..." height="..." decoding="async" loading="lazy" />
  </picture>
  ```
- カード画像は `object-cover` + 固定アスペクト比（例: `aspect-[4/3]`）を推奨
- `loading="lazy"` と実寸 `width/height` 設定で CLS を防止

---

## 5. アクセシビリティ（a11y）

- 原則
  - コントラスト: WCAG AA 準拠（`neutral.bg` × `neutral.text` を基準）
  - アンチエイリアス: `-webkit-font-smoothing: antialiased` でテキストレンダリングを最適化
  - **完了条件**: `body` 背景が `#F5F2EC`、カード/ヘッダー/フッターが `#FFFDF9`、帯セクションに `#EFE6D7` を使用
  - フォーカス: `:focus-visible` によるリング（`outline-2 outline-offset-2`）
  - キーボード操作: 全主要操作がタブ移動で成立
- Skip link（必須）
  - ドキュメント先頭に `a[href="#main"]`、メイン領域に `id="main"` を設置
- 画像 `alt`
  - 装飾は空 `alt`、店舗画像は店舗名を基本
- 動きの抑制
  - `@media (prefers-reduced-motion: reduce)` でアニメーションを最小化
- ナビゲーション
  - `nav`/`aria-label`、`aria-current="page"` を適切に付与

---

## 6. インタラクション／JS ルール

- 原則ノーJSで構成できる UI を優先（CSS/HTML で解決）
- 必要最小限の動作のみ JS を使用
- daisyUI
  - 未導入で開始。必要箇所のみ限定導入し、テーマは 1 種に固定
  - 導入時は対象コンポーネントと利用クラスを本ドキュメントに追記

---

## 7. 命名規約／ファイル規約

- ルート/ページ: SvelteKit 慣例（`+page.svelte`, `+page.ts`, `+layout.*`, `+error.svelte`）
- ルートパス: 年度別は `/{year}/...`、2025 既定は `/`, `/stores`, `/stores/[storeId]`
- ディレクトリ/ファイル: kebab-case（コンポーネントは `PascalCase.svelte`）
- ライブラリ/ユーティリティ: `src/lib/...`（機能別サブディレクトリ）
- 型定義: `src/types/...`（`*.d.ts`）
- 画像: WebP/AVIF 優先、`{id}.webp` 命名。`static/stores/{id}.webp`, `static/breweries/{id}.webp` に配置（年度非依存）
- JSON: `static/stores.json`, `static/breweries.json`, `static/{year}/participations.json`
- スラッグ/ID
  - `id` は小文字英数字＋ハイフンの kebab-case
  - 店名変更に依存しない安定 ID（年度を跨いでも同一店舗は同じ ID）
- サイト内リンク
  - 正規 URL は常に `/`（`/2025` は恒久 301 で `/` に一本化、canonical も `/`）

---

## 8. フォーム/リンク/外部遷移

- 外部リンク: `rel="noopener noreferrer"`、`target="_blank"` は必要時に限定
- SNS リンクは存在キーのみ表示（空/無効 URL は非表示）

---

## 9. Lint/Format

- ESLint + Prettier（既定設定を使用）
- Svelte の `<style>` は最小限。インライン `style` は避け、ユーティリティクラスを優先

---

## 10. 可読性・変更容易性

- コンポーネントは単一責務（カード／リスト／詳細／ナビ等）
- Props は必要最小限、型定義を明確化（`data-model-and-flow.md` を参照）
- 共通処理（初参加/継続回数など）はユーティリティ化（`src/lib/utils/...`）

---

## 11. メタ/SEO/サイトマップ（出典）

本節の詳細運用（canonical、/2025→/ のリダイレクト、OGP、sitemap/robots、メタ管理）は `docs2025/build-and-deploy.md` を出典とする。実装時はそちらの方針に従うこと。

---

## 12. ベース CSS（参考スニペット）

```css
/* Skip link */
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus-visible {
  left: 0;
  top: 0;
  z-index: 50;
  background: var(--color-accent);
  color: #fff;
  padding: 0.5rem 0.75rem;
}

/* Focus ring */
:where(a, button, [role="button"], input, select, textarea):focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
