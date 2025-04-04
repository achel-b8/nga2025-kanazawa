import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BusinessTimeCell from '../../src/components/BusinessTimeCell.svelte';
import { createMockStore, createMockStoreWithBreak } from '../mocks/storesMock';

describe('BusinessTimeCell', () => {
	it('休憩時間なしで正しく表示される', () => {
		const mockStore = createMockStore(1);

		const { container } = render(BusinessTimeCell, {
			salesStartTime: mockStore.salesStartTime,
			salesEndTime: mockStore.salesEndTime,
			salesBreakStartTime: null,
			salesBreakEndTime: null
		});

		expect(container.textContent).toContain('14:00 - 22:00');
		expect(container.textContent).not.toContain('14:00 - 15:00');
	});

	it('休憩時間ありで正しく表示される', () => {
		const mockStoreWithBreak = createMockStoreWithBreak(1);

		const { container } = render(BusinessTimeCell, {
			salesStartTime: mockStoreWithBreak.salesStartTime,
			salesEndTime: mockStoreWithBreak.salesEndTime,
			salesBreakStartTime: mockStoreWithBreak.salesBreakStartTime,
			salesBreakEndTime: mockStoreWithBreak.salesBreakEndTime
		});

		expect(container.textContent).toContain('14:00 - 15:00');
		expect(container.textContent).toContain('17:00 - 22:00');
	});

	it('追加のノート情報が表示される', () => {
		const mockStore = createMockStore(1, {
			additionalNotes: 'テスト追加情報'
		});

		const { container } = render(BusinessTimeCell, {
			salesStartTime: mockStore.salesStartTime,
			salesEndTime: mockStore.salesEndTime,
			salesBreakStartTime: null,
			salesBreakEndTime: null,
			additionalNotes: mockStore.additionalNotes
		});

		expect(container.textContent).toContain('テスト追加情報');
	});
});
