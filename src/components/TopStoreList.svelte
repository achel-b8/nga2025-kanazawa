<script lang="ts">
    import {
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListHead,
        StructuredListRow
    } from 'carbon-components-svelte';
    import BusinessTimeCell from "./BusinessTimeCell.svelte";
    import type {Store} from "../types/stores";
    import {goto} from '$app/navigation';

    export let stores: Store[];
</script>

<!--TODO 詳細ページに飛ばすonClickイベント-->
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
            <StructuredListRow style="cursor: pointer;" on:click={() => goto('/stores/' + store.id)}>
                <StructuredListCell>{store.name}</StructuredListCell>
                <StructuredListCell>{store.kuramoto}</StructuredListCell>
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