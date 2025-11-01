<script lang="ts">
	import type { ImageMedium } from '$lib/api/vsco/types';

	import { imageBackground } from '$lib/utilities/image-background';
	import { imageLink, imageSrcset } from '$lib/utilities/image-link';
	import { imageSizes } from '$lib/utilities/image-sizes';

	export interface MediaProps {
		image: ImageMedium['image'];
		inGrid?: boolean;

		// animation
		translateX?: number;
		translateY?: number;
		scale?: number;
	}

	const { image, inGrid, translateX = 0, translateY = 0, scale = 1 }: MediaProps = $props();
</script>

<div
	class="auto flex size-full max-h-full w-auto max-w-full items-center justify-center"
	style:view-transition-name={`image-${image._id}`}
>
	<img
		loading="lazy"
		alt={image.description}
		width={image.width}
		height={image.height}
		class="block h-auto max-h-full w-auto max-w-full"
		style:background-color={imageBackground(image)}
		style:transition={'transform 0.1s ease-out'}
		style:transform="translate({translateX}px, {translateY}px) scale({scale})"
		srcset={imageSrcset(image)}
		sizes={inGrid ? imageSizes(288, 1280) : '100vw'}
		decoding="async"
	/>
</div>
