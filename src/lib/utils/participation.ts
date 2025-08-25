/**
 * 参加情報関連のユーティリティ関数
 */

import type { Participation, StoreWithParticipation } from '../../types/stores.d.js';
import { SUPPORTED_YEARS } from '../../types/constants.js';

/**
 * 店舗の初回参加判定
 */
export function isFirstTimeParticipation(
  storeId: number,
  currentYear: number,
  allParticipations: Participation[]
): boolean {
  const storeParticipations = allParticipations
    .filter(p => p.storeId === storeId && p.isActive)
    .map(p => p.year)
    .sort();
  
  return storeParticipations.length > 0 && storeParticipations[0] === currentYear;
}

/**
 * 店舗の参加回数を計算
 */
export function calculateParticipationCount(
  storeId: number,
  allParticipations: Participation[]
): number {
  return allParticipations
    .filter(p => p.storeId === storeId && p.isActive)
    .length;
}

/**
 * 連続参加年数を計算
 */
export function calculateContinuousYears(
  storeId: number,
  currentYear: number,
  allParticipations: Participation[]
): number {
  const storeParticipations = allParticipations
    .filter(p => p.storeId === storeId && p.isActive)
    .map(p => p.year)
    .sort((a, b) => b - a); // 降順ソート
  
  if (storeParticipations.length === 0) return 0;
  
  let continuous = 0;
  for (let i = 0; i < storeParticipations.length; i++) {
    const expectedYear = currentYear - i;
    if (storeParticipations[i] === expectedYear) {
      continuous++;
    } else {
      break;
    }
  }
  
  return continuous;
}

/**
 * 年度別参加情報を取得
 */
export function getParticipationByYear(
  storeId: number,
  year: number,
  allParticipations: Participation[]
): Participation | null {
  return allParticipations.find(
    p => p.storeId === storeId && p.year === year && p.isActive
  ) || null;
}

/**
 * 参加状況の統計情報を生成
 */
export function generateParticipationStats(
  storeId: number,
  currentYear: number,
  allParticipations: Participation[]
) {
  const participationCount = calculateParticipationCount(storeId, allParticipations);
  const isFirstTime = isFirstTimeParticipation(storeId, currentYear, allParticipations);
  const continuousYears = calculateContinuousYears(storeId, currentYear, allParticipations);
  
  return {
    participationCount,
    isFirstTime,
    continuousYears,
  };
}

/**
 * 営業時間の妥当性チェック
 */
export function validateBusinessHours(
  startTime: string,
  endTime: string,
  breakStartTime?: string | null,
  breakEndTime?: string | null
): { isValid: boolean; error?: string } {
  // 時刻形式チェック（HH:MM）
  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  
  if (!timePattern.test(startTime)) {
    return { isValid: false, error: '開始時刻の形式が正しくありません' };
  }
  
  if (!timePattern.test(endTime)) {
    return { isValid: false, error: '終了時刻の形式が正しくありません' };
  }
  
  // 時刻を分数に変換
  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const startMinutes = parseTime(startTime);
  const endMinutes = parseTime(endTime);
  
  // 終了時刻は開始時刻より後でなければならない（日を跨ぐ場合も考慮）
  if (endMinutes <= startMinutes) {
    // 日跨ぎの場合は許可（例：22:00-02:00）
    if (endMinutes + 24 * 60 <= startMinutes) {
      return { isValid: false, error: '終了時刻は開始時刻より後である必要があります' };
    }
  }
  
  // 休憩時間のチェック
  if (breakStartTime && breakEndTime) {
    if (!timePattern.test(breakStartTime)) {
      return { isValid: false, error: '休憩開始時刻の形式が正しくありません' };
    }
    
    if (!timePattern.test(breakEndTime)) {
      return { isValid: false, error: '休憩終了時刻の形式が正しくありません' };
    }
    
    const breakStartMinutes = parseTime(breakStartTime);
    const breakEndMinutes = parseTime(breakEndTime);
    
    if (breakEndMinutes <= breakStartMinutes) {
      return { isValid: false, error: '休憩終了時刻は休憩開始時刻より後である必要があります' };
    }
    
    // 休憩時間が営業時間内に収まっているかチェック
    if (breakStartMinutes < startMinutes || breakEndMinutes > endMinutes) {
      // 日跨ぎの場合の処理が必要だが、一般的ではないので警告レベル
      console.warn('休憩時間が営業時間外に設定されています');
    }
  }
  
  return { isValid: true };
}

/**
 * 営業時間を表示用にフォーマット
 */
export function formatBusinessHours(
  startTime: string,
  endTime: string,
  breakStartTime?: string | null,
  breakEndTime?: string | null
): string {
  let formatted = `${startTime}〜${endTime}`;
  
  if (breakStartTime && breakEndTime) {
    formatted += ` (${breakStartTime}〜${breakEndTime}休憩)`;
  }
  
  return formatted;
}

/**
 * 年度の有効性チェック
 */
export function isValidYear(year: number): boolean {
  return SUPPORTED_YEARS.includes(year as any);
}

/**
 * 参加履歴を年度順にソート
 */
export function sortParticipationsByYear(
  participations: Participation[],
  ascending: boolean = true
): Participation[] {
  return [...participations].sort((a, b) => {
    return ascending ? a.year - b.year : b.year - a.year;
  });
}