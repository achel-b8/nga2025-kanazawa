# テスト方針

本プロジェクトは Vitest + Testing Library + jsdom を用いたコンポーネント/ルートのテストを採用している。

- ランナー: Vitest（Jest 互換 API の一部）
- DOM 環境: jsdom
- UI テスト: @testing-library/svelte + @testing-library/jest-dom
- セットアップ: `src/setupTests.ts`（`jest-dom` の拡張と `ResizeObserver` のスタブ）

## 依存関係と設定

package.json（抜粋）
- `vitest`, `@testing-library/svelte`, `@testing-library/jest-dom`, `jsdom`

Vite 設定: `vite.config.ts`
- `test.include`: `src/**/*.{test,spec}.{js,ts}`
- `test.environment`: `jsdom`
- `test.globals`: `true`
- `test.setupFiles`: `./src/setupTests.ts`
- `build.rollupOptions.external`: `['**/*.test.ts', '**/*.spec.ts']` → 本番ビルドからテストを除外

セットアップ: `src/setupTests.ts`
- `import '@testing-library/jest-dom'`
- `ResizeObserver` のスタブ（Carbon コンポーネントなどで必要になるケースを吸収）

補足:
- `tests/setupTests.ts` にも同様のスタブが存在（重複）。実際に参照されるのは `vite.config.ts` で指示した `./src/setupTests.ts`。1 箇所に統一可能。

## テスト配置

- ルート直下や各ディレクトリに `.test.ts` を併設（SvelteKit のルート/コンポーネント）
  - 例: `src/routes/page.test.ts`, `src/components/StoreCard.test.ts` など
- モック: `tests/mocks/storesMock.ts`

## 実行方法

- すべてのテストを実行
  - `npm run test`
- ウォッチモード（推奨）
  - `npx vitest --watch`（または IDE の拡張機能）

## テスト作法（推奨）

- Testing Library の原則
  - 実装詳細に依存せず、ユーザ視点のクエリ（`getByRole`, `getByText`, `getByLabelText`）を優先
  - 非同期は `findBy*`/`waitFor` を活用
- アクセシビリティに配慮したセレクタ
  - `role` と `name`（アクセシブルネーム）で取得
- スナップショットは最小限
  - レイアウト変更に脆弱なため、ロール/テキストベースのアサーションを優先
- ルートの `load` 関数
  - SvelteKit の単体テストでは、`fetch` のモックやデータモック（`tests/mocks/storesMock.ts`）を用意
  - 必要に応じて `vi.fn()` で `fetch` を差し替え
- 画像/外部リソース
  - `ImageLoader` の `loading`/`error` スロットは文字列で検証可能
  - 実画像取得を伴わないようにモック/スタブで分離

## 例: コンポーネントの描画

```ts
import { render, screen } from '@testing-library/svelte';
import TopStoreList from '$components/TopStoreList.svelte';
import { stores } from '../../tests/mocks/storesMock'; // 例

test('店舗名が表示される', () => {
  render(TopStoreList, { props: { stores } });
  expect(screen.getByRole('link', { name: stores[0].name })).toBeInTheDocument();
});
```

## 例: ルートの load を単体で検証する際の考え方

- `fetch` をモックし、`/stores.json` の応答を `RawStores` 形式で返す
- `formatStoreResponse` により `Date` が渡ることを確認
- `error(404, ...)` の分岐をハッピーパス/異常系でテスト

```ts
import { load } from '$routes/stores/+page';
import { describe, it, expect, vi } from 'vitest';

describe('stores/+page load', () => {
  it('stores.json を取得して正規化したデータを返す', async () => {
    const mockJson = { stores: [{ id: 1, salesStartTime: '2024-10-01 10:00:00', salesEndTime: '2024-10-01 12:00:00', salesBreakStartTime: null, salesBreakEndTime: null, name: 'foo', address: '', phoneNumber: '', seat: null, appetizer: null, appetizerPrice: null, timeLimit: null, additionalNotes: null, mapUrl: '', snsUrls: { twitterUrl: null, facebookUrl: null, instagramUrl: null, websiteUrl: null }, kuramoto: { name: 'bar', startTime: null, endTime: null, snsUrls: { twitterUrl: null, facebookUrl: null, instagramUrl: null, websiteUrl: null } } }] };
    const fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockJson) });

    const result = await load({ fetch } as any);
    expect(result.stores[0].salesStartTime).toBeInstanceOf(Date);
  });
});
```

## カバレッジ対象（推奨）

- コンポーネント
  - `StoreCard`（必須情報の表示/クリック遷移の有無）
  - `TopStoreList`（リンク/時間表示の整合）
  - `BusinessTimeCell`（休憩の有無で分岐、追加メモの表示）
  - `SnsUrls`（リンク存在時のみアイコン表示）
- ルート
  - `/` `/stores` `/stores/[storeId]` `/2023/stores`（load の正常系/異常系）
- レイアウト
  - `Header`（現在ページの `isSelected` 判定）

## 注意点/落とし穴

- 日時のパースはローカル依存となる場合があるため、テストでは固定値・UTC 変換などで誤差を考慮
- `ResizeObserver` 未定義エラーへの対策としてスタブ済み（セットアップで有効）
- 画像/外部リンクはモック前提で、ネットワークに依存しない
