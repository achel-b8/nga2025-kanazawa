import type { Store, SnsUrls, Kuramoto } from '../types/stores';

export const createMockSnsUrls = (overrides?: Partial<SnsUrls>): SnsUrls => ({
  twitterUrl: null,
  facebookUrl: 'https://www.facebook.com/example/',
  instagramUrl: 'https://www.instagram.com/example/',
  websiteUrl: 'https://www.example.com/',
  ...overrides
});

export const createMockKuramoto = (overrides?: Partial<Kuramoto>): Kuramoto => ({
  name: 'テスト蔵元',
  startTime: null,
  endTime: null,
  snsUrls: createMockSnsUrls(),
  ...overrides
});

export const createMockStore = (id: number, overrides?: Partial<Store>): Store => {
  const baseDate = new Date(2024, 9, 1);
  
  const salesStartTime = new Date(baseDate);
  salesStartTime.setHours(14, 0, 0);
  
  const salesEndTime = new Date(baseDate);
  salesEndTime.setHours(22, 0, 0);
  
  const salesBreakStartTime = overrides?.salesBreakStartTime || null;
  const salesBreakEndTime = overrides?.salesBreakEndTime || null;
  
  return {
    id,
    name: `テスト店舗${id}`,
    address: '石川県金沢市テスト住所',
    phoneNumber: '0761234567',
    salesStartTime,
    salesEndTime,
    salesBreakStartTime,
    salesBreakEndTime,
    kuramotoStartTime: null,
    kuramotoEndTime: null,
    seat: null,
    appetizer: 'テストおつまみ',
    appetizerPrice: 1000,
    timeLimit: null,
    additionalNotes: null,
    mapUrl: 'https://www.google.com/maps/embed?pb=example',
    snsUrls: createMockSnsUrls(),
    kuramoto: createMockKuramoto(),
    ...overrides
  };
};

export const createMockStores = (count: number = 3): Store[] => {
  return Array(count).fill(null).map((_, index) => createMockStore(index + 1));
};

export const createMockStoreWithBreak = (id: number): Store => {
  const baseDate = new Date(2024, 9, 1);
  
  const breakStartTime = new Date(baseDate);
  breakStartTime.setHours(15, 0, 0);
  
  const breakEndTime = new Date(baseDate);
  breakEndTime.setHours(17, 0, 0);
  
  return createMockStore(id, {
    salesBreakStartTime: breakStartTime,
    salesBreakEndTime: breakEndTime
  });
};
