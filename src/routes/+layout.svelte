<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import AtkinsonRegular from '$lib/assets/atkinson-regular.woff?url';
	import AtkinsonBold from '$lib/assets/atkinson-bold.woff?url';
	import GinestraBlack from '$lib/assets/ginestra-black.otf?url';

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
