import type { ImageMedium } from '$lib/api/vsco/types';
import type { SingleImageData } from '$lib/types';

export function findImage(images: ImageMedium['image'][], id: string): SingleImageData | null {
	const index = images.findIndex((image) => image._id === id);

	if (index === -1) {
		return null;
	}

	return {
		media: images[index],
		previous: images[index - 1],
		next: images[index + 1]
	};
}
