<script lang="ts">
  import type { BusinessHours } from '../../types/stores.d.js';
  import { formatBusinessHours, validateBusinessHours } from '../../lib/utils/participation.js';

  export let businessHours: BusinessHours;
  export let additionalNotes: string | null = null;
  export let showIcon: boolean = true;
  export let compact: boolean = false;

  // 営業時間の検証
  $: isValid = validateBusinessHours(
    businessHours.startTime,
    businessHours.endTime,
    businessHours.breakStartTime,
    businessHours.breakEndTime
  );

  // フォーマット済み営業時間
  $: formattedHours = formatBusinessHours(
    businessHours.startTime,
    businessHours.endTime,
    businessHours.breakStartTime,
    businessHours.breakEndTime
  );

  // 休憩時間があるかチェック
  $: hasBreak = businessHours.breakStartTime && businessHours.breakEndTime;

  // スタイルクラス
  $: containerClass = compact 
    ? 'text-sm' 
    : 'text-base';

  // 時刻のフォーマット（HH:MM → HH:MM表示）
  function formatTimeForDisplay(time: string | null | undefined): string {
    return time || '';
  }

  // 時刻が日跨ぎかどうかチェック
  function isOvernight(startTime: string, endTime: string): boolean {
    const [startHour] = startTime.split(':').map(Number);
    const [endHour] = endTime.split(':').map(Number);
    return endHour < startHour;
  }

  $: overnight = isOvernight(businessHours.startTime, businessHours.endTime);
</script>

<div class={containerClass}>
  {#if !isValid.isValid}
    <!-- エラー表示 -->
    <div class="flex items-center text-red-600">
      {#if showIcon}
        <svg class="h-4 w-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      {/if}
      <span class="text-sm">営業時間エラー</span>
    </div>
  {:else}
    <!-- 正常な営業時間表示 -->
    <div class="flex items-start">
      {#if showIcon}
        <svg class="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      {/if}
      
      <div class="flex-1">
        {#if hasBreak}
          <!-- 休憩時間がある場合 -->
          <div class="space-y-1">
            <div class="flex items-center">
              <span class="font-medium text-gray-900">
                {formatTimeForDisplay(businessHours.startTime)}
              </span>
              <span class="mx-1 text-gray-500">〜</span>
              <span class="font-medium text-gray-900">
                {formatTimeForDisplay(businessHours.breakStartTime)}
              </span>
              {#if overnight}
                <span class="ml-1 text-xs text-gray-500">(翌日)</span>
              {/if}
            </div>
            
            <div class="flex items-center">
              <span class="font-medium text-gray-900">
                {formatTimeForDisplay(businessHours.breakEndTime)}
              </span>
              <span class="mx-1 text-gray-500">〜</span>
              <span class="font-medium text-gray-900">
                {formatTimeForDisplay(businessHours.endTime)}
              </span>
            </div>
            
            <div class="text-xs text-gray-500 mt-1">
              休憩: {formatTimeForDisplay(businessHours.breakStartTime)} 〜 {formatTimeForDisplay(businessHours.breakEndTime)}
            </div>
          </div>
        {:else}
          <!-- 休憩時間がない場合 -->
          <div class="flex items-center">
            <span class="font-medium text-gray-900">
              {formatTimeForDisplay(businessHours.startTime)}
            </span>
            <span class="mx-1 text-gray-500">〜</span>
            <span class="font-medium text-gray-900">
              {formatTimeForDisplay(businessHours.endTime)}
            </span>
            {#if overnight}
              <span class="ml-1 text-xs text-gray-500">(翌日)</span>
            {/if}
          </div>
        {/if}

        <!-- 追加の注意事項 -->
        {#if additionalNotes}
          <div class="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2">
            ※{additionalNotes}
          </div>
        {/if}

        <!-- 簡略表示用（コンパクトモード） -->
        {#if compact}
          <div class="text-xs text-gray-500 mt-1">
            {formattedHours}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>