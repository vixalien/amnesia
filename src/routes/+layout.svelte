<script lang="ts">
	import { Toaster } from 'svelte-sonner';

	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { navigationHistory } from '$lib/stores/navigation';

	import AtkinsonRegular from '$lib/assets/atkinson-regular.woff?url';
	import AtkinsonBold from '$lib/assets/atkinson-bold.woff?url';
	import GinestraBlack from '$lib/assets/ginestra-black.otf?url';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate((navigation) => {
		if (navigation.to?.url.pathname) {
			navigationHistory.push(navigation.to.url.pathname);
		}
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>vixalien's memories</title>
	<link rel="preload" href={AtkinsonRegular} as="font" type="font/woff" crossorigin="anonymous" />
	<link rel="preload" href={AtkinsonBold} as="font" type="font/woff" crossorigin="anonymous" />
	<link rel="preload" href={GinestraBlack} as="font" type="font/opentype" crossorigin="anonymous" />
</svelte:head>

{@render children()}

<Toaster />
