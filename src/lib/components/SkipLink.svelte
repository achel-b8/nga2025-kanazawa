<script lang="ts">
  export let href: string = '#main-content';
  export let text: string = 'メインコンテンツにスキップ';
</script>

<!-- 
  スキップリンク
  - フォーカス時のみ表示
  - キーボードナビゲーションのアクセシビリティ向上
  - WAI-ARIA準拠
-->
<a
  {href}
  class="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:border-2 focus:border-blue-800 focus:outline-none transition-all duration-200"
  on:click={(e) => {
    // スムーズスクロール
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // フォーカス移動
      if (target instanceof HTMLElement) {
        target.focus();
      }
    }
  }}
>
  {text}
</a>

<style>
  .skip-link {
    /* フォーカス時以外は画面外に配置 */
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .skip-link:focus {
    /* フォーカス時は画面内に表示 */
    position: fixed !important;
    left: 1rem !important;
    top: 1rem !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    z-index: 9999;
  }
</style>