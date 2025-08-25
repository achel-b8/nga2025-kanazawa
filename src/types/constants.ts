/**
 * 定数定義とユーティリティ型（2025年版リプレース対応）
 */

// 都道府県リスト
export const PREFECTURES = [
  '北海道',
  '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
  '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
] as const;

export type Prefecture = typeof PREFECTURES[number];

// サポートされている年度
export const SUPPORTED_YEARS = [2023, 2024, 2025] as const;
export type SupportedYear = typeof SUPPORTED_YEARS[number];

// 現在の年度
export const CURRENT_YEAR: SupportedYear = 2025;

// デフォルト値
export const DEFAULT_VALUES = {
  APPETIZER_PRICE_MIN: 500,
  APPETIZER_PRICE_MAX: 2000,
  TIME_LIMIT_MIN: 60, // 分
  TIME_LIMIT_MAX: 180, // 分
  SEAT_MIN: 1,
  SEAT_MAX: 100,
} as const;

// SNSプラットフォーム
export const SNS_PLATFORMS = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook', 
  INSTAGRAM: 'instagram',
  WEBSITE: 'website',
} as const;

export type SnsPlat = typeof SNS_PLATFORMS[keyof typeof SNS_PLATFORMS];

// SNS URL検証パターン
export const SNS_URL_PATTERNS = {
  [SNS_PLATFORMS.TWITTER]: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/,
  [SNS_PLATFORMS.FACEBOOK]: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.-]+\/?$/,
  [SNS_PLATFORMS.INSTAGRAM]: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
  [SNS_PLATFORMS.WEBSITE]: /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/,
} as const;

// API エンドポイント
export const API_ENDPOINTS = {
  STORES: '/api/stores',
  BREWERIES: '/api/breweries',
  PARTICIPATIONS: '/api/participations',
} as const;

// 静的ファイルパス
export const STATIC_PATHS = {
  STORES: '/stores.json',
  BREWERIES: '/breweries.json',
  PARTICIPATIONS_2023: '/2023/participations.json',
  PARTICIPATIONS_2024: '/2024/participations.json', 
  PARTICIPATIONS_2025: '/2025/participations.json',
  STORE_IMAGES: '/stores',
  QR_CODES: '/qr',
} as const;

// 画像設定
export const IMAGE_CONFIG = {
  STORE_IMAGE_EXTENSIONS: ['.webp', '.jpg', '.jpeg', '.png'] as const,
  MAIN_VISUAL_FILENAME: 'mainVisual.webp',
  OGP_IMAGE_FILENAME: 'ogp.png',
  QR_CODE_EXTENSIONS: ['.webp', '.png'] as const,
} as const;

// パフォーマンス設定
export const PERFORMANCE_CONFIG = {
  IMAGE_LAZY_LOADING_THRESHOLD: 100, // px
  DEBOUNCE_DELAY: 300, // ms
  CACHE_TTL: 1000 * 60 * 60, // 1時間（ms）
} as const;

// アクセシビリティ設定
export const A11Y_CONFIG = {
  FOCUS_TRAP_SELECTOR: '[role="dialog"]',
  SKIP_LINK_TARGET: '#main-content',
  MIN_TOUCH_TARGET_SIZE: 44, // px
} as const;

// バリデーション設定
export const VALIDATION = {
  STORE_NAME_MIN_LENGTH: 1,
  STORE_NAME_MAX_LENGTH: 100,
  ADDRESS_MIN_LENGTH: 5,
  ADDRESS_MAX_LENGTH: 200,
  PHONE_PATTERN: /^0\d{1,4}-?\d{1,4}-?\d{4}$/,
  BUSINESS_HOURS_PATTERN: /^([01]\d|2[0-3]):[0-5]\d$/,
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  STORE_NOT_FOUND: '店舗が見つかりませんでした',
  BREWERY_NOT_FOUND: '酒蔵が見つかりませんでした',
  INVALID_YEAR: 'サポートされていない年度です',
  DATA_LOAD_FAILED: 'データの読み込みに失敗しました',
  INVALID_BUSINESS_HOURS: '営業時間の形式が正しくありません',
  INVALID_SNS_URL: 'SNS URLの形式が正しくありません',
} as const;

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'データが正常に読み込まれました',
  MIGRATION_COMPLETED: 'データ移行が完了しました',
} as const;