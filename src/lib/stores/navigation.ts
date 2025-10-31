import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createNavigationStore() {
	const { subscribe, update } = writable<string[]>([]);

	return {
		subscribe,
		push: (path: string) => {
			if (browser) {
				update((history) => [...history.slice(-50), path]); // Keep last 50 entries
			}
		},
		stepsBackTo: (path: string): number | null => {
			let steps: number | null = null;
			const unsubscribe = subscribe((history) => {
				// Find the last occurrence of the path
				const lastIndex = history.lastIndexOf(path);
				if (lastIndex !== -1 && lastIndex < history.length - 1) {
					// Calculate how many steps back (current position is history.length - 1)
					steps = history.length - 1 - lastIndex;
				}
			});
			unsubscribe();
			return steps;
		}
	};
}

export const navigationHistory = createNavigationStore();
