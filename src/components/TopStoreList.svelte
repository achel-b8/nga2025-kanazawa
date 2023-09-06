<script lang="ts">
    import {
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListHead,
        StructuredListRow
    } from 'carbon-components-svelte';
    import {format} from 'date-fns';
    import type {Store} from "../types/stores";

    export let stores: Store[];

    const formatTime = (time: Date) => {

        return format(time, 'HH:mm');
    }
</script>

<!--TODO 詳細ページに飛ばすonClickイベント-->
<StructuredList>
    <StructuredListHead>
        <StructuredListRow head>
            <StructuredListCell head>店舗</StructuredListCell>
            <StructuredListCell head>蔵元</StructuredListCell>
            <StructuredListCell head>営業時間</StructuredListCell>
        </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
        {#each stores as store}
            <StructuredListRow>
                <StructuredListCell>{store.name}</StructuredListCell>
                <StructuredListCell>{store.kuramoto}</StructuredListCell>
                {#if (store.salesBreakStartTime && store.salesBreakEndTime)}
                    <StructuredListCell>{formatTime(store.salesStartTime)} - {formatTime(store.salesBreakStartTime)}
                        <br>{formatTime(store.salesBreakEndTime)} - {formatTime(store.salesEndTime)}
                    </StructuredListCell>
                {:else}
                    <StructuredListCell>{formatTime(store.salesStartTime)}
                        - {formatTime(store.salesEndTime)}</StructuredListCell>
                {/if}
            </StructuredListRow>
        {/each}
    </StructuredListBody>
</StructuredList>