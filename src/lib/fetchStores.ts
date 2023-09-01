import fs from 'fs';
import path from 'path';

/**
 *  店舗情報を取得する
 *  TODO：API化する場合は要エラーハンドリング
 */
export const fetchStores = (): Store[] => {
	const rawData = fs.readFileSync(path.resolve('./stores.json'), 'utf-8');
	const rawStores: RawStore[] = JSON.parse(rawData);

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
