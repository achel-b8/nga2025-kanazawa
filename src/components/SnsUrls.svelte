<script lang="ts">
    import {Home, LogoFacebook, LogoInstagram, LogoTwitter} from "carbon-icons-svelte";
    import type {SnsUrls} from "../types/stores";

    export let snsUrls: SnsUrls;
</script>

<span>
{#if snsUrls.twitterUrl}
    <a href="{snsUrls.twitterUrl}" target="_blank">
        <LogoTwitter size={24}/>
    </a>
{/if}
    {#if snsUrls.facebookUrl}
    <a href="{snsUrls.facebookUrl}" target="_blank">
        <LogoFacebook size={24}/>
    </a>
{/if}
    {#if snsUrls.instagramUrl}
    <a href="{snsUrls.instagramUrl}" target="_blank">
        <LogoInstagram size={24}/>
    </a>
{/if}
    {#if snsUrls.websiteUrl}
    <a href="{snsUrls.websiteUrl}" target="_blank">
        <Home size={24}/>
    </a>
{/if}
</span>
