<script lang="ts">
    import {
        Column,
        Grid,
        Row,
    } from "carbon-components-svelte";
    import StoreCard from "../../components/StoreCard.svelte";
    import type {Stores} from "../../types/stores";

    export let data: Stores;
</script>

<svelte:head>
    <meta property="og:title" content="日本酒ゴーアラウンド金沢2024 公式サイト｜参加店舗一覧">
    <title>日本酒ゴーアラウンド金沢2024 公式サイト｜参加店舗一覧</title>
</svelte:head>

<main>
    <h1>参加店舗一覧</h1>
    <Grid>
        <Row>
            {#each data.stores as store}
                <Column padding sm={16} xlg={8}>
                    <StoreCard store={store}/>
                </Column>
            {/each}
        </Row>
    </Grid>
</main>