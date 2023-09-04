import { formatStoreResponse } from '$lib/formatStoreResponse';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ fetch }): Promise<Stores> => {
	const response = await fetch('/stores.json');
	return {
		stores: formatStoreResponse(await response.json())
	};
}) satisfies PageLoad;
