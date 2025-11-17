<script lang="ts">
	import type { ImageMedium } from '$lib/api/vsco/types';
	import { imageBackground } from '$lib/utilities/image-background';
	import { imageLink, imageSrcset } from '$lib/utilities/image-link';
	import { imageSizes } from '$lib/utilities/image-sizes';
	import ShareButton from './share-button.svelte';

	interface GridMediaProps {
		image: ImageMedium['image'];
	}

	const { image }: GridMediaProps = $props();
</script>

<a href={`/${image._id}`} class="group relative cursor-zoom-in" data-astro-prefetch>
	<img
		loading="lazy"
		alt={image.description}
		width={image.width}
		height={image.height}
		class="block"
		style:background-color={imageBackground(image)}
		srcset={imageSrcset(image)}
		src={imageLink(image, image.width)}
		sizes={imageSizes(288, 1280)}
		decoding="async"
		style:view-transition-name={`image-${image._id}`}
		referrerpolicy="no-referrer"
	/>
	<div
		class="pointer-events-none absolute inset-0 bg-transparent transition-colors group-hover:bg-[#00000040]"
	></div>
	<div class="absolute top-0 right-0 mt-2 mr-2 hidden group-hover:block">
		<ShareButton
			id={image._id}
			title={`${image.description ? `${image.description} - ` : ``}vixalien's memories`}
		/>
	</div>
</a>
