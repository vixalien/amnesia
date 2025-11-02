<script lang="ts">
	const { data } = $props();

	import Masonry from '$lib/components/masonry.svelte';
	import MediaLink from '$lib/components/media-link.svelte';
</script>

<Masonry items={data.media} class="mx-auto max-w-7xl max-[34em]:grid-cols-2!">
	<div class="p-4 max-[34em]:-col-start-1 max-[34em]:col-end-1">
		<nav class="mb-5">
			<a href="https://www.vixalien.com">&larr; vixalien's site</a>
		</nav>
		<h1>vixalien's memories</h1>
		<p>
			Hello! I'm Angelo Verlain, but you can call me vixalien. I am a web and GTK developer and
			these are my memories, a series of posts I took over the years.
		</p>
		<p>
			&copy; {new Date().getFullYear()} - All rights reserved.
		</p>
	</div>
	{#each data.media as media}
		<MediaLink image={media} />
	{/each}
</Masonry>
