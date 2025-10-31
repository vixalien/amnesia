<script lang="ts">
	import type { MediaProps } from './media.svelte';
	import Media from './media.svelte';
	import ShareButton from './share-button.svelte';

	const props: MediaProps = $props();
</script>

<a href={`/${props.image._id}`} class="group relative cursor-zoom-in" data-astro-prefetch>
	<Media {...props} />
	<div class="absolute inset-0 bg-transparent transition-colors group-hover:bg-[#00000040]"></div>
	<div class="absolute top-0 right-0 mt-2 mr-2 hidden group-hover:block">
		<ShareButton
			id={props.image._id}
			title={`${props.image.description ? `${props.image.description} - ` : ``}vixalien's memories`}
		/>
	</div>
</a>
