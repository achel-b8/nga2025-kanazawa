#!/usr/bin/env node

/**
 * データ移行スクリプト（2025年版リプレース対応）
 * 
 * 既存のstores.jsonを新形式に変換:
 * - 店舗マスター（/static/stores.json）
 * - 酒蔵マスター（/static/breweries.json） 
 * - 年度別参加情報（/static/YYYY/participations.json）
 */

import fs from 'fs/promises';
import path from 'path';

// パス設定
const PATHS = {
  LEGACY_STORES_2024: './_archived/static/stores.json',
  LEGACY_STORES_2023: './_archived/static/2023/stores.json',
  OUTPUT_STORES: './static/stores.json',
  OUTPUT_BREWERIES: './static/breweries.json',
  OUTPUT_PARTICIPATIONS_2024: './static/2024/participations.json',
  OUTPUT_PARTICIPATIONS_2023: './static/2023/participations.json',
};

/**
 * 時刻形式を変換（"2024-10-01 16:00:00" → "16:00"）
 */
function convertTimeFormat(dateTimeString) {
  if (!dateTimeString) return null;
  const timeMatch = dateTimeString.match(/(\d{2}):(\d{2}):\d{2}$/);
  return timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : null;
}

/**
 * 住所から都道府県を抽出
 */
function extractPrefecture(address) {
  const prefectureMatch = address.match(/^(.*?[都道府県])/);
  return prefectureMatch ? prefectureMatch[1] : '未設定';
}

/**
 * 住所から市町村を抽出
 */
function extractCity(address) {
  const cityMatch = address.match(/[都道府県](.+?)[市区町村]/);
  return cityMatch ? `${cityMatch[1]}${cityMatch[0].slice(-1)}` : '';
}

/**
 * 酒蔵名から都道府県を抽出（括弧内）
 */
function extractBreweryPrefecture(breweryName) {
  const prefectureMatch = breweryName.match(/（(.+?)）$/);
  return prefectureMatch ? prefectureMatch[1] : '未設定';
}

/**
 * 酒蔵名から正規化された名前を取得
 */
function extractBreweryName(breweryName) {
  return breweryName.replace(/（.+）$/, '').trim();
}

/**
 * 酒蔵IDを生成（名前をベースにした一意ID）
 */
function generateBreweryId(breweryName) {
  const normalizedName = extractBreweryName(breweryName);
  return normalizedName
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
    .toLowerCase();
}

/**
 * レガシー形式から新形式に変換
 */
function convertLegacyData(legacyStores, year) {
  const stores = [];
  const breweries = [];
  const participations = [];
  const breweryMap = new Map();

  legacyStores.forEach(legacyStore => {
    const prefecture = extractPrefecture(legacyStore.address);
    const city = extractCity(legacyStore.address);
    
    // 店舗マスターデータ
    const store = {
      id: legacyStore.id,
      name: legacyStore.name,
      address: legacyStore.address,
      phoneNumber: legacyStore.phoneNumber || null,
      prefecture,
      city,
      mapUrl: legacyStore.mapUrl || null,
      snsUrls: legacyStore.snsUrls,
      seat: legacyStore.seat,
      timeLimit: legacyStore.timeLimit,
      additionalNotes: legacyStore.additionalNotes,
    };
    stores.push(store);

    // 酒蔵マスターデータ
    const breweryName = extractBreweryName(legacyStore.kuramoto.name);
    const breweryPrefecture = extractBreweryPrefecture(legacyStore.kuramoto.name);
    const breweryId = generateBreweryId(legacyStore.kuramoto.name);
    
    if (!breweryMap.has(breweryId)) {
      const brewery = {
        id: breweryId,
        name: breweryName,
        prefecture: breweryPrefecture,
        snsUrls: legacyStore.kuramoto.snsUrls,
      };
      breweries.push(brewery);
      breweryMap.set(breweryId, brewery);
    }

    // 参加情報
    const participation = {
      storeId: legacyStore.id,
      breweryId,
      year,
      eventBusinessHours: {
        startTime: convertTimeFormat(legacyStore.salesStartTime),
        endTime: convertTimeFormat(legacyStore.salesEndTime),
        breakStartTime: convertTimeFormat(legacyStore.salesBreakStartTime),
        breakEndTime: convertTimeFormat(legacyStore.salesBreakEndTime),
      },
      appetizer: legacyStore.appetizer,
      appetizerPrice: legacyStore.appetizerPrice,
      breweryVisit: {
        startTime: convertTimeFormat(legacyStore.kuramoto.startTime),
        endTime: convertTimeFormat(legacyStore.kuramoto.endTime),
      },
      isActive: true,
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    participations.push(participation);
  });

  return { stores, breweries, participations };
}

/**
 * 出力ディレクトリを作成
 */
async function ensureDirectories() {
  const dirs = [
    './static',
    './static/2024',
    './static/2023'
  ];
  
  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
      console.log(`✅ ディレクトリ作成: ${dir}`);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }
}

