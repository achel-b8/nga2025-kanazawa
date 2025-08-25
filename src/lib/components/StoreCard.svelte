<script lang="ts">
  import type { StoreWithParticipation } from '../../types/stores.d.js';
  import BusinessTimeCell from './BusinessTimeCell.svelte';
  import SnsUrls from './SnsUrls.svelte';
  
  export let store: StoreWithParticipation;
  export let showImage: boolean = true;
  export let compact: boolean = false;
  export let clickable: boolean = true;

  // 画像のパス生成
  function getStoreImagePath(storeId: number): string {
    return `/stores/${storeId}.webp`;
  }

  // クリックハンドラ
  function handleClick() {
    if (clickable) {
      window.location.href = `/stores/${store.id}`;
    }
  }

  // キーボードハンドラ
  function handleKeydown(event: KeyboardEvent) {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
  }

  // 参加状況のバッジ
  $: participationBadge = store.isFirstTime ? '初参加' : `${store.continuousYears}回目`;
  $: badgeColor = store.isFirstTime ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
</script>

{#if clickable}
  <div
    class="rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
    style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);"
    role="button"
    tabindex="0"
    on:click={handleClick}
    on:keydown={handleKeydown}
    aria-label={`${store.name}の詳細を見る`}
  >
    <!-- 画像セクション -->
    {#if showImage && !compact}
      <div class="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={getStoreImagePath(store.id)}
          alt={store.name}
          class="w-full h-48 object-cover"
          loading="lazy"
          on:error={(e) => {
            // 画像読み込みエラー時の処理
            const target = e.target as HTMLImageElement;
            if (target) {
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }
          }}
        />
        <!-- 画像読み込みエラー時のフォールバック -->
        <div class="hidden w-full h-48 bg-gray-100 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <svg class="mx-auto h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm">画像なし</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- コンテンツセクション -->
    <div class="p-4 space-y-3" class:p-3={compact}>
      <!-- ヘッダー部分 -->
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-900 mb-1" class:text-base={compact}>
            {store.name}
          </h3>
          <p class="text-sm text-gray-600 mb-2">
            {store.address}
          </p>
        </div>
        
        <!-- 参加バッジ -->
        <div class="flex-shrink-0 ml-2">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full {badgeColor}">
            {participationBadge}
          </span>
        </div>
      </div>

      <!-- 酒蔵情報 -->
      <div class="flex items-center space-x-2">
        <div class="text-xs text-gray-500 font-medium">蔵元</div>
        <div class="text-sm font-medium text-gray-900">
          {store.breweryName}
        </div>
        <div class="text-xs text-gray-500">
          ({store.breweryPrefecture})
        </div>
      </div>

      {#if !compact}
        <!-- 詳細情報 -->
        <div class="grid grid-cols-1 gap-3 text-sm">
          <!-- 料金・お通し -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-gray-500 mb-1">料金</dt>
              <dd class="font-medium text-gray-900">
                ¥{store.appetizerPrice?.toLocaleString() || '未定'}
              </dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-gray-500 mb-1">お通し</dt>
              <dd class="text-gray-900 truncate" title={store.appetizer}>
                {store.appetizer || '未定'}
              </dd>
            </div>
          </div>

          <!-- 営業時間 -->
          <div>
            <dt class="text-xs font-medium text-gray-500 mb-1">開催時間</dt>
            <dd>
              <BusinessTimeCell
                businessHours={store.businessHours}
                additionalNotes={store.additionalNotes}
                compact={true}
                showIcon={false}
              />
            </dd>
          </div>

          <!-- SNSリンク -->
          {#if store.snsUrls}
            <div class="flex items-center justify-between pt-2">
              <div class="text-xs font-medium text-gray-500">SNS</div>
              <SnsUrls snsUrls={store.snsUrls} size="sm" variant="simple" />
            </div>
          {/if}
        </div>
      {:else}
        <!-- コンパクト表示 -->
        <div class="flex items-center justify-between text-sm">
          <div class="text-gray-900">
            ¥{store.appetizerPrice?.toLocaleString() || '未定'}
          </div>
          <div class="text-xs text-gray-500">
            {store.businessHours.startTime}〜{store.businessHours.endTime}
          </div>
        </div>
      {/if}

      <!-- 酒蔵来店情報 -->
      {#if store.breweryVisit?.startTime && store.breweryVisit?.endTime}
        <div class="bg-amber-50 rounded-md p-2 mt-3">
          <div class="flex items-center">
            <svg class="h-4 w-4 text-amber-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="text-xs font-medium text-amber-800">
              酒蔵来店: {store.breweryVisit.startTime}〜{store.breweryVisit.endTime}
            </span>
          </div>
        </div>
      {/if}
    </div>
  </div>
{:else}
  <article class="rounded-lg overflow-hidden" style="background-color: var(--neutral-surface); border: 1px solid var(--neutral-border);">
    <!-- 画像セクション -->
    {#if showImage && !compact}
      <div class="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={getStoreImagePath(store.id)}
          alt={store.name}
          class="w-full h-48 object-cover"
          loading="lazy"
          on:error={(e) => {
            // 画像読み込みエラー時の処理
            const target = e.target as HTMLImageElement;
            if (target) {
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }
          }}
        />
        <!-- 画像読み込みエラー時のフォールバック -->
        <div class="hidden w-full h-48 bg-gray-100 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <svg class="mx-auto h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm">画像なし</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- コンテンツセクション -->
    <div class="p-4 space-y-3" class:p-3={compact}>
      <!-- ヘッダー部分 -->
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-900 mb-1" class:text-base={compact}>
            {store.name}
          </h3>
          <p class="text-sm text-gray-600 mb-2">
            {store.address}
          </p>
        </div>
        
        <!-- 参加バッジ -->
        <div class="flex-shrink-0 ml-2">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full {badgeColor}">
            {participationBadge}
          </span>
        </div>
      </div>

      <!-- 酒蔵情報 -->
      <div class="flex items-center space-x-2">
        <div class="text-xs text-gray-500 font-medium">蔵元</div>
        <div class="text-sm font-medium text-gray-900">
          {store.breweryName}
        </div>
        <div class="text-xs text-gray-500">
          ({store.breweryPrefecture})
        </div>
      </div>

      {#if !compact}
        <!-- 詳細情報 -->
        <div class="grid grid-cols-1 gap-3 text-sm">
          <!-- 料金・お通し -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <dt class="text-xs font-medium text-gray-500 mb-1">料金</dt>
              <dd class="font-medium text-gray-900">
                ¥{store.appetizerPrice?.toLocaleString() || '未定'}
              </dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-gray-500 mb-1">お通し</dt>
              <dd class="text-gray-900 truncate" title={store.appetizer}>
                {store.appetizer || '未定'}
              </dd>
            </div>
          </div>

          <!-- 営業時間 -->
          <div>
            <dt class="text-xs font-medium text-gray-500 mb-1">開催時間</dt>
            <dd>
              <BusinessTimeCell
                businessHours={store.businessHours}
                additionalNotes={store.additionalNotes}
                compact={true}
                showIcon={false}
              />
            </dd>
          </div>

          <!-- SNSリンク -->
          {#if store.snsUrls}
            <div class="flex items-center justify-between pt-2">
              <div class="text-xs font-medium text-gray-500">SNS</div>
              <SnsUrls snsUrls={store.snsUrls} size="sm" variant="simple" />
            </div>
          {/if}
        </div>
      {:else}
        <!-- コンパクト表示 -->
        <div class="flex items-center justify-between text-sm">
          <div class="text-gray-900">
            ¥{store.appetizerPrice?.toLocaleString() || '未定'}
          </div>
          <div class="text-xs text-gray-500">
            {store.businessHours.startTime}〜{store.businessHours.endTime}
          </div>
        </div>
      {/if}

      <!-- 酒蔵来店情報 -->
      {#if store.breweryVisit?.startTime && store.breweryVisit?.endTime}
        <div class="bg-amber-50 rounded-md p-2 mt-3">
          <div class="flex items-center">
            <svg class="h-4 w-4 text-amber-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="text-xs font-medium text-amber-800">
              酒蔵来店: {store.breweryVisit.startTime}〜{store.breweryVisit.endTime}
            </span>
          </div>
        </div>
      {/if}
    </div>
  </article>
{/if}