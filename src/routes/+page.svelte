<script lang="ts">
  import {
    Column,
    Grid,
    ImageLoader,
    InlineLoading,
    ListItem,
    OrderedList,
    Row,
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody
  } from "carbon-components-svelte";


  export let data: Stores;
  console.log(data.stores);
</script>

<svelte:head>
  <title>日本酒ゴーアラウンド金沢2023 公式サイト</title>
</svelte:head>

<main>
  <Grid noGutter>
    <Row>
      <Column padding>
        <h1>
          <!--TODO style設定の外だし、画像の軽量化-->
          <ImageLoader
            alt="メインビジュアル"
            style="width:100%; height:auto; object-fit:cover; max-width: 600px"
            src="mainVisual.webp"
            height="850px"
            width="600px"
          >
            <svelte:fragment slot="loading">
              <InlineLoading />
            </svelte:fragment>
            <svelte:fragment slot="error">An error occurred.</svelte:fragment>
          </ImageLoader>
        </h1>
      </Column>
    </Row>
  </Grid>
  <Grid>
    <Row padding>
      <Column>
        <h2>日本酒ゴーアラウンド金沢、開催決定！</h2>
        <p>
          毎年10月1日は<strong>日本酒の日</strong>。<br>
          この日を祝うべく全国各地で開催されるはしご酒イベント <strong><a href="https://nga-osaka.com/" target="_blank">日本酒ゴーアラウンド</a></strong>が、2023年より金沢で開催されることとなりました。
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
        <h2>参加店舗</h2>
        <StructuredList>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>店舗</StructuredListCell>
              <StructuredListCell head>蔵元</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {#each data.stores as store}
              <StructuredListRow>
                <StructuredListCell>{store.name}</StructuredListCell>
                <StructuredListCell>{store.kuramoto}</StructuredListCell>
              </StructuredListRow>
            {/each}
          </StructuredListBody>
        </StructuredList>
      </Column>
    </Row>
    <Row>
      <Column>
        <h2>参加店舗・地図</h2>
        <!--TODO 地図埋め込みは重いので、手書き地図画像に差し替えて、GoogleMapはリンクで遷移させるようにする-->
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1U0tKEJ0QEQvCCn23VLKqJ87QjAwXhRw&ehbc=2E312F" width="360"
          height="600"
          loading="lazy"
          title="マップ"
        />
      </Column>
    </Row>
  </Grid>

</main>