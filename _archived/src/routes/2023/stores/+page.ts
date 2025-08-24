import {formatStoreResponse} from '$lib/formatStoreResponse';
import type {PageLoad} from './$types';
import type {RawStores, Stores} from "../../../types/stores";

export const load: PageLoad = (async ({fetch}): Promise<Stores> => {
    const response = await fetch('/2023/stores.json');
    const json: RawStores = await response.json();
    return {
        stores: formatStoreResponse(json.stores)
    };
}) satisfies PageLoad;
