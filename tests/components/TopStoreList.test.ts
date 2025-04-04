import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TopStoreList from './TopStoreList.svelte';
import { createMockStores } from '../mocks/storesMock';

describe('TopStoreList', () => {
  it('複数の店舗が正しく表示される', () => {
    const mockStores = createMockStores(3);
    
    const { container } = render(TopStoreList, { stores: mockStores });
    
    const storeRows = container.querySelectorAll('div.bx--structured-list-row:not(.bx--structured-list-row--header-row)');
    expect(storeRows.length).toBe(3);
    
    mockStores.forEach(store => {
      expect(container.textContent).toContain(store.name);
    });
    
    mockStores.forEach(store => {
      expect(container.textContent).toContain(store.kuramoto.name);
    });
  });
  
  it('店舗へのリンクが正しく設定されている', () => {
    const mockStores = createMockStores(1);
    
    const { container } = render(TopStoreList, { stores: mockStores });
    
    const storeLink = container.querySelector('a');
    expect(storeLink?.getAttribute('href')).toBe('/stores/1');
  });
});
