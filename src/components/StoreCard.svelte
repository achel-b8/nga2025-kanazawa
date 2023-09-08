<script lang="ts">
    import {
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListRow,
        Tile
    } from "carbon-components-svelte";
    import type {Store} from "../types/stores";
    import BusinessTimeCell from "./BusinessTimeCell.svelte";
    import {goto} from "$app/navigation";

    export let store: Store
</script>

<Tile style="margin-left: 16px; margin-right: 16px; cursor: pointer;" on:click={() => goto('/stores/' + store.id)}>
    <h2 style="font-size: 1.2rem">{store.name} </h2>
    <StructuredList flush style="margin-bottom: 0px">
        <StructuredListBody>
            <StructuredListRow>
                <StructuredListCell>蔵元</StructuredListCell>
                <StructuredListCell>{store.kuramoto}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
                <StructuredListCell>料金</StructuredListCell>
                <StructuredListCell>\{store.appetizerPrice || '未定'}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
                <StructuredListCell>突き出し</StructuredListCell>
                <StructuredListCell>{store.appetizer || '未定'}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
                <StructuredListCell>開催時間</StructuredListCell>
                <BusinessTimeCell
                        salesStartTime={store.salesStartTime}
                        salesEndTime={store.salesEndTime}
                        salesBreakStartTime={store.salesBreakStartTime}
                        salesBreakEndTime={store.salesBreakEndTime}
                />
            </StructuredListRow>
        </StructuredListBody>
    </StructuredList>
</Tile>