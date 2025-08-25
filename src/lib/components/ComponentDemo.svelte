<script lang="ts">
  export let title: string;
  export let description: string = '';
  export let code: string = '';
  export let showCode: boolean = false;

  function toggleCode() {
    showCode = !showCode;
  }

  // コードのフォーマット（簡易版）
  function formatCode(code: string): string {
    return code
      .trim()
      .replace(/^\s+/gm, (match) => match.replace(/\t/g, '  '));
  }
</script>

<section class="border border-gray-200 rounded-lg overflow-hidden bg-white">
  <!-- ヘッダー -->
  <header class="bg-gray-50 px-4 py-3 border-b border-gray-200">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{title}</h3>
        {#if description}
          <p class="text-sm text-gray-600 mt-1">{description}</p>
        {/if}
      </div>
      
      {#if code}
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-gray-900  rounded-md px-2 py-1"
          on:click={toggleCode}
        >
          {showCode ? 'コードを隠す' : 'コードを見る'}
        </button>
      {/if}
    </div>
  </header>

  <!-- デモエリア -->
  <div class="p-6">
    <slot />
  </div>

  <!-- コード表示 -->
  {#if code && showCode}
    <div class="border-t border-gray-200 bg-gray-900 text-gray-100 p-4 overflow-x-auto">
      <pre class="text-sm"><code>{formatCode(code)}</code></pre>
    </div>
  {/if}
</section>