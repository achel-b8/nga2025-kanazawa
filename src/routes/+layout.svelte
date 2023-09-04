<script lang="ts">
  import "carbon-components-svelte/css/white.css";
  import Header from "../components/Header.svelte";
  import {
    Content,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
</script>

<!-- Header -->
<Header />

<!-- Contents-->
<Content>
  <Grid noGutter>
    <Row noGutter>
      <Column noGutter>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>