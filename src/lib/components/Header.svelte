<script lang="ts">
  import { page } from '$app/stores';
  import { CURRENT_YEAR } from '../../types/constants.js';

  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  // キーボードナビゲーション
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }

  // 現在のページかどうかをチェック
  function isCurrentPage(href: string): boolean {
    return $page.url.pathname === href;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<header style="background-color: var(--brand-primary);">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- ロゴ・タイトル -->
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center space-x-2 rounded-md p-1">
          <div class="text-lg font-bold text-white sm:text-xl md:text-2xl">
            日本酒ゴーアラウンド金沢{CURRENT_YEAR}
          </div>
        </a>
      </div>

      <!-- デスクトップナビゲーション -->
      <nav class="hidden md:flex items-center space-x-6" aria-label="メインナビゲーション">
        <a
          href="/stores"
          class="text-white font-medium hover:opacity-80 transition-opacity duration-200"
          aria-current={isCurrentPage('/stores') ? 'page' : undefined}
        >
          参加店舗
        </a>

        <!-- 年度選択 -->
        <div class="relative group">
          <button
            class="text-white font-medium hover:opacity-80 transition-opacity duration-200 flex items-center"
            aria-haspopup="true"
            aria-expanded="false"
          >
            2025
            <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
            <div class="py-1" role="menu">
              <a
                href="/2024/stores"
                class="block px-4 py-2 text-sm hover:bg-gray-100"
                style="color: var(--color-text);"
                role="menuitem"
              >
                2024
              </a>
              <a
                href="/2023/stores"
                class="block px-4 py-2 text-sm hover:bg-gray-100"
                style="color: var(--color-text);"
                role="menuitem"
              >
                2023
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- モバイルメニューボタン -->
      <div class="md:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-white hover:opacity-80"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="メニューを開く"
          on:click={toggleMobileMenu}
        >
          {#if isMobileMenuOpen}
            <!-- 閉じるアイコン -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <!-- ハンバーガーアイコン -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- モバイルメニュー -->
  {#if isMobileMenuOpen}
    <div class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3" style="background-color: var(--brand-primary);">
        <a
          href="/"
          class="block px-3 py-2 text-base font-medium text-white hover:opacity-80 transition-opacity duration-200"
          aria-current={isCurrentPage('/') ? 'page' : undefined}
          on:click={closeMobileMenu}
        >
          ホーム
        </a>
        <a
          href="/stores"
          class="block px-3 py-2 text-base font-medium text-white hover:opacity-80 transition-opacity duration-200"
          aria-current={isCurrentPage('/stores') ? 'page' : undefined}
          on:click={closeMobileMenu}
        >
          参加店舗
        </a>
        <a
          href="/catalog"
          class="block px-3 py-2 text-base font-medium text-white hover:opacity-80 transition-opacity duration-200"
          aria-current={isCurrentPage('/catalog') ? 'page' : undefined}
          on:click={closeMobileMenu}
        >
          🎨 カタログ
        </a>


        <!-- 外部リンク -->
        <a
          href="https://www.google.com/maps/d/u/0/edit?mid=1joCBNB-GcvvTJJpD2udXGEYvIMMQWW0&usp=sharing"
          class="block px-3 py-2 text-base font-medium text-white hover:opacity-80 transition-opacity duration-200"
          target="_blank"
          rel="noopener noreferrer"
          on:click={closeMobileMenu}
        >
          Googleマイマップ
        </a>
        <a
          href="https://www.instagram.com/nga_kanazawa/"
          class="block px-3 py-2 text-base font-medium text-white hover:opacity-80 transition-opacity duration-200"
          target="_blank"
          rel="noopener noreferrer"
          on:click={closeMobileMenu}
        >
          Instagram
        </a>

        <div class="px-3 py-2 text-xs font-semibold text-white opacity-60 uppercase tracking-wider">
          過年度
        </div>
        <a
          href="/2024/stores"
          class="block px-3 py-2 text-base font-medium text-white hover:opacity-80 transition-opacity duration-200"
          on:click={closeMobileMenu}
        >
          2024年参加店舗
        </a>
        <a
          href="/2023/stores"
          class="block px-3 py-2 text-base font-medium text-white hover:opacity-80 transition-opacity duration-200"
          on:click={closeMobileMenu}
        >
          2023年参加店舗
        </a>
      </div>
    </div>
  {/if}
</header>