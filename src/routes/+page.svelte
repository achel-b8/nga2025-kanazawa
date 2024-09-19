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
    <meta property="og:title" content="日本酒ゴーアラウンド金沢2024 公式サイト">
    <title>日本酒ゴーアラウンド金沢2024 公式サイト</title>
</svelte:head>

<main>
    <ToastNotification
            fullWidth
            hideCloseButton
            lowContrast
            kind="info"
            title="2024年開催について"
            caption="2024年も日本酒ゴーアラウンド金沢を開催します！ 最新情報はinstagramもご覧ください。"
    />
    <h1>日本酒ゴーアラウンド金沢2024 公式サイト</h1>
    <Grid noGutter>
        <Row>
            <Column padding>
                <h2>
                    <!--TODO style設定の外だし、画像の軽量化-->
                    <ImageLoader
                            alt="メインビジュアル"
                            style="width:100%; height:auto; object-fit:cover; max-width: 600px"
                            src="mainVisual2024.jpg
"
                            height="848px"
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
                <h2>日本酒ゴーアラウンド金沢 2024年も開催決定！</h2>
                <p>
                    毎年10月1日は<strong>日本酒の日</strong>。<br>
                    この日を祝うべく全国各地で開催されるはしご酒イベント
                    <strong><a href="https://nga-osaka.com/" target="_blank">日本酒ゴーアラウンド</a></strong>が、2023年より金沢で開催されることとなりました。
                </p>
                <p>
                    2024年も引き続き開催します！今年は平日開催、参加都市は17都市です。
                </p>
            </Column>
        </Row>
        <Row padding>
            <Column sm={12} md={12} lg={12}>
                <h2>日本酒ゴーアラウンド金沢で能登を応援！</h2>
                <p>
                    今年はタッグ蔵元さんに能登の酒蔵さんが3店舗参戦のほか、 下記の能登応援企画を行います。
                </p>
            </Column>
            <Column sm={12} md={12} lg={12}>
                <h3>和らぎ水で能登応援</h3>
                <p>
                    全店舗に<strong>能登海洋深層水</strong>500mlをご用意します。（数量限定）<br>
                    各店舗に募金箱を用意しますので、1本につき\250～のご支援をお願いします。
                </p>
                <p>
                    ※一部必要経費を除き、ほぼ全額を直接能登に寄付します。<br>
                    ※全店舗、店外で購入した水の持ち込み可能ですが、無料での和らぎ水提供の可否は店舗により異なります。
                </p>
            </Column>
            <Column sm={12} md={12} lg={12}>
                <h3>能登食材のおつまみで応援</h3>
                <p>
                    当日各店舗で提供するおつまみメニューに<strong>能登の食材</strong>を取り入れ、 能登の応援を行います。<br>
                    提供メニューはWebサイト、Instagramで随時ご案内予定です。
                </p>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <h2>参加方法・ルール</h2>
                <OrderedList expressive style="margin-left: 2em">
                    <ListItem>
                        事前に参加店舗で「さかずきんバッジ」を購入（\800）。（事前購入推奨ですが、当日も\1,000で一部販売あり）
                    </ListItem>
                    <ListItem>10月1日はさかずきんバッジを胸元につけて日本酒の日をアピール。</ListItem>
                    <ListItem>
                        参加店舗ではしご酒！各店舗でふるまい酒とお通しが提供されます。また、各店舗とタッグを組む蔵元さんが来店されます。
                    </ListItem>
                    <ListItem>
                        その後は追加の料理やお酒を楽しむもよし、蔵元さんとの語らいを楽しむのもよし、次の店へゴーアラウンドするもよし。
                    </ListItem>
                    <ListItem>日本酒ゴーアラウンド金沢では<strong>LINEイベント・LINEチャット</strong>でリアルタイムに情報配信。ぜひご登録をお願いします。
                    </ListItem>
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
                                <img alt="公式LINEアカウント" src="qr/lineOfficial.webp" height="240px">
                            </a>
                        </Column>
                        <Column sm={4} lg={8}>
                            <h3 style="font-size: 1.5rem">LINEオープンチャット</h3>
                            <p>
                                参加者どうしの交流・リアルタイム情報発信にご協力ください。<br>参加コードは<strong>kanazawa</strong>です。
                            </p>
                            <a href="https://line.me/ti/g2/kgOzOMqAwlYQfWp5TZxnt5POrlm59hASZsAtfQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default
" target="_blank">
                                <img alt="LINEオープンチャット" src="qr/lineOpenChat.webp" height="240px">
                            </a>
                        </Column>
                    </Row>
                </Grid>
            </Column>
        </Row>
        <Row>
            <Column>
                <h2>Instagramアカウント</h2>
                <p>公式Instagramアカウントでも当日の情報発信を行います。</p>
                <a href="https://www.instagram.com/nga_kanazawa/" target="_blank">
                    <img alt="公式Instagramアカウント" src="qr/instagram.webp" height="240px">
                </a>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <h2>地図</h2>
                <p>
                    <strong>
                        <a href="https://www.google.com/maps/d/u/0/edit?mid=1joCBNB-GcvvTJJpD2udXGEYvIMMQWW0&usp=sharing">Googleマイマップ</a>
                    </strong>
                    も提供しています。
                </p>
                <a href="./map1920.png">
                    <ImageLoader
                            alt="メインビジュアル"
                            style="width:100%; height:auto; object-fit:cover; max-width: 640px"
                            src="map640.png"
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