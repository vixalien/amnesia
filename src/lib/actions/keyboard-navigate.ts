import { goto } from '$app/navigation';
import { goBackTo } from '$lib/stores/navigation';
import type { Action } from 'svelte/action';

interface KeyboardNavigateParams {
	next?: string;
	previous?: string;
}

export const keyboardNavigate: Action<Window, KeyboardNavigateParams> = (_, params) => {
	function handleKeydown(event: KeyboardEvent) {
		if (!params) return;

		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				goBackTo('/');
				break;

			case 'ArrowRight':
			case 'PageDown':
			case ' ':
			case 'l':
			case 'n':
				if (params.next) {
					event.preventDefault();
					goto(`/${params.next}`);
				}
				break;

			case 'ArrowLeft':
			case 'PageUp':
			case 'h':
			case 'p':
				if (params.previous) {
					event.preventDefault();
					goto(`/${params.previous}`);
				}
				break;
		}
	}

	window.addEventListener('keydown', handleKeydown);

	return {
		update(newParams: KeyboardNavigateParams) {
			params = newParams;
		},
		destroy() {
			window.removeEventListener('keydown', handleKeydown);
		}
	};
};
