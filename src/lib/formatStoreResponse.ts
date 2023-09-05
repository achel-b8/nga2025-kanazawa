import type { RawStore, ResponseJson, Store } from "../types/stores";

export const formatStoreResponse = (json: ResponseJson): Store[] => {
	const rawStores = json.stores;

	return rawStores.map((raw) => format(raw));
};

const convertToDate = (rawDate: string | null): Date | null => {
	return rawDate ? new Date(rawDate) : null;
};

const format = (rawStore: RawStore): Store => {
	return {
		...rawStore,
		salesStartTime: new Date(rawStore.salesStartTime),
		salesBreakStartTime: convertToDate(rawStore.salesBreakStartTime),
		salesBreakEndTime: convertToDate(rawStore.salesBreakEndTime),
		salesEndTime: new Date(rawStore.salesEndTime),
		kuramotoStartTime: convertToDate(rawStore.kuramotoStartTime),
		kuramotoEndTime: convertToDate(rawStore.kuramotoEndTime)
	};
};
