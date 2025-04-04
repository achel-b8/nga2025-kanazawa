import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MainPage from './+page.svelte';
import { createMockStores } from '../mocks/storesMock';

describe('メインページ（2024年版）', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', class {
      onload() {}
    });
  });
  
  it('タイトルと主要な情報が表示される', () => {
    const mockStores = createMockStores(3);
    
    const { container } = render(MainPage, { data: { stores: mockStores } });
    
    expect(container.querySelector('h1')?.textContent).toContain('日本酒ゴーアラウンド金沢2024 公式サイト');
    
    expect(container.textContent).toContain('日本酒ゴーアラウンド金沢 2024年も開催決定！');
    expect(container.textContent).toContain('日本酒ゴーアラウンド金沢で能登を応援！');
    expect(container.textContent).toContain('参加方法・ルール');
    expect(container.textContent).toContain('さかずきんバッジ');
    
    expect(container.textContent).toContain('能登海洋深層水');
    expect(container.textContent).toContain('能登の食材');
  });
  
  it('LINEアカウント情報が表示される', () => {
    const mockStores = createMockStores(3);
    
    const { container } = render(MainPage, { data: { stores: mockStores } });
    
    expect(container.textContent).toContain('LINEアカウント');
    expect(container.textContent).toContain('公式LINEアカウント');
    expect(container.textContent).toContain('LINEオープンチャット');
    
    const lineLinks = Array.from(container.querySelectorAll('a')).filter(link => 
      link.getAttribute('href')?.includes('line.me') || link.getAttribute('href')?.includes('lin.ee')
    );
    expect(lineLinks.length).toBeGreaterThan(0);
  });
  
  it('参加店舗リストが表示される', () => {
    const mockStores = createMockStores(3);
    
    const { container } = render(MainPage, { data: { stores: mockStores } });
    
    expect(container.textContent).toContain('参加店舗');
    
    const storeListSection = container.querySelector('.bx--structured-list');
    expect(storeListSection).not.toBeNull();
  });
});
