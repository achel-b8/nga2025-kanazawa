<script lang="ts">
    import type {Store} from "../../../types/stores";
    import {
        ImageLoader,
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListRow,
        Tile
    } from "carbon-components-svelte";
    import BusinessTimeCell from "../../../components/BusinessTimeCell.svelte";
    import SnsUrls from "../../../components/SnsUrls.svelte";

    export let data: { store: Store }
</script>

<svelte:head>
    <meta property="og:title" content="日本酒ゴーアラウンド金沢2024 公式サイト｜{data.store.name}">
    <title>日本酒ゴーアラウンド金沢2024 公式サイト｜{data.store.name}</title>
</svelte:head>

<main>
    <h1>{data.store.name}</h1>
    <ImageLoader
            alt="{data.store.name}"
            style="width:100%; height:500px; object-fit:contain; max-width: 1080px; background-color: #e0e0e0;"
            src="/stores/{data.store.id}.webp"
            height="1080px"
            width="1080px"
     />
    <Tile style="margin-top: 16px">
        <StructuredList flush style="margin-bottom: 0px">
            <StructuredListBody>
                <StructuredListRow>
                    <StructuredListCell>店舗住所</StructuredListCell>
                    <StructuredListCell>{data.store.address}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>店舗電話番号</StructuredListCell>
                    <StructuredListCell>{data.store.phoneNumber}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>店舗SNS</StructuredListCell>
                    <StructuredListCell>
                        <SnsUrls snsUrls={data.store.snsUrls} />
                    </StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>蔵元</StructuredListCell>
                    <StructuredListCell>{data.store.kuramoto.name}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>蔵元SNS</StructuredListCell>
                    <StructuredListCell>
                        <SnsUrls snsUrls={data.store.kuramoto.snsUrls} />
                    </StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>料金</StructuredListCell>
                    <StructuredListCell>\{data.store.appetizerPrice || '未定'}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>お通し</StructuredListCell>
                    <StructuredListCell>{data.store.appetizer || '未定'}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>開催時間</StructuredListCell>
                    <BusinessTimeCell
                            salesStartTime={data.store.salesStartTime}
                            salesEndTime={data.store.salesEndTime}
                            salesBreakStartTime={data.store.salesBreakStartTime}
                            salesBreakEndTime={data.store.salesBreakEndTime}
                    />
                </StructuredListRow>
                {#if data.store.additionalNotes}
                    <StructuredListRow>
                        <StructuredListCell>補足事項</StructuredListCell>
                        <StructuredListCell>{data.store.additionalNotes}</StructuredListCell>
                    </StructuredListRow>
                {/if}
            </StructuredListBody>
        </StructuredList>
    </Tile>
</main>
