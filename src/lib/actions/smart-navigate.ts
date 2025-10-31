import { goBackTo } from '$lib/stores/navigation';
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

		goBackTo(href);
	}

	node.addEventListener('click', handleClick);

	return {
		destroy() {
			node.removeEventListener('click', handleClick);
		}
	};
};
