<script lang="ts">
  export let text: string;
  export let href: string;
  export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled: boolean = false;
  export let external: boolean = false;
  export let ariaLabel: string | undefined = undefined;
  export let ariaDescribedby: string | undefined = undefined;

  // サイズのスタイル設定
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  // バリアントのスタイル設定
  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'btn-primary',
    secondary: disabled
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'btn-secondary',
    outline: disabled
      ? 'text-gray-400 cursor-not-allowed'
      : 'text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100'
  };

  // 基本クラス
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200';

  // 組み合わせたクラス
  $: combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;

  // 外部リンクの属性
  $: linkAttributes = external 
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
</script>

<a
  {href}
  class={combinedClasses}
  class:pointer-events-none={disabled}
  aria-label={ariaLabel}
  aria-describedby={ariaDescribedby}
  aria-disabled={disabled}
  {...linkAttributes}
  on:click
>
  <slot name="icon-left" />
  
  <span class="flex-1">
    <slot>{text}</slot>
  </span>
  
  <slot name="icon-right">
    {#if external}
      <!-- 外部リンクアイコン -->
      <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    {/if}
  </slot>
</a>