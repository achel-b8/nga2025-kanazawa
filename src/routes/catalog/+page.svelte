<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import StoreCard from '$lib/components/StoreCard.svelte';
  import StoreList from '$lib/components/StoreList.svelte';
  import CTA from '$lib/components/CTA.svelte';
  import SkipLink from '$lib/components/SkipLink.svelte';
  import { sampleStore, sampleStoreList } from '$lib/data/sample-data';

  const sampleStores = sampleStoreList;
</script>

<svelte:head>
  <title>コンポーネントカタログ | 日本酒ゴーアラウンド金沢</title>
  <meta name="description" content="日本酒ゴーアラウンド金沢で使用されているコンポーネントのカタログ" />
</svelte:head>

<div class="min-h-screen" style="background-color: var(--color-bg);">
  <!-- ヘッダー -->
  <div class="mb-8" style="background-color: var(--brand-accent-bg);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold" style="color: var(--brand-primary);">コンポーネントカタログ</h1>
      <p class="mt-2" style="color: var(--neutral-text);">実装済みの主要コンポーネント一覧</p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-16">
    <!-- SkipLink Component -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">SkipLink</h2>
      <p class="mb-6" style="color: var(--neutral-text);">アクセシビリティのためのスキップリンク（通常は非表示）</p>
      <div class="rounded-lg p-4" style="background-color: var(--brand-accent-bg);">
        <p class="text-sm mb-2" style="color: var(--neutral-text);">※ Tabキーでフォーカスすると表示されます</p>
        <SkipLink />
      </div>
    </section>

    <!-- Hero Component -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">Hero</h2>
      <p class="mb-6" style="color: var(--neutral-text);">メインビジュアルとキャッチコピー</p>
      <div class="rounded-lg overflow-hidden shadow-sm">
        <Hero />
      </div>
    </section>

    <!-- Header Component -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">Header</h2>
      <p class="mb-6" style="color: var(--neutral-text);">サイトのナビゲーションヘッダー</p>
      <div class="rounded-lg overflow-hidden shadow-sm">
        <Header />
      </div>
      <div class="mt-4 p-4 rounded-lg" style="background-color: var(--color-accent-light);">
        <p class="text-sm" style="color: var(--brand-primary);">
          💡 レスポンシブ対応：画面幅を狭めるとハンバーガーメニューに切り替わります
        </p>
      </div>
    </section>

    <!-- StoreCard Component -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">StoreCard</h2>
      <p class="mb-6" style="color: var(--neutral-text);">店舗情報を表示するカードコンポーネント</p>
      <div class="max-w-md mx-auto">
        <StoreCard store={sampleStore} />
      </div>
    </section>

    <!-- StoreList Component -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">StoreList</h2>
      <p class="mb-6" style="color: var(--neutral-text);">店舗一覧を表示するリストコンポーネント</p>
      <div class="rounded-lg p-6" style="background: linear-gradient(to bottom, white, var(--color-accent-light));">
        <StoreList stores={sampleStores.slice(0, 3)} />
      </div>
    </section>

    <!-- CTA Component -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">CTA (Call to Action)</h2>
      <p class="mb-6" style="color: var(--neutral-text);">アクションを促すセクション</p>
      <div class="rounded-lg overflow-hidden shadow-sm">
        <CTA text="参加店舗を見る" href="/stores" />
      </div>
    </section>

    <!-- Button Styles -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">ボタンスタイル</h2>
      <p class="mb-6" style="color: var(--neutral-text);">各種ボタンのスタイル一覧</p>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3" style="color: var(--neutral-text);">プライマリボタン（ベンガラ）</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <button class="btn-primary">通常状態</button>
            <button class="btn-primary" disabled>無効状態</button>
            <a href="/stores" class="btn-primary">リンクボタン</a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3" style="color: var(--neutral-text);">アクセントボタン（金色）</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <button class="btn-accent">通常状態</button>
            <button class="btn-accent" disabled style="opacity: 0.5; cursor: not-allowed;">無効状態</button>
            <button class="btn-accent">
              <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              お気に入り
            </button>
            <button class="btn-accent px-6 py-3 text-base">大きいボタン</button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3" style="color: var(--neutral-text);">セカンダリボタン（インディゴ）</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <button class="btn-secondary">通常状態</button>
            <button class="btn-secondary" disabled>無効状態</button>
            <button class="btn-secondary px-3 py-1.5 text-xs">小さいボタン</button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3" style="color: var(--neutral-text);">状態カラーボタン</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-white" style="background-color: var(--color-success);">
              <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              成功
            </button>
            <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-white" style="background-color: var(--color-warning);">
              <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              警告
            </button>
            <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-white" style="background-color: var(--color-error);">
              <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              エラー
            </button>
            <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-white" style="background-color: var(--color-info);">
              <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              情報
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Color Palette -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">カラーパレット</h2>
      <p class="mb-6" style="color: var(--neutral-text);">テーマカラーの一覧</p>
      <div class="space-y-6">
        <!-- メインカラー -->
        <div>
          <h3 class="text-lg font-semibold mb-3" style="color: var(--neutral-text);">メインカラー</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-primary);"></div>
              <p class="text-sm font-medium">Primary</p>
              <p class="text-xs" style="color: var(--neutral-muted);">ベンガラ #7A2814</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-accent);"></div>
              <p class="text-sm font-medium">Accent</p>
              <p class="text-xs" style="color: var(--neutral-muted);">金 #B48945</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-secondary);"></div>
              <p class="text-sm font-medium">Secondary</p>
              <p class="text-xs" style="color: var(--neutral-muted);">インディゴ #1E3A56</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-text);"></div>
              <p class="text-sm font-medium text-white">Text</p>
              <p class="text-xs" style="color: var(--neutral-muted);">#121212</p>
            </div>
          </div>
        </div>

        <!-- 派生カラー -->
        <div>
          <h3 class="text-lg font-semibold mb-3" style="color: var(--neutral-text);">派生カラー</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-primary-light);"></div>
              <p class="text-sm font-medium">Primary Light</p>
              <p class="text-xs" style="color: var(--neutral-muted);">#F2E4E0</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-accent-light);"></div>
              <p class="text-sm font-medium">Accent Light</p>
              <p class="text-xs" style="color: var(--neutral-muted);">#EFE6D7</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-bg);"></div>
              <p class="text-sm font-medium">Background</p>
              <p class="text-xs" style="color: var(--neutral-muted);">#F5F2EC</p>
            </div>
          </div>
        </div>

        <!-- 状態カラー -->
        <div>
          <h3 class="text-lg font-semibold mb-3" style="color: var(--neutral-text);">状態カラー</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-success);"></div>
              <p class="text-sm font-medium">Success</p>
              <p class="text-xs" style="color: var(--neutral-muted);">モス #2F5D50</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-warning);"></div>
              <p class="text-sm font-medium">Warning</p>
              <p class="text-xs" style="color: var(--neutral-muted);">金濃色 #A8772A</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-error);"></div>
              <p class="text-sm font-medium">Error</p>
              <p class="text-xs" style="color: var(--neutral-muted);">朱寄り #B33430</p>
            </div>
            <div>
              <div class="h-20 rounded-lg mb-2" style="background-color: var(--color-info);"></div>
              <p class="text-sm font-medium">Info</p>
              <p class="text-xs" style="color: var(--neutral-muted);">インディゴ #1E3A56</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">タイポグラフィ</h2>
      <p class="mb-6" style="color: var(--neutral-text);">テキストスタイルの一覧</p>
      <div class="space-y-4">
        <div>
          <p class="text-3xl font-bold" style="color: var(--color-primary);">見出し1 (3xl/bold)</p>
        </div>
        <div>
          <p class="text-2xl font-bold" style="color: var(--color-primary);">見出し2 (2xl/bold)</p>
        </div>
        <div>
          <p class="text-xl font-semibold" style="color: var(--color-text);">見出し3 (xl/semibold)</p>
        </div>
        <div>
          <p class="text-lg font-medium" style="color: var(--color-text);">サブタイトル (lg/medium)</p>
        </div>
        <div>
          <p class="text-base" style="color: var(--color-text);">本文テキスト (base/regular)</p>
        </div>
        <div>
          <p class="text-sm" style="color: var(--color-text); opacity: 0.8;">キャプション (sm/regular)</p>
        </div>
        <div>
          <p class="text-xs" style="color: var(--color-text); opacity: 0.6;">補足テキスト (xs/regular)</p>
        </div>
      </div>
    </section>

    <!-- Footer Component -->
    <section class="rounded-lg p-8" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--brand-primary);">Footer</h2>
      <p class="mb-6" style="color: var(--neutral-text);">サイトのフッター</p>
      <div class="rounded-lg overflow-hidden shadow-sm">
        <Footer />
      </div>
    </section>
  </div>
</div>