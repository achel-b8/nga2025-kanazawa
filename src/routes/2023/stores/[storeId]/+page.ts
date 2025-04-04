import { error } from '@sveltejs/kit';
import { formatStoreResponse } from '$lib/formatStoreResponse';
import type { PageLoad } from './$types';
import type { RawStore, RawStores, Store } from '../../../../types/stores';

export const load: PageLoad = (async ({ fetch, params }): Promise<{ store: Store }> => {
	if (isNaN(Number(params.storeId))) {
		throw error(404, 'Not found');
	}

	const response = await fetch('/2023/stores.json');
	const json: RawStores = await response.json();

	const store = json.stores.filter((store: RawStore) => store.id === Number(params.storeId));

	if (store.length === 0) {
		throw error(404, 'Not found');
	}

	return {
		store: formatStoreResponse(store)[0]
	};
}) satisfies PageLoad;
