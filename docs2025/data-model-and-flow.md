# データモデルと取得フロー（2025 仕様・改訂版）

本ドキュメントは 2025 年度サイトのデータスキーマと、SvelteKit による取得/利用方針を定義する恒久仕様である。店舗・酒蔵のマスターと、年度ごとの参加情報を分離して管理する。

- データ源: 静的 JSON（API サーバーは用いない）
- マスター: `/static/stores.json`, `/static/breweries.json`
- 年度データ: `/static/{year}/participations.json`
- 画像: `/static/stores/{id}.webp`, `/static/breweries/{id}.webp`（WebP 推奨）
- 2025 ページでは過年度の本文は表示しない（「初参加/継続回数」の指標のみ表示）
- レンダリング原則: 相対 `fetch` ＋ プリレンダー（各ページで `export const prerender = true` を推奨）

## 1. ファイル配置（標準）

- 店舗マスター: `/static/stores.json`
- 酒蔵マスター: `/static/breweries.json`
- 参加情報（年度別）: `/static/{year}/participations.json`（例: `/static/2025/participations.json`）
- 画像例
  - 店舗: `/static/stores/1.webp`（数値ID.webp）
  - 酒蔵: `/static/breweries/brewery-zzz.webp`

## 2. 型定義（ベース）

```ts
// すべてのプロパティが null を取り得る Web 型
export type Web = {
  web: string | null;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
};

export type Geo = { lat: number; lng: number };

// 店舗マスター
export type Store = {
  id: number;            // 数値ID（既存システムとの互換性維持）
  name: string;
  area?: string;         // 任意
  address?: string;      // 任意（地図リンク用）
  geo?: Geo | null;      // 任意
  sns: Web;              // 全キーは string|null
  image?: string;        // 例: "/stores/1.webp"（数値IDを使用）
};

// 酒蔵マスター
export type Brewery = {
  id: string;            // kebab-case
  name: string;
  prefecture: Prefecture;
  sns: Web;              // 全キーは string|null
  logo?: string;         // 例: "/breweries/brewery-zzz.webp"
};

export type Prefecture = '北海道' | '青森' | '岩手' | '宮城' | '秋田' | '山形' | '福島' | '茨城' | '栃木' | '群馬' | '埼玉' | '千葉' | '東京' | '神奈川' | '新潟' | '富山' | '石川' | '福井' | '山梨' | '長野' | '岐阜' | '静岡' | '愛知' | '三重' | '滋賀' | '京都' | '大阪' | '兵庫' | '奈良' | '和歌山' | '鳥取' | '島根' | '岡山' | '広島' | '山口' | '徳島' | '香川' | '愛媛' | '高知' | '福岡' | '佐賀' | '長崎' | '熊本' | '大分' | '宮崎' | '鹿児島' | '沖縄';

// 年度ごとの参加情報（1レコード=1店舗の参加。酒蔵は1件） 価格情報やつまみ情報などを追記予定
export type Participation = {
  year: 2025 | 2024 | 2023;      // 参加年度（Union型）
  store_id: number;               // Store.id への参照（数値）
  brewery_id: string;             // Brewery.id への参照（単一）
  salesStartTime: string;         // ISO8601形式 例: "2025-10-01T15:00:00"
  salesEndTime: string;           // ISO8601形式 例: "2025-10-01T21:00:00"
  salesBreakStartTime?: string;  // 中断開始時刻（任意）
  salesBreakEndTime?: string;    // 中断終了時刻（任意）
  appetizer?: string;             // お通し内容（任意）
  appetizerPrice?: number;        // お通し価格（任意）
};

export type Stores = { stores: Store[] };
export type Breweries = { breweries: Brewery[] };
export type Participations = { year: number; participations: Participation[] };
```

補足
- 旧スキーマに存在した `tags` は廃止。
- 営業時間は ISO8601 形式で「参加情報」に含める（マスター側には置かない）。
- `Web` は全キーを必須としつつ `string | null` を許容する（存在しない場合は `null` を入れる）。
- Prefecture 型は実装時に `src/types/constants.ts` などに分離することを推奨。
- 店舗IDは既存システムとの互換性のため数値型を維持。

## 3. JSON 例

店舗マスター（`/static/stores.json`）
```json
{
  "stores": [
    {
      "id": 1,
      "name": "居酒屋AAA",
      "area": "片町",
      "address": "金沢市…",
      "geo": { "lat": 36.56, "lng": 136.65 },
      "sns": { "web": "https://example.com", "twitter": null, "instagram": "https://instagram.com/aaa", "facebook": null },
      "image": "/stores/1.webp"
    },
    {
      "id": 2,
      "name": "日本酒バーBBB",
      "area": "香林坊",
      "sns": { "web": null, "twitter": null, "instagram": null, "facebook": null }
    }
  ]
}
```

酒蔵マスター（`/static/breweries.json`）
```json
{
  "breweries": [
    {
      "id": "brewery-zzz",
      "name": "蔵元ZZZ",
      "prefecture": "石川県",
      "sns": { "web": "https://brewery.zzz.jp", "twitter": null, "instagram": null, "facebook": null },
    }
  ]
}
```

