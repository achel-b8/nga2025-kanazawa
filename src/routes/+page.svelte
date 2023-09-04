<script lang="ts">
  import {
    Column,
    Grid,
    ImageLoader,
    ListItem,
    OrderedList,
    Row,
  } from "carbon-components-svelte";
  // import type { PageData } from './$types';

  // export let data: PageData;
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
            style="max-height: 993px; max-width: 702px;"
            src="mainVisual.webp"
          />
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
            <OrderedList native>
              <ListItem>参加店舗または販売協力店で「さかずきんバッジ」を事前購入。</ListItem>
              <ListItem>10月1日はさかずきんバッジをつけて日本酒の日をアピール。</ListItem>
              <ListItem>LINEイベント・LINEチャットでリアルタイムに情報発信予定。</ListItem>
              <ListItem>参加店舗ではしご酒！各店舗にタッグを組む蔵元さんが来店されます。</ListItem>
            </OrderedList>
          </Column>
        </Row>
    <Row padding>
      <Column>
        <h2>参加店舗・地図</h2>
        <!--TODO responsive-->
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