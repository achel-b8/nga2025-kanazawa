/**
 * 店舗データの取得・結合・変換ロジック
 */

import type {
  Store,
  Brewery,
  Participation,
  StoreWithParticipation,
  StoresData,
  BreweriesData,
  ParticipationsData
} from '../../types/stores.d.js';
import { STATIC_PATHS, CURRENT_YEAR, ERROR_MESSAGES } from '../../types/constants.js';
import { generateParticipationStats } from '../utils/participation.js';

// キャッシュ
const cache = new Map<string, any>();
const CACHE_TTL = 1000 * 60 * 60; // 1時間

interface CacheEntry {
  data: any;
  timestamp: number;
}

/**
 * キャッシュからデータを取得
 */
function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry;
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  
  return entry.data as T;
}

/**
 * キャッシュにデータを保存
 */
function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

/**
 * JSONファイルを非同期で取得
 */
async function fetchJson<T>(path: string): Promise<T> {
  const cacheKey = `json:${path}`;
  const cached = getFromCache<T>(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json() as T;
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    throw new Error(`${ERROR_MESSAGES.DATA_LOAD_FAILED}: ${path}`);
  }
}

/**
 * 店舗マスターデータを取得
 */
export async function getStores(): Promise<Store[]> {
  const storesData = await fetchJson<StoresData>(STATIC_PATHS.STORES);
  return storesData.stores;
}

/**
 * 酒蔵マスターデータを取得
 */
export async function getBreweries(): Promise<Brewery[]> {
  const breweriesData = await fetchJson<BreweriesData>(STATIC_PATHS.BREWERIES);
  return breweriesData.breweries;
}

/**
 * 年度別参加情報を取得
 */
export async function getParticipations(year: number): Promise<Participation[]> {
  let path: string;
  
  switch (year) {
    case 2023:
      path = STATIC_PATHS.PARTICIPATIONS_2023;
      break;
    case 2024:
      path = STATIC_PATHS.PARTICIPATIONS_2024;
      break;
    case 2025:
      path = STATIC_PATHS.PARTICIPATIONS_2025;
      break;
    default:
      throw new Error(`${ERROR_MESSAGES.INVALID_YEAR}: ${year}`);
  }
  
  try {
    const participationsData = await fetchJson<ParticipationsData>(path);
    return participationsData.participations;
  } catch (error) {
    // 2025年度のファイルが存在しない場合は空配列を返す
    if (year === 2025) {
      return [];
    }
    throw error;
  }
}

/**
 * 全年度の参加情報を取得
 */
export async function getAllParticipations(): Promise<Participation[]> {
  const years = [2023, 2024, 2025];
  const allParticipations: Participation[] = [];
  
  for (const year of years) {
    try {
      const participations = await getParticipations(year);
      allParticipations.push(...participations);
    } catch (error) {
      console.warn(`Failed to load participations for ${year}:`, error);
    }
  }
  
  return allParticipations;
}

/**
 * 店舗IDで店舗情報を取得
 */
export async function getStoreById(storeId: number): Promise<Store | null> {
  const stores = await getStores();
  return stores.find(store => store.id === storeId) || null;
}

/**
 * 酒蔵IDで酒蔵情報を取得
 */
export async function getBreweryById(breweryId: string): Promise<Brewery | null> {
  const breweries = await getBreweries();
  return breweries.find(brewery => brewery.id === breweryId) || null;
}

/**
 * 店舗と参加情報を結合
 */
