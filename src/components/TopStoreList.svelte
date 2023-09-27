<script lang="ts">
    import {
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListHead,
        StructuredListRow,
        Tile
    } from 'carbon-components-svelte';
    import BusinessTimeCell from "./BusinessTimeCell.svelte";
    import SnsUrls from "./SnsUrls.svelte";
    import type {Store} from "../types/stores";

    export let stores: Store[];
</script>

<!--TODO 詳細ページに飛ばすonClickイベント-->
<Tile>
    <StructuredList flush style="margin-bottom: 0px">
        <StructuredListHead>
            <StructuredListRow head>
                <StructuredListCell head>店舗</StructuredListCell>
                <StructuredListCell head>蔵元</StructuredListCell>
                <StructuredListCell head>開催時間</StructuredListCell>
            </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
            {#each stores as store}
                <StructuredListRow>
                    <StructuredListCell>
                        <a href="{'/stores/' + store.id}">{store.name}</a><br>
                        <SnsUrls snsUrls={store.snsUrls}/>
                    </StructuredListCell>
                    <StructuredListCell>
                        {store.kuramoto.name}<br>
                        <SnsUrls snsUrls={store.kuramoto.snsUrls}/>
                    </StructuredListCell>
                    <BusinessTimeCell
                            salesStartTime={store.salesStartTime}
                            salesEndTime={store.salesEndTime}
                            salesBreakStartTime={store.salesBreakStartTime}
                            salesBreakEndTime={store.salesBreakEndTime}
                    />
                </StructuredListRow>
            {/each}
        </StructuredListBody>
    </StructuredList>
</Tile>
