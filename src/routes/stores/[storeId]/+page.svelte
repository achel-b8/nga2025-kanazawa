<script lang="ts">
    import type {Store} from "../../../types/stores";
    import {
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListRow,
        Tile
    } from "carbon-components-svelte";
    import BusinessTimeCell from "../../../components/BusinessTimeCell.svelte";

    export let data: { store: Store }
</script>

<svelte:head>
    <title>日本酒ゴーアラウンド金沢2023 公式サイト｜{data.store.name}</title>
</svelte:head>

<main>
    <h1>{data.store.name}</h1>
    <iframe src={data.store.mapUrl}
            class="gmap"
            width="100%"
            height="600"
            allowfullscreen
            style="margin-top: 16px"
            title="Google Map"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
    >

    </iframe>
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
                    <StructuredListCell>蔵元</StructuredListCell>
                    <StructuredListCell>{data.store.kuramoto}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>料金</StructuredListCell>
                    <StructuredListCell>\{data.store.appetizerPrice || '未定'}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>突き出し</StructuredListCell>
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
                <StructuredListRow>
                    <StructuredListCell>席数</StructuredListCell>
                    <StructuredListCell>{data.store.seat}</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                    <StructuredListCell>利用時間</StructuredListCell>
                    <StructuredListCell>{data.store.timeLimit}</StructuredListCell>
                </StructuredListRow>
            </StructuredListBody>
        </StructuredList>
    </Tile>
</main>