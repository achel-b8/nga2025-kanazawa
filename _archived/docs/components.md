# コンポーネント設計

UI は Carbon Components Svelte をベースに構築。ここでは主要コンポーネントの責務・Props・依存関係・使用例・改善余地をまとめる。

## 共通レイアウト

### Header.svelte
- 役割
  - グローバルヘッダーとサイドナビを提供。主要ルートと外部リンク（Google マイマップ/Instagram）、2023年ページへの導線を持つ。
- 主要依存
  - Carbon: `Header`, `SideNav`, `SideNavItems`, `SideNavLink`, `SideNavMenu`, `SideNavMenuItem`, `SideNavDivider`, `SkipToContent`
  - Carbon Icons: `Home`, `Bar`, `Calendar`, `Location`, `LogoInstagram`
  - SvelteKit: `$app/stores`（`$page.url.pathname` で `isSelected` 制御）
- Props/State
  - ローカル状態: `isSideNavOpen: boolean`
- 補足
  - タイトルは「日本酒ゴーアラウンド金沢2024」
  - TODO コメントに色変更のスタイル配置に関するメモあり（スタイル責務の整理候補）

### routes/+layout.svelte
- 役割
  - Carbon の `Theme`（`g10`）とグリッドレイアウト、`Header` の設置、`<slot />` で内容を描画。
- 主要依存
  - Carbon: `Theme`, `Content`, `Grid`, `Row`, `Column`
  - `carbon-components-svelte/css/g10.css` を読み込み

### routes/+layout.ts
- 役割
  - `@vercel/analytics` の `inject` を `dev/production` で切り替え実行。

## データ表示系

### TopStoreList.svelte
- 役割
  - トップページで簡易な店舗一覧を表形式で表示（店舗名/蔵元/開催時間）。
- Props
  - `stores: Store[]`
- 主要依存
  - Carbon: `StructuredList` 系
  - 子コンポーネント: `BusinessTimeCell`, `SnsUrls`
- 表示仕様
  - 店舗名は `/stores/{id}` へのリンク
  - 店舗/蔵元それぞれの SNS を `SnsUrls` で表示
  - 開催時間は `BusinessTimeCell` で `HH:mm` 形式表示（休憩時間対応）

### StoreCard.svelte
- 役割
  - 一覧ページ（/stores）でのカード表示。クリックで詳細へ遷移。
- Props
  - `store: Store`
- 主要依存
  - Carbon: `Tile`, `StructuredList` 系, `ImageLoader`, `InlineLoading`
  - SvelteKit: `goto`（`on:click={() => goto('./stores/' + store.id)}`）
  - 子コンポーネント: `BusinessTimeCell`
- 表示仕様
  - 店舗画像: `./stores/{id}.webp`（相対参照）
  - 蔵元名、料金（お通し価格）、お通し内容、開催時間、補足事項（あれば）を表形式で表示
- 注意
  - 画像は `./` 相対参照。将来的にはルート相対（`/stores/{id}.webp`）に統一すると一貫性が上がる

### SnsUrls.svelte
- 役割
  - SNS リンク（X/Facebook/Instagram/Website）をアイコンで表示（存在するもののみ）。
- Props
  - `snsUrls: SnsUrls`
- 主要依存
  - Carbon Icons: `LogoTwitter`, `LogoFacebook`, `LogoInstagram`, `Home`
- 表示仕様
  - 新規タブ（`target="_blank"`）でリンクを開く

### BusinessTimeCell.svelte
- 役割
  - 開催時間の表示。休憩時間帯があるケースに対応。
- Props
  - `salesStartTime: Date`
  - `salesEndTime: Date`
  - `salesBreakStartTime: Date | null`
  - `salesBreakEndTime: Date | null`
  - `additionalNotes: string | null = null`
- 主要依存
  - Carbon: `StructuredListCell`
  - `date-fns/format`（`HH:mm`）
- 表示仕様
  - 休憩がある: `start - breakStart` と `breakEnd - end` を改行で表示
  - 休憩なし: `start - end` のみ
  - `additionalNotes` があれば追記（一覧では `※` を付与して表示）

## ルート固有のページ

### routes/+page.svelte（トップ）
- 役割
  - 告知（終了トースト）、開催説明、LINE/Instagram/地図のリンク、`TopStoreList` を表示。
- 主要依存
  - Carbon: `ToastNotification`, `Grid`, `Row`, `Column`, `ImageLoader`, `InlineLoading`, `OrderedList`, `ListItem`
- データ受け渡し
  - 上位の `+page.ts` から `data: Stores` を受け取り、`TopStoreList` へ横流し。

### routes/stores/+page.svelte（一覧）
- 役割
  - `StoreCard` をグリッドで並べて表示。クリックで詳細へ。

### routes/stores/[storeId]/+page.svelte（詳細）
- 役割
  - 店舗情報の詳細（住所/電話/SNS/時間/補足）を表示。
- 主要依存
  - Carbon: `ImageLoader`, `Tile`, `StructuredList` 系
  - 子コンポーネント: `BusinessTimeCell`, `SnsUrls`

## 依存関係と設計メモ

- コンポーネントの責務分割
  - 時間表示の分離（BusinessTimeCell）により、表示フォーマットの変更が容易
  - SNS 表示の分離（SnsUrls）により、リンク有無の判定とアイコン表示を集約
- UI ライブラリ
  - Carbon のグリッド/リスト/通知/画像ローダを活用
  - テーマは `g10`（`+layout.svelte`）
- 画像
  - `ImageLoader` の `loading`/`error` スロットで UI を提供
  - 実寸と `height/width` の見直しでレイアウト安定性と LCP の改善余地あり

## 使用例（抜粋）

```svelte
<!-- TopStoreList.svelte -->
<StructuredListBody>
  {#each stores as store}
    <StructuredListRow>
      <StructuredListCell>
        <a href={'/stores/' + store.id}>{store.name}</a><br />
        <SnsUrls snsUrls={store.snsUrls} />
      </StructuredListCell>
      <StructuredListCell>
        {store.kuramoto.name}<br />
        <SnsUrls snsUrls={store.kuramoto.snsUrls} />
      </StructuredListCell>
      <BusinessTimeCell
        salesStartTime={store.salesStartTime}
        salesEndTime={store.salesEndTime}
        salesBreakStartTime={store.salesBreakStartTime}
        salesBreakEndTime={store.salesBreakEndTime}
        additionalNotes={store.additionalNotes}
      />
    </StructuredListRow>
  {/each}
</StructuredListBody>
```

```svelte
<!-- StoreCard.svelte -->
<Tile on:click={() => goto('./stores/' + store.id)}>
  <h3>{store.name}</h3>
  <ImageLoader src={'./stores/' + store.id + '.webp'} ... />
  <StructuredList flush>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell>蔵元</StructuredListCell>
        <StructuredListCell>{store.kuramoto.name}</StructuredListCell>
      </StructuredListRow>
      <!-- 料金/お通し/開催時間/補足 など -->
    </StructuredListBody>
  </StructuredList>
</Tile>
```

## 改善余地（提案）

- 参照パス統一
  - 画像/リンクはルート相対（`/stores/{id}.webp`）に統一し、相対参照を削減
- スタイルの外出し
  - インライン `style` をクラス化し、テーマ/レイアウトの責務を整理
- 型/バリデーション
  - `additionalNotes` の扱い（空文字 vs null）を統一
  - Zod などでデータスキーマを検証
- アクセシビリティ
  - アイコンリンクの `aria-label` 追加
  - キーボード操作（カードに `role="link"` + Enter 対応等）を検討
