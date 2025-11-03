import type { ImageMedium } from '$lib/api/vsco/types';
import type { SingleImageData } from '$lib/types';

import { findImage } from './image-data';

const imageStore = new Map<string, ImageMedium['image']>();

export function storeImages(images: ImageMedium['image'][]) {
	imageStore.clear();

	images.forEach((image) => {
		imageStore.set(image._id, image);
	});
}

export function getImage(id: string): SingleImageData | null {
	const images = getImages();

	return findImage(images, id);
}

export function hasImages(): boolean {
	return imageStore.size > 0;
}

export function getImages(): ImageMedium['image'][] {
	return Array.from(imageStore.values());
}
