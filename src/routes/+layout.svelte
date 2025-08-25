<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SkipLink from '$lib/components/SkipLink.svelte';
	
	let { children } = $props();
</script>

<SkipLink />

<div class="min-h-screen flex flex-col">
	<Header />
	
	<main id="main-content" class="flex-1">
		{@render children?.()}
	</main>
	
	<Footer />
</div>
