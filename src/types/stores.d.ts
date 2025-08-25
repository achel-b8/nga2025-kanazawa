/**
 * 店舗・酒蔵・参加情報の型定義（2025年版リプレース対応）
 */

// SNS URL情報
export interface SnsUrls {
  twitterUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
}

// 酒蔵情報（マスターデータ）
export interface Brewery {
  id: string;
  name: string;
  prefecture: string;
  description?: string;
  snsUrls: SnsUrls;
  established?: number;
  website?: string;
}

// 店舗情報（マスターデータ）
export interface Store {
  id: number;
  name: string;
  address: string;
  phoneNumber?: string;
  prefecture: string;
  city: string;
  postalCode?: string;
  mapUrl?: string;
  snsUrls: SnsUrls;
  seat?: number | null;
  timeLimit?: number | null;
  additionalNotes?: string | null;
  // 基本営業時間（店舗固有）
  defaultBusinessHours?: BusinessHours;
}

// 営業時間情報
export interface BusinessHours {
  startTime: string; // ISO8601 時刻形式 "HH:mm"
  endTime: string;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
}

// 年度別参加情報
export interface Participation {
  storeId: number;
  breweryId: string;
  year: number;
  // イベント固有の営業時間（参加時の設定）
  eventBusinessHours: BusinessHours;
  appetizer: string;
  appetizerPrice: number;
  // 酒蔵来店情報
  breweryVisit?: {
    startTime?: string | null; // ISO8601 時刻形式
    endTime?: string | null;
  };
  // 参加状態
  isActive: boolean;
  registeredAt: string; // ISO8601 日時形式
  updatedAt: string;
}

// 結合されたデータ（表示用）
export interface StoreWithParticipation {
  // 店舗基本情報
  id: number;
  name: string;
  address: string;
  phoneNumber?: string;
  prefecture: string;
  city: string;
  mapUrl?: string;
  snsUrls: SnsUrls;
  seat?: number | null;
  timeLimit?: number | null;
  additionalNotes?: string | null;
  
  // 参加情報
  year: number;
  breweryId: string;
  breweryName: string;
  breweryPrefecture: string;
  brewerySnsUrls: SnsUrls;
  
  // イベント固有情報
  businessHours: BusinessHours;
  appetizer: string;
  appetizerPrice: number;
  breweryVisit?: {
    startTime?: string | null;
    endTime?: string | null;
  };
  
  // 統計情報
  participationCount: number; // 過去の参加回数
  isFirstTime: boolean; // 初回参加かどうか
  continuousYears: number; // 連続参加年数
}

// データファイル構造
export interface StoresData {
  stores: Store[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalStores: number;
  };
}

export interface BreweriesData {
  breweries: Brewery[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalBreweries: number;
  };
}

export interface ParticipationsData {
  participations: Participation[];
  metadata: {
    version: string;
    year: number;
    lastUpdated: string;
    totalParticipations: number;
  };
}

// レガシー形式（移行用）
export interface LegacyStoreData {
  id: number;
  name: string;
  address: string;
  phoneNumber?: string;
  salesStartTime: string; // "2024-10-01 16:00:00"
  salesBreakStartTime?: string | null;
  salesBreakEndTime?: string | null;
  salesEndTime: string;
  seat?: number | null;
  appetizer: string;
  appetizerPrice: number;
  timeLimit?: number | null;
  additionalNotes?: string | null;
  mapUrl?: string;
  snsUrls: SnsUrls;
  kuramoto: {
    name: string;
    startTime?: string | null;
    endTime?: string | null;
    snsUrls: SnsUrls;
  };
}

export interface LegacyStoresJson {
  stores: LegacyStoreData[];
}