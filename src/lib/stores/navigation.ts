import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

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

export function goBackTo(href: string) {
	// Check if we can go back to this path
	const stepsBack = navigationHistory.stepsBackTo(href);

	if (stepsBack !== null && window.history.length > stepsBack) {
		// Go back the specific number of steps
		window.history.go(-stepsBack);
	} else {
		goto(href);
	}
}
