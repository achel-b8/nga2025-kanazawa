/**
 * コンポーネントカタログ用のサンプルデータ
 */

import type { StoreWithParticipation, SnsUrls } from '../../types/stores.d.js';

// サンプルSNSURL
export const sampleSnsUrls: SnsUrls = {
  twitterUrl: 'https://twitter.com/example',
  facebookUrl: 'https://www.facebook.com/example',
  instagramUrl: 'https://www.instagram.com/example',
  websiteUrl: 'https://example.com'
};

// SNSなしのサンプル
export const emptySnsUrls: SnsUrls = {
  twitterUrl: null,
  facebookUrl: null,
  instagramUrl: null,
  websiteUrl: null
};

// 部分的なSNS
export const partialSnsUrls: SnsUrls = {
  twitterUrl: null,
  facebookUrl: null,
  instagramUrl: 'https://www.instagram.com/partial_example',
  websiteUrl: 'https://partial-example.com'
};

// サンプル店舗データ
export const sampleStore: StoreWithParticipation = {
  // 店舗基本情報
  id: 1,
  name: 'サンプル居酒屋',
  address: '石川県金沢市片町2-1-1',
  phoneNumber: '0762345678',
  prefecture: '石川県',
  city: '金沢市',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.1785873016693!2d136.64900660000004!3d36.573913999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8336f4cd32dbf%3A0xd5e084d009dffcf3!2z5ZKM44GV44Oz56We6a6u!5e0!3m2!1sja!2sjp!4v1694151506588!5m2!1sja!2sjp',
  snsUrls: sampleSnsUrls,
  seat: 30,
  timeLimit: 120,
  additionalNotes: 'ラストオーダーは30分前まで',
  
  // 参加情報
  year: 2025,
  breweryId: 'sample-brewery',
  breweryName: 'サンプル酒造',
  breweryPrefecture: '石川県',
  brewerySnsUrls: partialSnsUrls,
  
  // イベント固有情報
  businessHours: {
    startTime: '17:00',
    endTime: '23:00',
    breakStartTime: null,
    breakEndTime: null,
  },
  appetizer: 'お造り三点盛り、茶碗蒸し',
  appetizerPrice: 1500,
  breweryVisit: {
    startTime: '19:00',
    endTime: '21:00',
  },
  
  // 統計情報
  participationCount: 3,
  isFirstTime: false,
  continuousYears: 3,
};

// 初回参加店舗のサンプル
export const firstTimeStore: StoreWithParticipation = {
  ...sampleStore,
  id: 2,
  name: '新規参加店',
  address: '石川県金沢市香林坊1-2-3',
  breweryName: '新進酒造',
  businessHours: {
    startTime: '18:00',
    endTime: '22:00',
    breakStartTime: '20:00',
    breakEndTime: '20:30',
  },
  appetizer: '季節の前菜',
  appetizerPrice: 1200,
  breweryVisit: undefined,
  participationCount: 1,
  isFirstTime: true,
  continuousYears: 1,
};

// SNSなし店舗のサンプル
export const noSnsStore: StoreWithParticipation = {
  ...sampleStore,
  id: 3,
  name: '老舗料亭',
  address: '石川県金沢市東山1-2-3',
  snsUrls: emptySnsUrls,
  brewerySnsUrls: emptySnsUrls,
  breweryName: '伝統酒造',
  businessHours: {
    startTime: '17:30',
    endTime: '21:30',
    breakStartTime: null,
    breakEndTime: null,
  },
  seat: 12,
  timeLimit: null,
  additionalNotes: '完全予約制',
};

// コンポーネント確認用の店舗リスト
export const sampleStoreList: StoreWithParticipation[] = [
  sampleStore,
  firstTimeStore,
  noSnsStore,
  {
    ...sampleStore,
    id: 4,
    name: '海鮮居酒屋 潮',
    prefecture: '富山県',
    city: '富山市',
    address: '富山県富山市総曲輪3-4-5',
    breweryName: '立山酒造',
    breweryPrefecture: '富山県',
    appetizerPrice: 1800,
    participationCount: 2,
    continuousYears: 2,
  },
  {
    ...sampleStore,
    id: 5,
    name: '山の幸 やまびこ',
    prefecture: '福井県',
    city: '福井市',
    address: '福井県福井市大手2-1-1',
    breweryName: '黒龍酒造',
    breweryPrefecture: '福井県',
    appetizerPrice: 1300,
    businessHours: {
      startTime: '16:30',
      endTime: '23:30',
      breakStartTime: '18:00',
      breakEndTime: '18:30',
    },
    participationCount: 4,
    continuousYears: 2,
  }
];

// 営業時間のバリエーション
export const businessHoursVariations = [
  {
    name: '通常営業',
    hours: {
      startTime: '17:00',
      endTime: '23:00',
      breakStartTime: null,
      breakEndTime: null,
    }
  },
  {
    name: '休憩あり',
    hours: {
      startTime: '11:30',
      endTime: '23:00',
      breakStartTime: '15:00',
      breakEndTime: '17:00',
    }
  },
  {
    name: '深夜営業',
    hours: {
      startTime: '18:00',
      endTime: '02:00',
      breakStartTime: null,
      breakEndTime: null,
    }
  },
  {
    name: '日跨ぎ営業',
    hours: {
      startTime: '17:00',
      endTime: '02:00',
      breakStartTime: null,
      breakEndTime: null,
    }
  }
];