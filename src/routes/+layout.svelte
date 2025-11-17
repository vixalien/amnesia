<script lang="ts">
	import { Toaster } from 'svelte-sonner';

	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { navigationHistory } from '$lib/stores/navigation';

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
</svelte:head>

{@render children()}

<Toaster />
