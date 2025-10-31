import type { ImageMedium } from '$lib/api/vsco/types';
import type { SingleImageData } from '$lib/types';

const imageStore = new Map<string, ImageMedium['image']>();

export function storeImages(images: ImageMedium['image'][]) {
	imageStore.clear();

	images.forEach((image) => {
		imageStore.set(image._id, image);
	});
}

export function getImage(id: string): SingleImageData | null {
	const images = getImages();

	const index = images.findIndex((image) => image._id === id);

	return {
		media: images[index],
		previous: images[index - 1],
		next: images[index + 1]
	};
}

export function hasImages(): boolean {
	return imageStore.size > 0;
}

export function getImages(): ImageMedium['image'][] {
	return Array.from(imageStore.values());
}
