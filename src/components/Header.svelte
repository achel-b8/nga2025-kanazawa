<script lang="ts">
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent
  } from "carbon-components-svelte";
  import Home from "carbon-icons-svelte/lib/Home.svelte";
  import FruitBowl from "carbon-icons-svelte/lib/FruitBowl.svelte";

  let isSideNavOpen = false;
</script>

<Header platformName="日本酒ゴーアラウンド金沢2023" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink icon={Home} text="Home" href="/" isSelected />
    <SideNavLink icon={FruitBowl} text="参加店舗（準備中）" href="/" />
  </SideNavItems>
</SideNav>

