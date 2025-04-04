import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StoresPage2023 from './+page.svelte';
import { createMockStores } from '../../../mocks/storesMock';

describe('店舗一覧ページ（2023年版）', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', class {
      onload() {}
    });
  });
  
  it('店舗一覧が表示される', () => {
    const mockStores = createMockStores(3);
    
    const { container } = render(StoresPage2023, { data: { stores: mockStores } });
    
    expect(container.textContent).toContain('参加店舗一覧');
    
    const storeTiles = container.querySelectorAll('.bx--tile');
    expect(storeTiles.length).toBe(3);
  });
});
