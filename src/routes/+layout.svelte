<script lang="ts">
    import "carbon-components-svelte/css/g10.css";
    import Header from "../components/Header.svelte";
    import {
        Column,
        Content,
        Grid,
        Row,
        Theme,
    } from "carbon-components-svelte";

</script>

<Theme theme="g10"/>

<!-- Header -->
<Header/>

<!-- Contents-->
<Content>
    <Grid noGutter>
        <Row noGutter>
            <Column noGutter>
                <slot/>
            </Column>
        </Row>
    </Grid>
</Content>