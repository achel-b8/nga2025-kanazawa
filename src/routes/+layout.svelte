<script lang="ts">
  import "carbon-components-svelte/css/white.css";
  import Header from "../components/Header.svelte";
  import {
    Content,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";

  // Inject the Analytics functionality
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  inject({ mode: dev ? 'development' : 'production' });
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