参加情報（`/static/2025/participations.json`）
```json
{
  "year": 2025,
  "participations": [
    {
      "year": 2025,
      "store_id": 1,
      "brewery_id": "brewery-zzz",
      "salesStartTime": "2025-10-01T15:00:00",
      "salesEndTime": "2025-10-01T21:00:00",
      "appetizer": "地元野菜の煮物、能登産小魚の南蛮漬け",
      "appetizerPrice": 800
    },
    {
      "year": 2025,
      "store_id": 2,
      "brewery_id": "brewery-zzz",
      "salesStartTime": "2025-10-01T16:00:00",
      "salesEndTime": "2025-10-01T22:00:00",
      "salesBreakStartTime": "2025-10-01T18:00:00",
      "salesBreakEndTime": "2025-10-01T19:00:00"
    }
  ]
}
```

## 4. UI 派生指標（年度ページのバッジ）

当該年度（例: 2025）の一覧/詳細で使用する派生指標は「初参加」「継続回数」。  
全年度の参加情報から Store ごとの参加年リストを導出して算出する。

- 参加年の導出（擬似）:
  - `years = allParticipations.filter(p => p.store_id === store.id).map(p => p.year)`
- 初参加:
  - `is_first_timer = Math.min(...years) === currentYear && years.length === 1`
- 継続回数:
  - `participation_count = years.length`

注: 当該年度に「参加していない店舗」を 2025 ページに表示しないのはルーティング側の責任（参加情報に紐づく店舗のみ表示）。

## 5. 取得フロー（SvelteKit `load` の基本）

- 2025 ページ（`/`, `/stores`, `/stores/[storeId]`）では最低限、以下を取得する:
  - `/stores.json`（店舗マスター）
  - `/breweries.json`（酒蔵マスター）
  - `/2025/participations.json`（当年度の参加情報）
- 年度付きページ（`/{year}/…`）では `params.year` に応じた `/{year}/participations.json` を参照。

擬似コード（2025 一覧）
```ts
export const load = async ({ fetch }) => {
  const [storesRes, breweriesRes, partsRes] = await Promise.all([
    fetch('/stores.json'),
    fetch('/breweries.json'),
    fetch('/2025/participations.json')
  ]);
  if (!storesRes.ok || !breweriesRes.ok || !partsRes.ok) throw new Error('Failed to load data');

  const { stores } = (await storesRes.json()) as Stores;
  const { breweries } = (await breweriesRes.json()) as Breweries;
  const { year, participations } = (await partsRes.json()) as Participations;

  const byStore = new Map(stores.map((s) => [s.id, s]));
  const byBrewery = new Map(breweries.map((b) => [b.id, b]));

  const list = participations
    .map((p) => {
      const store = byStore.get(p.store_id);
      const brewery = byBrewery.get(p.brewery_id);
      return store ? { year, store, brewery, participation: p } : null;
    })
    .filter((row): row is { year: number; store: Store; brewery?: Brewery; participation: Participation } => !!row);

  return { year, list };
};
```

擬似コード（2025 詳細）
```ts
export const load = async ({ fetch, params }) => {
  const [storesRes, breweriesRes, partsRes] = await Promise.all([
    fetch('/stores.json'),
    fetch('/breweries.json'),
    fetch('/2025/participations.json')
  ]);
  if (!storesRes.ok || !breweriesRes.ok || !partsRes.ok) throw new Error('Failed to load data');

  const { stores } = (await storesRes.json()) as Stores;
  const { breweries } = (await breweriesRes.json()) as Breweries;
  const { year, participations } = (await partsRes.json()) as Participations;

  const store = stores.find((s) => s.id === params.storeId);
  const part = participations.find((p) => p.store_id === params.storeId);
  if (!store || !part) {
    throw error(404, 'Not found');
  }
  const brewery = breweries.find((b) => b.id === part.brewery_id);
  return { year, store, brewery, participation: part };
};
```

## 6. ID 命名規約/安定性

本節の出典は `docs2025/conventions.md` の「7. 命名規約／ファイル規約」。詳細な規約はそちらに集約し、本書では重複記載を行わない。

## 7. 編集ワークフロー（運用）

- マスター（stores/breweries）と年度データ（participations）を分け、PR 単位で差分を明確化
- 参加情報を追加する場合は `/{year}/participations.json` のみ変更（マスターは不変が原則）
- 画像の差し替えはファイル名更新でキャッシュ無害化（同名上書きを避ける）

## 8. a11y/表記・表示ルール（データ関連）

本節の出典は `docs2025/conventions.md` の「5. アクセシビリティ（a11y）」ほか関連項。表示ルールの詳細は conventions に集約し、本書では重複記載を行わない。

## 9. 後方互換・移行ポリシー

- 2024/2023 のデータが旧構成の場合は、参照側で吸収するか段階的に新構成へ移行
- 年度間で構造差分が生じる場合は、参照時に安全なフォールバックを実装
- 年度ごとの参加情報のみで一覧/詳細を構成できることを原則とし、マスターと分離する

### データ移行戦略

#### 既存データからの変換
- 店舗ID: 既存の数値IDをそのまま使用（互換性維持）
- 営業時間: 既存の ISO8601 形式をそのまま利用
- 酒蔵情報: ネストされた `kuramoto` から brewery_id への参照に変換
- 画像ファイル: 既存の数値ID形式（`1.webp`）をそのまま維持

#### 移行手順
1. 既存 stores.json から店舗マスターと参加情報を分離
2. 酒蔵情報の抽出とマスター化（brewery_id は kebab-case で新規作成）
3. 年度別 participations.json の生成
4. SNS情報のフォーマット統一（null値の明示的設定）

## 10. 関連リンク

- `docs2025/architecture-overview.md`
- `docs2025/routing-and-pages.md`
- `docs2025/components.md`
- `docs2025/conventions.md`
