# 現在のアプリケーションの品質・UX/UI 課題まとめ

対象: 本リポジトリ全体（SvelteKit, Carbon Components Svelte）。docs/conventions.md の規約・方針と現行実装の差分、ならびに依存関係・テスト体制・コードの複雑度と UX/UI を横断的に確認。

最下部に優先度付きアクションリストを記載。

---

## 1. 品質課題

### 1-1. 依存ライブラリ/バージョン整合性・メンテナンス
- TypeScript/ESLint/各種プラグインのメジャー整合性の再点検が未実施
  - package.json
    - typescript: ^5.8.2
    - eslint: ^8.57.1 / @typescript-eslint/*: ^7.18.0 / eslint-plugin-svelte: ^2.46.1
    - vite: ^5.4.17 / esbuild: ^0.25.2
    - svelte: ^4.2.19 / @sveltejs/kit: ^2.20.3
    - carbon-components-svelte: ^0.88.4
  - リスク: メジャー間の互換性や型チェッカー/ESLint の破壊的変更によりビルドや Lint が将来的に不安定化する懸念。
  - 対応案:
    - Renovate/Dependabot の導入で定期的に更新・検証（CI 必須）。
    - メジャー更新時は E2E/コンポーネントテストの回帰確認を行う。
    - 主要スタックの互換マトリクス（Svelte/Kit, Vite, ESLint, TS）を README に明文化。

- 画像・UIライブラリのアップデート方針未定義
  - carbon-components-svelte の互換性（Svelte 4系）やアイコンパッケージとの組み合わせは随時検証が必要。
  - 対応案: UI ライブラリのメジャー更新は別ブランチでの回帰確認（Snapshots に頼らずロール/テキストアサート優先）。

### 1-2. テスト体制/カバレッジ
- カバレッジ計測がスクリプトに未組み込み
  - scripts.test が `vitest` のみで `--coverage` 非指定。カバレッジ閾値の設定も未実施。
  - 対応案:
    - `vitest --coverage` を追加し、`coverage.minimum` 目標（例: lines 80%）を CI でゲート。
    - コンポーネント/ルートごとの最低限のカバレッジラインを docs/testing.md の「カバレッジ対象」に準拠して整備。

- 重要コンポーネントのテストが不足/スキップ
  - src/components/StoreCard.test.ts が `describe.skip` で実質未検証。
  - BusinessTimeCell/TopStoreList はテストありだが、分岐・リンク/画像解決・アクセシビリティの観点は強化余地あり。
  - 対応案:
    - StoreCard の描画/遷移/画像パス/価格フォーマット/補足表示のユースケースを整備。
    - ルート `load` の正常/異常系を全ページで網羅（docs/testing.md の例に準拠）。

- セットアップ重複
  - `src/setupTests.ts` と `tests/setupTests.ts` が重複（docs/testing.md も指摘）。参照されるのは vite.config.ts の `./src/setupTests.ts`。
  - 対応案: `tests/setupTests.ts` を削除/一本化。

### 1-3. データ/日時処理の厳密性
- 非 ISO 形式文字列の Date パースを暗黙に実行
  - src/lib/formatStoreResponse.ts
    - `"YYYY-MM-DD HH:mm:ss"` を `new Date(...)` で解釈（環境依存でズレる可能性。docs/conventions.md も注意喚起）。
  - リスク: 実行環境/タイムゾーン差異で表示時刻がずれる、もしくは NaN になる。
  - 対応案:
    - `date-fns/parse` でフォーマットを明示、または JSON 側を ISO 8601 に移行。
    - 例:
      ```ts
      import { parse } from 'date-fns';
      const toDate = (s: string | null) => s ? parse(s, 'yyyy-MM-dd HH:mm:ss', new Date()) : null;
      // salesStartTime/salesEndTime を含め全て toDate 経由に統一
      ```

### 1-4. コードの複雑度/保守性・規約逸脱
- ルーティング/パス解決の曖昧さ（相対パス乱用）
  - src/components/StoreCard.svelte
    - クリック遷移: `goto('./stores/' + store.id)` → 現在ページが `/stores` の場合 `/stores/stores/:id` に誤遷移する可能性。
    - 画像パス: `src="./stores/{store.id}.webp"` → `/stores` 配下では `/stores/stores/:id.webp` 参照となり破綻。
  - 対応案: ルート相対へ統一（docs/conventions.md の方針）
    ```svelte
    on:click={() => goto(`/stores/${store.id}`)}
    <ImageLoader src={`/stores/${store.id}.webp`} ... />
    ```
    - Base パス配信の可能性があるなら `$app/paths` の `base` を考慮。

- UI とスタイルの責務分離不足
  - StoreCard.svelte にインライン style が多用（規約: 可能な限りクラスへ外出し）。
  - 対応案: クラス化 + Carbon のトークン/グリッドに合わせた再レイアウト、画像はレスポンシブ対応。

- BusinessTimeCell の表示ロジックの一貫性
  - `additionalNotes` の表示で「※」有無が分岐で不一致。
  - `<br>` で視覚改行前提のレンダリング（支援技術/読み上げで意図が伝わりにくい）。
  - 対応案: 一貫した書式（「※」の有無統一）、改行はセマンティクスをもつ要素（段落/リスト）へ。

- Header のアイコン指定ミスとスタイルの所在
  - src/components/Header.svelte
    - `icon="{Location}"` / `icon="{LogoInstagram}"` のように文字列になっており、コンポーネントが渡っていない可能性（他は `icon={Home}` 形式）。
    - コメント内に「ここにおくのはよろしくない」と記載のヘッダー色変更 CSS（場所の問題を認識済）。
  - 対応案:
    ```svelte
    <SideNavLink icon={Location} ... />
    <SideNavLink icon={LogoInstagram} ... />
    ```
    - 色テーマはレイアウト/グローバル CSS へ集約。

- 通貨表示・記号/ロケール処理
  - StoreCard.svelte の料金: `\{store.appetizerPrice || '未定'}` → バックスラッシュがそのまま表示される恐れ。通貨記号は `¥`（U+00A5）か `Intl.NumberFormat` でフォーマットすべき。
  - 対応案:
    ```svelte
    {store.appetizerPrice != null
      ? new Intl.NumberFormat('ja-JP',{ style:'currency', currency:'JPY'}).format(store.appetizerPrice)
      : '未定'}
    ```

### 1-5. 自動化・チェックパイプライン
- Pre-commit フック未導入（docs/conventions.md の将来候補）
  - 対応案: husky + lint-staged で `lint`/`format`/`test --changed` をフック。
- CI での品質ゲート未整備
  - 対応案: CI（GitHub Actions など）で `check`/`lint`/`test --coverage` を必須化、PR にスクリーンショット/テスト結果/カバレッジを添付。

---

## 2. UX/UI 課題

### 2-1. ナビゲーション/リンク解決の信頼性
- 相対遷移/相対画像パスがルートに依存し破綻（前述の StoreCard.svelte）。
- クリック可能 UI が `<Tile on:click>` のみで実装され、キーボードフォーカス/Enter 操作で遷移できない恐れ。
  - 対応案:
    - 主要クリック領域は `<a href="/stores/{id}" ...>` としてセマンティクス付与、もしくは `role="link"` + `tabindex="0"` + `on:keydown` 対応。

### 2-2. 画像最適化とパフォーマンス（LCP/CLS）
- 一覧カードに大画像（1080×1080）をそのまま読み込み
  - `ImageLoader` で `object-fit: contain` 指定・固定高さ 400px のため、ビューポートやネットワーク条件で LCP に影響。
  - 対応案:
    - `loading="lazy"`/`decoding="async"` の付与（可能であれば）。
    - 複数解像度の用意（`srcset`/`sizes` あるいは `picture`）と実寸 `width/height` 指定で CLS 防止。
    - CDN/キャッシュ戦略の検討（vercel.json と合わせる）。

### 2-3. アクセシビリティ
- アイコンリンクのアクセシビリティ不足
  - src/components/SnsUrls.svelte
    - `aria-label` 未指定、`target="_blank"` に対する `rel="noopener noreferrer"` 未付与（docs/conventions.md 推奨）。
  - 対応案:
    ```svelte
    <a href={snsUrls.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
      <LogoTwitter size={24} />
    </a>
    ```
    - アイコンのみのリンクには視覚的/非視覚的ラベルの双方を用意。

- テキスト表記の一貫性
  - BusinessTimeCell の補足表示で「※」の有無が不一致。
  - 多段行の改行に `<br>` を多用。支援技術での読み上げ配慮が不足。

### 2-4. 表示ロジックのわかりやすさ
- 営業時間表示（休憩あり/なし）の分岐は明確だが、DOM 構造がリスト/段落として伝わりづらい。
  - 対応案: 休憩の有無でブロック要素を切り替え、スクリーンリーダー向けにセパレータやラベルを補足。

---

## 3. 優先度付きアクションリスト

### Critical（即時対応）
1. 相対遷移/画像パスの是正
   - `goto('./stores/...')` → `goto('/stores/...')`
   - 画像 `./stores/{id}.webp` → `/stores/{id}.webp`
2. Header アイコン prop の型不整合修正
   - `icon="{Location}"` → `icon={Location}`（`LogoInstagram` も同様）
3. 日時パースの明示化
   - `new Date('YYYY-MM-DD HH:mm:ss')` を `date-fns/parse` へ置換（少なくとも一箇所にユーティリティ集約）

### High（短期）
4. テスト/カバレッジ体制の強化
   - `vitest --coverage` 導入、StoreCard/ルートの重要分岐テスト追加、重複セットアップの解消
5. アクセシビリティの基本対応
   - SNS アイコンリンクへ `aria-label`/`rel="noopener noreferrer"`、クリックカードのキーボード操作対応
6. 通貨表示の適正化
   - `Intl.NumberFormat('ja-JP', { currency:'JPY', style:'currency' })` で料金表示

### Medium（中期）
7. スタイルのクラス化
   - StoreCard のインライン style を削減、Carbon のトークン/グリッドベースへ
8. 画像最適化
   - `loading="lazy"`/`decoding="async"`、`srcset`/`sizes`、`width`/`height` 指定
9. 自動化の導入
   - husky + lint-staged、CI の品質ゲート（lint/check/test:coverage）

### Low（継続）
10. ライブラリアップデートの定期運用
    - Renovate/Dependabot、互換性検証の運用ルール化
11. 表示ロジック/表記の統一
    - BusinessTimeCell の「※」の有無・改行/ブロック表現の整理

---

## 4. 参考：変更候補コード片

- ルーティング/画像パス
```svelte
<!-- StoreCard.svelte -->
<Tile on:click={() => goto(`/stores/${store.id}`)}>
  <ImageLoader src={`/stores/${store.id}.webp`} alt={store.name} ... />
</Tile>
<!-- もしくは anchor でセマンティクス付与 -->
<a href={`/stores/${store.id}`} class="store-card">
  <Tile>...</Tile>
</a>
```

- Header アイコン
```svelte
<SideNavLink icon={Location} ... />
<SideNavLink icon={LogoInstagram} ... />
```

- 日時パースの明示化
```ts
// src/lib/formatStoreResponse.ts
import { parse } from 'date-fns';
const parseOrNull = (s: string | null) => s ? parse(s, 'yyyy-MM-dd HH:mm:ss', new Date()) : null;
return {
  ...rawStore,
  salesStartTime: parse(rawStore.salesStartTime, 'yyyy-MM-dd HH:mm:ss', new Date()),
  salesBreakStartTime: parseOrNull(rawStore.salesBreakStartTime),
  salesBreakEndTime: parseOrNull(rawStore.salesBreakEndTime),
  salesEndTime: parse(rawStore.salesEndTime, 'yyyy-MM-dd HH:mm:ss', new Date()),
  kuramotoStartTime: parseOrNull(rawStore.kuramoto.startTime),
  kuramotoEndTime: parseOrNull(rawStore.kuramoto.endTime)
};
```

- SNS リンクのアクセシビリティ
```svelte
<!-- SnsUrls.svelte -->
{#if snsUrls.twitterUrl}
  <a href={snsUrls.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
    <LogoTwitter size={24} />
  </a>
{/if}
```

- 料金の通貨フォーマット
```svelte
<!-- StoreCard.svelte -->
<StructuredListCell>
  {store.appetizerPrice != null
    ? new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(store.appetizerPrice)
    : '未定'}
</StructuredListCell>
```

- キーボード操作への対応（アンカーが難しい場合）
```svelte
<Tile role="link" tabindex="0"
  on:click={() => goto(`/stores/${store.id}`)}
  on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && goto(`/stores/${store.id}`)}>
  ...
</Tile>
```

---

## 5. 補足（規約との整合）
- docs/conventions.md の推奨事項（ルート相対参照、アクセシビリティ、スタイルの外出し、日時の ISO/明示パース）に対し、現状は未対応/不一致が点在。  
- docs/testing.md の「カバレッジ対象」リストは妥当であり、StoreCard/ルート一式を中心にテスト補強が短期効果大。