/**
 * データファイルを書き込み
 */
async function writeDataFile(filePath, data, description) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ ${description}: ${filePath}`);
  } catch (error) {
    console.error(`❌ ${description}の書き込み失敗: ${filePath}`, error);
    throw error;
  }
}

/**
 * 店舗マスターをマージ
 */
function mergeStores(stores2024, stores2023) {
  const storeMap = new Map();
  
  // 2024年のデータを基準にする
  stores2024.forEach(store => {
    storeMap.set(store.id, store);
  });
  
  // 2023年のデータで不足分を補完
  stores2023.forEach(store => {
    if (!storeMap.has(store.id)) {
      storeMap.set(store.id, store);
    }
  });
  
  return Array.from(storeMap.values()).sort((a, b) => a.id - b.id);
}

/**
 * 酒蔵マスターをマージ
 */
function mergeBreweries(breweries2024, breweries2023) {
  const breweryMap = new Map();
  
  // 2024年のデータを基準にする
  breweries2024.forEach(brewery => {
    breweryMap.set(brewery.id, brewery);
  });
  
  // 2023年のデータで不足分を補完
  breweries2023.forEach(brewery => {
    if (!breweryMap.has(brewery.id)) {
      breweryMap.set(brewery.id, brewery);
    }
  });
  
  return Array.from(breweryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * メイン処理
 */
async function main() {
  console.log('🚀 データ移行スクリプト開始');
  
  try {
    // 出力ディレクトリ準備
    await ensureDirectories();
    
    // 既存データ読み込み
    console.log('📖 既存データを読み込み中...');
    
    const legacy2024Raw = await fs.readFile(PATHS.LEGACY_STORES_2024, 'utf8');
    const legacy2024 = JSON.parse(legacy2024Raw);
    
    const legacy2023Raw = await fs.readFile(PATHS.LEGACY_STORES_2023, 'utf8');
    const legacy2023 = JSON.parse(legacy2023Raw);
    
    console.log(`📊 2024年データ: ${legacy2024.stores.length}店舗`);
    console.log(`📊 2023年データ: ${legacy2023.stores.length}店舗`);
    
    // データ変換
    console.log('🔄 データ変換中...');
    
    const converted2024 = convertLegacyData(legacy2024.stores, 2024);
    const converted2023 = convertLegacyData(legacy2023.stores, 2023);
    
    // マスターデータマージ
    const mergedStores = mergeStores(converted2024.stores, converted2023.stores);
    const mergedBreweries = mergeBreweries(converted2024.breweries, converted2023.breweries);
    
    // 出力データ作成
    const storesData = {
      stores: mergedStores,
      metadata: {
        version: '2025.1.0',
        lastUpdated: new Date().toISOString(),
        totalStores: mergedStores.length,
      }
    };
    
    const breweriesData = {
      breweries: mergedBreweries,
      metadata: {
        version: '2025.1.0',
        lastUpdated: new Date().toISOString(),
        totalBreweries: mergedBreweries.length,
      }
    };
    
    const participations2024Data = {
      participations: converted2024.participations,
      metadata: {
        version: '2025.1.0',
        year: 2024,
        lastUpdated: new Date().toISOString(),
        totalParticipations: converted2024.participations.length,
      }
    };
    
    const participations2023Data = {
      participations: converted2023.participations,
      metadata: {
        version: '2025.1.0',
        year: 2023,
        lastUpdated: new Date().toISOString(),
        totalParticipations: converted2023.participations.length,
      }
    };
    
    // ファイル書き込み
    console.log('💾 ファイル書き込み中...');
    
    await writeDataFile(PATHS.OUTPUT_STORES, storesData, '店舗マスター');
    await writeDataFile(PATHS.OUTPUT_BREWERIES, breweriesData, '酒蔵マスター');
    await writeDataFile(PATHS.OUTPUT_PARTICIPATIONS_2024, participations2024Data, '2024年参加情報');
    await writeDataFile(PATHS.OUTPUT_PARTICIPATIONS_2023, participations2023Data, '2023年参加情報');
    
    // 統計表示
    console.log('\n📈 変換結果:');
    console.log(`   店舗マスター: ${mergedStores.length}店舗`);
    console.log(`   酒蔵マスター: ${mergedBreweries.length}酒蔵`);
    console.log(`   2024年参加: ${converted2024.participations.length}件`);
    console.log(`   2023年参加: ${converted2023.participations.length}件`);
    
    console.log('✅ データ移行完了');
    
  } catch (error) {
    console.error('❌ データ移行エラー:', error);
    process.exit(1);
  }
}

// スクリプト実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}