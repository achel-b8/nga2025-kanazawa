<script lang="ts">
	import {
		ImageLoader,
		InlineLoading,
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListRow,
		Tile
	} from 'carbon-components-svelte';
	import type { Store } from '../types/stores';
	import BusinessTimeCell from './BusinessTimeCell.svelte';
	import { goto } from '$app/navigation';

	export let store: Store;
</script>

<Tile style="margin-left: 16px; margin-right: 16px; cursor: pointer;" on:click={() => goto('./stores/' + store.id)}>
	<h3 style="font-size: 1.5rem">{store.name}</h3>
	<ImageLoader
		alt="{store.name}"
		style="width:100%; height:300px; object-fit:contain; max-width: 1080px; background-color: #e0e0e0;"
		src="./stores/{store.id}.webp"
		height="1080px"
		width="1080px"
	>
		<svelte:fragment slot="loading">
			<InlineLoading />
		</svelte:fragment>
		<svelte:fragment slot="error">An error occurred.</svelte:fragment>
	</ImageLoader>
	<StructuredList flush style="margin-bottom: 0px">
		<StructuredListBody>
			<StructuredListRow>
				<StructuredListCell>蔵元</StructuredListCell>
				<StructuredListCell>{store.kuramoto.name}</StructuredListCell>
			</StructuredListRow>
			<StructuredListRow>
				<StructuredListCell>料金</StructuredListCell>
				<StructuredListCell>\{store.appetizerPrice || '未定'}</StructuredListCell>
			</StructuredListRow>
			<StructuredListRow>
				<StructuredListCell>お通し</StructuredListCell>
				<StructuredListCell>{store.appetizer || '未定'}</StructuredListCell>
			</StructuredListRow>
			<StructuredListRow>
				<StructuredListCell>開催時間</StructuredListCell>
				<BusinessTimeCell
					salesStartTime={store.salesStartTime}
					salesEndTime={store.salesEndTime}
					salesBreakStartTime={store.salesBreakStartTime}
					salesBreakEndTime={store.salesBreakEndTime}
				/>
			</StructuredListRow>
			{#if store.additionalNotes}
				<StructuredListRow>
					<StructuredListCell>補足事項</StructuredListCell>
					<StructuredListCell>{store.additionalNotes}</StructuredListCell>
				</StructuredListRow>
			{/if}
		</StructuredListBody>
	</StructuredList>
</Tile>
