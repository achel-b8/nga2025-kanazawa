import { formatStoreResponse } from '$lib/formatStoreResponse';
import fs from 'fs';
import path from 'path';
import url from 'url';

export const prerender = true;

export const load = (async () => {
	const rawJson = fetchStores();
	return {
		stores: formatStoreResponse(rawJson)
	};
});

/**
 *  店舗情報を取得する
 *  Vercelで動かす場合は要プレレンダリング
 *  @see https://kit.svelte.jp/docs/adapter-vercel#troubleshooting
 *  TODO：API化する場合は要エラーハンドリング
 */
const fetchStores = (): string => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return fs.readFileSync(path.resolve(__dirname, '../lib/stores.json'), 'utf-8');
};