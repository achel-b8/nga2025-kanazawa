<script lang="ts">
    import {
        Column,
        Grid,
        ImageLoader,
        InlineLoading,
        ListItem,
        OrderedList,
        Row,
        ToastNotification
    } from "carbon-components-svelte";
    import TopStoreList from "../components/TopStoreList.svelte";
    import type {Stores} from "../types/stores";

    export let data: Stores;
</script>

<svelte:head>
    <meta property="og:title" content="日本酒ゴーアラウンド金沢2023 公式サイト">
    <title>日本酒ゴーアラウンド金沢2023 公式サイト</title>
</svelte:head>

<main>
    <ToastNotification
            fullWidth
            hideCloseButton
            lowContrast
            kind="info"
            title="10/1当日のごあんない"
            caption="10/1開催期間中はLINEを活用します。公式LINEアカウントから情報発信を行うほか、LINEオープンチャットで参加者どうしの交流を行います。ぜひご登録を！"
    />
    <ToastNotification
            fullWidth
            hideCloseButton
            lowContrast
            kind="info"
            title="お通し情報追加のお知らせ"
            caption="参加店舗ページに、各店舗で提供されるお通しの情報を追加しました。"
    />
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
                    <ListItem>事前に参加店舗で「さかずきんバッジ」を購入。（事前購入推奨ですが、当日も\800で販売あり）</ListItem>
                    <ListItem>10月1日はさかずきんバッジを胸元につけて日本酒の日をアピール。</ListItem>
                    <ListItem>参加店舗ではしご酒！各店舗でふるまい酒とお通しが提供されます。また、各店舗とタッグを組む蔵元さんが来店されます。</ListItem>
                    <ListItem>その後は追加の料理やお酒を楽しむもよし、蔵元さんとの語らいを楽しむのもよし、次の店へゴーアラウンドするもよし。</ListItem>
                    <ListItem>日本酒ゴーアラウンド金沢では<strong>LINEイベント・LINEチャット</strong>でリアルタイムに情報配信予定。</ListItem>
                    <ListItem>当日は<strong>和らぎ水の持ち込みを推奨。</strong>混雑時など、お店によってはご用意でない場合もあります。</ListItem>
                </OrderedList>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <h2>LINEアカウント</h2>
                <Grid>
                    <Row padding>
                        <Column sm={4} lg={8}>
                            <h3 style="font-size: 1.5rem">公式LINEアカウント</h3>
                            <!--TODO スタイル設定めんどいので改行で雑実装した-->
                            <p>各店舗からのリアルタイムでの情報発信を行います。<br><br></p>
                            <a href="https://lin.ee/PXeHmfx" target="_blank">
                                <img alt="公式LINEアカウント" src="lineOfficial.jpg" height="240px">
                            </a>
                        </Column>
                        <Column sm={4} lg={8}>
                            <h3 style="font-size: 1.5rem">LINEオープンチャット</h3>
                            <p>参加者どうしの交流・リアルタイム情報発信にご協力ください。<br>参加コードは<strong>kanazawa</strong>です。</p>
                            <a href="https://line.me/ti/g2/kgOzOMqAwlYQfWp5TZxnt5POrlm59hASZsAtfQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default
" target="_blank">
                                <img alt="LINEオープンチャット" src="lineOpenChat.jpg" height="240px">
                            </a>
                        </Column>
                    </Row>
                </Grid>
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