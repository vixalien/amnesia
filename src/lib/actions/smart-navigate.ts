import { goto } from '$app/navigation';
import { navigationHistory } from '$lib/stores/navigation';
import type { Action } from 'svelte/action';

export const smartNavigate: Action<HTMLAnchorElement> = (node) => {
	function handleClick(event: MouseEvent) {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}

		const href = node.getAttribute('href');
		if (!href) return;

		// Only handle internal links (starting with /)
		if (!href.startsWith('/')) return;

		event.preventDefault();

		// Check if we can go back to this path
		const stepsBack = navigationHistory.stepsBackTo(href);

		if (stepsBack !== null && window.history.length > stepsBack) {
			// Go back the specific number of steps
			window.history.go(-stepsBack);
		} else {
			goto(href);
		}
	}

	node.addEventListener('click', handleClick);

	return {
		destroy() {
			node.removeEventListener('click', handleClick);
		}
	};
};
