<script lang="ts">
	import type { ImageMedium } from '$lib/api/vsco/types';

	import { masonryBreakpoints } from '$lib/constants/masonry';
	import { imageBackground } from '$lib/utilities/image-background';
	import { imageLink, imageSrcset } from '$lib/utilities/image-link';
	import { imageSizes } from '$lib/utilities/image-sizes';

	export interface MediaProps {
		image: ImageMedium['image'];
		inGrid?: boolean;
	}

	const { image, inGrid }: MediaProps = $props();
</script>

<img
	loading="lazy"
	src={imageLink(image, image.width)}
	alt={image.description}
	width={image.width}
	height={image.height}
	class="size-full object-contain"
	style:background-color={imageBackground(image)}
	srcset={imageSrcset(image)}
	sizes={inGrid ? imageSizes(288, 1280) : '100vw'}
/>
