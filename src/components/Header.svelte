<script lang="ts">
    import {
        Header,
        SideNav,
        SideNavDivider,
        SideNavItems,
        SideNavLink,
        SkipToContent
    } from "carbon-components-svelte";
    import Home from "carbon-icons-svelte/lib/Home.svelte";
    import Bar from "carbon-icons-svelte/lib/Bar.svelte";
    import Location from "carbon-icons-svelte/lib/Location.svelte";
    import LogoInstagram from "carbon-icons-svelte/lib/LogoInstagram.svelte";
    import {page} from '$app/stores';

    let isSideNavOpen = false;
</script>

<Header
        bind:isSideNavOpen
        class="custom-header"
        href="./"
        platformName="日本酒ゴーアラウンド金沢2023"
>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent/>
    </svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink icon={Home} text="Home" href="/" isSelected={$page.url.pathname==='/'}/>
        <SideNavLink icon={Bar} text="参加店舗" href="/stores" isSelected={$page.url.pathname==='/stores'}/>
        <SideNavDivider/>
        <SideNavLink
                icon="{Location}"
                href="https://www.google.com/maps/d/u/0/viewer?mid=1U0tKEJ0QEQvCCn23VLKqJ87QjAwXhRw&femb=1&ll=36.56828052527098%2C136.65723954999999&z=16"
                text="Googleマイマップ"
        />
        <SideNavLink
                icon="{LogoInstagram}"
                href="https://www.instagram.com/nga_kanazawa/"
                text="Instagram"
        />
    </SideNavItems>
</SideNav>

<!--&lt;!&ndash;ヘッダー色の変更を検討する&ndash;&gt;-->
<!--<style>-->
<!--    :global(.bx&#45;&#45;header) {-->
<!--        background-color: #123456 !important;-->
<!--    }-->
<!--</style>-->