export async function getStoreWithParticipation(
  storeId: number,
  year: number
): Promise<StoreWithParticipation | null> {
  const store = await getStoreById(storeId);
  if (!store) return null;
  
  const participations = await getParticipations(year);
  const participation = participations.find(p => p.storeId === storeId && p.isActive);
  
  if (!participation) return null;
  
  const brewery = await getBreweryById(participation.breweryId);
  if (!brewery) return null;
  
  const allParticipations = await getAllParticipations();
  const stats = generateParticipationStats(storeId, year, allParticipations);
  
  return {
    // 店舗基本情報
    id: store.id,
    name: store.name,
    address: store.address,
    phoneNumber: store.phoneNumber,
    prefecture: store.prefecture,
    city: store.city,
    mapUrl: store.mapUrl,
    snsUrls: store.snsUrls,
    seat: store.seat,
    timeLimit: store.timeLimit,
    additionalNotes: store.additionalNotes,
    
    // 参加情報
    year,
    breweryId: brewery.id,
    breweryName: brewery.name,
    breweryPrefecture: brewery.prefecture,
    brewerySnsUrls: brewery.snsUrls,
    
    // イベント固有情報
    businessHours: participation.eventBusinessHours,
    appetizer: participation.appetizer,
    appetizerPrice: participation.appetizerPrice,
    breweryVisit: participation.breweryVisit,
    
    // 統計情報
    participationCount: stats.participationCount,
    isFirstTime: stats.isFirstTime,
    continuousYears: stats.continuousYears,
  };
}

/**
 * 年度別の全店舗情報を取得（参加情報付き）
 */
export async function getStoresWithParticipation(
  year: number
): Promise<StoreWithParticipation[]> {
  const participations = await getParticipations(year);
  const activeParticipations = participations.filter(p => p.isActive);
  
  const storesWithParticipation: StoreWithParticipation[] = [];
  
  for (const participation of activeParticipations) {
    const storeWithParticipation = await getStoreWithParticipation(participation.storeId, year);
    if (storeWithParticipation) {
      storesWithParticipation.push(storeWithParticipation);
    }
  }
  
  return storesWithParticipation.sort((a, b) => a.id - b.id);
}

/**
 * 都道府県別に店舗をグループ化
 */
export function groupStoresByPrefecture(
  stores: StoreWithParticipation[]
): Record<string, StoreWithParticipation[]> {
  return stores.reduce((groups, store) => {
    const prefecture = store.prefecture;
    if (!groups[prefecture]) {
      groups[prefecture] = [];
    }
    groups[prefecture].push(store);
    return groups;
  }, {} as Record<string, StoreWithParticipation[]>);
}

/**
 * 初回参加店舗を抽出
 */
export function getFirstTimeStores(
  stores: StoreWithParticipation[]
): StoreWithParticipation[] {
  return stores.filter(store => store.isFirstTime);
}

/**
 * 継続参加店舗を抽出
 */
export function getContinuousStores(
  stores: StoreWithParticipation[]
): StoreWithParticipation[] {
  return stores.filter(store => !store.isFirstTime);
}

/**
 * キャッシュをクリア
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * データの整合性をチェック
 */
export async function validateDataIntegrity(): Promise<{
  isValid: boolean;
  errors: string[];
}> {
  const errors: string[] = [];
  
  try {
    const stores = await getStores();
    const breweries = await getBreweries();
    
    // 店舗の重複チェック
    const storeIds = stores.map(s => s.id);
    const duplicateStoreIds = storeIds.filter((id, index) => storeIds.indexOf(id) !== index);
    if (duplicateStoreIds.length > 0) {
      errors.push(`重複する店舗ID: ${duplicateStoreIds.join(', ')}`);
    }
    
    // 酒蔵の重複チェック
    const breweryIds = breweries.map(b => b.id);
    const duplicateBreweryIds = breweryIds.filter((id, index) => breweryIds.indexOf(id) !== index);
    if (duplicateBreweryIds.length > 0) {
      errors.push(`重複する酒蔵ID: ${duplicateBreweryIds.join(', ')}`);
    }
    
    // 参加情報の整合性チェック
    const allParticipations = await getAllParticipations();
    for (const participation of allParticipations) {
      const store = stores.find(s => s.id === participation.storeId);
      if (!store) {
        errors.push(`存在しない店舗への参加情報: 店舗ID ${participation.storeId}`);
      }
      
      const brewery = breweries.find(b => b.id === participation.breweryId);
      if (!brewery) {
        errors.push(`存在しない酒蔵への参加情報: 酒蔵ID ${participation.breweryId}`);
      }
    }
    
  } catch (error) {
    errors.push(`データ検証エラー: ${error}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}