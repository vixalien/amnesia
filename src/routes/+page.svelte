<script lang="ts">
	const { data } = $props();

	import Masonry from '$lib/components/masonry.svelte';
	import MediaLink from '$lib/components/media-link.svelte';

	import AtkinsonRegular from '$lib/assets/atkinson-regular.woff?url';
	import GinestraBlack from '$lib/assets/ginestra-black.otf?url';
</script>

<svelte:head>
	<link rel="preload" href={AtkinsonRegular} as="font" crossorigin="anonymous" />
	<link rel="preload" href={GinestraBlack} as="font" crossorigin="anonymous" />
</svelte:head>

<Masonry items={data.media} class="mx-auto max-w-7xl max-[34em]:grid-cols-2!">
	<div class="p-4 max-[34em]:-col-start-1 max-[34em]:col-end-1">
		<nav class="mb-5">
			<a href="https://www.vixalien.com">&larr; vixalien's site</a>
		</nav>
		<h1>vixalien's memories</h1>
		<p>
			Hello! I'm Angelo Verlain, but you can call me vixalien. I am a software engineer but I also take a few pictures every once and then as a hobby. You can find a small selection of such pictures below.
		</p>
		<p>
			&copy; {new Date().getFullYear()} - All rights reserved.
		</p>
	</div>
	{#each data.media as media}
		<MediaLink image={media} />
	{/each}
</Masonry>
