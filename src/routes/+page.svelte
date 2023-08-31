<script>
  import {
    Grid,
    Row,
    Column,
    ImageLoader
  } from "carbon-components-svelte";
</script>

<svelte:head>
  <title>日本酒ゴーアラウンド金沢 公式サイト</title>
</svelte:head>

<main>
  <Grid noGutter>
    <Row>
      <Column padding>
        <h1>
          <ImageLoader
            alt="メインビジュアル"
            src="mainVisual.jpg"
          />
        </h1>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row padding>
      <Column>
        <h2>日本酒ゴーアラウンド金沢、開催決定！</h2>

      </Column>
    </Row>
    <Row padding>
      <Column>
        <h2>参加方法</h2>
        <p>
          説明説明説明
        </p>
      </Column>
    </Row>
    <Row padding>
      <Column>
        <h2>参加店舗・地図</h2>
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1U0tKEJ0QEQvCCn23VLKqJ87QjAwXhRw&ehbc=2E312F" width="400" height="600"
          title="マップ"
        />
      </Column>
    </Row>
  </Grid>

</main>

<style>

</style>