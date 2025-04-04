import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StoreDetailPage2023 from './+page.svelte';
import { createMockStore } from '../../../../mocks/storesMock';

describe('店舗詳細ページ（2023年版）', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', class {
      onload() {}
    });
  });
  
  it('店舗詳細が表示される', () => {
    const mockStore = createMockStore(1);
    
    const { container } = render(StoreDetailPage2023, { data: { store: mockStore } });
    
    expect(container.textContent).toContain('テスト店舗1');
    
    expect(container.textContent).toContain('石川県金沢市テスト住所');
    expect(container.textContent).toContain('テスト蔵元');
  });
});
