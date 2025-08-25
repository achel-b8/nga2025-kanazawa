<script lang="ts">
  import { CURRENT_YEAR } from '../../types/constants.js';

  export let title: string = `日本酒ゴーアラウンド金沢${CURRENT_YEAR}`;
  export let subtitle: string = '[プレースホルダー] サブタイトルがここに入ります';
  export let description: string = '[プレースホルダー] イベントの詳細説明がここに入ります。開催概要、参加方法、料金等の情報を記載予定。';
  export const imageAlt: string = `日本酒ゴーアラウンド金沢${CURRENT_YEAR}のメインビジュアル`;
  export let ctaText: string = '参加店舗を見る';
  export let ctaHref: string = '/stores';

  // 画像のレスポンシブ対応
  const imageSizes = '(max-width: 640px) 640w, (max-width: 1024px) 1024w, 1920w';
</script>

<section class="relative bg-white overflow-hidden" role="banner">
  <div class="max-w-7xl mx-auto">
    <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <!-- 斜めのSVG背景（レスポンシブ） -->
      <svg
        class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
        <!-- メインコンテンツ -->
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28" id="main-content">
          <div class="sm:text-center lg:text-left">
            <!-- タイトル -->
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block xl:inline">{title}</span>
            </h1>
            
            <!-- サブタイトル -->
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              {subtitle}
            </p>
            
            <!-- 説明文 -->
            <p class="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
              {description}
            </p>
            
            <!-- CTA ボタン -->
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div>
                <a
                  href={ctaHref}
                  class="btn-primary w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10"
                  aria-describedby="cta-description"
                >
                  {ctaText}
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="https://www.google.com/maps/d/u/0/edit?mid=1joCBNB-GcvvTJJpD2udXGEYvIMMQWW0&usp=sharing"
                  class="btn-secondary w-full flex items-center justify-center px-8 py-3 border text-base font-medium rounded-md md:py-4 md:text-lg md:px-10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  マップで確認
                </a>
              </div>
            </div>
            
            <!-- CTA説明（スクリーンリーダー用） -->
            <p id="cta-description" class="sr-only">
              参加店舗の一覧ページに移動します
            </p>
          </div>
        </main>
      </div>
    </div>
  </div>
  
  <!-- 右側の画像エリア -->
  <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <div class="h-56 w-full bg-gray-100 sm:h-72 md:h-96 lg:w-full lg:h-full relative">
      <!-- 画像が利用可能になったら追加 -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div class="text-center text-white p-8">
          <div class="text-6xl mb-4">🍶</div>
          <p class="text-lg font-medium">
            メインビジュアル画像
          </p>
          <p class="text-sm opacity-90 mt-2">
            準備中
          </p>
        </div>
      </div>
      
      <!-- 実際の画像を使用する場合のテンプレート
      <picture>
        <source
          media="(max-width: 640px)"
          srcset="/mainVisual-640.webp 640w"
          type="image/webp"
        />
        <source
          media="(max-width: 1024px)"
          srcset="/mainVisual-1024.webp 1024w"
          type="image/webp"
        />
        <source
          srcset="/mainVisual-1920.webp 1920w"
          type="image/webp"
        />
        <img
          src="/mainVisual.jpg"
          alt={imageAlt}
          class="h-full w-full object-cover"
          sizes={imageSizes}
          loading="eager"
        />
      </picture>
      -->
    </div>
  </div>
</section>