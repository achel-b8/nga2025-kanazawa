<script lang="ts">
  import type { SnsUrls } from '../../types/stores.d.js';
  import { SNS_URL_PATTERNS } from '../../types/constants.js';

  export let snsUrls: SnsUrls;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let showLabels: boolean = false;
  export let variant: 'default' | 'simple' | 'colored' = 'default';

  // サイズ設定
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',  
    lg: 'h-6 w-6'
  };

  const containerSizeClasses = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2'
  };

  // バリアント設定
  const getVariantClasses = (platform: string) => {
    if (variant === 'simple') {
      return 'text-gray-600 hover:text-gray-900';
    } else if (variant === 'colored') {
      const platformColors: Record<string, string> = {
        twitter: 'text-blue-400 hover:text-blue-500',
        facebook: 'text-blue-600 hover:text-blue-700',
        instagram: 'text-pink-600 hover:text-pink-700',
        website: 'text-gray-600 hover:text-gray-900'
      };
      return platformColors[platform] || 'text-gray-600 hover:text-gray-900';
    }
    return 'text-gray-500 hover:text-gray-700';
  };

  // URL検証
  function isValidUrl(url: string | null | undefined, platform: string): boolean {
    if (!url) return false;
    const pattern = SNS_URL_PATTERNS[platform as keyof typeof SNS_URL_PATTERNS];
    return pattern ? pattern.test(url) : true;
  }

  // プラットフォーム名の取得
  function getPlatformName(platform: string): string {
    const names: Record<string, string> = {
      twitter: 'Twitter',
      facebook: 'Facebook', 
      instagram: 'Instagram',
      website: 'ウェブサイト'
    };
    return names[platform] || platform;
  }

  // 有効なSNSリンクのフィルタリング
  $: validSnsLinks = [
    { platform: 'twitter', url: snsUrls.twitterUrl, label: 'Twitter' },
    { platform: 'facebook', url: snsUrls.facebookUrl, label: 'Facebook' },
    { platform: 'instagram', url: snsUrls.instagramUrl, label: 'Instagram' },
    { platform: 'website', url: snsUrls.websiteUrl, label: 'ウェブサイト' }
  ].filter(link => link.url && isValidUrl(link.url, link.platform));
</script>

{#if validSnsLinks.length > 0}
  <div class="flex items-center space-x-2" role="list" aria-label="SNSリンク">
    {#each validSnsLinks as link}
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center rounded-md transition-colors duration-200 {containerSizeClasses[size]} {getVariantClasses(link.platform)}"
        aria-label="{getPlatformName(link.platform)}を新しいタブで開く"
      >
        {#if link.platform === 'twitter'}
          <!-- Twitter/X アイコン -->
          <svg class={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        {:else if link.platform === 'facebook'}
          <!-- Facebook アイコン -->
          <svg class={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
          </svg>
        {:else if link.platform === 'instagram'}
          <!-- Instagram アイコン -->
          <svg class={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.017 0C8.396 0 7.999.01 6.84.048 5.69.087 4.948.222 4.29.42a7.233 7.233 0 0 0-2.612 1.772 7.229 7.229 0 0 0-1.772 2.612C-.08 5.462-.215 6.204-.254 7.354-.292 8.513-.302 8.91-.302 12.531c0 3.628.01 4.025.048 5.184.039 1.149.174 1.891.372 2.548a7.238 7.238 0 0 0 1.772 2.613 7.233 7.233 0 0 0 2.612 1.772c.657.198 1.399.333 2.548.372 1.159.038 1.556.048 5.184.048 3.628 0 4.025-.010 5.184-.048 1.149-.039 1.891-.174 2.548-.372a7.233 7.233 0 0 0 2.613-1.772 7.229 7.229 0 0 0 1.772-2.613c.198-.657.333-1.399.372-2.548.038-1.159.048-1.556.048-5.184 0-3.628-.010-4.025-.048-5.184-.039-1.149-.174-1.891-.372-2.548a7.229 7.229 0 0 0-1.772-2.612A7.233 7.233 0 0 0 19.394.42c-.657-.198-1.399-.333-2.548-.372C15.687.01 15.29 0 11.669 0h.348zm-.081 1.802h.332c3.585 0 4.009.01 5.126.048 1.014.037 1.565.171 1.933.284.485.189.832.414 1.198.781.366.366.592.713.781 1.198.113.368.247.919.284 1.933.038 1.117.047 1.541.047 5.126 0 3.585-.009 4.009-.047 5.126-.037 1.014-.171 1.565-.284 1.933-.189.485-.415.832-.781 1.198-.366.366-.713.592-1.198.781-.368.113-.919.247-1.933.284-1.117.038-1.541.047-5.126.047-3.585 0-4.009-.009-5.126-.047-1.014-.037-1.565-.171-1.933-.284a3.2 3.2 0 0 1-1.198-.781 3.2 3.2 0 0 1-.781-1.198c-.113-.368-.247-.919-.284-1.933-.038-1.117-.047-1.541-.047-5.126 0-3.585.009-4.009.047-5.126.037-1.014.171-1.565.284-1.933.189-.485.415-.832.781-1.198.366-.366.713-.592 1.198-.781.368-.113.919-.247 1.933-.284 1.117-.038 1.541-.047 5.126-.047zm0 3.197a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 11.531a4.531 4.531 0 1 1 0-9.062 4.531 4.531 0 0 1 0 9.062zm8.906-11.531a1.636 1.636 0 1 1-3.272 0 1.636 1.636 0 0 1 3.272 0z" clip-rule="evenodd" />
          </svg>
        {:else if link.platform === 'website'}
          <!-- ウェブサイト アイコン -->
          <svg class={sizeClasses[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c5 0 9-4 9-9s-4-9-9-9m0 18c-5 0-9-4-9-9s4-9 9-9m0 0v9" />
          </svg>
        {/if}
        
        {#if showLabels}
          <span class="ml-1 text-sm font-medium">
            {link.label}
          </span>
        {/if}
      </a>
    {/each}
  </div>
{:else}
  <!-- SNSリンクがない場合の表示 -->
  <div class="text-xs text-gray-400" role="status" aria-label="SNSリンクなし">
    —
  </div>
{/if}