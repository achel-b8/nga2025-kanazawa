import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StoreDetailPage from './+page.svelte';
import { createMockStore } from '../../../../src/mocks/storesMock';

describe('店舗詳細ページ（2024年版）', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', class {
      onload() {}
    });
  });
  
  it('店舗名が表示される', () => {
    const mockStore = createMockStore(1);
    
    const { container } = render(StoreDetailPage, { data: { store: mockStore } });
    
    expect(container.querySelector('h1')?.textContent).toBe('テスト店舗1');
  });
  
  it('店舗の基本情報が表示される', () => {
    const mockStore = createMockStore(1);
    
    const { container } = render(StoreDetailPage, { data: { store: mockStore } });
    
    expect(container.textContent).toContain('店舗住所');
    expect(container.textContent).toContain('石川県金沢市テスト住所');
    
    expect(container.textContent).toContain('店舗電話番号');
    expect(container.textContent).toContain('0761234567');
    
    expect(container.textContent).toContain('蔵元');
    expect(container.textContent).toContain('テスト蔵元');
  });
  
  it('飲食情報が表示される', () => {
    const mockStore = createMockStore(1);
    
    const { container } = render(StoreDetailPage, { data: { store: mockStore } });
    
    expect(container.textContent).toContain('料金');
    expect(container.textContent).toContain('1000');
    
    expect(container.textContent).toContain('お通し');
    expect(container.textContent).toContain('テストおつまみ');
    
    expect(container.textContent).toContain('開催時間');
    expect(container.textContent).toContain('14:00 - 22:00');
  });
});
