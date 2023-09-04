import fs from 'fs';
import path from 'path';
import url from 'url';

/**
 *  店舗情報を取得する url moduleはバックエンドのみで動かすことができる
 *  TODO：API化する場合は要エラーハンドリング
 */
export const fetchStores = (): string => {
	const __filename = url.fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	return fs.readFileSync(path.resolve(__dirname, './stores.json'), 'utf-8');
};
