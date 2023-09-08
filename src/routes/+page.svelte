<script lang="ts">
    import {
        Column,
        Grid,
        ImageLoader,
        InlineLoading,
        ListItem,
        OrderedList,
        Row,
    } from "carbon-components-svelte";
    import TopStoreList from "../components/TopStoreList.svelte";
    import type {Stores} from "../types/stores";

    export let data: Stores;
</script>

<svelte:head>
    <title>日本酒ゴーアラウンド金沢2023 公式サイト</title>
</svelte:head>

<main>
    <h1>日本酒ゴーアラウンド金沢2023 公式サイト</h1>
    <Grid noGutter>
        <Row>
            <Column padding>
                <h2>
                    <!--TODO style設定の外だし、画像の軽量化-->
                    <ImageLoader
                            alt="メインビジュアル"
                            style="width:100%; height:auto; object-fit:cover; max-width: 600px"
                            src="mainVisual.webp"
                            height="850px"
                            width="600px"
                    >
                        <svelte:fragment slot="loading">
                            <InlineLoading/>
                        </svelte:fragment>
                        <svelte:fragment slot="error">An error occurred.</svelte:fragment>
                    </ImageLoader>
                </h2>
            </Column>
        </Row>
    </Grid>
    <Grid>
        <Row padding>
            <Column>
                <h2>日本酒ゴーアラウンド金沢、開催決定！</h2>
                <p>
                    毎年10月1日は<strong>日本酒の日</strong>。<br>
                    この日を祝うべく全国各地で開催されるはしご酒イベント <strong><a href="https://nga-osaka.com/"
                                                                                    target="_blank">日本酒ゴーアラウンド</a></strong>が、2023年より金沢で開催されることとなりました。
                </p>
                <p>
                    詳しい開催情報や参加店舗については、このページで随時情報提供していきますので、お楽しみに！
                </p>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <h2>参加方法・ルール</h2>
                <OrderedList expressive style="margin-left: 2em">
                    <ListItem>参加店舗または販売協力店で「さかずきんバッジ」を事前購入。</ListItem>
                    <ListItem>10月1日はさかずきんバッジをつけて日本酒の日をアピール。</ListItem>
                    <ListItem>LINEイベント・LINEチャットでリアルタイムに情報配信予定。</ListItem>
                    <ListItem>参加店舗ではしご酒！各店舗にタッグを組む蔵元さんが来店されます。</ListItem>
                </OrderedList>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <h2>地図</h2>
                <p>
                    <strong>
                        <a href="https://www.google.com/maps/d/u/0/viewer?mid=1U0tKEJ0QEQvCCn23VLKqJ87QjAwXhRw&femb=1&ll=36.56828052527098%2C136.65723954999999&z=16">Googleマイマップ</a>
                    </strong>
                    も提供しています。
                </p>
                <a href="./map1920.png">
                    <ImageLoader
                            alt="メインビジュアル"
                            style="width:100%; height:auto; object-fit:cover; max-width: 640px"
                            src="map640.webp"
                            height="452px"
                            width="640px"
                    >
                        <svelte:fragment slot="loading">
                            <InlineLoading/>
                        </svelte:fragment>
                        <svelte:fragment slot="error">An error occurred.</svelte:fragment>
                    </ImageLoader>
                </a>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <h2>参加店舗</h2>
                <TopStoreList stores="{data.stores}"/>
            </Column>
        </Row>
    </Grid>
</main>