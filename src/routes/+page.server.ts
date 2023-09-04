import { fetchStores } from '$lib/fetchStores';
import { formatStoreResponse } from '$lib/formatStoreResponse';

export const load = (async () => {
	const rawJson = fetchStores();
	return {
		stores: formatStoreResponse(rawJson)
	};
});