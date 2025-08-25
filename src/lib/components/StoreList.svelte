<script lang="ts">
  import type { StoreWithParticipation } from '../../types/stores.d.js';
  import { groupStoresByPrefecture, getFirstTimeStores, getContinuousStores } from '../../lib/data/stores.js';
  import StoreCard from './StoreCard.svelte';
  
  export let stores: StoreWithParticipation[];
  export let layout: 'grid' | 'list' = 'grid';
  export let showFilters: boolean = true;
  export let showSort: boolean = true;
  export let compact: boolean = false;

  // フィルタリング・ソート用の状態
  let selectedPrefecture: string = 'all';
  let selectedParticipationType: string = 'all'; // all, first, continuous
  let sortBy: string = 'name'; // name, price, prefecture
  let sortOrder: string = 'asc'; // asc, desc

  // 都道府県リストの生成
  $: prefectures = Array.from(new Set(stores.map(store => store.prefecture))).sort();

  // フィルタリング済みストア
  $: filteredStores = stores.filter(store => {
    // 都道府県フィルタ
    if (selectedPrefecture !== 'all' && store.prefecture !== selectedPrefecture) {
      return false;
    }
    
    // 参加タイプフィルタ
    if (selectedParticipationType === 'first' && !store.isFirstTime) {
      return false;
    }
    if (selectedParticipationType === 'continuous' && store.isFirstTime) {
      return false;
    }
    
    return true;
  });

  // ソート済みストア
  $: sortedStores = [...filteredStores].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'price':
        aValue = a.appetizerPrice || 0;
        bValue = b.appetizerPrice || 0;
        break;
      case 'prefecture':
        aValue = a.prefecture;
        bValue = b.prefecture;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }
    
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // レイアウト切替
  function toggleLayout() {
    layout = layout === 'grid' ? 'list' : 'grid';
  }

  // ソート順の切替
  function toggleSort(field: string) {
    if (sortBy === field) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = field;
      sortOrder = 'asc';
    }
  }

  // フィルタクリア
  function clearFilters() {
    selectedPrefecture = 'all';
    selectedParticipationType = 'all';
    sortBy = 'name';
    sortOrder = 'asc';
  }

  // 統計情報
  $: stats = {
    total: stores.length,
    filtered: sortedStores.length,
    firstTime: getFirstTimeStores(stores).length,
    continuous: getContinuousStores(stores).length
  };
</script>

<div class="space-y-6">
  <!-- ヘッダー・統計 -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">
        参加店舗一覧
      </h2>
      <div class="mt-1 text-sm text-gray-600">
        {stats.filtered}件表示 / 全{stats.total}店舗
        ({stats.firstTime}店舗が初参加、{stats.continuous}店舗が継続参加)
      </div>
    </div>
    
    {#if showSort}
      <!-- レイアウト切替ボタン -->
      <div class="mt-4 sm:mt-0 flex space-x-2">
        <button
          type="button"
          class="p-2 text-gray-600 hover:text-gray-900  rounded-md transition-colors duration-200"
          class:text-blue-600={layout === 'grid'}
          class:bg-blue-50={layout === 'grid'}
          on:click={() => layout = 'grid'}
          aria-label="グリッド表示"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          type="button"
          class="p-2 text-gray-600 hover:text-gray-900  rounded-md transition-colors duration-200"
          class:text-blue-600={layout === 'list'}
          class:bg-blue-50={layout === 'list'}
          on:click={() => layout = 'list'}
          aria-label="リスト表示"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>
    {/if}
  </div>

  {#if showFilters}
    <!-- フィルタ・ソート -->
    <div class="bg-gray-50 rounded-lg p-4 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- 都道府県フィルタ -->
        <div>
          <label for="prefecture-filter" class="block text-sm font-medium text-gray-700 mb-1">
            都道府県
          </label>
          <select
            id="prefecture-filter"
            bind:value={selectedPrefecture}
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="all">すべて</option>
            {#each prefectures as prefecture}
              <option value={prefecture}>{prefecture}</option>
            {/each}
          </select>
        </div>

        <!-- 参加タイプフィルタ -->
        <div>
          <label for="participation-filter" class="block text-sm font-medium text-gray-700 mb-1">
            参加タイプ
          </label>
          <select
            id="participation-filter"
            bind:value={selectedParticipationType}
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="all">すべて</option>
            <option value="first">初参加</option>
            <option value="continuous">継続参加</option>
          </select>
        </div>

        <!-- ソート -->
        <div>
          <label for="sort-by" class="block text-sm font-medium text-gray-700 mb-1">
            ソート項目
          </label>
          <select
            id="sort-by"
            bind:value={sortBy}
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="name">店舗名</option>
            <option value="price">料金</option>
            <option value="prefecture">都道府県</option>
          </select>
        </div>

        <!-- ソート順 -->
        <div>
          <label for="sort-order" class="block text-sm font-medium text-gray-700 mb-1">
            ソート順
          </label>
          <select
            id="sort-order"
            bind:value={sortOrder}
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="asc">昇順</option>
            <option value="desc">降順</option>
          </select>
        </div>
      </div>

      <!-- フィルタクリアボタン -->
      <div class="flex justify-end">
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-gray-900  rounded-md px-2 py-1 transition-colors duration-200"
          on:click={clearFilters}
        >
          フィルタをクリア
        </button>
      </div>
    </div>
  {/if}

  <!-- 店舗リスト -->
  {#if sortedStores.length > 0}
    <div 
      class={layout === 'grid' 
        ? `grid gap-6 ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`
        : 'space-y-4'
      }
    >
      {#each sortedStores as store (store.id)}
        <StoreCard 
          {store} 
          showImage={!compact || layout === 'grid'}
          {compact}
          clickable={true}
        />
      {/each}
    </div>
  {:else}
    <!-- 空状態 -->
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">店舗が見つかりません</h3>
      <p class="mt-1 text-sm text-gray-500">
        検索条件を変更してお試しください。
      </p>
      <div class="mt-6">
        <button
          type="button"
          class="btn-primary"
          on:click={clearFilters}
        >
          フィルタをクリア
        </button>
      </div>
    </div>
  {/if}
</div>