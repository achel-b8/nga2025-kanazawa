<script lang="ts">
  import type { StoreWithParticipation } from '../../types/stores.d.js';
  import BusinessTimeCell from './BusinessTimeCell.svelte';
  import SnsUrls from './SnsUrls.svelte';
  import CTA from './CTA.svelte';
  
  export let store: StoreWithParticipation;

  // 画像のパス生成
  function getStoreImagePath(storeId: number): string {
    return `/stores/${storeId}.webp`;
  }

  // 電話番号のフォーマット
  function formatPhoneNumber(phone: string | undefined): string {
    if (!phone) return '';
    // ハイフンを追加（簡易版）
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  // 参加状況のバッジ
  $: participationBadge = store.isFirstTime ? '初参加' : `${store.continuousYears}回目`;
  $: badgeColor = store.isFirstTime ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
</script>

<article class="max-w-4xl mx-auto bg-white" itemscope itemtype="https://schema.org/Restaurant">
  <!-- パンくずナビ -->
  <nav class="mb-4" aria-label="パンくずナビ">
    <ol class="flex items-center space-x-2 text-sm text-gray-500">
      <li><a href="/" class="hover:text-gray-700  rounded-sm">ホーム</a></li>
      <li aria-hidden="true">/</li>
      <li><a href="/stores" class="hover:text-gray-700  rounded-sm">参加店舗</a></li>
      <li aria-hidden="true">/</li>
      <li class="text-gray-900 font-medium" aria-current="page">{store.name}</li>
    </ol>
  </nav>

  <!-- メインコンテンツ -->
  <div class="space-y-8">
    <!-- ヘッダーセクション -->
    <header class="text-center sm:text-left">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-3xl font-bold text-gray-900 mb-2" itemprop="name">
            {store.name}
          </h1>
          <div class="flex items-center justify-center sm:justify-start space-x-4 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span itemprop="address">{store.address}</span>
            </div>
          </div>
        </div>
        
        <!-- 参加バッジ -->
        <div class="mt-4 sm:mt-0 flex justify-center sm:justify-end">
          <span class="inline-flex px-3 py-1 text-sm font-medium rounded-full {badgeColor}">
            {participationBadge}
          </span>
        </div>
      </div>
    </header>

    <!-- 画像セクション -->
    <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
      <img
        src={getStoreImagePath(store.id)}
        alt={store.name}
        class="w-full h-64 sm:h-96 object-cover"
        loading="eager"
        itemprop="image"
        on:error={(e) => {
          const target = e.target as HTMLImageElement;
          if (target) {
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }
        }}
      />
      <!-- 画像読み込みエラー時のフォールバック -->
      <div class="hidden w-full h-64 sm:h-96 bg-gray-100 flex items-center justify-center rounded-lg">
        <div class="text-center text-gray-500">
          <svg class="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-lg">画像準備中</p>
        </div>
      </div>
    </div>

    <!-- 店舗情報グリッド -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 左カラム：基本情報 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 酒蔵情報 -->
        <section class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg class="h-5 w-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            提供酒蔵
          </h2>
          <div class="space-y-3">
            <div>
              <div class="text-lg font-medium text-gray-900">{store.breweryName}</div>
              <div class="text-sm text-gray-600">({store.breweryPrefecture})</div>
            </div>
            {#if store.brewerySnsUrls}
              <div>
                <div class="text-sm text-gray-600 mb-2">酒蔵SNS</div>
                <SnsUrls snsUrls={store.brewerySnsUrls} size="md" showLabels={true} />
              </div>
            {/if}
          </div>
        </section>

        <!-- イベント詳細 -->
        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg class="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            イベント詳細
          </h2>
          
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-6">
            <div>
              <dt class="text-sm font-medium text-gray-500 mb-1">料金</dt>
              <dd class="text-lg font-semibold text-gray-900" itemprop="priceRange">
                ¥{store.appetizerPrice?.toLocaleString() || '未定'}
              </dd>
            </div>
            
            <div>
              <dt class="text-sm font-medium text-gray-500 mb-1">お通し</dt>
              <dd class="text-base text-gray-900">
                {store.appetizer || '未定'}
              </dd>
            </div>
            
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500 mb-2">開催時間</dt>
              <dd>
                <BusinessTimeCell
                  businessHours={store.businessHours}
                  additionalNotes={store.additionalNotes}
                  compact={false}
                  showIcon={true}
                />
              </dd>
            </div>

            <!-- 座席数 -->
            {#if store.seat}
              <div>
                <dt class="text-sm font-medium text-gray-500 mb-1">座席数</dt>
                <dd class="text-base text-gray-900">{store.seat}席</dd>
              </div>
            {/if}

            <!-- 制限時間 -->
            {#if store.timeLimit}
              <div>
                <dt class="text-sm font-medium text-gray-500 mb-1">制限時間</dt>
                <dd class="text-base text-gray-900">{store.timeLimit}分</dd>
              </div>
            {/if}
          </dl>
        </section>

        <!-- 酒蔵来店情報 -->
        {#if store.breweryVisit?.startTime && store.breweryVisit?.endTime}
          <section class="rounded-lg p-4" style="background-color: var(--color-warning-light);">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-amber-800">
                  酒蔵来店予定
                </h3>
                <div class="mt-2 text-sm text-amber-700">
                  <p>
                    {store.breweryName}の方が店舗にいらっしゃいます<br>
                    時間: {store.breweryVisit.startTime} 〜 {store.breweryVisit.endTime}
                  </p>
                </div>
              </div>
            </div>
          </section>
        {/if}
      </div>

      <!-- 右カラム：アクション・連絡先 -->
      <div class="space-y-6">
        <!-- アクション -->
        <section class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">アクション</h2>
          <div class="space-y-3">
            {#if store.mapUrl}
              <CTA
                text="地図で確認"
                href={store.mapUrl}
                variant="primary"
                size="md"
                external={true}
                ariaLabel="Googleマップで{store.name}の場所を確認"
              />
            {/if}
            
            {#if store.phoneNumber}
              <CTA
                text="電話をかける"
                href="tel:{store.phoneNumber}"
                variant="secondary"
                size="md"
                ariaLabel="{store.name}に電話をかける"
              >
                <svelte:fragment slot="icon-left">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </svelte:fragment>
              </CTA>
            {/if}
            
            <CTA
              text="一覧に戻る"
              href="/stores"
              variant="outline"
              size="md"
            />
          </div>
        </section>

        <!-- 連絡先情報 -->
        <section>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">店舗情報</h2>
          <div class="space-y-4 text-sm">
            <div class="flex">
              <dt class="w-16 flex-shrink-0 text-gray-500">住所</dt>
              <dd class="text-gray-900">{store.address}</dd>
            </div>
            
            {#if store.phoneNumber}
              <div class="flex">
                <dt class="w-16 flex-shrink-0 text-gray-500">電話</dt>
                <dd class="text-gray-900">
                  <a href="tel:{store.phoneNumber}" class="hover:text-blue-600  rounded-sm">
                    {formatPhoneNumber(store.phoneNumber)}
                  </a>
                </dd>
              </div>
            {/if}

            {#if store.snsUrls}
              <div class="flex">
                <dt class="w-16 flex-shrink-0 text-gray-500">SNS</dt>
                <dd>
                  <SnsUrls snsUrls={store.snsUrls} size="sm" showLabels={true} />
                </dd>
              </div>
            {/if}
          </div>
        </section>

        <!-- 参加履歴 -->
        <section class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">参加履歴</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">参加回数</span>
              <span class="font-medium text-gray-900">{store.participationCount}回</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">連続参加</span>
              <span class="font-medium text-gray-900">{store.continuousYears}年</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">初参加年</span>
              <span class="font-medium text-gray-900">{store.year - store.participationCount + 1}年</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</article>