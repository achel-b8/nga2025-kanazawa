export const formatStoreResponse = (json: string): Store[] => {
	const parsed: ParsedJson = JSON.parse(json);
	const rawStores = parsed.stores;

	return rawStores.map((raw) => format(raw));
};

const convertToDate = (rawDate: string | null): Date | null => {
	return rawDate ? new Date(rawDate) : null;
};

const format = (rawStore: RawStore): Store => {
	return {
		...rawStore,
		salesStartTime: new Date(rawStore.salesStartTime),
		sakesBreakStartTime: convertToDate(rawStore.sakesBreakStartTime),
		sakesBreakEndTime: convertToDate(rawStore.sakesBreakEndTime),
		salesEndTime: new Date(rawStore.salesEndTime),
		kuramotoStartTime: convertToDate(rawStore.kuramotoStartTime),
		kuramotoEndTime: convertToDate(rawStore.kuramotoEndTime)
	};
};
