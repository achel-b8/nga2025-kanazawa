import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StoresPage from './+page.svelte';
import { createMockStores } from '../../../tests/mocks/storesMock';

describe('店舗一覧ページ（2024年版）', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', class {
      onload() {}
    });
  });
  
  it('タイトルが表示される', () => {
    const mockStores = createMockStores(3);
    
    const { container } = render(StoresPage, { data: { stores: mockStores } });
    
    expect(container.querySelector('h1')?.textContent).toContain('参加店舗一覧');
  });
  
  it('すべての店舗が表示される', () => {
    const mockStores = createMockStores(3);
    
    const { container } = render(StoresPage, { data: { stores: mockStores } });
    
    const storeTiles = container.querySelectorAll('.bx--tile');
    expect(storeTiles.length).toBe(3);
  });
});
