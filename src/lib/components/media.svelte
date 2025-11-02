<script lang="ts">
	import type { ImageMedium } from '$lib/api/vsco/types';

	import { imageBackground } from '$lib/utilities/image-background';
	import { imageLink, imageSrcset } from '$lib/utilities/image-link';
	import { imageSizes } from '$lib/utilities/image-sizes';

	export interface MediaProps {
		image: ImageMedium['image'];
		inGrid?: boolean;
		wrapper?: boolean;

		// animation
		translateX?: number;
		translateY?: number;
		scale?: number;
		isDone?: boolean;
	}

	let isLoaded = $state(false);

	const {
		image,
		inGrid,
		translateX = 0,
		translateY = 0,
		scale = 1,
		wrapper = false,
		isDone = false
	}: MediaProps = $props();
</script>

<div
	class="auto flex size-full max-h-full w-auto max-w-full items-center justify-center data-[wrapper=false]:contents"
	style:view-transition-name={wrapper ? `image-${image._id}` : undefined}
	data-wrapper={wrapper}
>
	<img
		loading="lazy"
		alt={image.description}
		width={image.width}
		height={image.height}
		class={`block ${wrapper ? 'h-auto max-h-full w-auto max-w-full' : ''}`}
		style:background-color={imageBackground(image)}
		style:transition={isDone ? 'transform 0s' : 'transform 0.1s ease-out'}
		style:transform="translate({translateX}px, {translateY}px) scale({scale})"
		style:visibility={isLoaded ? 'visible' : 'hidden'}
		srcset={imageSrcset(image)}
		sizes={inGrid ? imageSizes(288, 1280) : '100vw'}
		decoding="async"
		style:view-transition-name={wrapper ? undefined : `image-${image._id}`}
		data-wrapper={wrapper}
		onload={() => (isLoaded = true)}
	/>
</div>
